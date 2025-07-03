import mongoose from 'mongoose';
const blogschema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
    },
    content:{
        type: String,
        required: true,
    },
    image:{
        type:String,

    },
    date:{
        type: Date,
        default: Date.now(),
    },

})
const Blog = mongoose.model('blog', blogschema);
export default Blog;
