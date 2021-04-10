import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
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
        Carousel for your fav cuisines... Hurray!!!{" "}
      </div>

      <div style={{ margin: 200 }}>
        <Carousel className="mt-9" style={{}}>
          {" "}
          {userFav && userFav.length !== 0 ? (
            userFav.map((f, index) => {
              return (
                <Carousel.Item key={index} style={{ backgroundColor: "teal" }}>
                  <CuisineList
                    id={f?.cuisine.id}
                    title={f?.cuisine.title}
                    imageUrl={f?.cuisine.imageUrl}
                    likes={f?.cuisine.likes}
                    cookingTime={f?.cuisine.cookingTime}
                  />
                </Carousel.Item>
              );
            })
          ) : (
            <p>Loading....</p>
          )}
        </Carousel>
      </div>
    </div>
  );
}
