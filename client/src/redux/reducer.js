const initialState = {
  recipes: [],
  auxRecipes: [],
  types: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        auxRecipes: action.payload,
      };
    case "GET_RECIPES_NAME":
      return {
        ...state,
        recipes: action.payload,
      };
    case "GET_RECIPE":
      return {
        ...state,
        auxRecipes: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "ORDER_BY_ALPHABET":
      let aux = state.recipes;
      let ordering =
        action.payload === "A-Z"
          ? aux.sort((a, b) => {
              if (a.results.name > b.results.name) return 1;
              if (b.results.name > a.results.name) return -1;
              return 0;
            })
          : aux.sort((a, b) => {
              if (a.results.name > b.results.name) return -1;
              if (b.results.name > a.results.name) return 1;
              return 0;
            });
      return {
        ...state,
        auxRecipes: ordering,
      };
    case "ORDER_BY_SCORE":
      let aux = state.auxRecipes;
      let ordering =
        action.payload === "MIN-MAX"
          ? aux.sort((a, b) => {
              if (a.results.score > b.results.score) return 1;
              if (b.results.score > a.results.score) return -1;
              return 0;
            })
          : aux.sort((a, b) => {
              if (a.results.score > b.results.score) return -1;
              if (b.results.score > a.results.score) return 1;
              return 0;
            });
      return {
        ...state,
        auxRecipes: ordering,
      };
    case "ADD_RECIPE":
      return {
        auxRecipes: action.payload,
      };
    default:
      return state;
  }
}
