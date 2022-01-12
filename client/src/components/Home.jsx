import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllRecipes,
  getTypes,
  orderByAlphabet,
  orderByScore,
} from "../redux/action";
import Card from "./Card";
import SearchBar from "./SearchBar";
// import Pagination from "./Pagination";

export default function Home() {
  const recipes = useSelector((state) => state.recipes);
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  // const [state, setState] = useState("");

  const handleTypes = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value !== "") {
      dispatch(getAllRecipes(value, recipes.actualPage));
    }
  };

  const handleOrder = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value !== "") {
      dispatch(orderByAlphabet(value, recipes.actualPage));
    }
  };

  const handleScore = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value !== "") {
      dispatch(orderByScore(value, recipes.actualPage));
    }
  };

  useEffect(() => {
    dispatch(getAllRecipes(type, page));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div>
      <SearchBar />
      <h1>Henry Food</h1>
      <h3>Lista de recetas</h3>
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
      {recipes.results?.map((receta) => {
        return (
          <div key={receta.id}>
            <Card
              id={receta.id}
              image={receta.image}
              name={receta.name}
              types={receta.types}
              key={receta.id}
            />
          </div>
        );
      })}
      {/* {<Pagination totalPages={recipes.totalPages} page={recipes.actualPage}/>} */}
      {console.log(`${recipes.totalPages} ${recipes.actualPage}`)}
    </div>
  );
}
