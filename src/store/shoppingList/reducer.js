const initialState = {
  lists: null,
};

export default function shoppingListReducer(state = initialState, action) {
  switch (action.type) {
    case "shoppingList/shoppingListFetched": {
      return {
        lists: action.payload,
      };
    }

    case "shoppingList/addedToShop": {
      return {};
    }

    default: {
      return state;
    }
  }
}
