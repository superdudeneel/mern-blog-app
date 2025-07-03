import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import multer from 'multer';
import bodyParser from 'body-parser';
import path from 'path';

dotenv.config();

import User from './models/userschema.js';
import Blog from './models/blogschema.js';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder to save files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });





mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('mongo db connnected');
    })
    .catch((err)=>{
        console.error(err);

    })

const app = express();
const port = process.env.PORT;

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors({
    origin: process.env.FRONT_END_URI,
    credentials: true
}));
app.use(session({
  secret: 'secretkey',          // required - used to sign session ID cookie
  resave: false,                    // don't save session if unmodified
  saveUninitialized: false, 
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),        // don't create session until something stored
  cookie: { maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  } // 24 hour
}));    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/register', async (req,res)=>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.json({success: false, message: 'All Fields Required'});
    }
    const existingemail = await User.findOne({email: email});
    if(existingemail){
        return res.json({success: false, message: 'Email Already Exists'});
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    await User.create({
        name: name,
        email: email,
        password: hashedpassword,
    })
    return res.json({success: true, message: 'Account Created!!'});
})

app.post('/api/login', async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.json({success: false, message: 'All Fields Required'});
    }
    const user = await User.findOne({email: email});
    if(!user){
         return res.json({success: false, message: 'No Such User Found'});
    }
    const ispasswordvalid = await bcrypt.compare(password, user.password);
    if(!ispasswordvalid){
         return res.json({success: false, message: 'Invalid Password'});
    }
    req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email,
    }
    return res.json({success: true, message: 'Logged in!!'});
})

app.get('/api/checkauth', (req, res)=>{
    if(!req.session.user){
        return res.json({success: false})
    }
    return res.json({success: true, user: req.session.user});
    
})

app.get('/api/getuserblogs', async (req, res)=>{
    if(!req.session.user){
        return res.json({success: false})
    }
    const user = await User.findById(req.session.user.id);

    const blogs = await Blog.find({userId: user._id});
    return res.json({success: true, blogs: blogs});

})

app.post('/api/addblog' ,  upload.single('image'),async (req, res)=>{
    const {title, content, author, date}  = req.body;
    const image = req.file?.filename;

    const user = await User.findById(req.session.user.id);
    if(!user){
        return res.json({success:false});
    }
    if(!title || !author || !date || !content){
        return res.json({success:false, message: 'All fields required'})
    }
    const newBlog = await Blog.create({
        userId: user._id,
        title: title,
        content: content,
        author :author,
        image: image,
        date: date,
    })
    return res.json({ success: true, message: 'Blog created', blog: newBlog });

})  
app.get('/api/getblogs', async (req, res)=>{
   

    const blogs = await Blog.find();
    return res.json({success: true, blogs: blogs});

})
app.get('/api/blog/:id', async (req, res)=>{
    const {id} = req.params;
    const blog  = await Blog.findById(id);
    if(!blog){
        return res.json({success: false, message: 'No blog found'});
    }
    return res.json({success: true, blog: blog});
    
})

app.get('/api/logout', async (req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.json({success: false})
        }
        return res.json({success: true, message: 'Logged Out!!'})
    })
})

const myserver = http.createServer(app);
myserver.listen(port, ()=>{
    console.log('server has started listening');
})