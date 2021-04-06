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
    default: {
      return state;
    }
  }
}
