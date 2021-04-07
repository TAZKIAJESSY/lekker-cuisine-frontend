import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CuisineList from "../../components/CuisineList";

import { fetchcuisineList } from "../../store/cuisineHome/actions";
import { selectCuisineHome } from "../../store/cuisineHome/selectors";

export default function HomePage() {
  const dispatch = useDispatch();
  const cuisine = useSelector(selectCuisineHome);

  useEffect(() => {
    dispatch(fetchcuisineList);
  }, [dispatch]);
  return (
    <div className="container">
      <div className="row">
        {cuisine.map((cui, index) => {
          return (
            <div className="col-lg-3" key={index}>
              <CuisineList title={cui.title} imageUrl={cui.imageUrl} />
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
}
