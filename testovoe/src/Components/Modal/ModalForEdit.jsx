import { useEffect, useState } from "react";
import s from "./Modal.module.css";

export default function ModalWindowForEdit({
  onClose,
  product,
  onCloseForKey,
}) {
  let [count, setCount] = useState(1);

  let [weight, setWeight] = useState(product.weight * count);

  // F. CHANGE COUNT OF ITEM
  const onChangeCounter = (e) => {
    switch (e.target.name) {
      case "increment":
        return setCount((count += 1));
      case "decrement":
        if (count === 1) {
          return;
        }
        return setCount((count -= 1));

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

  // REMOVE ADDEVENTLISTENERS + CHANGE WEIGHT PER COUNT
  useEffect(() => {
    // CHANGE WEIGHT PER COUNT
    setWeight(product.weight * count);

    // REMOVE ADDEVENTLISTENERS
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });

  return (
    <>
      <div onClick={handleBackdropClick} className={s.overlay}>
        <div className={s.modal}>
          <img
            src={product.imageUrl}
            alt={product.name}
            width={product.size.width}
            height={product.size.height}
          />
          <h2>{product.name}</h2>

          <div onClick={onChangeCounter}>
            <p>
              <span>Кол-во {count}</span>
              <span>Вес {weight}</span>
            </p>
            <button name="decrement">-</button>
            <button name="increment">+</button>
          </div>
          <button>Подтвердить</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </>
  );
}
