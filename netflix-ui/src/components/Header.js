import React from 'react'
import './Header.css'
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
  const navigate = useNavigate();                              // to switch between pages
  return (
    <div>
        
        <div className='header'>
            <img src={logo} alt="logo" className='logo'/>
              {props.MysignUp &&    
                  
                  <button className='button' onClick={() => {navigate('/login');}}>Log In</button>
                  
              }
        </div>
        
    </div>
  )
}
