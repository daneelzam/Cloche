import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  nameOfDish: String,
  linkToRecipe: String,
  recipe: String,
  ingredients: String,
});

const Recipe = model('Recipe', recipeSchema);

export default Recipe;