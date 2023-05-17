import React from "react";
import styles from "./NavBar.module.css"
import { NavLink } from "react-router-dom";

const NavBar = () => {

 

  return (

    <div className={styles.container}>
      <NavLink to="/create" className={styles.link}>
        <div className={styles.div}>Create </div>
      </NavLink>

      <div className={styles.logo}>
        <NavLink to="/home"
        >
          {" "}
          
          <img
            className={styles.img} src="https://i.pinimg.com/564x/c2/18/cb/c218cb4c24aa0dee2b5a18aa33434ede.jpg"
            alt="image" />
        </NavLink>
      </div> 

    </div>



  )

}
export default NavBar;
