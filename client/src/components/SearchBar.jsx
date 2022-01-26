import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesName } from "../redux/action";
import styles from "./SearchBar.module.css";

export default function SearchBar({ setPage }) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // si el input no está vacío
    if (input !== "") {
      // si es asi despachamos
      dispatch(getRecipesName(input));
      setPage(1);
      // si no existe mando el alert
      // si el input está vacío mando el alert
    } else {
      alert("It can't be empty");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search a recipe here..."
        className={styles.searchBar}
        onChange={handleChange}
      />
      <button
        type="submit"
        className={styles.buttonSearch}
        onClick={handleSubmit}
      >
        Buscar
      </button>
    </div>
  );
}
