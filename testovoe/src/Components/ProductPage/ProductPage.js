import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { RotatingLines } from "react-loader-spinner";

import s from "./ProductPage.module.css";

import productSelectors from "../redux/products/product-selector";
import ProductItem from "../ProductPageItem/ProductPageItem";
import productAction from "../redux/products/product-actions";

import ModalWindowAdding from "../Modal/ModalForAdding";
import ModalWindowEdit from "../Modal/ModalForEdit";

export default function ProductPage() {
  // SELECTORS + DISPATCH
  const dispatch = useDispatch();
  const isFetching = useSelector(productSelectors.getFetching);
  const products = useSelector(productSelectors.getProducts);

  // STATES
  const [items, setItems] = useState(products);

  const [currentItem, setCurrentItem] = useState(null);

  const [showModalForEdit, setShowModalForEdit] = useState(false);
  const [showModalForAdding, setShowModalForAdding] = useState(false);

  //F. TOGGLE ADDING MODAL
  const toggleModalForAdding = () => {
    setShowModalForAdding(!showModalForAdding);
  };

  //F. TOGGLE EDIT MODAL + SET CURRENT ITEM FOR MODAL
  const toggleModalForEdit = (id) => {
    setCurrentItem(items.filter((item) => item.id === id)[0]);
    setShowModalForEdit(!showModalForEdit);
  };
  const toggleModalForEditKey = () => {
    setShowModalForEdit(!showModalForEdit);
  };

  /* F. SORT BY ORDER */
  const onChangeSortByOrder = (e) => {
    const sortByOrdering = e.target.options[e.target.selectedIndex].id;
    dispatch(productAction.changeSortOrder(sortByOrdering));
    dispatch(productAction.getProducts(sortByOrdering));
  };

  useEffect(() => {
    setItems(products);
  }, [products]);
  return (
    <>
      <div className={s.productPage}>
        {/* BUTTON - ADD NEW PRODUCT  */}
        <button onClick={toggleModalForAdding}>ДОБАВИТЬ</button>

        {/* SELECT SORT ORDER  */}
        {items.length <= 1 ? null : (
          <select onChange={onChangeSortByOrder}>
            <option id="asc">По возростанию</option>
            <option id="desc">По убиванию</option>
          </select>
        )}

        {/* ITEMS */}
        {isFetching === "pending" ? (
          <RotatingLines
            width="100"
            strokeColor="#6495ED"
            strokeWidth="3"
            animationDuration="3"
          />
        ) : (
          <ul>
            {items
              ? items.map((i) => (
                  <>
                    <ProductItem
                      toggleModalForEdit={toggleModalForEdit}
                      key={i.name}
                      name={i.name}
                      img={i.imageUrl}
                      count={i.count}
                      sizeW="200"
                      sizeH="200"
                      id={i.id}
                    />
                  </>
                ))
              : null}
          </ul>
        )}
      </div>
      {/* SHOW/UNSHOW MODALS */}
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
          onCloseForKey={toggleModalForEditKey}
        />
      )}
    </>
  );
}
