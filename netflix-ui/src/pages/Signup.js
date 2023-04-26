import React , {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import {firebaseAuth} from '../utils/firebase-config';
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage';


export default function Signup() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    email:"",
    password:"",
  })

  const handleSignIn = async ()=> {                             // trigger on clicking 'Sign Up'
    try{
      const {email, password} = formValues
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if(currentUser) navigate("/")
    })
  });

 
  return (
    <div>
      <BackgroundImage />

       <div className='content'>
        <Header MysignUp={true}/>
        <div className='mainbody'>
          <div className='intro'>
            <h1 style={{fontSize: "50px"}}>Unlimited movies, TV shows, and more.</h1>
            <h4 style={{fontSize: "30px"}}>Watch anywhere. Cancel anytime.</h4>
            <h6 style={{fontSize: "30px"}}>Ready to watch? Enter your Email & Password</h6>
          </div>
         
          <form className='form'>
            <input  className='SignUpEmail' type='email' placeholder='Email Address' name='email'
              value={formValues.email} 
              onChange={(e)=> setFormValues({
                ...formValues, [e.target.name] : e.target.value
              })
              }
            />
            <input className='SignUpPasword' type='password' placeholder='Password' name='password' 
              value={formValues.password} 
              onChange={(e)=> setFormValues({
                ...formValues, [e.target.name] : e.target.value
              })
              }
            />
          </form>

          <button className='SignUpButton' onClick={handleSignIn}>Sign Up</button>
        </div>
      </div>
      
    </div>
  )
}
