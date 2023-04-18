import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useGetUserId } from '../hooks/useGetUserId'
import { useCookies } from 'react-cookie'

const SavedReciepes = () => {
  const userID = useGetUserId()
  const [savedRecipes, setSavedRecipes] = useState([])
  const [cookies, setCookies] = useCookies("access_token")
  

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
       const response =  await axios.get(`http://localhost:8000/recipes/savedRecipes/${userID}`,
       {headers: {authorization : cookies.access_token}}
       )
       setSavedRecipes(response.data.savedRecipes)
      } catch (error) {
        console.log(error)
      }
    }
    fetchRecipes()
  },[userID])
  

  
  return (
    <div>
 
    <h1>Saved Recipes</h1>
    <ul>
      {
        savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <div className='instructions'>
                <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name}/>
            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
          </li>
        ))
      }
    </ul>
  </div>
  )
}

export default SavedReciepes