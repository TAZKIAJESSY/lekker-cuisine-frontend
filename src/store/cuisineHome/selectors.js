// export const selectCuisineHome = (reduxState) => {
//   return reduxState.cuisineHome.cuisines;
// };

export const selectCuisineHome = (searchText, set_sortBy) => (reduxState) => {
  let cloneProduct = [...reduxState.cuisineHome.cuisines];
  console.log(searchText);

  if (searchText) {
    cloneProduct = cloneProduct.filter((c) => {
      return c.title.toUpperCase().includes(searchText.toUpperCase());
    });
  }

  return cloneProduct.sort((a, b) => {
    if (set_sortBy === "likes") return parseInt(b.likes - a.likes);
    else return b.cookingTime - a.cookingTime;
  });
};

// const filtered_cuisine = [...cuisine].filter((cui) => {
//   return cui.title.toUpperCase().includes(searchText.toUpperCase());
// });
