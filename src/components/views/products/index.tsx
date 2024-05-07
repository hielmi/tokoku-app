import ProductLayout from "@/components/layouts/ProductLayout";
import { Products } from "@/type/product.type";
import { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import Card from "@/components/ui/Card";
import Link from "next/link";

type PropTypes = {
  product: Products[];
};
const ProductViewPage = (prop: PropTypes) => {
  const { product } = prop;
  const [totalProduct, setTotalProduct] = useState(0);

  useEffect(() => {
    setTotalProduct(product.length);
  }, [product]);
  return (
    <ProductLayout totalProduct={totalProduct}>
      <div className={styles.products}>
        {product.map((product: Products, index: number) => (
          <Link href={`/products/${product.id}`} key={index}>
            <Card key={index} product={product} />
          </Link>
        ))}
      </div>
    </ProductLayout>
  );
};

export default ProductViewPage;
