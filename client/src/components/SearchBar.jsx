import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesName } from "../redux/action";
// import styles from "";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    console.log(e.target.value)
  };

  const handleSubmit = (e) => {
      e.preventDefault();
    if (input !== "") {
      dispatch(getRecipesName(input));
    } else {
      alert("No puede estar vacío");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search a recipe here..."
        className=""
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>
        Buscar
      </button>
    </div>
  );
}
