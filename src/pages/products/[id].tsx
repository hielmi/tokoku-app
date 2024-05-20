import DetailProductView from "@/components/views/detailProduct/Index";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Products } from "@/type/product.type";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const DetailProductPage = ({ setToaster }: PropTypes) => {
  const { id } = useRouter().query;
  const [product, setProduct] = useState<Products | any>([]);
  const [carts, setCarts] = useState([]);
  const [fav, setFav] = useState([]);
  const session: any = useSession();

  const getAllProducts = async (id: string) => {
    const { data } = await productServices.getProduct(id);
    setProduct(data.data);
  };

  const getCarts = async () => {
    const { data } = await userServices.getCarts();
    setCarts(data.data);
  };

  const getFavProduct = async () => {
    const { data } = await userServices.getFavProduct();
    setFav(data.data);
  };

  useEffect(() => {
    getAllProducts(id as string);
  }, [id]);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCarts();
      getFavProduct();
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Product Details</title>
      </Head>
      <DetailProductView
        product={product}
        carts={carts}
        fav={fav}
        productId={id as string}
        setToaster={setToaster}
      />
    </>
  );
};

export default DetailProductPage;
