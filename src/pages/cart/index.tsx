import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CartViewPage from "@/components/views/cart";
import productServices from "@/services/product";
import { Products } from "@/type/product.type";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import router from "next/router";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const Chart = (props: PropTypes) => {
  const { setToaster } = props;
  const [products, setProducts] = useState<Products[] | any>({});
  const [userCart, setUserCart] = useState([{}]);
  const [favorite, setFavorite] = useState([]);
  const session: any = useSession();

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();

    setProducts(data.data);
  };

  const getCarts = async () => {
    const { data } = await userServices.getCarts();

    setUserCart(data.data);
  };

  const getFavProduct = async () => {
    const { data } = await userServices.getFavProduct();
    setFavorite(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCarts();
      getFavProduct();
    }
  }, [session]);

  return (
    <>
      <CartViewPage
        setToaster={setToaster}
        setCart={setUserCart}
        products={products}
        cart={userCart}
        favProduct={favorite}
        setFavProduct={setFavorite}
        session={session}
      />
    </>
  );
};

export default Chart;
