export const selectCuisineLoading = (reduxState) => {
  return reduxState.cuisineHome.loading;
};

export const selectCuisineHome = (reduxState) => {
  return reduxState.cuisineHome.cuisines;
};

export const selectCuisineDetails = (reduxState) => {
  return reduxState.cuisineHome.cuisineDetails;
};

export const selectUserFav = (reduxState) => {
  return reduxState.cuisineHome.favourites;
};
