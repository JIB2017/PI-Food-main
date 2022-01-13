import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Form.module.css";
import { Link } from "react-router-dom";

function validate(input) {
  let validation = {};

  if(!input.name || input.name === "" || !/^[A-Za-z0-9\s]+$/g.test(input.name)) {
    validation.name = "Solo valores alfanuméricos, no se permiten números";
  }
  if(!input.resume || input.resume === "") {
    validation.resume = "El contenido no puede quedar vacío";
  }
  if(!input.score || input.score < 0 || input.score > 100 || !/^[1-9]\d*(\.\d+)?$/.test(input.score)) {
    validation.score = "Entrada no válida. Valor numérico de 0 a 100";
  }
  if(!input.level || input.level < 0 || input.level > 100 || !/^[1-9]\d*(\.\d+)?$/.test(input.level)) {
    validation.level = "Entrada no válida. Valor numérico de 0 a 100";
  }
  if(!input.steps || !/^[1-9]\d*(\.\d+)?$/.test(input.steps)) {
    validation.steps = "";
  }
  if(!input.types || input.types.length === 0) {
    validation.types = ""
  }
  return validation;
}

export default function Form() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [order, setOrder] = useState("");
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    resume: "",
    score: -1,
    level: -1,
    steps: "",
    types: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    )
    setOrder(`Ordenado ${e.target.value}`)
  };

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div>
      <div>
        {errors.name && <h4>{errors.name}</h4>}
        <input
          type="text"
          name="name"
          placeholder="Choose the name for your recipe"
          onChange={handleChange}
        />
        {errors.resume && <h4>{errors.resume}</h4>}
        <input
          type="text"
          name="resume"
          placeholder="Write a description for your recipe"
          onChange={handleChange}
        />
        {errors.score && <h4>{errors.score}</h4>}
        <input
          type="text"
          name="score"
          placeholder="Choose a spoonacular score"
          onChange={handleChange}
        />
        {errors.level && <h4>{errors.level}</h4>}
        <input
          type="text"
          name="level"
          placeholder="Choose the health level of your recipe"
          onChange={handleChange}
        />
        {errors.steps && <h4>{errors.steps}</h4>}
        <input
          type="text"
          name="steps"
          placeholder="Describe every steps of  your recipe"
          onChange={handleChange}
        />
        {errors.types && <h4>{errors.types}</h4>}
        <select name="" onChange={handleChange}>
          <option value="">Select the diet types</option>
          {types?.map((el) => {
            return (
              <option value="" name="types" key={el.id}>
                {el.name}
              </option>
            );
          })}
        </select>
        <button className={styles.btn} onClick={handleSubmit}>
          Create recipe
        </button>
      </div>
      <div>
        <Link to="/home">
          <button className={styles.btn}>Back to home</button>
        </Link>
      </div>
    </div>
  );
}
