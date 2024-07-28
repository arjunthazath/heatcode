// src/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import google from './assets/google-logo.png';
import facebook from './assets/facebook-logo.png';
import git from './assets/git-logo.png';
import linkedin from './assets/linkedin-logo.png';
import leetcode from './assets/leetcode-logo.png';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Use the useNavigate hook

  const handleLogin = async (e) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });
      const json = await response.json();
      localStorage.setItem("token", json.token);
      console.log(json);
      if (json.token) {
        navigate('/problems');  // Navigate to the problems list page after successful login
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className='login-container'>
      <img alt="leetcode-logo" className="leetcode" src={leetcode}></img>
      <div className='details'>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <button onClick={handleLogin}>LOG IN</button>
      </div>
      <div className='links'>
        <a href="#" className='forgot'>Forgot Password?</a>
        <Link to="/signup" className='signup'>Sign Up</Link>
      </div>
      <div className='social-login'>
        <p>or you can sign in with</p>
        <div className='social-icons'>
          <a href="#"><img src={google} className='google' alt="Google" /></a>
          <a href="#"><img src={git} className='git' alt="Github" /></a>
          <a href="#"><img src={facebook} className='facebook' alt="Facebook" /></a>
          <a href="#"><img src={linkedin} className='linkedin' alt="Linkedin" /></a>
        </div>
      </div>
    </div>
  );
}

export default Login;
