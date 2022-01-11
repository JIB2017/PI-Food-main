import React from "react";

export default function Card(id, image, name, types) {
  return (
    <div key={id}>
      <img src={image} alt="name" />
      <h4>{name}</h4>
      <p>{types}</p>
    </div>
  );
}
