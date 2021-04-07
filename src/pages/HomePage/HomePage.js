import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CuisineList from "../../components/CuisineList";

import { fetchcuisineList } from "../../store/cuisineHome/actions";
import { selectCuisineHome } from "../../store/cuisineHome/selectors";

export default function HomePage() {
  const [searchText, set_searchText] = useState("");
  const [sortBy, set_sortBy] = useState("");

  const dispatch = useDispatch();
  const cuisine = useSelector(selectCuisineHome(searchText, sortBy));

  useEffect(() => {
    dispatch(fetchcuisineList);
  }, [dispatch]);
  return (
    <div className="container">
      <div className="button-container">
        <div className="row">
          <div>
            {" "}
            <button>Italian</button>
            <button>French</button>
            <button>Thai</button>
            <button>Mixed</button>
          </div>
          <div>
            <label>Sort By:</label>
            <select
              onChange={(e) => {
                set_sortBy(e.target.value);
              }}
            >
              <option value="likes">Likes</option>
              <option value="cookingTime">cookingTime</option>
            </select>
          </div>
          <div>
            {" "}
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type={searchText}
                onChange={(e) => set_searchText(e.target.value)}
                placeholder="Search..."
              />
            </form>
          </div>
        </div>
      </div>{" "}
      <div className="card-container">
        <div className="row">
          {cuisine.map((cui, index) => {
            return (
              <div className="col-lg-3" key={index}>
                <CuisineList
                  title={cui.title}
                  imageUrl={cui.imageUrl}
                  likes={cui.likes}
                />
              </div>
            );
          })}{" "}
        </div>
      </div>
    </div>
  );
}
