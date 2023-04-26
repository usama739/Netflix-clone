import React , {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import image from '../assets/logo.png';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {firebaseAuth} from '../utils/firebase-config';
import { FaPowerOff, FaSearch } from "react-icons/fa";


export default function Navbar({isScrolled}) {
  
  const [showInput, setShowInput] = useState(false);           /// state hook for input field
  const handleSearchClick = () => {
    setShowInput(!showInput);
  }

  
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if(!currentUser) navigate("/login")
    })
  });



  return (
    <div>
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className='containerleft'>
          <img className='NavImg' src={image} alt='Mylogo' height='80px'/>
  
          <ul className='navbarList'>
            <li><a href='/'>Home</a></li>  
            <li><a href='/tv'>TV Shows</a></li>  
            <li><a href='/movies'>Movies</a></li>  
            <li><a href='/mylist'>My List</a></li>  
          </ul> 
  
        </div>
        
        <div className='contianerRight'>    
          
          {showInput && (
            <input className="navField" type={Text} placeholder='Search'/>
          )}
          
          <FaSearch className='navSearch' onClick={handleSearchClick}/>

          <button className='logout' onClick={()=>{signOut(firebaseAuth)}}>
              <FaPowerOff/>
          </button>
         
        </div>
      
      </nav>
    </div>
  )
}
