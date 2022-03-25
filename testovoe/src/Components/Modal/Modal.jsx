import { useEffect, useState } from "react";
import s from "./Modal.module.css";

export default function ModalWindow({ onClose, product, upd, onCloseForKey }) {
  const [count, setCount] = useState(null);

  // const handleChange = (e) => {
  //   switch (e.target.name) {
  //     case "name":
  //       setCount(e.target.value);
  //       break;
  //     case "number":
  //       setNumber(e.target.value);
  //       break;
  //     default:
  //       return;
  //   }
  // };

  // const onHandleSubmit = (e) => {
  //   e.preventDefault();
  //   upd(name, number);
  //   onClose();
  // };

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
  });

  return (
    <>
      <div onClick={handleBackdropClick} className={s.overlay}>
        <div className={s.modal}>
          <h2>This is Modal Overlay 1</h2>
          <div>
            <p>Click outside the modal to close.</p>
          </div>
        </div>
      </div>
    </>
  );
}
