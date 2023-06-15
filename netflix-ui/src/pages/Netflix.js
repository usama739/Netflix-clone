import React, { useState } from 'react'
import './Netflix.css'
import Navbar from '../components/Navbar';
import Row from '../components/Row';
import { TMDB_API_KEY, TMDB_URL } from '../utils/constants'
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
    <div className='home-page'>
      <Navbar isScrolled={isScrolled}/>
      
      <div className="mainMovie">
        <img src={backgroundImage} alt="MyMovie" className='mainimg'/>
        <div className='container'>
            <img src={MovieLogo} alt='MyMovieLogo' className='logoImg' /> 

          <div className='buttons'>
            <button className='playButton' onClick={()=>{navigate('/player')}}>
              <FaPlay /> Play
            </button>  
          </div>
        </div>
      </div>
    
      <Row title="Trending Now" fetchUrl={`${TMDB_URL}/trending/all/week?api_key=${TMDB_API_KEY}`} isLargeRow={true}/>
      <Row title="Netflix Originals" fetchUrl={`${TMDB_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_networks=213`}/>
      <Row title="Top Picks for You" fetchUrl={`${TMDB_URL}/discover/movie?sort_by=popularity.desc&api_key=${TMDB_API_KEY}`} />
      <Row title="Action Movies" fetchUrl={`${TMDB_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=28`} />
      <Row title="Horror Movies" fetchUrl={`${TMDB_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=27`} />
      <Row title="Comedy Movies" fetchUrl={`${TMDB_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=35`} />
    
    </div>
  )
}
