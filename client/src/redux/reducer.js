const initialState = {
  recipes: [],
  auxRecipes: [],
  refresh: [],
  favourites: [],
  types: [],
  dishes: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        auxRecipes: action.payload,
        refresh: action.payload,
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
      let filtered = state.recipes.filter((el) =>
        el.types.includes(action.payload)
      );
      return {
        ...state,
        recipes: filtered,
      };
    case "ORDER_BY_ALPHABET":
      let ordering =
        action.payload === "A-Z"
          ? state.recipes.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        auxRecipes: ordering,
      };
    case "ORDER_BY_SCORE":
      let ordering2 =
        action.payload === "MIN-MAX"
          ? state.recipes.sort((a, b) => {
              if (a.score > b.score) return 1;
              if (b.score > a.score) return -1;
              return 0;
            })
          : state.recipes.sort((a, b) => {
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
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case "FILTER_BY_API":
      let filter =
        action.payload === "API"
          ? state.auxRecipes.filter((el) => !el.createdByUser)
          : state.auxRecipes.filter((el) => el.createdByUser);
      return {
        ...state,
        recipes: filter,
      };
    case "GET_DISHES":
      return {
        ...state,
        dishes: action.payload,
      };
    case "FILTER_BY_DISH":
      let dish = state.recipes.filter((el) =>
        el.dishTypes.includes(action.payload)
      );
      return {
        ...state,
        favourites: dish,
      };
    default:
      return state;
  }
}
