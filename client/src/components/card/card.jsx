import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css"



const Card = ({image, title, diets, id, dishTypes,healthScore})=>{
    console.log(dishTypes)
return(
    <Link to={`/detail/${id}`} className={styles.container}>
    <div >
        <div className={styles.card}>

         <h1>Tittle: {title}</h1>
        <h2>Diets: {diets}</h2>
         <h3>Healthscore: {healthScore}</h3>
        <h2>DishTypes: {dishTypes}
        </h2>
        </div>

        <div>
            <img src={image} alt="img" className={styles.img}/>
        </div>
    </div>
    </Link>
)

};


export default Card;