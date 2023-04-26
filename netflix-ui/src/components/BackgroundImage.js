import React from 'react'
import './BackgroundImage.css'
import background from '../assets/login.jpg';

export default function BackgroungImage() {
  return (
    <div>
        <img src={background} alt="Background" className='backImg' />
    </div>
  )
}
