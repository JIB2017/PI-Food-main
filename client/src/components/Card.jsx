import React from "react";
import { Link } from "react-router-dom";

export default function Card({ id, image, name, types, score }) {
  return (
    <div key={id}>
      <Link to={`/${id}`}>
        <img src={image} alt={name} />
      </Link>
      <h4>{name}</h4>
      <p>{types}</p>
      <p>{score}</p>
    </div>
  );
}
