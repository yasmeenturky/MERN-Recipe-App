import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';


export const Navbar = () => {
  const [cookies, setCookies] = useCookies("access_token")
  const [islogged, setIsLogged] = useState("")

  const navigate = useNavigate()

  useEffect(()=>{
    if(cookies.access_token){
      setIsLogged("logged")
    }
  },[cookies])

  const logout = () => {
    setCookies("access_token", "")
    setIsLogged("")
    window.localStorage.removeItem("userID")
    navigate("/login")
  }

  console.log(islogged)

  return (
    <div className='navbar'>
        <Link to ="/">Home</Link>
        <Link to ="/create-reciepe">Create Reciepe</Link>
        {
          islogged === "" ?
           ( 
            <>
           <Link to ="/login">Login</Link> 
           <Link to ="/register">Register</Link>
            </>
            )
          : (
            <>
               <Link to ="/saved-reciepes">Saved Reciepes</Link>
               <button onClick={logout}>Logout</button>
            </>
          )
        }
    </div>
  )
}
