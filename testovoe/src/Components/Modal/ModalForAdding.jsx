import { useEffect, useState } from "react";
import s from "./Modal.module.css";

export default function ModalWindowForEdit({
  onClose,
  products,
  onCloseForKey,
}) {
  let [name, setName] = useState(products[0].name);
  let [count, setCount] = useState(1);
  let [weight, setWeight] = useState(products[0].weight);
  let [comments, setComments] = useState("");

  let [countedWeight, setCountedWeight] = useState(products[0].weight * count);

  // F. CHANGE NAME
  const onChangeItemName = (e) => {
    const ItemName = e?.target?.options[e.target.selectedIndex].id ?? e;

    setName(ItemName);
  };

  // F. CHANGE COUNT OF ITEM
  const onChangeCounter = (e) => {
    console.log(e.target.name);

    switch (e.target.name) {
      case "increment":
        let countPlus = (count += 1);

        setCountedWeight(weight * countPlus);
        return setCount(countPlus);
      case "decrement":
        if (count === 1) {
          return;
        }
        let countMinus = (count -= 1);

        setCountedWeight(weight * countMinus);
        return setCount(countMinus);
      default:
        return;
    }
  };

  // F. CHANGE COMMENTS TO ORDER
  const onChangeComment = (e) => {
    setComments(e.target.value);
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
    const newWeight = products
      .filter((i) => i.name === name)
      .map((i) => i.weight);

    setWeight(newWeight);

    setCountedWeight(newWeight * count);

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [name, count]);

  return (
    <>
      <div onClick={handleBackdropClick} className={s.overlay}>
        <div className={s.modal}>
          {/*  */}
          <select onChange={onChangeItemName}>
            {products.map((item) => (
              <>
                <option key={item.id} id={item.name}>
                  {item.name}
                </option>
              </>
            ))}
          </select>
          <div>
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
          </div>
        </div>
      </div>
    </>
  );
}
