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

  const session: any = useSession();

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();

    setProducts(data.data);
  };

  const getCarts = async (token: string) => {
    const { data } = await userServices.getCarts(token);

    setUserCart(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCarts(session.data?.accessToken);
    } else {
      router.push(`/auth/login?callbackUrl=${router.asPath}`);
    }
  }, [session]);

  return (
    <>
      <CartViewPage
        setToaster={setToaster}
        setCart={setUserCart}
        products={products}
        cart={userCart}
        session={session}
      />
    </>
  );
};

export default Chart;
