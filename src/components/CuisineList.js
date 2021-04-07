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
        <p className="card-text">{props.likes}</p>
        <p>{props.ingredients}</p>
      </div>
    </div>
  );
}
