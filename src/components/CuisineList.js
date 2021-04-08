import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCuisineLike } from "../store/cuisineHome/actions";

export default function CuisineList(props) {
  const dispatch = useDispatch();

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
        <div style={{ marginLeft: 90, marginTop: 10 }}>
          <button
            className="btn btn-basic"
            onClick={() => {
              updateLikes();
            }}
          >
            👍
          </button>
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
      </div>
    </div>
  );
}
