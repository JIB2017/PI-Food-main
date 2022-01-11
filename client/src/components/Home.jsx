import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllRecipes,
  // getRecipesName,
  // getRecipe,
  // getTypes,
  // addRecipe,
} from "../redux/action";
import Card from "./Card";
// import Pagination from "./Pagination";

export default function Home() {
  const recipes = useSelector((state) => state.recipes);
  // const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes("All"));
  }, [dispatch]);

  return (
    <div>
      <h1>Henry Food</h1>
      <h3>Lista de recetas</h3>
      {/* {<Pagination totalPages={recipes.totalPages} page={recipes.actualPage}/>} */}
      {console.log(`${recipes.totalPages} ${recipes.actualPage}`)}
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
    </div>
  );
}
