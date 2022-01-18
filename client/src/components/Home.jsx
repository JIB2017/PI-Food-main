import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllRecipes,
  getDiets,
  orderByAlphabet,
  orderByScore,
  filterByDiet,
  filterByApi,
  getDishes,
  filterByDish,
} from "../redux/action";
import Card from "./Card";
import SearchBar from "./SearchBar";
import styles from "./Home.module.css";
import Pagination from "./Pagination";

export default function Home() {
  const recipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);
  const dishes = useSelector((state) => state.dishes);
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");
  // para el paginado
  const limit = 9;
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalPages = Math.ceil(recipes.length / limit);
  const pagination = recipes.slice(startIndex, endIndex);
  const arrows = {};

  if (endIndex < recipes.length) {
    arrows.next = page + 1;
  }
  if (startIndex > 0) {
    arrows.previous = page - 1;
  }

  const handleArrows = (nro) => {
    setPage(nro);
  };

  const handleDiets = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value !== "") {
      dispatch(filterByDiet(value));
    }
    setOrder(`Ordenado ${e.target.value}`);
    setPage(1);
  };

  const refresh = (e) => {
    e.preventDefault();
    dispatch(getAllRecipes());
    setPage(1);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value !== "") {
      dispatch(orderByAlphabet(value));
    }
    setOrder(`Ordenado ${e.target.value}`);
    setPage(1);
  };

  const handleScore = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value !== "") {
      dispatch(orderByScore(value));
    }
    setOrder(`Ordenado ${e.target.value}`);
    setPage(1);
  };

  const handleApi = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value !== "") {
      dispatch(filterByApi(value));
    }
    setOrder(`Ordenado ${e.target.value}`);
    setPage(1);
  };

  const handleDishes = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value !== "") {
      dispatch(filterByDish(value));
    }
    setOrder(`Ordenado ${e.target.value}`);
    setPage(1);
  };

  const paged = (nro) => {
    setPage(nro);
  };

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getDiets());
    dispatch(getDishes());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getTypes());
  // }, [dispatch]);

  return (
    <div>
      <SearchBar />
      <Link to="/form">
        <button className={styles.btncreate}>Crear receta</button>
      </Link>
      <h1>Henry Food</h1>
      <button className={styles.btn} onClick={refresh}>Refresh</button>
      <select className={styles.control} onChange={handleDiets}>
        <option value="">Select your diet</option>
        {diets?.map((el) => {
          return (
            <option value={el.name} key={el.id}>
              {el.name}
            </option>
          );
        })}
      </select>
      <select className={styles.control} onChange={handleOrder}>
        <option value="">Order by alphabet</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      <select className={styles.control} onChange={handleScore}>
        <option value="">Order by score</option>
        <option value="MIN-MAX">MIN-MAX</option>
        <option value="MAX-MIN">MAX-MIN</option>
      </select>
      <select className={styles.control} onChange={handleApi}>
        <option value="">Select the filter</option>
        <option value="API">Filter by API</option>
        <option value="DB">Filter by DB</option>
      </select>
      <select className={styles.control} onChange={handleDishes}>
        <option value="">Filter by Dish</option>
        {dishes?.map((el) => {
          return (
            <option value={el.name} key={el.id}>
              {el.name}
            </option>
          );
        })}
      </select>
      <h3>Lista de recetas</h3>
      {arrows.previous && (
        <button className={styles.btn} onClick={() => handleArrows(page - 1)}>Previous</button>
      )}
      {arrows.next && (
        <button className={styles.btn} onClick={() => handleArrows(page + 1)}>Next</button>
      )}
      {<Pagination totalPages={totalPages} page={page} paged={paged} />}
      {pagination?.map((receta) => {
        return (
          <div key={receta.id}>
            <Card
              id={receta.id}
              image={receta.image}
              name={receta.name}
              diets={
                typeof receta.diets[0] === "string"
                  ? receta.diets.map((el) => el)
                  : receta.diets.map((el) => el.name)
              }
              score={receta.score}
              key={receta.id}
            />
          </div>
        );
      })}
      {console.log(`${recipes.length}`)}
    </div>
  );
}
