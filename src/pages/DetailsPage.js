import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CuisineList from "../components/CuisineList";
import { selectCuisineDetails } from "../store/cuisineHome/selectors";
import { fetchcuisineList } from "../store/cuisineHome/actions";
import { propTypes } from "react-bootstrap/esm/Image";

export default function DetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  console.log("Search with cuisineId: ", id);

  const cuisine = useSelector(selectCuisineDetails(id));

  console.log("what is cuisine:", cuisine);

  useEffect(() => {
    dispatch(fetchcuisineList);
  }, [dispatch]);

  return (
    <div className="container">
      <div className="heading-some">
        <div className="row">
          <div className="col-lg-12">
            {" "}
            <p>Special cuisine to make your tummy happy! Enjoy :)</p>
          </div>
        </div>
      </div>
      <div className="details-show">
        <div className="row">
          <div className="col-lg-12">
            <CuisineList
              id={cuisine?.id}
              title={cuisine?.title}
              imageUrl={cuisine?.imageUrl}
              likes={cuisine?.likes}
              cookingTime={cuisine?.cookingTime}
              instructions={cuisine?.instructions}
              servings={cuisine?.servings}
              calories={cuisine?.calories}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
