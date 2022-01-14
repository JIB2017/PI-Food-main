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
      <div key={recipeId.id}>
        <img src={recipeId.image} alt={recipeId.name} width="300px" height="300px"/>
        <h3>Recipe: "{recipeId.name}"</h3>
        <h3>Dish types: "{recipeId.dishTypes}"</h3>
        <h3>Diet types: "{recipeId.types}"</h3>
        <p>Resume: "{recipeId.resume}"</p>
        <p>Spoonacular score: "{recipeId.score}"</p>
        <p>Health level: "{recipeId.level}"</p>
        <p>Steps: "{recipeId.steps[0][0]}"</p>
        {console.log(recipeId.steps)}
        {console.log(recipeId.steps[0][0])}
      </div>
      <div>
        <Link to="/home">
          <button className={styles.btn}>Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
}
