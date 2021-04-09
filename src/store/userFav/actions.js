import axios from "axios";
import { apiUrl } from "../../confiig/constants";
import { selectUser } from "../user/selectors";

export function userFavFetched(favouriteList) {
  return { type: "userFav/userFavFetched", payload: favouriteList };
}

export async function fetchFavouriteList(dispatch, getState) {
  try {
    const { token } = selectUser(getState());

    const response = await axios.get(`${apiUrl}/favourites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("All favourites", response.data);

    dispatch(userFavFetched(response.data));
  } catch (e) {
    console.log(e.message);
  }
}
