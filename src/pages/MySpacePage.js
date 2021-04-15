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
    <div className="container" style={{ marginTop: 40, fontSize: 20 }}>
      Find your added cuisines here!!
      <div className="card-container">
        <div className="row">
          {myCuisines && myCuisines.length !== 0 ? (
            myCuisines.map((cui, index) => {
              return (
                <div className="col-lg-6" key={index} style={{ marginTop: 40 }}>
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
                    style={{
                      marginLeft: 70,
                      marginTop: 10,
                      backgroundColor: "#bacccf",
                      border: "none",
                      color: "black",
                      fontWeight: 500,
                      textAlign: "center",
                      padding: 8,
                      fontSize: 18,
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
