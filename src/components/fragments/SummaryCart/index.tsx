import Button from "@/components/ui/Button";
import { convertIDR } from "@/utils/currency";
import styles from "./SummaryCart.module.scss";

type PropTypes = {
  subTotalPrice: number;
  deliveryPrice: number;
  totalPrice: number;
};

const SummaryCart = ({
  subTotalPrice,
  deliveryPrice,
  totalPrice,
}: PropTypes) => {
  return (
    <>
      <h1 className={styles.summary_cart__title}>Summary</h1>
      <div className={styles.summary_cart__subtotal}>
        <p className={styles.summary_cart__subtotal__title}>Subtotal</p>
        <p className={styles.summary_cart__subtotal__value}>
          {convertIDR(subTotalPrice)}
        </p>
      </div>
      <div className={styles.summary_cart__delivery}>
        <p className={styles.summary_cart__delivery__title}>
          Estimated Delivery & Handling
        </p>
        <p className={styles.summary_cart__delivery__value}>
          {deliveryPrice > 0 ? convertIDR(deliveryPrice) : "Free"}
        </p>
      </div>
      <div className={styles.summary_cart__taxes}>
        <p className={styles.summary_cart__taxes__title}>
          Estimated Duties and Taxes
        </p>
        <p className={styles.summary_cart__taxes__value}>{"-"}</p>
      </div>
      <div className={styles.summary_cart__total__hr}></div>
      <div className={styles.summary_cart__total}>
        <p className={styles.summary_cart__total__title}>Total</p>
        <p className={styles.summary_cart__total__value}>
          {convertIDR(totalPrice)}
        </p>
      </div>
      <div className={styles.summary_cart__total__hr}></div>
    </>
  );
};

export default SummaryCart;
