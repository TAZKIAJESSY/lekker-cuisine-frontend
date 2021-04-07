import { Link } from "react-router-dom";

export default function CuisineList(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <img src={props.imgUrl} alt={props.title}></img>
    </div>
  );
}
