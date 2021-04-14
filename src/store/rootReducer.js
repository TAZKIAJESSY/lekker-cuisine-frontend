import { combineReducers } from "redux";
import cuisineHome from "./cuisineHome/reducer";
import appState from "./appState/reducer";
import user from "./user/reducer";
import shoppingList from "./shoppingList/reducer";

export default combineReducers({
  cuisineHome,
  appState,
  user,
  shoppingList,
});
