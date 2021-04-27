export const selectLoading = (reduxState) => reduxState.nearShop.loading;

export const selectStores = (reduxState) => {
  return reduxState.nearShop.stores;
};
