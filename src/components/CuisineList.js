import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFav } from "../store/cuisineHome/selectors";
import { selectUser } from "../store/user/selectors";

import {
  updateCuisineLike,
  addToFavourites,
  deleteFavourite,
} from "../store/cuisineHome/actions";

export default function CuisineList(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const favourites = useSelector(selectUserFav);

  // console.log("User fav...", favourites);

  const updateLikes = () => {
    // console.log("updating likes for cuisine : ", props.id);
    dispatch(updateCuisineLike(props.id));
  };
  const defaultProps = {
    servings: false,
    calories: false,
    instructions: false,
  };
  // const propTypes = {
  //   servings: PropTypes.bool.isRequired,
  // };

  const favClicked = (cuisineId, fav) => {
    if (fav) {
      dispatch(deleteFavourite(fav.id));
    } else {
      dispatch(addToFavourites(cuisineId));
    }
  };

  // const checkFav = (cuisineId) => {
  //   if (favourites.includes(cuisineId)) {
  //     return "♡";
  //   } else {
  //     return "💚";
  //   }
  // };

  CuisineList.defaultProps = defaultProps;

  return (
    <div className="card shadow-lg mb-4">
      <div className="card-body pb-0">
        <h5 className="card-title">
          <Link to={`/details/${props.id}`} style={{ color: "brown" }}>
            {props.title}
          </Link>
        </h5>
        <Link to={`/details/${props.id}`}>
          {" "}
          <img
            style={{ width: 200, height: 250 }}
            src={props.imageUrl}
            alt={props.title}
          ></img>
        </Link>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <button
            className="btn btn-basic"
            onClick={() => {
              favClicked(
                props.id,
                favourites.find((f) => f.cuisineId === props.id)
              );
            }}
          >
            💚
          </button>
          <button
            className="btn btn-basic"
            onClick={() => {
              updateLikes();
            }}
          >
            👍
          </button>
          <span>{props.likes}</span>{" "}
        </div>
        <p className="card-text">{props.cookingTime} min</p>
        {props.servings ? (
          <p className="card-text">Servings: {props.servings} </p>
        ) : null}
        {props.calories ? (
          <p className="card-text">Calorie per serving: {props.calories} </p>
        ) : null}
        {props.instructions ? (
          <p className="card-text">
            <b>Instructions:</b> {props.instructions}{" "}
          </p>
        ) : null}
        {props.ingredients ? (
          <ol style={{ listStyleType: "square", listStylePosition: "inside" }}>
            <b> Ingredient List: </b>
            {props.ingredients.map((ing, index) => {
              return (
                <li>
                  {ing.name}
                  <ul style={{ listStyleType: "none" }}>
                    <li>{ing.amount}</li>
                  </ul>
                </li>
              );
            })}
          </ol>
        ) : null}

        {/* <div>{user.firstName} 🧑🏼</div> */}
      </div>
    </div>
  );
}
