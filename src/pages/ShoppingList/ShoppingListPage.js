import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectShoppingList } from "../../store/shoppingList/selectors";
import { fetchShoppingList } from "../../store/shoppingList/actions";

export default function ShoppingListPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShoppingList);
  }, [dispatch]);

  return <div>Hi</div>;
}
