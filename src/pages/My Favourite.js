import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";

import CuisineList from "../components/CuisineList";
import { fetchFavouriteList } from "../store/userFav/actions";

export default function MyFavourite() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchFavouriteList);
  }, [dispatch]);

  return (
    <div>
      <div>{user.firstName}'s Kitchen</div>{" "}
      <div>
        <CuisineList />
      </div>
    </div>
  );
}
