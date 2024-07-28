// src/SignUp.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import google from './assets/google-logo.png';
import facebook from './assets/facebook-logo.png';
import git from './assets/git-logo.png';
import linkedin from './assets/linkedin-logo.png';
import leetcode from './assets/leetcode-logo.png';
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate();

  const handleSignUp = async (e) => {
    
    try {
      const response = await fetch("http://localhost:3000/signup", 
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const json = await response.json();
      if(json.msg==="SUCCESS"){
        navigate('/login')
      }
      console.log(json);
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

return (
    <div className='signup-container'>
      <img alt="leetcode-logo" className="leetcode" src={leetcode}></img>
      <div className='details'>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        /> 
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleSignUp}>
          SIGN UP
        </button>
      </div>
      <div className='links'>
        <p>Have an Account? <Link to="/login" className='signin'>Sign In</Link></p>
      </div>
      <div className='social-login'>
        <p>or you can sign in with</p>
        <div className='social-icons'>
          <a href="#"><img src={google} className='google' alt="Google"/></a>
          <a href="#"><img src={git} className='git' alt="Github"/></a>
          <a href="#"><img src={facebook} className='facebook' alt="Facebook"/></a>
          <a href="#"><img src={linkedin} className='linkedin' alt="Linkedin"/></a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
