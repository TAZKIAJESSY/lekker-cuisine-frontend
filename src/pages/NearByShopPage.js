import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import { fetchStore } from "../store/nearShop/actions";
import { selectStores } from "../store/nearShop/selectors";

export default function NearByShopPage() {
  const [location, set_location] = useState("");
  const dispatch = useDispatch();
  const allStore = useSelector(selectStores);

  const onSubmitChange = (event) => {
    event.preventDefault();
    console.log("hi");
    dispatch(fetchStore(location));
    set_location("");
  };

  return (
    <div>
      <Container>
        <Form
          as={Col}
          md={{ span: 6, offset: 3 }}
          className="mt-5"
          // onSubmit={onSubmitChange}
        >
          <h1
            className="mt-5 mb-5"
            style={{ color: "brown", fontFamily: "oblique" }}
          >
            All Supermarket By Specific Area
          </h1>
          <Form.Group>
            <Form.Label>Type your desired location</Form.Label>
            <Form.Control
              value={location}
              onChange={(event) => set_location(event.target.value)}
              type="text"
              placeholder="Enter location"
              required
            />
          </Form.Group>
          <Button type="submit" onClick={onSubmitChange}>
            Submit
          </Button>
        </Form>
      </Container>

      <div
        style={{
          marginTop: 100,
          backgroundColor: "#bacccf",
        }}
      >
        <div>
          {allStore && allStore.length > 0
            ? allStore.map((n, index) => {
                return (
                  <div className="col-lg-1/12" key={index}>
                    <ul
                      style={{
                        listStyleType: "square",
                        listStylePosition: "inside",
                      }}
                    >
                      <li>
                        <b> {n.name}</b>{" "}
                      </li>
                      <li>Address: {n.vicinity} </li>

                      {n.opening_hours ? (
                        <li>
                          Shop status now:{" "}
                          {n.opening_hours.open_now ? "✔️" : "🔴"}{" "}
                        </li>
                      ) : null}
                    </ul>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
