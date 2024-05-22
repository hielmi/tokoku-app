import ProductViewPage from "@/components/views/products";
import productServices from "@/services/product";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const ProductsPage = ({
  setNavbarOpen,
}: {
  setNavbarOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <ProductViewPage product={products} setNavbarOpen={setNavbarOpen} />
    </>
  );
};

export default ProductsPage;
