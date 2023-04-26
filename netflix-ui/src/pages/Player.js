import React from 'react'
import './Player.css'
import video from "../assets/video.mp4";
import {BsArrowLeft} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';


export default function Player() {
    const navigate = useNavigate();
  return (
    <div className='player'>
        <BsArrowLeft className='back' onClick={()=>{navigate(-1)}} />
        <video src={video} autoPlay loop controls></video>
    </div>
  )
}
