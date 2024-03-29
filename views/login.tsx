import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthData } from '~routes';
import ErrBadge from './Components/ErrBadge';

type Props = {}

const LoginPage = (props: Props) => {
  console.log('====================================');
  console.log("Loaded login");
  console.log('====================================');
  const context = AuthData();
  const login = context?.login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("")

    // Basic validation
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }
    try {
      await login(email, password).then((res) => {
        console.log(res);

        setErrorMessage(res)

      })
    }
    catch (e) {
    }

  };

  return (
    <div className="p-6 w-52">
      <form id="getData" onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2 justify-center items-center">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pass" className="block mb-1">Password</label>
          <input
            id="pass"
            name="pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
        {errorMessage && <ErrBadge text={errorMessage}  />}

      </form>

      <Link to={'/signup'}>
        <div className="text-blue-500">Register for Free!</div>
      </Link>
    </div>

  );
}

export default LoginPage