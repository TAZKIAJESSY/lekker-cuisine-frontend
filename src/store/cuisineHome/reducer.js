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

    case "cuisineHome/detailsForCuisine": {
      return {
        ...state,
        cuisineDetails: action.payload,
      };
    }

    case "cuisineHome/cuisineLiked": {
      //for cuisine
      const newArray = [...state.cuisines]; //making a new array

      // console.log("id to update: ", action.payload);
      if (newArray && newArray.length !== 0) {
        //to avode getting undefined
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

        //console.log("Index found: ", indexFav);

        if (indexFav !== -1) {
          console.log("Index found: ", indexFav);
          newArrayFav[indexFav].cuisine.likes = action.payload.likes;
        }
      }

      return {
        ...state,
        cuisines: newArray,
        favourites: newArrayFav,
      };
    }

    case "cuisineHome/userFavFetched": {
      return { ...state, favourites: action.payload };
    }

    case "cuisineHome/newFavouriteAdded": {
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };
    }

    case "cuisineHome/favouriteDeleted": {
      const FavId = action.payload.id;
      const newFavs = state.favourites.filter((f) => f.id !== FavId);

      console.log("Current fav: ", newFavs);

      return {
        ...state,
        favourites: newFavs,
      };
    }

    default: {
      return state;
    }
  }
}
