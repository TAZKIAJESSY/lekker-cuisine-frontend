import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading/Loading";
import MessageBox from "./components/MessageBox/MessageBox";
import HomePage from "./pages/Home/HomePage";
import SignUp from "./pages/SignUp/SignUpPage";
import Login from "./pages/Login/LoginPage";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import DetailsPage from "./pages/DetailsPage";
import MyFavourite from "./pages/My Favourite";
import AddCuisineForm from "./pages/AddCuisine/AddCuisineForm";
import ShoppingListPage from "./pages/ShoppingList/ShoppingListPage";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/details/:id" component={DetailsPage} />
        <Route path="/favourite" component={MyFavourite} />
        <Route path="/addcuisine" component={AddCuisineForm} />
        <Route path="/shopping" component={ShoppingListPage} />
      </Switch>
    </div>
  );
}

export default App;
