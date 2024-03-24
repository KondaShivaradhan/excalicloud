import React, { useState } from 'react';
import type { ResponseData } from '~misc/Constants';

type Props = {}

const Signuppage = (props: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      // Basic validation
      if (!email || !password) {
        setErrorMessage('Please enter both email and password');
        return;
      }
      // Perform fetch request or any other action here
      try {
        const response = await fetch('http://172.27.239.102:3003/excali/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
          // Successful login logic here
          console.log('====================================');
          const responseData: ResponseData = await response.json();
          console.log(responseData);
         
        } else {
          // Handle failed login
          const data = await response.json();
          setErrorMessage(data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('An error occurred, please try again later');
      }
    };
  
    return (
      <div style={{ padding: 16 }}>
        <form id="getData" onSubmit={handleSubmit}>
          <label htmlFor="email">Email </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="pass">Password</label>
          <input
            id="pass"
            name="pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <div id="create account"></div>
        <a href="signup.html">Register for Free!</a>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    );
}

export default Signuppage