import React from "react";
import styles from "./Product.module.scss";
import Input from "@/components/ui/Input";

type PropsTypes = {
  totalProduct: number;
  children: React.ReactNode;
};

const ProductLayout = (props: PropsTypes) => {
  const { children, totalProduct } = props;
  return (
    <>
      <div className={styles.product}>
        <div className={styles.product__sidebar}>
          <h1
            className={styles.product__sidebar__title}
          >{`All Product (${totalProduct})`}</h1>
          <div className={styles.product__sidebar__menu}>
            <Input type="text" placeholder="Search..." name="search" />
            <p>
              <b>Gender</b>
            </p>
            <div className={styles.product__sidebar__menu__gender}>
              <div className={styles.product__sidebar__menu__gender__item}>
                <input
                  type="checkbox"
                  name="Man"
                  id="Man"
                  className={styles.product__sidebar__menu__gender__checkbox}
                />
                <label
                  htmlFor="Man"
                  className={styles.product__sidebar__menu__gender__label}
                >
                  Man
                </label>
              </div>
              <div className={styles.product__sidebar__menu__gender__item}>
                <input
                  type="checkbox"
                  name="Women"
                  id="Women"
                  className={styles.product__sidebar__menu__gender__checkbox}
                />
                <label
                  htmlFor="Women"
                  className={styles.product__sidebar__menu__gender__label}
                >
                  Women
                </label>
              </div>
            </div>
          </div>
          <hr className={styles.product__sidebar__hr} />
        </div>
        <div className={styles.product__main}>{children}</div>
      </div>
    </>
  );
};

export default ProductLayout;
