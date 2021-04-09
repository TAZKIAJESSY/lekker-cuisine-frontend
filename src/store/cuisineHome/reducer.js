const initialState = {
  cuisines: [],
  cuisineDetails: null,
  favourites: [],
};

export default function cuisineHomeReducer(state = initialState, action) {
  switch (action.type) {
    case "cuisineHome/allCuisineFetched": {
      return {
        ...state,
        cuisines: action.payload,
      };
    }
    case "cuisineHome/cuisineLiked": {
      const newArray = [...state.cuisines]; //making a new array

      // console.log("id to update: ", action.payload);

      const index = state.cuisines.findIndex((c) => c.id === action.payload.id); //finding index of the item
      //update here the likes for a  cuisine
      newArray[index].likes = action.payload.likes;

      const newArrayFav = [...state.favourites]; //making a new array

      const indexFav = state.favourites.findIndex(
        (c) => c.cuisineId === action.payload.id
      ); //finding index of the item
      //update here the likes for a  cuisine
      newArrayFav[indexFav].cuisine.likes = action.payload.likes;

      return {
        ...state,
        cuisines: newArray,
        favourites: newArrayFav,
      };
    }

    case "userFav/userFavFetched": {
      return { ...state, favourites: [...action.payload] };
    }

    default: {
      return state;
    }
  }
}
