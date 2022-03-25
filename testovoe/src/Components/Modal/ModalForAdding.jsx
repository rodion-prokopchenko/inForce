import { useEffect, useState } from "react";
import s from "./Modal.module.css";

import productAction from "../redux/products/product-actions";
import { useDispatch } from "react-redux";

export default function ModalWindowForEdit({ onClose, onCloseForKey }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [weight, setWeight] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [comments, setComments] = useState("");

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

  // F. RESET ALL STATES
  const reset = () => {
    setName("");
    setCount("");
    setImageUrl("");
    setWeight("");
    setComments("");
  };

  // F. ADD NEW PRODUCT
  const addNewProduct = (e) => {
    e.preventDefault();
    if (name === "" && count === "" && weight === "") {
      alert("Введите данные");
      return;
    }
    if (name === "") {
      return alert("Введите имя продукта");
    }
    if (count === "") {
      return alert("Введите приблизительное кол-во ");
    }
    if (imageUrl === "") {
      return alert("Введите URL-ссылку картинки вашего продукта");
    }

    let newProduct = {
      name: name,
      count: count,
      weight: weight,
      imageUrl: imageUrl,
      comment: comments,
    };

    try {
      dispatch(productAction.addProduct(newProduct));
    } catch {
      console.log("что-то пошло не так ");
    }

    reset();
    onClose();
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

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <>
      <div onClick={handleBackdropClick} className={s.overlay}>
        <div className={s.modal}>
          <form className={s.modal__form}>
            <label htmlFor={"nameInput"}>Название продукта</label>

            <input
              id="nameInput"
              type="text"
              name="name"
              onInput={onChangeItemName}
            ></input>

            <label htmlFor={"countInput"}>Кол-во</label>
            <input
              id="countInput"
              type="text"
              name="count"
              onInput={onChangeCounter}
            ></input>

            <label htmlFor={"weightInput"}>Вес (необязательно) </label>
            <input
              id="weightInput"
              type="text"
              name="weight"
              onInput={onChangeWeight}
            ></input>
            <label htmlFor={"imageUrlInput"}>
              Добавьте URL-ссылку картинки вашего продукта{" "}
            </label>
            <input
              id="imageUrlInput"
              type="text"
              name="weight"
              onInput={onChangeImageURL}
            ></input>
            <label htmlFor={"commentArea"}>Комментарий(необязательно)</label>
            <textarea onInput={onChangeComment} id="commentArea"></textarea>
            <button type="submit" name="comments" onClick={addNewProduct}>
              Подтвердить
            </button>
            <button type="submit" name="comments" onClick={() => onClose()}>
              Отмена
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
