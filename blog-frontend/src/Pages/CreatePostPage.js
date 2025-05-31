import React from 'react'
import api from '../api';
import { useNavigate } from "react-router-dom";
import PostForm from '../Components/PostForm';
import "./Pages.css"

function Createpost() {
    const navigator = useNavigate()

   const handleCreatePost = (post) => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("You must log in to create a post");
        return;
    }

    api.post("/posts", post, {
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