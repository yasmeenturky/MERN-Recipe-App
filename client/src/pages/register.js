import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  
  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post("http://localhost:8000/auth/users/register",{
        username,
        password
      })
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className='auth-container'>
    <form onSubmit={onSubmit}>
      <h2> Register </h2>
      <div className='form-group'>
          <label htmlFor='username'> Username: </label>
          <input type='text' id='username' onChange={(event) => setUsername(event.target.value)}/>
      </div>
      <div className='form-group'>
          <label htmlFor='password'> Password: </label>
          <input type='password' id='password' onChange={(event) => setPassword(event.target.value)}/>
      </div>
      <button type='submit'>Register</button>
    </form>
  </div>
  )
}


export default Register