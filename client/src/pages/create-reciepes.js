import React, { useState } from 'react'
import axios from 'axios'
import { useGetUserId } from '../hooks/useGetUserId'
import {useNavigate} from 'react-router-dom'
import { useCookies } from 'react-cookie'

const CreateReciepes = () => {
  const userID = useGetUserId()
  const [recipe, setRecipe] = useState({
    name:"",
    ingredients:[],
    instructions:"",
    imageUrl:"",
    cookingTime:0,
    userOwner:userID
  })
  const navigate = useNavigate()
  const [cookies, setCookies] = useCookies("access_token")

  const handleChange = (event) => {
      const {name, value} = event.target
      setRecipe({...recipe, [name]: value})
  }

  const handleIngredientChange = (event, index) => {
    const {value} = event.target
    const ingredients = recipe.ingredients
    ingredients[index] = value
    setRecipe({...recipe, ingredients})
  }
  
  const addIngredient = (event) => {
    setRecipe({...recipe, ingredients: [...recipe.ingredients,""]})
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post("http://localhost:8000/recipes/create-reciepe", recipe,
      {headers: {authorization : cookies.access_token}})
      navigate('/')      
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className='create-recipe'>
      <h2> Create Reciepe </h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>Name </label>
        <input type='text' id='name' name="name" onChange={handleChange}/>
        <label htmlFor='ingredients' >Ingredients </label>
        {recipe.ingredients.map((ingredient, index) => (
          <input key={index} type='text' id='ingredients' name="ingredients" value={ingredient} onChange={(event) => handleIngredientChange(event, index)}/>
        ) )}
        <button onClick={addIngredient} type='button'>Add Ingredient</button>

        <label htmlFor='instructions'>Instructions </label>
        <textarea type='text' id='instructions' name="instructions" onChange={handleChange}/>
        <label htmlFor='imageUrl'>Image Url </label>
        <input type='text' id='imageUrl' name="imageUrl" onChange={handleChange}/>
        <label htmlFor='cookingTime'>Cooking Time (minutes)</label>
        <input type='text' id='cookingTime' name="cookingTime" onChange={handleChange}/>

        <button  type='submit'>Create Recipe</button>

      </form>
    </div>
  )
}

export default CreateReciepes