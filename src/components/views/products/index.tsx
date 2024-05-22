import ProductLayout from "@/components/layouts/ProductLayout";
import { Products } from "@/type/product.type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Products.module.scss";
import Card from "@/components/ui/Card";
import Link from "next/link";

type PropTypes = {
  product: Products[];
  setNavbarOpen: Dispatch<SetStateAction<boolean>>;
};
const ProductViewPage = (prop: PropTypes) => {
  const { product, setNavbarOpen } = prop;
  const [totalProduct, setTotalProduct] = useState(0);

  useEffect(() => {
    setTotalProduct(product.length);
  }, [product]);
  return (
    <ProductLayout totalProduct={totalProduct} setNavbarOpen={setNavbarOpen}>
      <div className={styles.wrap}>
        <div className={styles.products}>
          {product.map((product: Products, index: number) => (
            <Link href={`/products/${product.id}`} key={index}>
              <Card key={index} product={product} />
            </Link>
          ))}
        </div>
      </div>
    </ProductLayout>
  );
};

export default ProductViewPage;
