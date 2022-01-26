import axios from "axios";

export function getAllRecipes() {
  return function (dispatch) {
    try {
      return fetch(`http://localhost:3001/recipes`)
        .then((res) => res.json())
        .then((json) => {
          dispatch({ type: "GET_ALL_RECIPES", payload: json });
        });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getRecipesName(name) {
  return function (dispatch) {
    try {
      return fetch(`http://localhost:3001/recipes?name=${name}`)
        .then((res) => res.json())
        .then((json) => dispatch({ type: "GET_RECIPES_NAME", payload: json }));
    } catch (error) {
      console.error(error);
    }
  };
}

export function getRecipe(id) {
  return function (dispatch) {
    try {
      return fetch(`http://localhost:3001/recipes/${id}`)
        .then((res) => res.json())
        .then((json) => {
          dispatch({ type: "GET_RECIPE", payload: json });
        });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getDiets() {
  return function (dispatch) {
    try {
      return fetch(`http://localhost:3001/diets`)
        .then((res) => res.json())
        .then((json) => {
          dispatch({ type: "GET_DIETS", payload: json });
        });
    } catch (error) {
      console.error(error);
    }
  };
}

export function filterByDiet(payload) {
  try {
    return {
      type: "FILTER_BY_DIET",
      payload: payload,
    };
  } catch (error) {
    console.error(error);
  }
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
    try {
      const res = await axios.post("http://localhost:3001/recipe", payload);
      return res;
    } catch (error) {
      console.error(error);
    }
  };
}

export function filterByApi(payload) {
  return {
    type: "FILTER_BY_API",
    payload: payload,
  };
}

export function getDishes() {
  return function (dispatch) {
    try {
      fetch("http://localhost:3001/dishes")
        .then((res) => res.json())
        .then((json) => {
          dispatch({
            type: "GET_DISHES",
            payload: json,
          });
        });
    } catch (error) {
      console.error(error);
    }
  };
}

export function filterByDish(payload) {
  return {
    type: "FILTER_BY_DISH",
    payload: payload,
  };
}
