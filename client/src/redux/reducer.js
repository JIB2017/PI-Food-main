const initialState = {
  recipes: [],
  auxRecipes: [],
  types: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_RECIPES":
      return {
        ...state,
        recipes: action.payload,
      };
      case "GET_RECIPES_NAME":
        return {
          ...state,
          auxRecipes: action.payload,
        }
      case "GET_RECIPE":
        return {
          ...state,
          auxRecipes: action.payload,
        }
      case "GET_TYPES":
        return {
          ...state,
          types: action.payload,
        }
        case "ADD_RECIPE":
          return {
            
          }
    default:
      return state;
  }
}
