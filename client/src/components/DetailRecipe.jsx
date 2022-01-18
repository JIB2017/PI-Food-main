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
          <p>Recipe: "{recipeId[0].name}"</p>
          {recipeId[0].dishTypes !== "" && (
            <p>Dish types: "{recipeId[0].dishTypes}"</p>
          )}
          <p>
            Diet types:
            {typeof recipeId[0].diets[0] === "string"
              ? recipeId[0].diets.map((el) => el)
              : recipeId[0].diets.map((el) => el.name)}
          </p>
          <p>Resume: "{recipeId[0].resume}"</p>
          <p>Spoonacular score: "{recipeId[0].score}"</p>
          <p>Health level: "{recipeId[0].level}"</p>
          {typeof recipeId[0].steps === "string"
            ? recipeId[0].steps
            : recipeId[0].steps.map((el) => {
                return (
                  <div key={el[0]}>
                    <p>{el[0]}</p>
                    <p>{el[1]}</p>
                  </div>
                );
              })}
          {console.log(recipeId[0].steps[0])}
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
