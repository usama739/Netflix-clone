import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage';
import axios from 'axios';


export default function Login() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    email:"",
    password:"",
  })


  /// sending post request (email, password) to '/login' endpoint
  const handleLoginIn = async ()=> {                             
    const baseURL = 'http://localhost:3001';                /// server is listening on port 3001 ///
    try{
      const {email, password} = formValues
      const response = await axios.post(`${baseURL}/login`, {
        email: email,
        password: password
      })
      
      if (response.status === 200) {
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
