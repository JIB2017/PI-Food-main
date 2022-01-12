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
    case "FILTER_BY_TYPE":
      let filtered = state.recipes.results.filter((el) =>
        el.types.includes(action.payload)
      );
      return {
        ...state,
        recipes: filtered,
      };
    case "ORDER_BY_ALPHABET":
      let ordering =
        action.payload === "A-Z"
          ? state.recipes.results.sort((a, b) => {
              return a.name - b.name;
            })
          : state.recipes.results.sort((a, b) => {
              return b.name - a.name;
            });
      return {
        ...state,
        recipes: ordering,
      };
    case "ORDER_BY_SCORE":
      let ordering2 =
        action.payload === "MIN-MAX"
          ? state.recipes.results.sort((a, b) => {
              if (a.score > b.score) return 1;
              if (b.score > a.score) return -1;
              return 0;
            })
          : state.recipes.results.sort((a, b) => {
              if (a.score > b.score) return -1;
              if (b.score > a.score) return 1;
              return 0;
            });
      return {
        ...state,
        recipes: ordering2,
      };
    case "ADD_RECIPE":
      return {
        auxRecipes: action.payload,
      };
    default:
      return state;
  }
}
