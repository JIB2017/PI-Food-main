import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipe } from "../redux/action";
import styles from "./DetailRecipe.module.css";
import { Link } from "react-router-dom";

export default function DetailRecipe() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipeId = useSelector((state) => state.auxRecipes);

  useEffect(() => {
    dispatch(getRecipe(id));
  }, [dispatch, id]);

  return (
    <div>
      <div className={styles.containerDog}>
        <div key={recipeId[0].id}>
          <img
            className={styles.imgContainer}
            src={recipeId[0].image}
            alt={recipeId[0].name}
            width="300px"
            height="300px"
          />
          <h5>Recipe: "{recipeId[0].name}"</h5>
          {recipeId[0].dishTypes !== "" && (
            <h5>Dish types: "{recipeId[0].dishTypes}"</h5>
          )}
          <h5>
            Types of diets:
            {recipeId[0].diets.length > 0
              ? typeof recipeId[0].diets[0] === "string"
                ? recipeId[0].diets.map((el) => el)
                : recipeId[0].diets.map((el) => el.name)
              : "No data provided"}
          </h5>
          <p>Resume: "{recipeId[0].resume}"</p>
          <h5>Spoonacular score: "{recipeId[0].score}"</h5>
          <h5>Health level: "{recipeId[0].level}"</h5>
          {typeof recipeId[0].steps === "string"
            ? recipeId[0].steps
            : recipeId[0].steps.map((el) => {
                return (
                  <div key={el[0]}>
                    <h5>Step {el[0]}:</h5>
                    <h5>{el[1]}</h5>
                  </div>
                );
              })}
          {console.log(recipeId[0])}
        </div>
      </div>
      <div>
        <Link to="/home">
          <button className={styles.btn}>Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
}
