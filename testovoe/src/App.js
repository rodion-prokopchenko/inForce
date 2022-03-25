import { useEffect } from "react";
import { useDispatch } from "react-redux";

import ProductPage from "./Components/ProductPage/ProductPage";
import productAction from "./Components/redux/products/product-actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productAction.getProducts());
  }, [dispatch]);
  return (
    <>
      <ProductPage />
    </>
  );
}

export default App;
