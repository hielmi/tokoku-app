import styles from "./Products.module.scss";
import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { Products } from "@/type/product.type";
import { convertIDR } from "@/utils/currency";
import ModalAddProduct from "./ModalAddProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import Input from "@/components/ui/Input";

type PropTypes = {
  products: Products[];
  setToaster?: any;
};

const ProductAdminViews = (props: PropTypes) => {
  const { products, setToaster } = props;
  const [dataProducts, setDataProducts] = useState<Products[]>([]);
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [productUpdate, setProductUpdate] = useState<Products | {}>({});
  const [modalDeleteProduct, setModalDeleteProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Products | {}>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setDataProducts(filteredProducts);
  }, [search, products]);

  return (
    <>
      <AdminLayout>
        <div className={styles.product}>
          <h1 className={styles.product__title}>Product Management</h1>
          <div className={styles.product__toolbar}>
            <Button
              variant="primary"
              type="button"
              className={styles.product__toolbar__addproduct}
              onClick={() => setModalAddProduct(true)}
            >
              <i className="bx bx-plus" />
              Add Product
            </Button>
            <div className={styles.product__toolbar__search}>
              <Input
                type="text"
                placeholder="Search"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
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
              {dataProducts.map((product, index) => (
                <Fragment key={product.id}>
                  <tr className={styles.product__table__row}>
                    <td rowSpan={product.stock.length}>{index + 1}</td>
                    <td rowSpan={product.stock.length}>
                      <Image
                        src={product.image}
                        width={100}
                        height={100}
                        alt="image"
                        placeholder="empty"
                        priority={true}
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
                        <Button
                          type="button"
                          variant="warning"
                          onClick={() => setProductUpdate(product)}
                        >
                          <i className="bx bxs-edit" />
                        </Button>
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => {
                            setModalDeleteProduct(true);
                            setSelectedProduct(product);
                          }}
                        >
                          <i className="bx bxs-trash" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {product.stock.map((stock, index) => (
                    <Fragment key={stock.size}>
                      {index > 0 && (
                        <tr>
                          <td>{stock.size}</td>
                          <td>{stock.qty}</td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>

      {modalAddProduct && (
        <ModalAddProduct
          setModalAddProduct={setModalAddProduct}
          setToaster={setToaster}
          setDataProducts={setDataProducts}
        />
      )}
      {Object.keys(productUpdate).length > 0 && (
        <ModalUpdateProduct
          setToaster={setToaster}
          setDataProducts={setDataProducts}
          productUpdate={productUpdate}
          setProductUpdate={setProductUpdate}
        />
      )}
      {modalDeleteProduct && (
        <ModalDeleteProduct
          setModalDeleteProduct={setModalDeleteProduct}
          selectedProduct={selectedProduct}
          setDataProducts={setDataProducts}
          setToaster={setToaster}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </>
  );
};

export default ProductAdminViews;
