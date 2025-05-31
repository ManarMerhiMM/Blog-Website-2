import React, { useEffect, useState } from 'react'
import api from '../api';
import { Link } from 'react-router-dom';
import "./Pages.css"
import PostList from '../Components/PostList';


function Home() {
   

    return (
        <div className='Home-container'>
            <PostList/>
        </div>
    )
}


export default Home;