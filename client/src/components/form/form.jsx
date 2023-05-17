import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { createRecipe, getDiets } from "../../Redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./form.module.css"



const Form = ()=>{

    const dispatch= useDispatch();
   
    const diets = useSelector((state)=> state.diets)

    const [checked, setChecked] = useState({})

    const [form, setForm] = useState({
        title: "",
        summary:"",
        healthScore:"",
        instructions:"",
        image:"",
        diets:[],
    })

    const [errors, setErrors] = useState({
        title: "",
        summary:"",
        healthScore:"",
        instructions:"",
        image:"",
        diets:[],
    });

    const handleChange = (e)=>{
            validate({
                     ...form,
                     [e.target.name]: e.target.value
                    })

            setForm({
            ...form,
            [e.target.name]: e.target.value
                     })     
    }

    const handleSelect = (e)=>{
      const dietId = e.target.value;
      const isChecked= e.target.checked;

      setChecked({
        ...checked,
        [dietId] : isChecked
      })
      setForm({
        ...form,
        diets: isChecked
        ? [...form.diets, dietId]
        : form.diets.filter((id)=> id !== dietId)
      })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        validate(form);
        if (Object.values(errors).some((error) => error !== "")) {
          return alert("Faltan datos");
        }
        dispatch(createRecipe(form));
        alert("Receta creada!");
        setForm({
          title: "",
          summary: "",
          healthScore: "",
          instructions: "",
          image: "",
          diets: [],
        });
      };
      

    useEffect(()=>{
        dispatch(getDiets())
    }, []);


    const validate = (form)=>{
         let newErrors = {};

         if (form.title) {
            newErrors.title = "";
          } else {
            newErrors.title = "Complete el titulo...";
          }
      
          if (!form.summary) {
            newErrors.summary = "complete el resumen...";
          } else {
            newErrors.summary = "";
          }

          if (isNaN(form.healthScore)) {
            newErrors.healthScore = "Health Score must be a number";
          } else {
            const healthScore = parseInt(form.healthScore);
            if (healthScore <= 0 || healthScore >= 100) {
              newErrors.healthScore =
                "Health score must be greater than 0 and less than 100";
            }
          }

          if (!form.instructions) {
            newErrors.instructions = "complete las instrucciones...";
          } else {
            newErrors.instructions = "";
          }

          if (!form.image) {
            newErrors.image = "ingrese una imagen...";
          } else {
            newErrors.image = "";
          }

          if (!form.diets || form.diets.length === 0) {
            newErrors.diets = "Select at least one diet";
          } else{
            newErrors.diets = "";
          }

       setErrors(newErrors) 
    }


    return(
        <>
        <div className={styles.container}>
        <div>

            <Link to="/home">
                <button className={styles.button}>Volver al Home</button> 
            </Link>
        </div>
        <h1>Crea tu receta</h1>
        <form  onSubmit={handleSubmit}>
          <div className={styles.options}>

            <div className={styles.options}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} />
            </div>
           {errors.title && <span>{errors.title}</span>}

            <div className={styles.options}>
                <label htmlFor="summary">Summary</label>
                <textarea
                name="summary"
                onChange={handleChange}
                value={form.summary}
                />
            </div>
            {errors.summary && <span>{errors.summary}</span>}
            
            <div className={styles.options}>
                <label htmlFor="healthScore">Health score</label>
                <input type="text" name="healthScore" value={form.healthScore} onChange={handleChange}/>
            </div>
            {errors.healthScore && <span>{errors.healthScore}</span>}
           
            <div className={styles.options}>
                <label htmlFor="instructions">Instructions</label>
                
                <textarea
                name="instructions"
                onChange={handleChange}
                value={form.instructions}
                />
            </div>
            {errors.instructions && <span>{errors.instructions}</span>}
            <hr />
            <label>Elige al menos una dieta</label>
            <hr />
            {diets.length ? (
              diets.map((element) => {
                return (
                  <label>
                      <input
                        type="checkbox"
                        value={element.id}
                        name={element.name}
                        onChange={handleSelect}
                        />
                      {element.name}
                    </label>
                  );
                })
                ) : (
                  <div>waiting...</div>
                  )}
            {errors.diets && <span>{errors.diets}</span>}
            
            <div className={styles.options}>
                <label htmlFor="image">image</label>
                <input type="text" name="image" value={form.image} onChange={handleChange} />
            </div>
            {errors.image && <span>{errors.image}</span>}


            <button type="submit">Crear receta</button>

                  </div>
        </form>


                </div>
        </>

    )

};

export default Form;