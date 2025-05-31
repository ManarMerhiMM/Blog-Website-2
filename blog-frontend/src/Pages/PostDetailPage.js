import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

function Postdetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        api.get(`/posts/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
            .then((response) => setPost(response.data))
            .catch((error) => {
                console.error("Error loading post:", error);
            });
    }, [id]);

    return (
        <div className="create-page">
            <div className="CreatePost-wrapper">
                {post ? (
                    <>
                        <h2>{post.title}</h2>
                        <p style={{ marginTop: "30px", fontSize: "1.3rem", lineHeight: "1.6" }}>{post.content}</p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
                            <Link to="/">
                                <button  style={{ height:"50px",width:"170px",fontSize:"18px" }} className="form-submit" >Back to Home</button>
                            </Link>
                            <Link to={`/edit/${post.id}`}>
                                <button className="form-submit"  style={{ height:"50px",width:"170px",fontSize:"19px" }}>Edit</button>
                            </Link>

                        </div>
                    </>
                ) : (
                    <p style={{ textAlign: 'center' }}>Loading post...</p>
                )}
            </div>
        </div>
    );
}

export default Postdetail;
