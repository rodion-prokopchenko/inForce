import { useEffect, useState } from "react";
import s from "./Modal.module.css";
import productSelectors from "../redux/products/product-selector";

import productAction from "../redux/products/product-actions";
import { useDispatch, useSelector } from "react-redux";

export default function ModalWindowForEdit({ onClose, onCloseForKey }) {
  const products = useSelector(productSelectors.getProducts);

  const dispatch = useDispatch();
  let [name, setName] = useState("");
  let [count, setCount] = useState("");
  let [weight, setWeight] = useState("");
  let [imageUrl, setImageUrl] = useState("");

  let [comments, setComments] = useState("");

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

  // F. FINISH OF ADDING PRODUCT
  const finishAdding = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "close":
        return;
      case "add":
        return;
      default:
        return;
    }
  };

  // F. ADD NEW PRODUCT
  const addNewProduct = (e) => {
    e.preventDefault();
    if (name === "" && count === "" && weight === "") {
      alert("Введите данные");
      return;
    }
    if (name === "name") {
      return alert("Введите имя продукта");
    }
    if (count === "") {
      return alert("Введите приблизительное кол-во ");
    }
    if (weight === "") {
      return alert("Введите приблизительный вес");
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
      alert("все гуд");
    } catch {
      alert("не гуд");
    }

    reset();
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
    console.log("name: ", name);
    console.log("count: ", count);
    console.log("weight: ", weight);
    console.log("comments: ", comments);

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
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              onInput={onChangeItemName}
            ></input>

            <label htmlFor={"countInput"}>Кол-во</label>
            <input
              id="countInput"
              type="text"
              name="count"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              onInput={onChangeCounter}
            ></input>

            <label htmlFor={"weightInput"}>Вес </label>
            <input
              id="weightInput"
              type="text"
              name="weight"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              onInput={onChangeWeight}
            ></input>
            <label htmlFor={"imageUrlInput"}>
              Добавьте URL-ссылку картинки вашего продукта{" "}
            </label>
            <input
              id="imageUrlInput"
              type="text"
              name="weight"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              onInput={onChangeImageURL}
            ></input>
            <textarea onInput={onChangeComment}></textarea>
            <button type="submit" name="comments" onClick={addNewProduct}>
              Подтвердить
            </button>
            <button type="submit" name="comments">
              Отмена
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
{
  /* <div>
            <p>
              <span>Кол-во {count}</span>
              <span>Вес {countedWeight}</span>
            </p>
            <button name="decrement" onClick={onChangeCounter}>
              -
            </button>
            <button name="increment" onClick={onChangeCounter}>
              +
            </button>
          </div>
          <textarea onInput={onChangeComment} className={s.textArea}></textarea>
          <div>
            <button name="s" onClick={finishAdding}>
              Добавить
            </button>
            <button name="close" onClick={finishAdding}>
              Отмена
            </button>
          </div> */
}
