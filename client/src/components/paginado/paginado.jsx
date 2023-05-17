import React from "react";
import styles from './paginado.module.css'

const Paginado = ({recipePerPage, allRecipes, paginado })=>{
const pageNumbers = [];

for(let i = 0; i<=Math.ceil(allRecipes/recipePerPage-1); i++){
    pageNumbers.push(i+1)
}

return (
    <nav>
        <div className={styles.pagination}>
            { pageNumbers && pageNumbers.map(num => {
               return <button key={num}  onClick={()=>paginado(num)}> {num} </button>
            }) }
        </div>
    </nav>
  )

        }



export default Paginado;