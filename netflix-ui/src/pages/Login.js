import React , {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import {firebaseAuth} from '../utils/firebase-config';
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage';


export default function Login() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    email:"",
    password:"",
  })

  const handleLoginIn = async ()=> {                             // trigger on clicking 'Log In'
    try{
      const {email, password} = formValues
      await signInWithEmailAndPassword(firebaseAuth, email, password)
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
        <Header />
        <div className='Logintitle'>
          <h2>Login</h2>
          <div className='LoginForm'>
            <input className='LoginEmail' type='email' placeholder='Email Address' name='email'
              value={formValues.email} 
              onChange={(e)=> setFormValues({
                ...formValues, [e.target.name] : e.target.value
              })
              }
            />
            <input className='Loginpassword' type='password' placeholder='Password' name='password' 
              value={formValues.password} 
              onChange={(e)=> setFormValues({
                ...formValues, [e.target.name] : e.target.value
              })
              }
            />
            <button className='LoginButton' onClick={handleLoginIn}>Log In</button>
          </div>
        </div>
       
      </div>
    </div>
  )
}
