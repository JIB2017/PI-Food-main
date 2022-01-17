import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTypes, addRecipe } from "../redux/action";
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
  if (!input.steps || !/^[A-Za-z0-9\s]+$/g.test(input.steps)) {
    validation.steps = "Solo valores alfanuméricos";
  }
  if (!input.types || input.types.length === 0) {
    validation.types = "Debe Ingresar al menos 2 tipos de dieta";
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
    );
    setOrder(`Ordenado ${e.target.value}`);
  };

  const handleTypes = (e) => {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
    setOrder(`Ordenado ${e.target.value}`);
    console.log(input.types);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      types: input.types.filter((t) => t !== e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRecipe(input));
  };

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div>
      <div>
        <h1>Form</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
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
            placeholder="Describe every steps of your recipe"
            onChange={handleChange}
          />
          {errors.types && <h4>{errors.types}</h4>}
          <select name="" onChange={handleTypes}>
            <option value="">Select the diet types</option>
            {types?.map((el) => {
              return (
                <option value={el.name} name="types" key={el.id}>
                  {el.name}
                </option>
              );
            })}
          </select>
          <button type="submit" className={styles.btnSubmit}>
            Create recipe
          </button>
        </form>
      </div>
      <div>
        <Link to="/home">
          <button className={styles.btn}>Back to home</button>
        </Link>
      </div>
    </div>
  );
}
