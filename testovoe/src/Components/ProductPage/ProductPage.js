import productSelectors from "../redux/products/product-selector";
import productAction from "../redux/products/product-actions";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import ProductItem from "../ProductPageItem/ProductPageItem";

import ModalWindowAdding from "../Modal/ModalForAdding";
import ModalWindowEdit from "../Modal/ModalForEdit";

export default function ProductPage() {
  const dispatch = useDispatch();
  const products = useSelector(productSelectors.getProducts);

  const [items, setItems] = useState("");
  const [a, setA] = useState(true);

  useEffect(() => {
    dispatch(productAction.getProduct());
    console.log("items: ", items);
    setItems(products);
  }, [dispatch, a]);

  const [currentItem, setCurrentItem] = useState(null);

  const [showModalForEdit, setShowModalForEdit] = useState(false);
  const [showModalForAdding, setShowModalForAdding] = useState(false);

  //F. TOGGLE ADDING MODAL
  const toggleModalForAdding = (e) => {
    setShowModalForAdding(!showModalForAdding);
  };

  //F. TOGGLE EDIT MODAL + SET CURRENT ITEM FOR MODAL
  const toggleModalForEdit = (id) => {
    setCurrentItem(items.filter((item) => item.id === id)[0]);
    setShowModalForEdit(!showModalForEdit);
  };

  return (
    <>
      <button
        onClick={() => {
          setA(!a);
        }}
      >
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      </button>
      <div>
        <button onClick={toggleModalForAdding}>ДОБАВИТЬ</button>
        <ul>
          {/* ITEMS FROM DB.JSON */}
          {items
            ? items.map((i) => (
                <>
                  <ProductItem
                    toggleModalForEdit={toggleModalForEdit}
                    key={i.name}
                    name={i.name}
                    img={i.imageUrl}
                    sizeW="200"
                    sizeH="200"
                    id={i.id}
                  />
                </>
              ))
            : null}
        </ul>
      </div>
      {showModalForAdding && (
        <ModalWindowAdding
          onClose={toggleModalForAdding}
          onCloseForKey={toggleModalForAdding}
        />
      )}
      {showModalForEdit && (
        <ModalWindowEdit
          product={currentItem}
          onClose={toggleModalForEdit}
          onCloseForKey={toggleModalForEdit}
        />
      )}
    </>
  );
}
