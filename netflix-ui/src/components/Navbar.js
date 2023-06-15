import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import image from '../assets/logo.png';
import { FaPowerOff } from "react-icons/fa";


export default function Navbar({isScrolled}) {
  const navigate = useNavigate();
 
  const handleSignOut = () => {
    navigate('/login');
  };


  return (
    <div>
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className='containerleft'>
          <img className='NavImg' src={image} alt='Mylogo' height='80px'/>
          <ul className='navbarList'>
            <li><a href='/'>Home</a></li>   
            <li><a href='/search'>Search</a></li>   
            <li><a href='/mylist'>My List</a></li>  
          </ul> 
        </div>
        
        <div className='contianerRight'>    
          <button className='logout' onClick={handleSignOut}>
              <FaPowerOff/>
          </button>
        </div>
      
      </nav>
    </div>
  )
}
