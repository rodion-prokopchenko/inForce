import s from "./Modal.module.css";

export default function ModalForConfirmDelete({ confirmDeleting }) {
  return (
    <>
      <div className={s.overlay}>
        <div className={s.modal}>
          <h3>Действительно хотите удалить</h3>
          <button id="confirmDeleting" onClick={confirmDeleting}>
            Да
          </button>
          <button id="cancelDeleting" onClick={confirmDeleting}>
            Отмена
          </button>
        </div>
      </div>
    </>
  );
}
