const {Recipe,Diet} = require("../db");
const { Op } = require("sequelize");
const  axios = require("axios");
require("dotenv").config();


const searchRecipeName = async (title) => {

   const dbRecipes = await Recipe.findAll({where: {title:{[Op.iLike]:`%${title}%`},},});
 
   
   const infoApiRecipe = await axios
     .get(
       `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&instructionsRequired=true&number=100&title=${title}`
     )
     .then((response) =>
       response.data.results
         .filter((recipe) => recipe.title.toLowerCase().includes(title.toLowerCase()))
         .map((ele) => {
           return {
            id: ele.id,
            title: ele.title,
            image: ele.image,
            summary: ele.summary,
            healthScore: ele.healthScore,
            instructions: ele.instructions,
            dishTypes: ele.dishTypes.join(" ,"),
            created: false,
            diets: ele.diets.join(" ,"),
           };
         })
     );
 
   return [...dbRecipes, ...infoApiRecipe];
 };
 

const getAllRecipes = async()=>{

const dbRecipes= await Recipe.findAll({
   include : {
     model : Diet,
     attributes : ["name"],
    through:{
       attributes:[]
     }
   }
 });
 const dbInfo= dbRecipes.map(elem =>{
  return{
    id:elem.id,
    title:elem.title,
    image:elem.image,
    summary:elem.summary,
    healthScore:elem.healthScore,
    instructions:elem.instructions,
    diets: elem.diets.map(el=>el.name).join(" ,"),
    createdByDb:true,
  }
 })


   const infoApiRecipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY2}&addRecipeInformation=true&instructionsRequired=true&number=100`)
 
   .then(response => response.data.results.map((ele)=>{
    return{
        id: ele.id,
        title: ele.title,
        image: ele.image,
        summary: ele.summary,
        healthScore: ele.healthScore,
        instructions: ele.instructions,
        dishTypes: ele.dishTypes.join(" ,"),
        created: false,
        diets: ele.diets.join(" ,"),

       
   }
  }))   

   return [...dbInfo, ...infoApiRecipe]

};

const getRecipeById = async (id, location)=>{

   if(location === 'api'){
       
    const apiRecipe= await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`)
   .then((response)=>{
       const ele = response.data;
       return {
        id: ele.id,
        title: ele.title,
        image: ele.image,
        summary: ele.summary,
        healthScore: ele.healthScore,
        instructions: ele.instructions,
        dishTypes: ele.dishTypes.join(" ,"),
        created: false,
        diets: ele.diets.join(" ,"),
       }
   })
   return apiRecipe;
   } else{
    const recipe = await Recipe.findByPk(id, {
      include:{
        model : Diet,
        attributes : ["name"],
        through:{
          attributes:[]
        }
    }});

     if (!recipe) {
       throw new Error(`No se encontró ninguna receta con ID ${id}`);
     }
     return recipe;
     
   }
};


const createNewRecipe =async(title,image,summary,healthScore, instructions)=>{

   const newRecipe = await Recipe.create({title, image, summary, healthScore, instructions})

   return newRecipe;
}



module.exports = {
   getAllRecipes,
   getRecipeById,
   searchRecipeName,
   createNewRecipe
}