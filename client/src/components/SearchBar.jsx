import React, { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { getRecipesName } from "../redux/action";

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
      Swal.fire({
        title: 'Error!',
        text: 'It cannot be empty',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  };

  return (
    <div>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search recipe" aria-label="Search" onChange={handleChange}/>
        <button className="btn btn-outline-warning" type="submit" onClick={handleSubmit}>Search</button>
      </form>
    </div>
  );
}
