import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

const Landing = () => {

 

  return (

    <div className={styles.container}>
      <div>
        <p className={styles.text}>
        Welcome to my web site realized at the stage of individual project of the educational academy SoyHenry.
         In this page, you can learn information about Recipes, as well as access to filtering
          and sorting features to facilitate your search for the information you need, enjoy it. 
          Done by Santiago Chaves.
        </p>
      </div>
      <Link to="/home">
      <button className={styles.button}>HOME</button>
      </Link>
    </div>


  )
}
export default Landing;