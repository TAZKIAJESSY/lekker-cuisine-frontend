const initialState = {
  lists: null,
};

export const shoppingListReducer = () => async (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "shoppingList/shoppingListFetched": {
      return {
        lists: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
