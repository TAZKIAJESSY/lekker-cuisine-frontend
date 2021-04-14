import axios from "axios";
import { apiUrl } from "../../confiig/constants";
import { selectUser, selectToken } from "../user/selectors";

export function allCuisineFetched(cuisineList) {
  return { type: "cuisineHome/allCuisineFetched", payload: cuisineList };
}

export function detailsForCuisine(id) {
  return { type: "cuisineHome/detailsForCuisine", payload: id };
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

//fetch all cuisines for homepage
export async function fetchcuisineList(dispatch, getState) {
  try {
    const response = await axios.get(`${apiUrl}/cuisines`);
    console.log("All cuisines", response);

    dispatch(allCuisineFetched(response.data));
  } catch (e) {
    console.log(e.message);
  }
}

//details for a cuisine

export const showDetails = (id) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/cuisines/${id}`);
    console.log("cuisine details: ", response);

    dispatch(detailsForCuisine(response.data));
  } catch (e) {
    console.log(e.message);
  }
};

//update likes for cuisines
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

//get all favourite for a user
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

//create new fav for a user
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

  console.log("add to fav ", response);
  dispatch(newFavouriteAdded(response.data));
};

//del fav from fav list
export const deleteFavourite = (favId) => async (dispatch, getState) => {
  const token = selectToken(getState());

  const response = await axios.delete(`${apiUrl}/favourites/${favId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log(" del fav ", response);

  dispatch(favouriteDeleted(response.data.findFav));
};

//add new cuisine
export const addCuisine = ({
  title,
  instructions,
  imageUrl,
  cuisineType,
  servings,
  cookingTime,
  calories,
  user,
  inputIngredients,
}) => async (dispatch, getState) => {
  try {
    const id = parseInt(user.id);
    const token = selectToken(getState());
    const response = await axios.post(
      `${apiUrl}/cuisines`,
      {
        title: title,
        instructions: instructions,
        imageUrl: imageUrl,
        cuisineType: cuisineType,
        servings: servings,
        cookingTime: cookingTime,
        calories: calories,
        ingredients: inputIngredients,
        userId: id,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log(" Add new cuisine ", response);
  } catch (e) {
    console.log(e.message);
  }
};
