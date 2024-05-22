import { Dispatch, SetStateAction } from "react";
import styles from "./Filter.module.scss";
import Button from "@/components/ui/Button";

type PropsTypes = {
  setNavbarOpen: Dispatch<SetStateAction<boolean>>;
  setShowDropdown: Dispatch<SetStateAction<boolean>>;
  showDropdown: boolean;
};

const FilterProduct = (props: PropsTypes) => {
  const { setShowDropdown, showDropdown } = props;

  return (
    <div className={styles.filter}>
      <div className={styles.filter__header}>
        <p>Filter</p>
        <button onClick={() => setShowDropdown(!showDropdown)}>
          <i className="bx bx-x"></i>
        </button>
      </div>
      <div className={styles.filter__main}>
        <div className={styles.filter__main__item}>
          <p className={styles.filter__main__item__title}>Sort by</p>
          <div className={styles.filter__main__item__radioGroup}>
            <label>
              <input type="radio" name="filter" value="featured" />
              <span className={styles.customRadioButton}></span>
              Featured
            </label>
            <label>
              <input type="radio" name="filter" value="newest" />
              <span className={styles.customRadioButton}></span>
              Newest
            </label>
            <label>
              <input type="radio" name="filter" value="lowest" />
              <span className={styles.customRadioButton}></span>
              Price: Low to high
            </label>
            <label>
              <input type="radio" name="filter" value="highest" />
              <span className={styles.customRadioButton}></span>
              Price: High to low
            </label>
          </div>
        </div>
        <hr className={styles.filter__main__hr} />
        <div className={styles.filter__main__item}>
          <p className={styles.filter__main__item__title}>Gender</p>
          <div className={styles.filter__main__item__checkboxGroup}>
            <label className={styles.customCheckbox}>
              <input type="checkbox" name="gender" value="men" />
              <span className={styles.customCheckboxBox}></span>
              Men
            </label>
            <label className={styles.customCheckbox}>
              <input type="checkbox" name="gender" value="women" />
              <span className={styles.customCheckboxBox}></span>
              Women
            </label>
            <label className={styles.customCheckbox}>
              <input type="checkbox" name="gender" value="unisex" />
              <span className={styles.customCheckboxBox}></span>
              Unisex
            </label>
          </div>
        </div>
      </div>
      <div className={styles.filter__confirm}>
        <Button
          className={styles.filter__confirm__btn__clear}
          variant="secondary"
          type="button"
        >
          Clear
        </Button>
        <Button
          className={styles.filter__confirm__btn__apply}
          variant="primary"
          type="button"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default FilterProduct;
