import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Product.module.scss";
import Input from "@/components/ui/Input";
import FilterProduct from "@/components/fragments/Filter";

type PropsTypes = {
  totalProduct: number;
  children: React.ReactNode;
  setNavbarOpen: Dispatch<SetStateAction<boolean>>;
};

const ProductLayout = (props: PropsTypes) => {
  const { children, totalProduct, setNavbarOpen } = props;
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 950);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOpenFilter = () => {
    setShowDropdown(!showDropdown);
    if (showDropdown) {
      setNavbarOpen(true);
    } else {
      setNavbarOpen(false);
    }
  };

  return (
    <>
      <div className={styles.product}>
        {toggleFilter && (
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
        )}
        <div className={styles.product__main}>
          <div className={styles.product__main__toolbar}>
            <h1 className={styles.product__main__toolbar__title}>
              {totalProduct} Result
            </h1>
            <button
              className={styles.product__main__toolbar__button}
              onClick={
                isMobile
                  ? handleOpenFilter
                  : () => setToggleFilter(!toggleFilter)
              }
            >
              {toggleFilter ? "Hide" : "Show"} Filter
              <i className="bx bx-slider"></i>
            </button>
          </div>
          {children}
        </div>
      </div>
      {showDropdown && isMobile && (
        <FilterProduct
          setShowDropdown={handleOpenFilter}
          showDropdown={showDropdown}
          setNavbarOpen={setNavbarOpen}
        />
      )}
    </>
  );
};

export default ProductLayout;
