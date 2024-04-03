import styles from "./Products.module.scss";
import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Products } from "@/type/product.type";
import { convertIDR } from "@/utils/currency";

type PropTypes = {
  products: Products[];
  setToaster?: any;
};

const ProductAdminViews = (props: PropTypes) => {
  const [dataProduct, setDataProduct] = useState<Products[]>([]);
  const { products, setToaster } = props;

  useEffect(() => {
    setDataProduct(products);
  }, [products]);

  return (
    <>
      <AdminLayout>
        <div className={styles.product}>
          <h1 className={styles.product__title}>Product Management</h1>
          <table className={styles.product__table}>
            <thead>
              <tr>
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Image</th>
                <th rowSpan={2}>Name</th>
                <th rowSpan={2}>Category</th>
                <th rowSpan={2}>Price</th>
                <th colSpan={2}>Stock</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th>Size</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {dataProduct.map((product, index) => (
                <>
                  <tr key={product.id}>
                    <td rowSpan={product.stock.length}>{index + 1}</td>
                    <td rowSpan={product.stock.length}>
                      <Image
                        src={product.image}
                        width={100}
                        height={100}
                        alt="image"
                      />
                    </td>
                    <td rowSpan={product.stock.length}>{product.name}</td>
                    <td rowSpan={product.stock.length}>{product.category}</td>
                    <td rowSpan={product.stock.length}>
                      {convertIDR(product.price)}
                    </td>
                    <td>{product.stock[0].size}</td>
                    <td>{product.stock[0].qty}</td>
                    <td rowSpan={product.stock.length}>
                      <div className={styles.product__table__action}>
                        <Button type="button" variant="warning">
                          <i className="bx bxs-edit" />
                        </Button>
                        <Button type="button" variant="danger">
                          <i className="bx bxs-trash" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {product.stock.map((stock, index) => (
                    <>
                      {index > 0 && (
                        <tr key={stock.size}>
                          <td>{stock.size}</td>
                          <td>{stock.qty}</td>
                        </tr>
                      )}
                    </>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};

export default ProductAdminViews;
