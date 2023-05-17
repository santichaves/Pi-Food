import React , {useState} from "react";
import { useDispatch } from "react-redux";
import { getRecipeByTitle } from "../../Redux/actions/actions";
import styles from "./searchBar.module.css"


const SearchBar = ()=>{

    const dispatch= useDispatch();

    const [title, setTitle] = useState("");

    const handleInputChange = (e)=>{
        e.preventDefault();
        setTitle(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(getRecipeByTitle(title));
        setTitle("");
    }

    return(
        <div className={styles.searchbar}>
        <input type="text" placeholder="Search..." value={title}  onChange={(e)=>handleInputChange(e)} />
        <button type="submit" onClick={(e)=>handleSubmit(e)} className={styles.button}>Search</button>
        </div>
    )

}




export default SearchBar;