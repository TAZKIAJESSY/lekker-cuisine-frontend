import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCuisineLike } from "../store/cuisineHome/actions";

export default function CuisineList(props) {
  const dispatch = useDispatch();

  const updateLikes = () => {
    // console.log("updating likes for cuisine : ", props.id);
    dispatch(updateCuisineLike(props.id));
  };

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

        <button
          className="btn btn-basic"
          onClick={() => {
            updateLikes();
          }}
          style={{ marginLeft: 90, marginTop: 10 }}
        >
          👍
        </button>
        <p> {props.likes}</p>
        <p className="card-text">{props.cookingTime} min</p>
      </div>
    </div>
  );
}
