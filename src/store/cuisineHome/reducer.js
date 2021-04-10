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

    // case "cuisineHome/cuisineLiked": {
    //   return {
    //     ...state,
    //     cuisines: { ...state.cuisines, likes: state.cuisines.likes + 1 },
    //   };
    // }

    case "cuisineHome/cuisineLiked": {
      //for cuisine
      const newArray = [...state.cuisines]; //making a new array

      // console.log("id to update: ", action.payload);
      if (newArray && newArray.length !== 0) {
        const index = state.cuisines.findIndex(
          (c) => c.id === action.payload.id
        ); //finding index of the item
        //update here the likes for a  cuisine

        newArray[index].likes = action.payload.likes;
      }

      //for favCuisine
      const newArrayFav = [...state.favourites]; //making a new array

      if (newArrayFav && newArrayFav.length !== 0) {
        const indexFav = state.favourites.findIndex(
          (c) => c.cuisineId === action.payload.id
        ); //finding index of the item

        newArrayFav[indexFav].cuisine.likes = action.payload.likes;
      }

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
