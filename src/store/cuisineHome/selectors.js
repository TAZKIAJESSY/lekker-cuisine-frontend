export const selectCuisineHome = (reduxState) => {
  return reduxState.cuisineHome.cuisines;
};

export const selectCuisineDetails = (id) => (reduxState) => {
  let cloneProduct = [...reduxState.cuisineHome.cuisines];

  console.log("All data: ", cloneProduct);

  console.log("Search with cuisineId: ", id);

  const cus = cloneProduct.find((c) => c.id === parseInt(id));

  console.log("Find data: ", cus);

  return cus;
};

export const selectUserFav = (reduxState) => {
  return reduxState.cuisineHome.favourites;
};
