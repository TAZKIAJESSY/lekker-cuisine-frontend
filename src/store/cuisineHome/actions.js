import axios from "axios";
import { apiUrl } from "../../confiig/constants";

export function allCuisineFetched(cuisineList) {
  return { type: "cuisineHome/allCuisineFetched", payload: cuisineList };
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
