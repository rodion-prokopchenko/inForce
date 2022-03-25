import { useDispatch } from "react-redux";
import { useState } from "react";

import s from "./ProductPageItem.module.css";

import productAction from "../redux/products/product-actions";

import ModalForConfirmDelete from "../Modal/ModalForConfirmDelete";

export default function ProductItem({
  toggleModalForEdit,
  name,
  img,
  count,
  sizeW,
  sizeH,
  id,
}) {
  const dispatch = useDispatch();

  // STATES
  const [showModalForConfirmDelete, setShowModalForConfirmDelete] =
    useState(false);

  // F. DELETE PRODUCT + TOGGLE MODAL FOR CONFIRMING
  const onDeleteProduct = (e) => {
    switch (e.target.id) {
      case "delete":
        return setShowModalForConfirmDelete(!showModalForConfirmDelete);

      case "confirmDeleting":
        dispatch(productAction.deleteProduct(id));
        return setShowModalForConfirmDelete(!showModalForConfirmDelete);

      case "cancelDeleting":
        return setShowModalForConfirmDelete(!showModalForConfirmDelete);

      default:
        return;
    }
  };

  return (
    <>
      <li id={id} className={s.productsItem} key={id}>
        <img src={img} alt={name} width={sizeW} height={sizeH} />
        {/* NAME + COUNT*/}
        <h3>{name}</h3>
        <h4>Кол-во: {count}</h4>

        {/* EDIT BUTTON */}
        <button onClick={() => toggleModalForEdit(id)}>РЕДАКТИРОВАТЬ</button>

        {/* DELETE BUTTON */}
        <button
          id="delete"
          onClick={onDeleteProduct}
          className={s.productsItem__button}
        >
          УДАЛИТЬ
        </button>
      </li>
      {/* MODAL */}
      {showModalForConfirmDelete && (
        <ModalForConfirmDelete confirmDeleting={onDeleteProduct} />
      )}
    </>
  );
}
