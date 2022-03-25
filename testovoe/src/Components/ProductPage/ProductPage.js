import productSelectors from "../redux/products/product-selector";
import { useDispatch, useSelector } from "react-redux";
import JsonItems from "../../db.json";
import { useState } from "react";
import ProductItem from "../ProductPageItem/ProductPageItem";
import ModalWindow from "../Modal/Modal";

export default function ProductPage() {
  const [items, setItems] = useState(JsonItems.products);
  const [currentItem, setCurrentItem] = useState(null);
  const [showModal, setShowModal] = useState(true);

  const products = useSelector(productSelectors.getProducts);

  const toggleModal = (id) => {
    setCurrentItem(items.filter((item) => item.id === id)[0]);
    setShowModal(!showModal);
  };
  const toggleModalForKey = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <div>
        <ul>
          {items.map((i) => (
            <>
              <ProductItem
                onClick={toggleModal}
                key={i.name}
                name={i.name}
                img={i.imageUrl}
                sizeW={i.size.width}
                sizeH={i.size.height}
              />
              <button>ДОБАВИТЬ</button>
            </>
          ))}
        </ul>
      </div>
      {showModal && (
        <ModalWindow
          product={currentItem}
          onClose={toggleModal}
          onCloseForKey={toggleModalForKey}
        />
      )}
    </>
  );
}
