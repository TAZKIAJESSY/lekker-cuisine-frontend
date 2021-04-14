import { useEffect } from "react";
import { selectUser } from "../store/user/selectors";
import { selectCuisineHome } from "../store/cuisineHome/selectors";
import { fetchcuisineList, deleteCuisine } from "../store/cuisineHome/actions";

import { useDispatch, useSelector } from "react-redux";

import CuisineList from "../components/CuisineList";

export default function MySpacePage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cuisine = useSelector(selectCuisineHome);

  useEffect(() => {
    dispatch(fetchcuisineList);
  }, [dispatch]);

  const myCuisines = cuisine.filter((c) => c.userId === user.id);

  return (
    <div>
      HI
      <div className="card-container">
        <div className="row">
          {myCuisines && myCuisines.length !== 0 ? (
            myCuisines.map((cui, index) => {
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
                  <button
                    onClick={() => {
                      dispatch(deleteCuisine(cui.id));
                    }}
                  >
                    Remove
                  </button>
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
