import axios from "axios";
import { apiUrl } from "../../confiig/constants";
import { selectUser, selectToken } from "../user/selectors";

export function shoppingListFetched(listData) {
  return { type: "shoppingList/shoppingListFetched", payload: listData };
}

// export function addedToShop(data) {
//   return { type: "shoppingList/addedToShop", payload: data };
// }

//fetch all list for shoppingListpage
export async function fetchShoppingList(dispatch, getState) {
  try {
    const { token } = selectUser(getState());

    // const getCuisine = getState().shoppingList.lists;

    const response = await axios.get(`${apiUrl}/lists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("All ingredient lists to shop", response);

    dispatch(shoppingListFetched(response.data));
  } catch (e) {
    console.log(e.message);
  }
}

//add a ingredient from details page to shoppinglist page
export const fetchAdded = (ingredientId) => async (dispatch, getState) => {
  console.log("ingredientId: ", ingredientId);
  try {
    const { token } = selectUser(getState());

    const response = await axios.post(
      `${apiUrl}/lists`,
      { ingredientId: ingredientId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Add ingredient from details page to shop", response);

    //dispatch((response.data));
  } catch (e) {
    console.log(e.message);
  }
};

//del ingredient from shopping list
export const removeIngredient = (id) => async (dispatch, getState) => {
  const token = selectToken(getState());

  const response = await axios.delete(`${apiUrl}/lists/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log(" Remove from your list ", response);

  // dispatch(favouriteDeleted(response.data.findFav));
};
