// export const selectCuisineHome = (reduxState) => {
//   return reduxState.cuisineHome.cuisines;
// };

export const selectCuisineHome = (searchText, set_sortBy) => (reduxState) => {
  let cloneProduct = [...reduxState.cuisineHome.cuisines];
  console.log(searchText);

  if (searchText) {
    cloneProduct = cloneProduct.filter((c) => {
      return (
        c.title.toUpperCase().includes(searchText.toUpperCase()) ||
        c.cuisineType.toUpperCase().includes(searchText.toUpperCase()) ||
        //subelement ingredient by name
        c.ingredients.some((i) =>
          i.name.toUpperCase().includes(searchText.toUpperCase())
        )
      );
    });

    console.log("Filterred data: ", cloneProduct);
  }

  return cloneProduct.sort((a, b) => {
    if (set_sortBy === "likes") return parseInt(b.likes - a.likes);
    //decending order
    else return a.cookingTime - b.cookingTime; //ascending
  });
};
