import { Link } from "react-router-dom";

export default function CuisineList(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <img
        style={{ width: 200, height: 200 }}
        src={props.imgUrl}
        alt={props.title}
      ></img>
    </div>
  );
}
