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
      <div key={recipeId[0].id}>
        <img
          src={recipeId[0].image}
          alt={recipeId[0].name}
          width="300px"
          height="300px"
        />
        <h3>Recipe: "{recipeId[0].name}"</h3>
        {recipeId[0].dishTypes !== "" && (
          <h3>Dish types: "{recipeId[0].dishTypes}"</h3>
        )}
        <h3>
          Diet types:
          {typeof recipeId[0].diets[0] === "string"
            ? recipeId[0].diets.map((el) => el)
            : recipeId[0].diets.map((el) => el.name)}
        </h3>
        <p>Resume: "{recipeId[0].resume}"</p>
        <h3>Spoonacular score: "{recipeId[0].score}"</h3>
        <h3>Health level: "{recipeId[0].level}"</h3>
        {typeof recipeId[0].steps === "string"
          ? recipeId[0].steps
          : recipeId[0].steps.map((el) => {
              return (
                <div key={el[0]}>
                  <h3>{el[0]}</h3>
                  <h3>{el[1]}</h3>
                </div>
              );
            })}
        {console.log(recipeId[0].steps[0])}
      </div>
      <div>
        <Link to="/home">
          <button className={styles.btn}>Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
}
