import ProductAdminViews from "@/components/views/admin/Products";
import productServices from "@/services/product";
import { useEffect, useState } from "react";

const AdminProductPage = ({ setToaster }: any) => {
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
      <ProductAdminViews products={products} setToaster={setToaster} />
    </>
  );
};

export default AdminProductPage;
