import React, { useState } from "react";
import { axiosWithAuth } from './axiosWithAuth'

const Login = ( props ) => {
  const [ creds, setCreds] =useState({
    username: '',
    password: ''
  })

  const changeHandler = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    })
  }

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/login', creds)
      .then(res => {
        window.localStorage.setItem('token', res.data.payload)
        props.history.push('/protected')
      } )
      .catch(err => console.log({err}))

  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
   <div>
     <form onSubmit={login}>
                    <input
                    type="text"
                    name="username"
                    value={creds.username}
                    onChange={changeHandler}
                    
                    />
                    <input
                        type="password"
                        name="password"
                        value={creds.password}
                        onChange= {changeHandler}
                    
                    />
                    <button>Login</button>
                </form>
   </div>
  );
};

export default Login;
