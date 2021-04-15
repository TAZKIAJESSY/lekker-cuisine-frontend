import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFav } from "../store/cuisineHome/selectors";
import { selectToken } from "../store/user/selectors";
import { selectShoppingList } from "../store/shoppingList/selectors";
import { fetchAdded } from "../store/shoppingList/actions";

import {
  updateCuisineLike,
  addToFavourites,
  deleteFavourite,
} from "../store/cuisineHome/actions";

export default function CuisineList(props) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const favourites = useSelector(selectUserFav);
  const items = useSelector(selectShoppingList);

  const [message, set_message] = useState("");
  const [showLink, setShowLink] = useState(false);

  // console.log("User fav...", favourites);

  const updateLikes = () => {
    // console.log("updating likes for cuisine : ", props.id);
    dispatch(updateCuisineLike(props.id));
  };

  const addList = (ingredientId) => {
    //check here if the user has already that ingredient in the shopping list

    const checkItemExist = items.find(
      (obj) => obj.ingredientId === ingredientId
    );

    if (checkItemExist) {
      set_message("Already have in your shopping list");
    } else {
      // console.log("add ingredientId: ", ingredientId);
      set_message("Ingredient added to shopping list!!");
      dispatch(fetchAdded(ingredientId));
    }
  };

  const defaultProps = {
    servings: false,
    calories: false,
    instructions: false,
    likes: false,
  };

  const favClicked = (cuisineId, fav) => {
    if (token) {
      if (fav) {
        dispatch(deleteFavourite(fav.id));
      } else {
        dispatch(addToFavourites(cuisineId));
      }

      setShowLink(false);
    } else {
      setShowLink(true);
    }
  };

  // if (token) {
  //   setShowLink(false);
  // } else {
  //   setShowLink(true);
  // }

  const checkFav = (cus) => {
    if (
      favourites.find((obj) => {
        // Returns the object where
        // the given property has some value
        return obj.cuisineId === cus.id;
      })
    ) {
      //console.log("Inside: ", cus.id);
      return "💜";
    } else {
      return "♡";
    }
  };

  CuisineList.defaultProps = defaultProps;

  return (
    <div>
      {" "}
      <div>
        {" "}
        {showLink ? <Link to={`/login`}>Login to add Fav</Link> : null}{" "}
      </div>
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
                //fav button
                favClicked(
                  props.id,
                  favourites.find((f) => f.cuisineId === props.id)
                );
              }}
            >
              {checkFav(props)}
            </button>

            {/* {props.likes ? ( // define which page to show like button */}
            <button
              className="btn btn-basic"
              onClick={() => {
                //like button
                updateLikes();
              }}
            >
              👍
            </button>
            {/* ) : null} */}

            <span>{props.likes}</span>
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
            <ol
              style={{ listStyleType: "square", listStylePosition: "inside" }}
            >
              <b> Ingredient List: </b>
              {props.ingredients.map((ing, index) => {
                return (
                  <li key={index}>
                    {ing.name}

                    <button
                      onClick={() => {
                        //details page ingredient button
                        addList(ing.id);
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
                      }}
                    >
                      Add to shopping{" "}
                    </button>
                    <ul style={{ listStyleType: "none" }}>
                      <li style={{ marginRight: 180 }}>{ing.amount}</li>
                    </ul>
                  </li>
                );
              })}
            </ol>
          ) : null}
          <p style={{ color: "teal", marginTop: 30, marginBottom: 30 }}>
            {message}
          </p>
          {/* <div>{user.firstName} 🧑🏼</div> */}
        </div>
      </div>
    </div>
  );
}
