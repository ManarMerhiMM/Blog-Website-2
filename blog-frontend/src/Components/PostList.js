import React, { useState } from "react";
import axios from "axios";
import api from "../api";
import { useEffect } from "react";
import { Link } from "react-router-dom";


function PostList(){
    const [allPosts,setAllPosts]=useState([])

useEffect(() => {
    api.get('/posts')
        .then((response) => {
            if (Array.isArray(response.data)) {
                setAllPosts(response.data);
            } else {
                console.log('Unexpected response format:', response.data);
            }
        })
        .catch((error) => console.error('Error fetching posts:', error));
}, []);


   return (
        <div className='Home-container'>
            <h2>Blog Posts</h2>
            <div className='post-container'>
                {allPosts.length > 0 ? (
                    allPosts.map((post) => (
                        <div key={post.id} className='All-posts'>
                            <Link className='title-link' to={`/post/${post.id}`}>
                                <h2>{post.title}</h2>
                            </Link>
                            <p>{post.content}</p>

                            <Link className='edit-home' to={`/post/${post.id}`}>
                            <button>View Post</button> 
                            </Link>

                        </div>

                    ))
                ) : (
                    <p>No posts available.</p>


                )}

            </div>
        </div>
    )
}

export default PostList;