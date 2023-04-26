import React, { useState } from 'react'
import './Netflix.css'
import Navbar from '../components/Navbar';
import backgroundImage from '../assets/home.jpg';
import MovieLogo from '../assets/homeTitle.webp';
import {FaPlay} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


export default function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }

  return (
    <div>
      <Navbar isScrolled={isScrolled}/>

      <div className="mainMovie">
        <img src={backgroundImage} alt="MyMovie" className='mainimg'/>
        <div className='container'>
            <img src={MovieLogo} alt='MyMovieLogo' /> 

          <div className='buttons'>
            <button className='playButton' onClick={()=>{navigate('/player')}}>
              <FaPlay /> Play
            </button>  
          </div>
        </div>
      </div>
    


    
    </div>
  )
}
