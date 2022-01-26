import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDiets, addRecipe } from "../redux/action";
import styles from "./Form.module.css";

function validate(input) {
  let validation = {};

  if (!input.name || input.name === "" || !/^([^0-9]*)$/g.test(input.name)) {
    validation.name = "No se permiten números";
  }
  if (!input.resume || input.resume === "") {
    validation.resume = "El contenido no puede quedar vacío";
  }
  if (
    !input.score ||
    input.score < 0 ||
    input.score > 100 ||
    !/^[1-9]\d*(\.\d+)?$/.test(input.score)
  ) {
    validation.score = "Entrada no válida. Valor numérico de 0 a 100";
  }
  if (
    !input.level ||
    input.level < 0 ||
    input.level > 100 ||
    !/^[1-9]\d*(\.\d+)?$/.test(input.level)
  ) {
    validation.level = "Entrada no válida. Valor numérico de 0 a 100";
  }
  if (
    !input.steps ||
    input.steps === "" ||
    !/^[A-Za-z0-9\s]+$/g.test(input.steps)
  ) {
    validation.steps = "Solo valores alfanuméricos";
  }
  if (!input.diets || input.diets.length <= 1) {
    validation.diets = "Debe Ingresar al menos 2 tipos de dieta";
  }
  return validation;
}

export default function Form() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const [order, setOrder] = useState("");
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    resume: "",
    score: -1,
    level: -1,
    steps: "",
    diets: [],
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    // e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setOrder(`Ordenado ${e.target.value} + ${order}`);
  };

  const handleDiets = (e) => {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value],
    });
    setOrder(`Ordenado ${e.target.value} + ${order}`);
  };
  const handleDelete = (e) => {
    // e.preventDefault();
    setInput({
      ...input,
      diets: input.diets.filter((t) => t !== e.target.value),
    });
    setOrder(`Ordenado ${e.target.value} + ${order}`);
  };

  const handleSubmit = () => {
    // e.preventDefault();
    if (Object.keys(errors).length === 0) {
      dispatch(addRecipe(input));
      alert("Felicidades! Has construido un castillo");
      setInput({
        name: "",
        resume: "",
        score: -1,
        level: -1,
        steps: "",
        diets: [],
      });
      navigate("/home")
    } else {
      alert("Todos los campos tienen que estar completos");
    }

  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);
  
  return (
    <div>
      <div>
        <h1>Form</h1>
      </div>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* NOMBRE DE LA RECETA */}
          {errors.name && <h4>{errors.name}</h4>}
          <input
            type="text"
            name="name"
            placeholder="Choose the name for your recipe"
            className={styles.control}
            onChange={handleChange}
          />
          {/* RESÚMEN DE LA RECETA */}
          {errors.resume && <h4>{errors.resume}</h4>}
          <input
            type="text"
            name="resume"
            placeholder="Write a description for your recipe"
            className={styles.control}
            onChange={handleChange}
          />
          {/* PUNTUACIÓN */}
          {errors.score && <h4>{errors.score}</h4>}
          <input
            type="text"
            name="score"
            placeholder="Choose a spoonacular score"
            className={styles.control}
            onChange={handleChange}
          />
          {/* NIVEL DE SALUD */}
          {errors.level && <h4>{errors.level}</h4>}
          <input
            type="text"
            name="level"
            placeholder="Choose the health level of your recipe"
            className={styles.control}
            onChange={handleChange}
          />
          {/* EL PASO A PASO DE LAS RECETAS */}
          {errors.steps && <h4>{errors.steps}</h4>}
          <input
            type="text"
            name="steps"
            placeholder="Describe every steps of your recipe"
            className={styles.control}
            onChange={handleChange}
          />
          {/* LISTA DE LOS TIPOS DE DIETA */}
          {errors.diets && <h4>{errors.diets}</h4>}
          <select className={styles.select} onChange={handleDiets}>
            <option value="">Select the diet types</option>
            {diets?.map((el) => {
              return (
                <option value={el.name} name="types" key={el.id}>
                  {el.name}
                </option>
              );
            })}
          </select>
          {/* BOTÓN DE SUBMIT */}
          <button type="submit" className={styles.btnSubmit}>
            Create recipe
          </button>
        </form>
      </div>
      {/* DIETAS QUE EL USUARIO VA AGREGANDO */}
      {input.diets?.map((el) => {
        return (
          <div>
            <h5>{el}</h5>
            <button className={styles.delete} onClick={(el) => handleDelete(el)}>X</button>
          </div>
        );
      })}
      {/* BOTÓN PARA VOLVER AL HOME */}
      <div>
        <Link to="/home">
          <button className={styles.btn}>Back to home</button>
        </Link>
      </div>
    </div>
  );
}
