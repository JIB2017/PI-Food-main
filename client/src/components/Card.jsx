import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card({ id, image, name, diets, score, dishes }) {
  return (
    <div className={styles.gridcontainer}>
      <div key={id}>
        <Link to={`/${id}`}>
          <img src={image} alt={name} />
        </Link>
          <h6>{`Recipe: ${name}`}</h6>
          <h6>{`Types diets: ${diets}`}</h6>
          <h6>{`Spoonacular score: ${score}`}</h6>
          <h6>{`Types of dishes: ${dishes}`}</h6>
      </div>
    </div>
  );
}
