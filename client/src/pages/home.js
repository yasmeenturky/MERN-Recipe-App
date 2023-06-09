import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useGetUserId } from '../hooks/useGetUserId'
import {useCookies} from 'react-cookie'

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const userID = useGetUserId()
  const [savedRecipes, setSavedRecipes] = useState([])
  const [cookies, setCookies] = useCookies("access_token")

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
       const response =  await axios.get("http://localhost:8000/recipes")
       setRecipes(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSavedRecipes = async () => {
      try {
       const response =  await axios.get(`http://localhost:8000/recipes/savedRecipes/ids/${userID}`,
       {headers: {authorization : cookies.access_token}} )
       setSavedRecipes(response.data.savedRecipes)
      } catch (error) {
        console.log(error)
      }
    }
    fetchRecipe()

    if(cookies.access_token){
      fetchSavedRecipes()
    }
    
  },[userID, cookies])
  

  const saveRecipe = async (recipeID) => {
    try {
         await axios.put("http://localhost:8000/recipes",{
          recipeID, 
          userID
        },
        {headers: {authorization : cookies.access_token}}
        )
     } catch (error) {
       console.log(error)
     }
  }

  const isRecipeSaved = (id) =>savedRecipes.includes(id)
  

  return (
    <div>
 
      <h1>Recipes</h1>
      <ul>
        {
          recipes.map((recipe) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
                <button 
                onClick={() => saveRecipe(recipe._id)} 
                disabled={isRecipeSaved(recipe._id)}
                > 
              {isRecipeSaved(recipe._id) === true ? "Saved" : "Save"} 
                </button>
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

export default Home