import axios from "axios";

export function getAllRecipes() {
  return function (dispatch) {
    return fetch(`http://localhost:3001/recipes`)
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "GET_ALL_RECIPES", payload: json });
      });
  };
}

export function getRecipesName(name) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/recipes?name=${name}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "GET_RECIPES_NAME", payload: json });
      });
  };
}

export function getRecipe(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/recipes/${id}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "GET_RECIPE", payload: json });
      });
  };
}

export function getTypes() {
  return function (dispatch) {
    return fetch(`http://localhost:3001/types`)
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "GET_TYPES", payload: json });
      });
  };
}

export function filterByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload: payload,
  };
}

export function orderByAlphabet(payload) {
  return {
    type: "ORDER_BY_ALPHABET",
    payload: payload,
  };
}

export function orderByScore(payload) {
  return {
    type: "ORDER_BY_SCORE",
    payload: payload,
  };
}

export function addRecipe(payload) {
  return async function (dispatch) {
    const json = axios.post("http://localhost:3001/recipe", payload);
    return json;
  };
}

export function filterByApi(payload) {
  return {
    type: "FILTER_BY_API",
    payload: payload,
  };
}

export function getDishes() {
  return {
    type: "GET_DISHES",
  };
}

export function filterByDish(payload) {
  return {
    type: "FILTER_BY_DISH",
    payload: payload,
  };
}
