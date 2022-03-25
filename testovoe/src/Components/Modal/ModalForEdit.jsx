import { useEffect, useState } from "react";
import s from "./Modal.module.css";

import productAction from "../redux/products/product-actions";
import { useDispatch } from "react-redux";

export default function ModalWindowForEdit({
  onClose,
  product,
  onCloseForKey,
}) {
  const dispatch = useDispatch();

  let [name, setName] = useState(product.name);
  let [count, setCount] = useState(product.count);
  let [weight, setWeight] = useState(product.weight);
  let [fullWeigth, setFullWeight] = useState(weight * count);
  let [imageUrl, setImageUrl] = useState(product.imageUrl);
  let [comments, setComments] = useState(product.comments);

  // F. CHANGE NAME
  const onChangeItemName = (e) => {
    setName(e.target.value);
  };

  // F. CHANGE COUNT
  const onChangeCounter = (e) => {
    return setCount(e.target.value);
  };

  // F. CHANGE WEIGHT
  const onChangeWeight = (e) => {
    setWeight(e.target.value);
  };

  // F. CHANGE IMAGE URL
  const onChangeImageURL = (e) => {
    setImageUrl(e.target.value);
  };

  // F. CHANGE COMMENTS TO ORDER
  const onChangeComment = (e) => {
    setComments(e.target.value);
  };

  // F. CLOSE MODAL
  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const handleKeydown = (e) => {
    if (e.code === "Escape") {
      onCloseForKey();
    }
  };

  // F. UPDATE PRODUCT
  function onUpdateProduct() {
    const updatedContact = {
      name: name,
      count: count,
      weight: weight,
      imageUrl: imageUrl,
      comment: comments,
    };
    const id = product.id;

    try {
      dispatch(productAction.updateProduct({ id, updatedContact }));
    } catch (error) {
      alert("Что-то пошло не так при обновлении");
    }
  }

  // REMOVE ADDEVENTLISTENERS + CHANGE WEIGHT PER COUNT
  useEffect(() => {
    // CHANGE WEIGHT PER COUNT
    setName(name);
    setFullWeight(weight * count);

    // REMOVE ADDEVENTLISTENERS
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [name, count, weight]);

  return (
    <>
      <div onClick={handleBackdropClick} className={s.overlay}>
        <div className={s.modal}>
          <div className={s.modal__block}>
            {/* IMAGE URL + PICTURE OF IMAGE URL */}
            <img
              src={product.imageUrl}
              alt={product.name}
              width="200"
              height="200"
            />
            <label htmlFor="imageUrl">URL-ссылка картинки продукта</label>
            <input
              type="text"
              id="imageUrl"
              defaultValue={imageUrl}
              onClick={onChangeImageURL}
            />
            {/* NAME */}
            <label htmlFor="name">Название продукта</label>
            <input
              id="name"
              type="text"
              defaultValue={product.name}
              onClick={onChangeItemName}
            />
            {/* COUNTER */}
            <label htmlFor="count">Кол-во</label>
            <input
              type="text"
              id="count"
              defaultValue={count}
              onClick={onChangeCounter}
            />
            {/* WEIGHT */}
            <label htmlFor="weight">Вес</label>
            <input
              type="text"
              id="weight"
              defaultValue={fullWeigth}
              onClick={onChangeWeight}
            />
            {/* COMMENTS */}
            <label htmlFor="comments">Комментарий</label>
            <textarea
              id="comments"
              cols="30"
              rows="10"
              defaultValue={comments}
              onClick={onChangeComment}
            >
              {comments}
            </textarea>
            {/* BUTTONS CONFIRM/CANCEL UPDATING */}
            <div className={s.modal__block_buttons}>
              <button onClick={onUpdateProduct}>Подтвердить</button>
              <button onClick={onClose}>Отмена</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
