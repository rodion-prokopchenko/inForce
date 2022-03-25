import { useDispatch } from "react-redux";
import productAction from "../redux/products/product-actions";
import { useState } from "react";

import ModalForConfirmDelete from "../Modal/ModalForConfirmDelete";

export default function ProductItem({
  toggleModalForEdit,
  name,
  img,
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
      <li id={id}>
        <img src={img} alt={name} width={sizeW} height={sizeH} />
        {name}
        {/* EDIT BUTTON */}
        <button onClick={() => toggleModalForEdit(id)}>РЕДАКТИРОВАТЬ</button>

        {/* DELETE BUTTON */}
        <button id="delete" onClick={onDeleteProduct}>
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
