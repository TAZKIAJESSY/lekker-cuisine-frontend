import { NavLink } from "react-router-dom";

function NavBar() {
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
    </div>
  );
}

export default NavBar;
