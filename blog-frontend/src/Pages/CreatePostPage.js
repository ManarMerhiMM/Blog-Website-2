import React from 'react';
import api from '../api';
import { useNavigate } from "react-router-dom";
import PostForm from '../Components/PostForm';
import "./Pages.css";

function Createpost() {
    const navigator = useNavigate();

    const handleCreatePost = (post) => {
        const token = localStorage.getItem("token");
        const userEmail = localStorage.getItem("userEmail"); 

        if (!token) {
            alert("You must log in to create a post");
            return;
        }

        const postData = {
            ...post,
            email: userEmail 
        };

        console.log("Creating post with data:", postData);

        api.post("/posts", postData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => {
            navigator("/");
        })
        .catch((error) => {
            console.error("Post creation failed", error);
            if (error.response && error.response.status === 401) {
                alert("Unauthorized: Please log in again.");
            } else {
                alert("Failed to create post. Please try again.");
            }
        });
    };

    return (
        <div className='create-page'>
            <div className="CreatePost-wrapper">
                <h2>Create Post</h2>
                <PostForm onSubmit={handleCreatePost} />
            </div>
        </div>
    );
}

export default Createpost;
