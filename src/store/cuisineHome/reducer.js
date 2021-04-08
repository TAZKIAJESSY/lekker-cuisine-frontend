const initialState = {
  cuisines: [],
};

export default function cuisineHomeReducer(state = initialState, action) {
  switch (action.type) {
    case "cuisineHome/allCuisineFetched": {
      return {
        cuisines: action.payload,
      };
    }
    case "cuisineHome/cuisineLiked": {
      const newArray = [...state.cuisines]; //making a new array

      // console.log("id to update: ", action.payload);

      const index = state.cuisines.findIndex((c) => c.id === action.payload.id); //finding index of the item
      //update here the likes for a  cuisine
      newArray[index].likes = action.payload.likes;

      return {
        ...state,
        cuisines: newArray,
      };
    }
    default: {
      return state;
    }
  }
}
