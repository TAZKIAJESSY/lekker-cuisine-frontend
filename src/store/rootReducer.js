import { combineReducers } from "redux";
import cuisineHome from "./cuisineHome/reducer";
import appState from "./appState/reducer";

export default combineReducers({
  cuisineHome,
  appState,
});
