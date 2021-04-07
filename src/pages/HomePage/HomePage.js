import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CuisineList from "../../components/CuisineList";

import { fetchcuisineList } from "../../store/cuisineHome/actions";
import { selectCuisineHome } from "../../store/cuisineHome/selectors";

export default function HomePage() {
  const [searchText, set_searchText] = useState("");

  const dispatch = useDispatch();
  const cuisine = useSelector(selectCuisineHome);

  const filtered_cuisine = [...cuisine].filter((cui) => {
    return cui.title.toUpperCase().includes(searchText.toUpperCase());
  });

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
          {filtered_cuisine.map((cui, index) => {
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
