import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./HomePage.css";
import CuisineList from "../../components/CuisineList";
import { fetchcuisineList } from "../../store/cuisineHome/actions";
import { selectCuisineHome } from "../../store/cuisineHome/selectors";
//import { selectUserFav } from "../../store/cuisineHome/selectors";
import { fetchFavouriteList } from "../../store/cuisineHome/actions";

const compareLikes = (a, b) => {
  return a.likes - b.likes;
};
const compareCookingTime = (a, b) => {
  return a.cookingTime - b.cookingTime;
};

export default function HomePage() {
  const dispatch = useDispatch();
  const cuisines = useSelector(selectCuisineHome);

  const [searchText, set_searchText] = useState();
  const [filterText, set_filterText] = useState();
  const [sortLikes, setSortLikes] = useState();
  const [sortCookingTime, setSortCookingTime] = useState();

  const filteredCuisines = filterText
    ? cuisines.filter((cuisine) =>
        cuisine.cuisineType.toUpperCase().includes(filterText.toUpperCase())
      )
    : cuisines;

  const searched = searchText
    ? filteredCuisines.filter((cuisine) =>
        cuisine.ingredients.some((ingredient) =>
          ingredient
            ? ingredient.name.toUpperCase().includes(searchText.toUpperCase())
            : null
        )
      )
    : filteredCuisines;

  const addSearchUrl = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(fetchcuisineList);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFavouriteList);
  }, [dispatch]);

  return (
    <div className="container">
      <div className="button-container">
        <div className="row">
          <div className="btn-deco">
            {" "}
            <button
              style={{
                margin: 13,
                padding: 7,
                width: 100,
                backgroundColor: "#c0c4c4",
                border: "none",
              }}
              value="Italian"
              onClick={(e) => set_filterText(e.target.value)}
            >
              Italian
            </button>
            <button
              style={{
                margin: 13,
                padding: 7,
                width: 100,
                backgroundColor: "#c0c4c4",
                border: "none",
              }}
              value="French"
              onClick={(e) => set_filterText(e.target.value)}
            >
              French
            </button>
            <button
              style={{
                margin: 13,
                padding: 7,
                width: 100,
                backgroundColor: "#c0c4c4",
                border: "none",
              }}
              value="Thai"
              onClick={(e) => set_filterText(e.target.value)}
            >
              Thai
            </button>
            <button
              style={{
                margin: 13,
                padding: 7,
                width: 100,
                backgroundColor: "#c0c4c4",
                border: "none",
              }}
              value="Mixed"
              onClick={(e) => set_filterText(e.target.value)}
            >
              Mixed
            </button>
          </div>
          <div className="sort-deco">
            <label>
              {" "}
              <b>Sort By: </b>
            </label>
            <select
              placeholder="Sort"
              onChange={(e) =>
                e.target.value === "Most Popular ♥ "
                  ? setSortLikes(searched.sort(compareLikes))
                  : setSortCookingTime(searched.sort(compareCookingTime))
              }
            >
              <option value={sortLikes}>Most Popular ♥ </option>
              <option value={sortCookingTime}>Cooking Time 🕒</option>
            </select>
          </div>
          <div className="form-deco">
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
          {searched && searched.length !== 0 ? (
            searched.map((cui, index) => {
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
            })
          ) : (
            <p>No cuisine found...</p>
          )}
        </div>
      </div>
    </div>
  );
}
