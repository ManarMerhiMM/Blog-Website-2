import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        const token = localStorage.getItem('token');

        api.get('/posts', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching posts", error);
                setError("Failed to fetch posts. Please try again.");
            });
    };

    const handleDeletePost = (id) => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError("You must be logged in to delete posts.");
            return;
        }

        if (window.confirm("Are you sure you want to delete this post?")) {
            api.delete(`/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(() => {
                    setPosts(posts.filter(post => post.id !== id));
                })
                .catch((error) => {
                    console.error("Error deleting post", error);
                    setError("Failed to delete post. Please try again.");
                });
        }
    };

    return (
        <div className="Home-container" style={{ minHeight: "100vh", padding: "20px" }}>
            <h2 style={{
                textAlign: "center",
                paddingTop: "20px",
                fontSize: "2rem",
                fontFamily: "'Times New Roman', Times, serif",
                color: "rgb(22, 30, 134)"
            }}>
                Dashboard
            </h2>

           
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                <button
                    onClick={() => navigate("/create")}
                    style={{
                        height: "40px",
                        padding: "0 20px",
                        backgroundColor: "rgb(22, 30, 134)",
                        color: "white",
                        fontSize: "1rem",
                        border: "none",
                        borderRadius: "50px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                        margin:"auto"

                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgb(18, 25, 120)"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "rgb(22, 30, 134)"}
                >
                    + Create Post
                </button>
            </div>

            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <table style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "linear-gradient(rgb(235, 234, 234), rgb(171, 172, 188))",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}>
                <thead>
                    <tr style={{ backgroundColor: "rgb(22, 30, 134)" }}>
                        <th style={headerCellStyle}>Title</th>
                        <th style={headerCellStyle}>Content</th>
                        <th style={headerCellStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id} style={{ borderBottom: "1px solid #ccc" }}>
                            <td style={bodyCellStyle}>
                                <a href={`/post/${post.id}`} style={linkStyle}>
                                    {post.title}
                                </a>
                            </td>
                            <td style={{ ...bodyCellStyle, maxWidth: "480px" }}>
                                {post.content.length > 150 ? post.content.substring(0, 150) + "..." : post.content}
                            </td>
                            <td style={{ padding: "12px", textAlign: "center" }}>
                                <button onClick={() => navigate(`/edit/${post.id}`)} style={editButtonStyle}>Edit</button>
                                <button onClick={() => handleDeletePost(post.id)} style={deleteButtonStyle}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


const headerCellStyle = {
    color: "white",
    padding: "12px",
    fontSize: "1.25rem",
    fontFamily: "'Times New Roman', Times, serif",
    textAlign: "left",
    borderBottom: "2px solid rgba(255,255,255,0.3)"
};

const bodyCellStyle = {
    padding: "12px",
    verticalAlign: "top",
    maxWidth: "220px",
    wordWrap: "break-word"
};

const linkStyle = {
    color: "rgb(22, 30, 134)",
    textDecoration: "none",
    fontWeight: "bold"
};

const editButtonStyle = {
    height: "35px",
    width: "80px",
    marginRight: "10px",
    backgroundColor: "rgb(22, 30, 134)",
    color: "white",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    paddingBottom:"30px"
    

};

const deleteButtonStyle = {
    height: "35px",
    width: "80px",
    backgroundColor: "red",
    paddingBottom:"30px",
    color: "white",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer"
};

export default Dashboard;
