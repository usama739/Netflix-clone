import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage';
import axios from 'axios';


export default function Signup() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    email:"",
    password:"",
  })


  /// sending post request (email, password) to '/sigup' endpoint
  const handleSignIn = async ()=> {                             // trigger on clicking 'Sign Up'
    const baseURL = 'http://localhost:3001';                /// server is listening on port 3001 ///
    try{
      const {email, password} = formValues
      const response = await axios.post(`${baseURL}/signup`, {
        email: email,
        password: password
      })

      if (response.status === 201) {
        navigate('/');
      }
    }catch(err){
      console.log(err)
    }
  }

 
  return (
    <div>
      <BackgroundImage />

       <div className='content'>
        <Header MysignUp={true}/>
        <div className='mainbody'>
          <div className='intro'>
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>Ready to watch? Enter your Email & Password</h6>
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
