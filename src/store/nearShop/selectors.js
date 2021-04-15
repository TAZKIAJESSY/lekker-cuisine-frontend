export const selectLoading = (reduxState) => reduxState.nearShop.loading;

export const selectNearByStores = (reduxState) => {
  return reduxState.nearShop.nearestStores;
};
