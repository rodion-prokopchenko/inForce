export default function ProductItem({ name, img, sizeW, sizeH }) {
  return (
    <li>
      <img src={img} alt={name} width={sizeW} height={sizeH} />
      {name}
    </li>
  );
}
