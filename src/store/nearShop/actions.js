import axios from "axios";

const API_URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
const API_KEY = "AIzaSyA3K0C0fExKEAShuqb-Z3Efgmyk1n7y598";

export function fetchedStore(list) {
  return { type: "nearShop/fetchedStore", payload: list };
}

export const storeDataLoading = () => ({
  type: "nearShop/loading",
});

export const fetchStore = (currentLocation) => async (dispatch, getState) => {
  dispatch(storeDataLoading());
  try {
    //console.log("Coordinates: ", currentLocation);

    const response = await axios.get(
      `${API_URL}location=${currentLocation.lattitude},${currentLocation.longtitude}&radius=2000&type=supermarket&key=${API_KEY}&radius=2000&type=supermarket&key=AIzaSyA3K0C0fExKEAShuqb-Z3Efgmyk1n7y598&rankBy?google.maps.places.RankBy.DISTANCE`,
      {
        crossdomain: true,
      }
    );
    console.log("All shop list", response);

    dispatch(fetchedStore(response.data.results));
  } catch (e) {
    console.log(e.message);
  }
};
