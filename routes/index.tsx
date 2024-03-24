import { Route, Routes } from "react-router-dom"
import { Home } from "./home";
import LoginPage from "../views/login";
import { createContext, useContext, useEffect, useState } from 'react';
import Dashboard from "~views/Dashboard";
import type { ContextProps, ResponseData } from "~misc/Constants";
import AddNew from "~views/AddNew";

import './temp.css'

const Routing = () => {


  return (

    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/new" element={<AddNew />} />
    </Routes>
  )


}

export const AuthContext = createContext<ContextProps | null>(null);
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [logedIn, setLogedin] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<ResponseData>()
  const records = ""
  console.log("this is the Auth ");

  const login = async (email: string, password: string) => {
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
        setLogedin(true)
        setUser(responseData)
        localStorage.setItem('loggedInEmail', email);
        return responseData
      } else {
        // Handle failed login
        const data = await response.json();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const saveRecord = async (email: string, name: string, canvasdata: string) => {
    try {
      const response = await fetch('http://172.27.239.102:3003/excali/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, canvasdata }),
      });
      if (response.ok) {
        // Save Successfull
        fetchAll(email)
      } else {
        const data = await response.json();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const updateRecord = async (email: string, name: string, canvasdata: string) => {
    if (name)
      try {
        const response = await fetch('http://172.27.239.102:3003/excali/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, name, canvasdata }),
        });
        if (response.ok) {

          fetchAll(email)
        } else {
          const data = await response.json();
        }
      } catch (error) {
        console.error('Error:', error);
      }
      else{
        console.log("Name is empty",name);
      }
  };

  const fetchAll = async (email: string) => {
    // all\
    setIsLoading(true)

    try {
      const response = await fetch('http://172.27.239.102:3003/excali/all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
      });
      if (response.ok) {
        // Successful login logic here

        console.log('====================================');
        const responseData: ResponseData = await response.json();
        console.log(responseData);
        setLogedin(true)
        setUser(responseData)
        setIsLoading(false)
        return responseData
      } else {
        // Handle failed login
        const data = await response.json();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const logout = () => {
    localStorage.setItem('loggedInEmail', "");
    setLogedin(false)
    setUser(null)
    setIsLoading(false)
  }
  useEffect(() => {
    async function init() {
      try {
        const email = localStorage.getItem('loggedInEmail')
        if (email.includes('@')) {
          await fetchAll(email).then(() => {

          })

        }
        else {
          setIsLoading(false)
          setLogedin(false)
        }
      } catch (error) {

      }
    }
    init()
  }, [])
  const Spinner = () => <div className="loader"></div>;
  return (


    <AuthContext.Provider value={{ fetchAll, saveRecord, user, login, logout, updateRecord }}>
      {isLoading ? (
        <div className="w-52 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        (logedIn) ? <>
          <Routing />
        </> : <>
          <LoginPage />
        </>
      )}


    </AuthContext.Provider>
  )
}