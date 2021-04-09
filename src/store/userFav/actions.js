import axios from "axios";
import { apiUrl } from "../../confiig/constants";

export function userFavFetched(favouriteList) {
  return { type: "userFav/userFavFetched", payload: favouriteList };
}

export async function fetchFavouriteList(dispatch, getState) {
  try {
    const getFav = getState().userFav.favourites;

    if (!getFav.length) {
      const response = await axios.get(`${apiUrl}/favourites`);
      console.log("All favourites", response);

      dispatch(userFavFetched(response.data));
    }
  } catch (e) {
    console.log(e.message);
  }
}
