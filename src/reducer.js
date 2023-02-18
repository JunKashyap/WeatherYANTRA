export const initialState = {
  marked_fav: [],
  curr_Location:[]
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FAV_LOCATION":
        const newlocation = [...state.marked_fav]
        for(let i = 0; i<newlocation.length; i++){
            if(newlocation[i].id === action.values.id){
                return {...state}
            }
        }
        newlocation.push(action.values)
        return {...state, marked_fav : newlocation}
    case "ADD_CURR_LOCATION":
      return { ...state, curr_Location: [action.values] };
    case "REMOVE_FROM_FAV":
        let newFav = [...state.marked_fav];
        console.log(action.id);
        for(let i = 0; i<newFav.length; i++){
            if(newFav[i].id === action.values){
                newFav.splice(i, 1);
                break;
            }
        }
        return {...state, marked_fav : newFav}
    default:
      return { ...state };
  }
};

export default reducer;
