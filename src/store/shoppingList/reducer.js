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

    case "shoppingList/addedIngredient": {
      return {
        lists: [...state.lists, action.payload],
      };
    }

    case "shoppingList/removedIngredient": {
      const id = parseInt(action.payload.id);

      const newList = state.lists.filter((oneItem) => oneItem.id !== id);

      return {
        ...state,
        lists: newList,
      };
    }

    default: {
      return state;
    }
  }
}
