import React, { useState, useEffect } from "react";

function PostForm({ post, onSubmit }) {
    const [title, setTitle] = useState(post ? post.title : '');
    const [content, setContent] = useState(post ? post.content : '');

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, content });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="CreatePost-form">
                <input 
                    type="text" 
                    value={title} 
                    placeholder="Enter your title" 
                    onChange={e => setTitle(e.target.value)} 
                    className="form-input" 
                    required 
                />
                <input 
                    type="text" 
                    value={content} 
                    placeholder="Enter your content" 
                    onChange={e => setContent(e.target.value)} 
                    className="form-input" 
                    required 
                />
                <button type="submit" className="form-submit">Submit</button>
            </form>
        </div>
    );
}

export default PostForm;
