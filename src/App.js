import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import { selectToken } from "./store/user/selectors";

import Navigation from "./components/Navigation";
import Loading from "./components/Loading/Loading";
import MessageBox from "./components/MessageBox/MessageBox";
import HomePage from "./pages/Home/HomePage";
import SignUp from "./pages/SignUp/SignUpPage";
import Login from "./pages/Login/LoginPage";
import DetailsPage from "./pages/DetailsPage";
import MyFavourite from "./pages/My Favourite";
import AddCuisineForm from "./pages/AddCuisine/AddCuisineForm";
import ShoppingListPage from "./pages/ShoppingList/ShoppingListPage";
import MySpacePage from "./pages/MySpacePage";
import NearByShopPape from "./pages/NearByShopPage";

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isLoading = useSelector(selectAppLoading);

  const protectedRoutes = (Component, routerProps) => {
    return token ? <Component {...routerProps} /> : <Redirect to="/login" />;
  };

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

        <Route
          path="/details/:id"
          render={(routerProps) => protectedRoutes(DetailsPage, routerProps)}
        />

        <Route
          path="/favourite"
          render={(routerProps) => protectedRoutes(MyFavourite, routerProps)}
        />

        <Route
          path="/addcuisine"
          render={(routerProps) => protectedRoutes(AddCuisineForm, routerProps)}
        />

        <Route
          path="/space"
          render={(routerProps) => protectedRoutes(MySpacePage, routerProps)}
        />

        <Route
          path="/shopping"
          render={(routerProps) =>
            protectedRoutes(ShoppingListPage, routerProps)
          }
        />

        <Route
          path="/shop"
          render={(routerProps) => protectedRoutes(NearByShopPape, routerProps)}
        />
      </Switch>
    </div>
  );
}

export default App;
