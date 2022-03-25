export default function ProductItem({ onClick, name, img, sizeW, sizeH, id }) {
  return (
    <li>
      <img src={img} alt={name} width={sizeW} height={sizeH} />
      {name}
      <button onClick={() => onClick(id)}>РЕДАКТИРОВАТЬ</button>
    </li>
  );
}
