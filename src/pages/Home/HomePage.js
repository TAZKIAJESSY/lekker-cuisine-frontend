import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CuisineList from "../../components/CuisineList";

import { fetchcuisineList } from "../../store/cuisineHome/actions";
import { selectCuisineHome } from "../../store/cuisineHome/selectors";

export default function HomePage() {
  const history = useHistory();
  const { text } = useParams();

  console.log("what is params", text);
  const [searchText, set_searchText] = useState("");
  const [sortBy, set_sortBy] = useState("");

  const dispatch = useDispatch();

  const cuisines = useSelector(selectCuisineHome(text, sortBy));

  const addSearchUrl = (e) => {
    e.preventDefault();
    const route_parameter = encodeURIComponent(searchText);

    history.push(`/${route_parameter}`);
  };

  useEffect(() => {
    dispatch(fetchcuisineList);
  }, [dispatch, text]);

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
            <form onSubmit={addSearchUrl}>
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
                  // servings={false}
                  // instructions={false}
                  // calories={false}
                />
              </div>
            );
          })}{" "}
        </div>
      </div>
    </div>
  );
}
