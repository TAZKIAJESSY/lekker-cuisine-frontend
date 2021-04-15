import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";

import { selectLoading, selectNearByStores } from "../store/nearShop/selectors";

import { storeDataLoading, fetchStore } from "../store/nearShop/actions";

export default function NearByShopPape() {
  const dispatch = useDispatch();

  const [currentLocation, setCurrentLocation] = useState({
    lattitude: "",
    longtitude: "",
  });

  //const isLoading = useSelector(selectLoading);
  const nearestStores = useSelector(selectNearByStores);

  function success(position) {
    const lat = position.coords.latitude.toFixed(3);
    const long = position.coords.longitude.toFixed(3);
    setCurrentLocation({ lattitude: lat, longtitude: long });

    console.log("currentLocation", currentLocation);
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  const options = {
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: Infinity,
  };

  const fetchNearByStore = () => {
    navigator.geolocation.getCurrentPosition(success, error, options); //to collect coordinates
  };

  useEffect(() => {
    dispatch(fetchStore(currentLocation));
  }, [dispatch, currentLocation]);

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            dispatch(storeDataLoading());
            fetchNearByStore();
          }}
        >
          Search stores near me
        </Button>
        <div
          className="card shadow-lg mb-4"
          style={{
            marginTop: 100,
          }}
        >
          <div className="card-body pb-0">
            <div className="col-lg-12">
              {nearestStores && nearestStores.length > 0 ? (
                nearestStores.map((n, index) => {
                  return (
                    <ul
                      key={index}
                      style={{
                        listStyleType: "square",
                        listStylePosition: "inside",
                      }}
                    >
                      <li>
                        <b> {n.name}</b>{" "}
                      </li>
                      <li>Address: {n.vicinity} </li>
                      <li>
                        Shop status now:{" "}
                        {n.opening_hours.open_now ? "Open" : "Closed"}{" "}
                      </li>
                    </ul>
                  );
                })
              ) : (
                <p>"Click to get the nearest stores!!!"</p>
              )}
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
}
