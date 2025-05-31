import React, { useState, useEffect } from 'react';
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../Components/PostForm';

function Editpost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        api.get(`/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                setPost(response.data);
            })
            .catch((error) => {
                console.error("Error fetching post", error);
                setError("Failed to fetch post. Please try again.");
            });
    }, [id]);

    const handleEditPost = (updatedPost) => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError("You must be logged in to edit posts.");
            return;
        }

        api.put(`/posts/${id}`, updatedPost, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                navigate(`/post/${id}`);
            })
            .catch((error) => {
                console.log(error);
                setError("Failed to update post. Please try again.");
            });
    };

    return (
        <div className="create-page">
            <div className="CreatePost-wrapper">
                <h2>Edit Post</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                {!post && !error && <p style={{ textAlign: 'center' }}>Loading post...</p>}
                {post && <PostForm post={post} onSubmit={handleEditPost} />}
            </div>
        </div>
    );
}

export default Editpost;
