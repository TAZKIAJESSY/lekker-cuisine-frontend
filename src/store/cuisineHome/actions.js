import axios from "axios";
import { apiUrl } from "../../confiig/constants";
import { selectUser } from "../user/selectors";

export function allCuisineFetched(cuisineList) {
  return { type: "cuisineHome/allCuisineFetched", payload: cuisineList };
}

export function cuisineLiked(datacuisine) {
  return { type: "cuisineHome/cuisineLiked", payload: datacuisine };
}

export async function fetchcuisineList(dispatch, getState) {
  try {
    const getCuisine = getState().cuisineHome.cuisines;

    if (!getCuisine.length) {
      const response = await axios.get(`${apiUrl}/cuisines`);
      console.log("All cuisines", response);

      dispatch(allCuisineFetched(response.data));
    }
  } catch (e) {
    console.log(e.message);
  }
}

export const addCuisineLike = (id) => async (dispatch, getState) => {
  try {
    const getCuisine = getState().cuisineHome.cuisines;
    if (!getCuisine.length) {
      const response = await axios.patch(`${apiUrl}/cuisines/like/${id}`);

      console.log(response);

      dispatch(cuisineLiked(response.data));
    }
  } catch (e) {
    console.log(e.message);
  }
};

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
