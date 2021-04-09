import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";
import { selectUserFav } from "../store/userFav/selectors";

import CuisineList from "../components/CuisineList";
import { fetchFavouriteList } from "../store/userFav/actions";

export default function MyFavourite() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const fav = useSelector(selectUserFav);

  useEffect(() => {
    dispatch(fetchFavouriteList);
  }, [dispatch]);

  return (
    <div>
      <div>{user.firstName}'s Kitchen</div>{" "}
      <div className="card-container">
        <div className="row">
          {fav.map((f, index) => {
            return (
              <div className="col-lg-3" key={index}>
                <CuisineList
                  id={f.cuisine.id}
                  title={f.cuisine.title}
                  imageUrl={f.cuisine.imageUrl}
                  likes={f.cuisine.likes}
                  cookingTime={f.cuisine.cookingTime}
                />
              </div>
            );
          })}{" "}
        </div>
      </div>
    </div>
  );
}
