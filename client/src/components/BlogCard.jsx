import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

const BlogCard = ({ image, date, CardTitle, CardDescription, author, id }) => {
  return (
    <>
        <div onClick = {()=>{
            window.location.href = `/blog/${id}`
        }} key = {id} className="cursor-pointer max-w-md mx-auto bg-white overflow-hidden">
            <img
                src={image}
                alt={CardTitle}
                className="w-[90%] h-56 object-fill"
            />

            <div className="py-4 w-[90%]">
                {date && (
                <span className="inline-block mb-3 text-sm font-semibold text-white bg-indigo-600 px-4 py-1 rounded">
                    {new Date(date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                    })}
                </span>
                )}

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {CardTitle}
                </h3>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                By {author}
                </h3>
                <p className="text-sm text-gray-600">
                {CardDescription}
                </p>
            </div>
        </div>


 

    </>
  );
};

export default BlogCard;
