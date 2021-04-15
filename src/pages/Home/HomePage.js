import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import "./HomePage.css";
import CuisineList from "../../components/CuisineList";
import {
  fetchcuisineList,
  fetchFavouriteList,
} from "../../store/cuisineHome/actions";
import { selectCuisineHome } from "../../store/cuisineHome/selectors";
//import { selectUserFav } from "../../store/cuisineHome/selectors";

export default function HomePage() {
  const dispatch = useDispatch();
  // const { searchinput } = useParams();
  // const history = useHistory();
  const cuisines = useSelector(selectCuisineHome);
  const cloneCuisines = [...cuisines];

  const [searchText, set_searchText] = useState();
  const [filterText, set_filterText] = useState();
  const [sortText, set_sortText] = useState();

  useEffect(() => {
    dispatch(fetchcuisineList);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFavouriteList);
  }, [dispatch]);

  const addSearchUrl = (e) => {
    e.preventDefault();
    // const routeParam = encodeURIComponent(searched);
    // history.push(`/${routeParam}`);
  };

  const compareLikes = (a, b) => {
    return b.likes - a.likes;
  };
  const compareCookingTime = (a, b) => {
    return a.cookingTime - b.cookingTime;
  };

  function change_sorting(event) {
    // console.log("New filter sort", event.target.value);
    set_sortText(event.target.value);
  }

  const filteredCuisines = filterText
    ? cloneCuisines.filter(
        (cuisine) =>
          cuisine.cuisineType.toUpperCase().includes(filterText.toUpperCase()) // button (cuisine type)
      )
    : cloneCuisines;

  const searched = searchText
    ? filteredCuisines.filter(
        (cuisine) =>
          cuisine.ingredients.some((ingredient) =>
            ingredient
              ? ingredient.name.toUpperCase().includes(searchText.toUpperCase()) //ingredient name
              : null
          ) || cuisine.title.toUpperCase().includes(searchText.toUpperCase()) //cuisine name
      )
    : filteredCuisines;

  const cuisines_sorted =
    sortText === "Most Popular"
      ? [...searched].sort(compareLikes)
      : [...searched].sort(compareCookingTime);

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
              <b> Sort By: </b>
            </label>{" "}
            <select
              style={{ width: 200, height: 30 }}
              placeholder="Sort"
              onChange={change_sorting}
            >
              <option value="">Select an option</option>
              <option value="Most Popular">Most Popular ♡ </option>
              <option value="Cooking Time">Cooking Time 🕒 </option>
            </select>
          </div>
          <div className="form-deco">
            {" "}
            <form onSubmit={addSearchUrl}>
              <input
                style={{ width: 200, height: 35 }}
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
          {cuisines_sorted && cuisines_sorted.length !== 0 ? (
            cuisines_sorted.map((cui, index) => {
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
