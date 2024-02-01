import React from 'react'
import "../components/Header.css"
import iconPng from "../assets/homeIcon.png"
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='container'>
    <div className='titleContainer'>
        <span className='titleHead'>W</span><span className='subTitle'>eather</span>
        
    </div>
    <Link to="/"><div className='homeContainer'>
       <img src={iconPng} />
        <h4>Home</h4>
    </div></Link>
    </div>
  )
}

export default Header