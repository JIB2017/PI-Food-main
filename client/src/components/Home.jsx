import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllRecipes,
  getTypes,
  orderByAlphabet,
  orderByScore,
  filterByType,
} from "../redux/action";
import Card from "./Card";
import SearchBar from "./SearchBar";
import styles from "./Home.module.css";
// import Pagination from "./Pagination";

export default function Home() {
  const recipes = useSelector((state) => state.recipes);
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);

  const handleTypes = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value !== "") {
      dispatch(filterByType(value));
    }
    setOrder(`Ordenado ${e.target.value}`);
  };

  const refresh = (e) => {
    e.preventDefault();
    dispatch(getAllRecipes());
  };

  const handleOrder = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value !== "") {
      dispatch(orderByAlphabet(value));
    }
    setOrder(`Ordenado ${e.target.value}`);
  };

  const handleScore = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value !== "") {
      dispatch(orderByScore(value));
    }
    setOrder(`Ordenado ${e.target.value}`);
  };

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div>
      <SearchBar />
      <Link to="/form">
        <button>Crear receta</button>
      </Link>
      <h1>Henry Food</h1>
      <button onClick={refresh}>Refresh</button>
      <select onChange={handleTypes}>
        <option value="">Select your diet</option>
        {types?.map((el) => {
          return (
            <option value={el.name} key={el.id}>
              {el.name}
            </option>
          );
        })}
      </select>
      <select onChange={handleOrder}>
        <option value="">Order by alphabet</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      <select onChange={handleScore}>
        <option value="">Order by score</option>
        <option value="MIN-MAX">MIN-MAX</option>
        <option value="MAX-MIN">MAX-MIN</option>
      </select>
      <h3>Lista de recetas</h3>
      {recipes?.map((receta) => {
        return (
          <div key={receta.id}>
            <Card
              id={receta.id}
              image={receta.image}
              name={receta.name}
              types={receta.types ? receta.types : receta.types.map(el => el.name)}
              score={receta.score}
            />
          </div>
        );
      })}
      {/* {<Pagination totalPages={recipes.totalPages} page={recipes.actualPage}/>} */}
      {console.log(`${recipes.length}`)}
    </div>
  );
}
