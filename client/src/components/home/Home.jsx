import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, filterByDiets, orderByName, filterByOrigin, orderByHealthScore} from "../../Redux/actions/actions";
import NavBar from "../navbar/navBar";
import Card from "../card/card";
import Paginado from "../paginado/paginado";
import SearchBar from "../searchBar/searchBar";
import styles from "./Home.module.css"



const Home = ()=> {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=> state.recipes)
    const [currentPage, setCurrentPage] = useState(1);
    const [recipePerPage, setRecipePerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipePerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    const [currentDiet, setCurrentDiet]= useState([])

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }
    

    useEffect(()=>{
        dispatch(getAllRecipes())
    }, [dispatch])



   const handleClick = (e)=>{
    setCurrentDiet([])
    dispatch(getAllRecipes(e))
   }

const handleFilterDiet = (event)=>{
    event.preventDefault();
    if (!currentDiet.includes(event.target.value)) {
        let arr= currentDiet
        arr.push(event.target.value);       
        setCurrentDiet(arr)
        dispatch(filterByDiets(arr)); 
        if(event.target.value === "all"){
            console.log(currentDiet);
            setCurrentDiet([])
            console.log("AHHHHH")
        } 
      }
setCurrentPage(1)
}


const handleOrderByName =(e)=>{
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
}


const handleFilterByOrigin = (e)=>{
    dispatch(filterByOrigin(e.target.value))
    setCurrentPage(1)
}

const handleOrderByHs =(e)=>{
    dispatch(orderByHealthScore(e.target.value))
    setCurrentPage(1)
}

const handleNextPage = () => {
    const totalPages= Math.ceil(allRecipes.length / recipePerPage)
    if(currentPage < totalPages)
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

 return (
<>
<div className={styles.container}>

<div>
    <NavBar/>
</div>
    
        

    <div>
    <button onClick={e=> {handleClick(e)}}className={styles.reload} >Reload recipe</button>   
</div>
<div className={styles.order}>
        <h3  className={styles.srch}>Order by name</h3>
    <select onChange={handleOrderByName}>
    <option value="">Order by name</option>
        <option value="asc">Order from A to Z</option>
        <option value="des">Order from Z to A</option>
    </select>
    </div>
    <div className={styles.order}>
        <h3 className={styles.srch}>Orden by HealthScore</h3>
        <select onChange={handleOrderByHs}>
        <option value="">Orden by HealthScore</option>
        <option value="asc">From lower to higher</option>
        <option value="des">From higher to lower</option>
        </select> 
    </div>
<div className={styles.order} >
    <h3 className={styles.srch}>Search your recipe</h3>   
    <SearchBar className={styles.searchbar} />
        </div> 
    <div className={styles.order}>
        <h3 className={styles.srch}>Filter by diets</h3>
        <select onChange={handleFilterDiet}>
            <option value="all">All</option>
            <option value="gluten free">gluten free</option>
            <option value="dairy free">dairy free</option>
            <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
            <option value="vegan">vegan</option>
            <option value="vegetarian">vegetarian</option>
            <option value="paleolithic">paleolithic</option>
            <option value="primal">primal</option>
            <option value="whole 30">whole 30</option>
            <option value="pescatarian">pescatarian</option>
            <option value="ketogenic">ketogenic</option>
            <option value="fodmap friendly">fodmap friendly</option>
        </select>
        {currentDiet.length > 0 &&
          currentDiet.map((filter, index) => (
            <span key={index}>
              · {filter}
            </span>
          ))}
    </div>
    <div className={styles.order}>
        <h3 className={styles.srch}>Order by origin</h3>
        <select onChange={handleFilterByOrigin}>
            <option value="all">all</option>
            <option value="api">Recipes from api</option>
            <option value="bdd">Recipes created</option>
        </select>
    </div>
    <div >
      <p className={styles.page}>Actual page: {currentPage}</p>
    <Paginado    recipePerPage={recipePerPage}    allRecipes={allRecipes.length}    paginado={paginado}    />
     <div className={styles.pagination}>

      <button onClick={handlePrevPage}>Previous Page</button>
      <button onClick={handleNextPage}>Next Page</button>
     </div>
    </div>

    <div className={styles.cartas}>
        {
          currentRecipes?.map((r) => (
            <Card key={r.id} title={r.title} image={r.image} diets={r.diets} id={r.id} dishTypes={r.dishTypes} healthScore={r.healthScore}/>
          ))
          
        }
    </div>

    <div >
    <div >
      <p className={styles.page}>Actual page: {currentPage}</p>
    <Paginado    recipePerPage={recipePerPage}    allRecipes={allRecipes.length}    paginado={paginado}    />
     <div className={styles.pagination}>

      <button onClick={handlePrevPage}>Previous Page</button>
      <button onClick={handleNextPage}>Next Page</button>
     </div>
    </div>
    </div>
</div>
</>
 )
}




export default Home;