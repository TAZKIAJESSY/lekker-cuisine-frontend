import axios from "axios";
import { apiUrl } from "../../confiig/constants";
import { selectUser, selectToken } from "../user/selectors";

export function shoppingListFetched(listData) {
  return { type: "shoppingList/shoppingListFetched", payload: listData };
}

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
