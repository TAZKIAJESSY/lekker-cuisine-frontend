import axios from "axios";

import { apiUrl } from "../../confiig/constants";

export function fetchedStore(list) {
  return { type: "nearShop/fetchedStore", payload: list };
}

// export const storeDataLoading = () => ({
//   type: "nearShop/loading",
// });

export const fetchStore = (location) => async (dispatch, getState) => {
  //dispatch(storeDataLoading());
  try {
    const response = await axios.get(`${apiUrl}/shop/${location}`);

    console.log("All shop list", response);

    dispatch(fetchedStore(response.data.results));
  } catch (e) {
    console.log(e.message);
  }
};
