import { Link } from "react-router-dom";

export default function CuisineList(props) {
  return (
    <div className="card shadow-lg mb-4">
      <div className="card-body pb-0">
        <h5 className="card-title">{props.title}</h5>
        <img
          style={{ width: 200, height: 250 }}
          src={props.imageUrl}
          alt={props.title}
        ></img>
        <button className="btn" style={{ marginLeft: 90, marginTop: 10 }}>
          {props.likes}
        </button>
        <p className="card-text">{props.cookingTime} min</p>
      </div>
    </div>
  );
}
