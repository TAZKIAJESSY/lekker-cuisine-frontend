import axios from "axios";
import { apiUrl } from "../../confiig/constants";
import { selectUser, selectToken } from "../user/selectors";

export function allCuisineFetched(cuisineList) {
  return { type: "cuisineHome/allCuisineFetched", payload: cuisineList };
}

export function cuisineLiked(cuisine) {
  return { type: "cuisineHome/cuisineLiked", payload: cuisine };
}

export function userFavFetched(favouriteList) {
  return { type: "cuisineHome/userFavFetched", payload: favouriteList };
}

export function newFavouriteAdded(addData) {
  return { type: "cuisineHome/newFavouriteAdded", payload: addData };
}

export function favouriteDeleted(id) {
  return { type: "cuisineHome/favouriteDeleted", payload: id };
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

export const updateCuisineLike = (id) => async (dispatch, getState) => {
  // const { token } = selectUser(getState());

  //console.log("token", token);
  try {
    const response = await axios.patch(`${apiUrl}/cuisines/likes/${id}`);

    console.log("Cuisine updare response: ", response.data);

    dispatch(cuisineLiked(response.data));
  } catch (e) {
    console.log(e.message);
  }
};

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

export const addToFavourites = (cuisineId) => async (dispatch, getState) => {
  const token = selectToken(getState());
  const user = selectUser(getState());

  const response = await axios.post(
    `${apiUrl}/favourites`,
    {
      cuisineId,
      userId: user.id,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  dispatch(newFavouriteAdded(response.data));
};

export const deleteFavourite = (id) => async (dispatch, getState) => {
  const token = selectToken(getState());

  const response = await axios.delete(`${apiUrl}/favourites/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch(favouriteDeleted(response.data));
};
