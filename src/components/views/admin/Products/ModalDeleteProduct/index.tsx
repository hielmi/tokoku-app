import styles from "./ModalDeleteUser.module.scss";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

import { Dispatch, SetStateAction, useState } from "react";
import productServices from "@/services/product";
import { Products } from "@/type/product.type";

type PropTypes = {
  setModalDeleteProduct: Dispatch<SetStateAction<any>>;
  selectedProduct: Products | any;
  setDataProducts: Dispatch<SetStateAction<Products[]>>;
  setToaster: Dispatch<SetStateAction<{ varian: string; message: string }>>;
  setSelectedProduct: Dispatch<SetStateAction<any>>;
};

const ModalDeleteProduct = (props: PropTypes) => {
  const {
    selectedProduct,
    setModalDeleteProduct,
    setDataProducts,
    setToaster,
    setSelectedProduct,
  } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await productServices.deleteProduct(selectedProduct.id);
    if (result.status === 200) {
      setSelectedProduct({});
      const { data } = await productServices.getAllProducts();
      setDataProducts(data.data);
      setToaster({
        varian: "success",
        message: "success deleted user",
      });
      setIsLoading(false);
      setModalDeleteProduct(false);
    } else {
      setToaster({
        varian: "danger",
        message: "failed deleted role",
      });
      setIsLoading(false);
      setSelectedProduct({});
      setModalDeleteProduct(false);
    }
  };

  return (
    <Modal onClose={() => setModalDeleteProduct(false)}>
      <div className={styles.modal__content}>
        <h1 className={styles.modal__content__title}>Are you sure? </h1>
        <Button type="button" variant="danger" onClick={handleDelete}>
          {isLoading ? "Deleting..." : "Yes, delete"}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeleteProduct;
