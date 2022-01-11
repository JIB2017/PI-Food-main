export function getAllRecipes(filter, page) {
  return async function (dispatch) {
    const res = await fetch(`http://localhost:3001/recipes?filter=${filter}`);
    const json = await res.json();
    dispatch({ type: "GET_ALL_RECIPES", payload: json });
  };
}

export function getRecipesName(name, filter, page) {
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
    return fetch(`http://localhost:3001/${id}`)
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

export function addRecipe(payload) {
  return {
    type: "ADD_RECIPE",
    payload,
  };
}
