import { Product } from "components/Product";
import { useCart } from "context/CartContext";


export default function Chekout() {
  const { products } = useCart();

  const productArray = Array.from(products)

  const totalBasket = productArray.reduce((nb, product) => {

    return nb + parseFloat(product.salePrice);
}, 0);


  return (
    <div>
       {productArray.map(product=> <Product hit={product}/>)}
       <p>TOTAL :{totalBasket}</p>
    </div>
  );
}
