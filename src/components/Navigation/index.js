import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

export default function Navigation() {
  const token = useSelector(selectToken);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar bg="light" expand="lg">
      {/* <Navbar.Brand as={NavLink} to="/" activeStyle={{ color: "teal" }}>
        Cuisine{" "}
      </Navbar.Brand> */}
      <Navbar.Brand
        style={{ color: "teal", fontStyle: "oblique", fontSize: 58 }}
      >
        Lekker Cuisine
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%", height: 200, padding: 50 }} fill>
          <NavbarItem path="/" linkText="Cuisine" />
          <NavbarItem path="/favourite" linkText="My 🖤 Favourite" />
          <NavbarItem path="/addcuisine" linkText="Add Cuisine 🍂" />

          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
