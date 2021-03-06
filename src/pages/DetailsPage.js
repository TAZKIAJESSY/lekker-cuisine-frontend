import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CuisineList from "../components/CuisineList";
import { selectCuisineDetails } from "../store/cuisineHome/selectors";
import { showDetails } from "../store/cuisineHome/actions";
import { fetchShoppingList } from "../store/shoppingList/actions";
//import { fetchFavouriteList } from "../store/cuisineHome/actions";

export default function DetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  console.log("Search with cuisineId: ", id);

  const cuisineDetails = useSelector(selectCuisineDetails);

  console.log("what is cuisine:", cuisineDetails);

  useEffect(() => {
    dispatch(showDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchShoppingList);
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
            {cuisineDetails ? (
              <CuisineList
                id={cuisineDetails.id}
                title={cuisineDetails.title}
                imageUrl={cuisineDetails.imageUrl}
                // likes={cuisineDetails.likes}
                likes={false}
                cookingTime={cuisineDetails.cookingTime}
                instructions={cuisineDetails.instructions}
                servings={cuisineDetails.servings}
                calories={cuisineDetails.calories}
                ingredients={cuisineDetails.ingredients}
              />
            ) : (
              <p>No details found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
