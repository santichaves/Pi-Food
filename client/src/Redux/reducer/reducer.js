import{GET_ALL_RECIPES, FIND_RECIPE, RECIPE_DETAIL, GET_DIETS,CREATE_RECIPE,
    FILTER_BY_DIETS, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_HEALTH_SCORE,
} from "../actions/action_type"
  
  
const initialState ={
  recipes: [],
  allrecipesState: [],
  detail: [],
  diets: [],
  auxDiets:[],
}

const reducer = (state=initialState, action)=>{
  switch(action.type){

      case GET_ALL_RECIPES:
          return{
              ...state,
              recipes: action.payload,
              allrecipesState: action.payload
          };


      case FIND_RECIPE:
          return{
              ...state,
              recipes: action.payload,
          };

  case RECIPE_DETAIL:
      return{
          ...state,
          detail: action.payload
      };

      case GET_DIETS:
          return{
              ...state,
              diets: action.payload,
          }

      case FILTER_BY_DIETS:
          const allRecipes= state.allrecipesState
          let dietFilter = []
          if(action.payload.some(el=>el === "all")){
            dietFilter = allRecipes
          }else{
            for(const recipe of allRecipes){
              if(action.payload.every(el=> recipe.diets.includes(el))){
                dietFilter.push(recipe)
              }
            }}

             
          
          // const dietFilters = action.payload[0]=== "all" ? allRecipes :
          // action.payload.forEach((e)=> {
          //   allRecipes.filter(ele => ele.diets?.includes(e))  
          // } ) 

          console.log(action.payload)
          return{
          ...state,
          recipes: dietFilter,
          }

          case FILTER_BY_ORIGIN:
              const copyRecipes = state.allrecipesState
              const createdfilter = action.payload === 'bdd' ? copyRecipes.filter(el => el.createdByDb) : copyRecipes.filter(el => !el.createdByDb)
              return{
                  ...state,
                  recipes: action.payload === 'all' ? state.allrecipesState : createdfilter
              }
      
          case ORDER_BY_NAME:
              const sortedRecipes = [...state.recipes]; // hacer una copia del arreglo original
              const sortArr = action.payload === "asc"
                ? sortedRecipes.sort(function (a, b) {
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                      return -1;
                    }
                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                      return 1;
                    }
                    return 0;
                  })
                : sortedRecipes.sort(function (a, b) {
                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                      return -1;
                    }
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                      return 1;
                    }
                    return 0;
                  });
                return { 
                  ...state, 
                  recipes: sortArr 
              };

          case ORDER_BY_HEALTH_SCORE:
              const copyState = [...state.recipes]
              const orderHS = action.payload === 'des'? copyState.sort((a, b) => b.healthScore - a.healthScore)
              : copyState.sort((a, b) => a.healthScore - b.healthScore)
               return { 
                  ...state, 
                  recipes: orderHS 
              };

              case CREATE_RECIPE:
                  return {
                      ...state
                  };

          

            
      default:
          return { ...state };
  }

}




export default reducer;