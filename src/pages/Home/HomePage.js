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
  const cuisines = useSelector(selectCuisineHome(searchText, sortBy));

  useEffect(() => {
    dispatch(fetchcuisineList);
  }, [dispatch]);

  return (
    <div className="container">
      <div className="button-container">
        <div className="row">
          <div>
            {" "}
            <button
              value="Italian"
              onClick={(e) => set_searchText(e.target.value)}
            >
              Italian
            </button>
            <button
              value="French"
              onClick={(e) => set_searchText(e.target.value)}
            >
              French
            </button>
            <button
              value="Thai"
              onClick={(e) => set_searchText(e.target.value)}
            >
              Thai
            </button>
            <button
              value="Mixed"
              onClick={(e) => set_searchText(e.target.value)}
            >
              Mixed
            </button>
          </div>
          <div>
            <label>Sort By:</label>
            <select
              onChange={(e) => {
                set_sortBy(e.target.value);
              }}
            >
              <option value="sort"></option>
              <option value="likes">Most Popular ♥ </option>
              <option value="cookingTime">Cooking Time 🕒 </option>
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
          {cuisines.map((cui, index) => {
            return (
              <div className="col-lg-3" key={index}>
                <CuisineList
                  id={cui.id}
                  title={cui.title}
                  imageUrl={cui.imageUrl}
                  likes={cui.likes}
                  cookingTime={cui.cookingTime}
                  servings={false}
                  instructions={false}
                  calories={false}
                />
              </div>
            );
          })}{" "}
        </div>
      </div>
    </div>
  );
}
