const {Diet} = require("../db");
const axios = require("axios");
const {API_KEY,API_KEY2,API_KEY3,API_KEY4,API_KEY5} = process.env;




const alldiets = async () => {
    const infoApiDiets = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&instructionsRequired=true&number=100`)).data.results;
  
    const diets = infoApiDiets.map(el => el.diets).flat();
    
    const vegetarian = "vegetarian";

    diets.push(vegetarian);

    const dietPromises = diets.map(ele => {
      return Diet.findOrCreate({
        where: { name: ele }
      });
    });
    
    await Promise.all(dietPromises);   
    
    const alldietsApi = await Diet.findAll();
  
    console.log(alldietsApi)
    return alldietsApi;
  };
  


module.exports = alldiets;