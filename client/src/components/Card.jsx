import React from "react";
import { Link } from "react-router-dom";

export default function Card({ id, image, name, diets, score }) {
  return (
    <div key={id}>
      <Link to={`/${id}`}>
        <img src={image} alt={name} />
      </Link>
      <h4>{`Recipe: ${name}`}</h4>
      <h4>{`Types diets: ${diets}`}</h4>
      <h4>{`Spoonacular score: ${score}`}</h4>
    </div>
  );
}
