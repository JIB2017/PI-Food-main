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
        <h3>{recipeId.name}</h3>
        <h3>{recipeId.dishTypes}</h3>
        <h3>{recipeId.types}</h3>
        <p>{recipeId.resume}</p>
        <p>{recipeId.score}</p>
        <p>{recipeId.level}</p>
        <p>{recipeId.steps}</p>
      </div>
      <div>
        <Link to="/home">
          <button className={styles.btn}>Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
}
