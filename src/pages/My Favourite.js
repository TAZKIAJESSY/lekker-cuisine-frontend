import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";
import { selectUserFav } from "../store/cuisineHome/selectors";

import CuisineList from "../components/CuisineList";
import { fetchFavouriteList } from "../store/cuisineHome/actions";

export default function MyFavourite() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userFav = useSelector(selectUserFav);

  useEffect(() => {
    dispatch(fetchFavouriteList);
  }, [dispatch]);

  return (
    <div>
      <div style={{ marginTop: 50, marginBottom: 50 }}>
        <b style={{ color: "teal", fontSize: 20 }}>{user.firstName}'s</b>{" "}
        Kitchen
      </div>
      <div style={{ fontSize: 20 }}>
        Find here your most favourite ones... <b>Hurray!!!</b>{" "}
      </div>

      <div style={{ margin: 200 }}>
        {/* <Carousel className="mt-9" style={{}}> */}
        <div>
          {" "}
          {userFav && userFav.length !== 0 ? (
            userFav.map((f, index) => {
              return (
                // <Carousel.Item key={index} style={{ backgroundColor: "teal" }}>
                <div key={index}>
                  <CuisineList
                    id={f.cuisine.id}
                    title={f.cuisine.title}
                    imageUrl={f.cuisine.imageUrl}
                    likes={f.cuisine.likes}
                    cookingTime={f.cuisine.cookingTime}
                  />
                </div>
                // {/* </Carousel.Item> */}
              );
            })
          ) : (
            <p>Hi! You have nothing in your 🖤 ....</p>
          )}
        </div>
        {/* </Carousel> */}
      </div>
    </div>
  );
}
