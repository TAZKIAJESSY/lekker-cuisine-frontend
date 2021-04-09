import { combineReducers } from "redux";
import cuisineHome from "./cuisineHome/reducer";
import appState from "./appState/reducer";
import user from "./user/reducer";
import userFav from "./userFav/reducer";

export default combineReducers({
  cuisineHome,
  appState,
  user,
  // userFav,
});
