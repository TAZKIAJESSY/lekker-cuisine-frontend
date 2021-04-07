import axios from "axios";
import { apiUrl } from "../../confiig/constants";

export function allCuisineFetched(cuisineList) {
  return { type: "cuisineHome/allCuisineFetched", payload: cuisineList };
}

export function cuisineLiked(cuisine) {
  return { type: "cuisineHome/cuisineLiked", payload: cuisine };
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

export const updateCuisineLike = (cuisineId) => async (dispatch, getState) => {
  // const { token } = selectUser(getState());

  // console.log("token", token);
  try {
    const response = await axios.patch(`${apiUrl}/cuisines/${cuisineId}`);

    console.log(response);

    dispatch(cuisineLiked(response.data));
  } catch (e) {
    console.log(e.message);
  }
};
