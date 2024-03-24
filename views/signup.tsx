import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { devURL, type ResponseData } from '~misc/Constants';
import ErrBadge from './Components/ErrBadge';
import IconButton, { buttonTypes } from './Components/IconButton';
import { AuthData } from '~routes';
import Badge from './Components/Badge';

type Props = {}

const Signuppage = (props: Props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMSG, setsuccessMSG] = useState('');
  const context = AuthData();

  const handleSubmit = async () => {
    // Basic validation
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)  || !email || !password || !cpassword || cpassword != password) {
      console.log(email,password,cpassword);
      
      setErrorMessage('Invalid details fill!');
      return;
    }
    setErrorMessage('');

    // Perform fetch request or any other action here
    try {
      const response = await fetch(devURL.signup, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        console.log(response.status);
        console.log('====================================');
        const responseData: ResponseData = await response.json();
        console.log(responseData);
        setsuccessMSG('Account Created!..redirecting')
        setTimeout(() => {
          navigate('/')
        }, 2000);
      } else {
        // Handle failed login
        console.log(response.status);
        setsuccessMSG('')

        const data = await response.json();
        setErrorMessage(data.response || 'Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred, please try again later');
    }
  };

  return (
    <div className='p-6 w-52 flex flex-col items-center'>
      <form id="getData" onSubmit={handleSubmit}>
        <label htmlFor="email">Email </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"

          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="pass">Password</label>
        <input
          id="pass"
          name="pass"
          type="password"
          value={password}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"

          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="pass">Confirm Password</label>
        <input
          id="pass"
          name="pass"
          type="password"
          value={cpassword}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"

          onChange={(e) => setcPassword(e.target.value)}
        />
        <IconButton onClick={()=>{handleSubmit()}} type={buttonTypes.green} text='Register'/>
      </form>
      <div id="create account"></div>
      <Link to={'/'}>
        <div className="text-blue-500">Login Instead!</div>
      </Link>
      {errorMessage.length > 0 &&
        <ErrBadge text={errorMessage} />
      }
       {successMSG.length > 0 &&
        <Badge text={successMSG} />
      }
    </div>
  );
}

export default Signuppage