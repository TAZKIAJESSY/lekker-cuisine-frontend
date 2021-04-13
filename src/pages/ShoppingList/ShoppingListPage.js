import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectShoppingList } from "../../store/shoppingList/selectors";
import { fetchShoppingList } from "../../store/shoppingList/actions";

export default function ShoppingListPage() {
  const dispatch = useDispatch();
  const listIngredient = useSelector(selectShoppingList);

  useEffect(() => {
    dispatch(fetchShoppingList);
  }, [dispatch]);

  return (
    <div className="container">
      <div style={{ marginTop: 50 }}>
        Find your shopping list here! Don't forget to buy everything you need..{" "}
      </div>
      <div className="list-container" style={{ marginTop: 100 }}>
        <div className="row">
          <div className="col-lg-12">
            {listIngredient && listIngredient.length !== 0 ? (
              listIngredient.map((c, index) => {
                return (
                  <ul
                    key={index}
                    style={{
                      listStyleType: "square",
                      listStylePosition: "inside",
                    }}
                  >
                    <li>
                      {" "}
                      {c.ingredient.name}{" "}
                      <button style={{ marginLeft: 70 }}>Remove</button>
                    </li>
                  </ul>
                );
              })
            ) : (
              <p>"No List added to shopping page"</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
