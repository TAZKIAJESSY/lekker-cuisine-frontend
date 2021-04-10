import { useState, useEffect } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";

import CuisineList from "../../components/CuisineList";
import { fetchcuisineList } from "../../store/cuisineHome/actions";
import { selectCuisineHome } from "../../store/cuisineHome/selectors";

export default function HomePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { text } = useParams();

  const { search } = useLocation();
  const { custype } = queryString.parse(search);

  //console.log("Query: ", custype);

  //console.log("what is text", text);
  const [searchText, set_searchText] = useState();
  const [filterText, set_filterText] = useState();
  const [sortBy, set_sortBy] = useState("");

  const cuisines = useSelector(
    selectCuisineHome(searchText, filterText, sortBy)
  );

  const addSearchUrl = (e) => {
    e.preventDefault();
    const route_parameter = encodeURIComponent(searchText);

    history.push(`/${route_parameter}`);
  };

  const addQueryurl = (e) => {
    set_filterText(e.target.value);

    //console.log("custype text: ", filterText);

    const route_parameter = encodeURIComponent(searchText);

    history.push(`/${route_parameter}?cusType=${filterText}`);

    //set_filterText("");
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
            <button value="Italian" onClick={addQueryurl}>
              Italian
            </button>
            <button value="French" onClick={addQueryurl}>
              French
            </button>
            <button value="Thai" onClick={addQueryurl}>
              Thai
            </button>
            <button value="Mixed" onClick={addQueryurl}>
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
          {cuisines && cuisines.length !== 0 ? (
            cuisines.map((cui, index) => {
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
