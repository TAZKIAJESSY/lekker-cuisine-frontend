const initialState = {
  nearestStores: [],
};

export default function cuisineHomeReducer(state = initialState, action) {
  switch (action.type) {
    case "nearShop/loading": {
      return {
        ...state,
        loading: true,
      };
    }
    case "nearShop/fetchedStore": {
      return {
        ...state,
        loading: false,
        nearestStores: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
