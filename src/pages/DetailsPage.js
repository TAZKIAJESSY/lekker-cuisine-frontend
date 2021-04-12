import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CuisineList from "../components/CuisineList";
import { selectCuisineDetails } from "../store/cuisineHome/selectors";
import { showDetails } from "../store/cuisineHome/actions";

export default function DetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  console.log("Search with cuisineId: ", id);

  const cuisineDetails = useSelector(selectCuisineDetails);

  console.log("what is cuisine:", cuisineDetails);

  useEffect(() => {
    dispatch(showDetails(id));
  }, [dispatch, id]);

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
            {cuisineDetails && cuisineDetails.length !== 0 ? (
              <CuisineList
                id={cuisineDetails.id}
                title={cuisineDetails.title}
                imageUrl={cuisineDetails.imageUrl}
                likes={cuisineDetails.likes}
                cookingTime={cuisineDetails.cookingTime}
                instructions={cuisineDetails.instructions}
                servings={cuisineDetails.servings}
                calories={cuisineDetails.calories}
                ingredients={cuisineDetails.ingredients}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
