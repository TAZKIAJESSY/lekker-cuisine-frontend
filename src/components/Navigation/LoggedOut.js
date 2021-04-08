import React from "react";
import Nav from "react-bootstrap/Nav";

export default function LoggedOut() {
  return (
    <>
      <Nav.Item path="/login" linkText="Login" />
    </>
  );
}
