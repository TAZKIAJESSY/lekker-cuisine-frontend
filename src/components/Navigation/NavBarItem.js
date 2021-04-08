import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

function NavBarItem() {
  const token = useSelector(selectToken);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <div
      style={{
        margin: 20,
        fontSize: 25,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <NavLink exact to="/" activeStyle={{ color: "teal" }}>
        Cuisines
      </NavLink>
      <NavLink to="/login" activeStyle={{ color: "teal" }}>
        Login
      </NavLink>

      {loginLogoutControls}
    </div>
  );
}

export default NavBarItem;
