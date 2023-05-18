import{
    GET_ALL_RECIPES,
    FIND_RECIPE,
    RECIPE_DETAIL,
    GET_DIETS,
    FILTER_BY_DIETS,
    FILTER_BY_ORIGIN,
    ORDER_BY_NAME,
    ORDER_BY_HEALTH_SCORE
} from './action_type'

import axios from "axios"

export const getAllRecipes = ()=>{
    return async function(dispatch){

        const json = await axios.get("/recipe")
        const data = json.data;
        console.log(json.data)
     return dispatch({type: GET_ALL_RECIPES, payload: data})
    }
}

//////////////////////////////////////////////////////////////////////////

export const getRecipeByTitle = (title)=>{
return async function(dispatch){
    try{
        const json = await axios.get(`/recipe?title=${title}`)
        const data = json.data;
        
        return dispatch({type: FIND_RECIPE,
             payload: data})
    } catch(error){
        return alert("error")
    }
}

}

/////////////////////////////////////////////////////////////////////////////////////

export const recipeDetail = (id)=>{
    return async function(dispatch){
        try{

            const json = await axios.get(`/recipe/${id}`);
            const data = json.data;
            return dispatch({type: RECIPE_DETAIL, payload: data})
        }catch(error){
            return alert(error.message)
        }

    }

}

/////////////////////////////////////////////////////////////////////

export const getDiets = ()=>{
    return async function(dispatch){
        const json= await axios.get("/diet");
        const data = json.data;
        return dispatch({type: GET_DIETS, payload: data})
    }
};

////////////////////////////////////////////////////////////////////

export const createRecipe = (payload)=>{
    return async function(dispatch){
        
     const data = await axios.post("/recipe", payload)
         return data;   
    }

};

////////////////////////////////////////////////////////////

export const filterByDiets = (payload)=>{
    //console.log(payload)
return{
    type: FILTER_BY_DIETS,
    payload
}
}

////////////////////////////////////////////////////////

export const filterByOrigin = (payload)=>{
   // console.log(payload)
    return{
        type: FILTER_BY_ORIGIN,
        payload
    }
}

///////////////////////////////////////////////////

export const orderByName = (payload)=>{
    console.log(payload)
return {
    type: ORDER_BY_NAME,
    payload
}
}

////////////////////////////////////////////////

export const orderByHealthScore = (payload)=>{
    return{
        type: ORDER_BY_HEALTH_SCORE,
        payload
    }
}