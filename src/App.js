import "./App.css";
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBarItem from "./components/Navigation/NavBarItem";
import Loading from "./components/Loading/Loading";
import MessageBox from "./components/MessageBox/MessageBox";
import HomePage from "./pages/Home/HomePage";
import SignUp from "./pages/SignUp/SignUpPage";
import Login from "./pages/Login/LoginPage";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);
  return (
    <div className="App">
      <NavBarItem />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
