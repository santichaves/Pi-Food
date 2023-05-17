import React, {useEffect} from "react";
import { Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { recipeDetail } from "../../Redux/actions/actions";
import styles from "./detail.module.css"
import NavBar from "../navbar/navBar";



const Detail= ()=>{
    const params = useParams();
    const dispatch = useDispatch();
    const recipe = useSelector((state)=> state.detail)

    console.log(recipe)

    useEffect(()=>{
        dispatch(recipeDetail(params.id))
    },[dispatch,params.id]);

    console.log(recipeDetail)
    return(
        <div className={styles.container}>
            {
                 recipe 
                  ? 
                 <div >
        
        <div className={styles.nav}>
            <NavBar  />
        </div>
                    <div className={styles.image}>
                 <img src={recipe.image}/>
                 </div>
                 <div className={styles.extra}>  
                 <h1>{recipe.title}</h1>
                 <h2>Summary: {recipe.summary?.replace(/<[^>]*>/g, "")}</h2>
                 <h2>dishTypes:{recipe.dishTypes}</h2>
                 <h2>Health Score: {recipe.healthScore}</h2>
                 <h2>Instructions: {recipe.instructions?.replace(/<[^>]*>/g, "")}</h2>
                 <h3>Diets:{recipe.diets && Array.isArray(recipe.diets) ?
                     recipe.diets.map(el => el.name).join(" ,") :
                     recipe.diets
                        }
                        </h3>
                 </div>
                 </div>
                 
                : 
                <p>Loading</p>
            } 

        </div>
        

    )

}





export default Detail;