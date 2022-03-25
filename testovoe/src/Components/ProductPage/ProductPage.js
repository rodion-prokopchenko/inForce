import productSelectors from "../redux/products/product-selector";
import { useDispatch, useSelector } from "react-redux";
import JsonItems from "../../db.json";
import { useState } from "react";
import ProductItem from "../ProductPageItem/ProductPageItem";
import ModalWindowAdding from "../Modal/ModalForAdding";
import ModalWindowEdit from "../Modal/ModalForEdit";

export default function ProductPage() {
  const products = useSelector(productSelectors.getProducts);

  const [items, setItems] = useState(JsonItems.products);

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

  return (
    <>
      <div>
        <button onClick={toggleModalForAdding}>ДОБАВИТЬ</button>
        <ul>
          {/* ITEMS FROM DB.JSON */}
          {items.map((i) => (
            <>
              <ProductItem
                onClick={toggleModalForEdit}
                key={i.name}
                name={i.name}
                img={i.imageUrl}
                sizeW={i.size.width}
                sizeH={i.size.height}
                id={i.id}
              />
            </>
          ))}
        </ul>
      </div>
      {showModalForAdding && (
        <ModalWindowAdding
          products={items}
          onClose={toggleModalForAdding}
          onCloseForKey={toggleModalForAdding}
        />
      )}
      {showModalForEdit && (
        <ModalWindowEdit
          product={currentItem}
          onClose={toggleModalForEdit}
          onCloseForKey={toggleModalForEdit}
        />
      )}
    </>
  );
}
