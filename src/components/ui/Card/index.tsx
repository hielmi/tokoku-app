import styles from "./Card.module.scss";
import Image from "next/image";
import { Products } from "@/type/product.type";
import { convertIDR } from "@/utils/currency";

type PropTypes = {
  product: Products;
};
const Card = (prop: PropTypes) => {
  const { product } = prop;

  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
        />
      </div>
      <div className={styles.card__info}>
        <h1 className={styles.card__info__title}>{product.name}</h1>
        <p className={styles.card__info__price}>{convertIDR(product.price)}</p>
      </div>
    </div>
  );
};

export default Card;
