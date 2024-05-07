import Image from "next/image";
import styles from "./DetailProduct.module.scss";
import { Products } from "@/type/product.type";
import { convertIDR } from "@/utils/currency";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import userServices from "@/services/user";

type PropTypes = {
  product: Products;
  carts: any;
  productId: string;
  setToaster: Dispatch<
    SetStateAction<{
      varian: string;
      message: string;
    }>
  >;
};

const DetailProductView = (props: PropTypes) => {
  const [selectedSize, setSelectedSize] = useState("");

  const { product, carts, productId, setToaster } = props;
  const { status, data }: any = useSession();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (status === "authenticated") {
      if (selectedSize !== "") {
        let cartItemFound = false;

        const updatedCarts = carts.map((cart: any) => {
          if (cart.productId === productId && cart.size === selectedSize) {
            cartItemFound = true;
            return {
              ...cart,
              qty: cart.qty + 1,
            };
          }
          return cart;
        });

        if (!cartItemFound) {
          updatedCarts.push({
            productId,
            size: selectedSize,
            qty: 1,
          });
        }

        try {
          const result = await userServices.addToCart(
            { carts: updatedCarts },
            data?.accessToken
          );

          if (result.status === 200) {
            setSelectedSize("");
            setToaster({
              varian: "success",
              message: "Success add to cart",
            });
          } else {
            setToaster({
              varian: "error",
              message: "Failed add to cart",
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Please select size");
      }
    } else {
      router.push(`/auth/login?callbackUrl=${router.asPath}`);
    }
  };
  return (
    <div className={styles.detail}>
      <div className={styles.detail__main}>
        <div className={styles.detail__main__left}>
          <Image
            src={product?.image}
            alt={product?.name}
            width={500}
            height={500}
            className={styles.detail__main__left__image}
          />
        </div>
        <div className={styles.detail__main__right}>
          <h1>{product?.name}</h1>
          <h3 className={styles.detail__main__right__category}>
            {product?.category}
          </h3>
          <h3 className={styles.detail__main__right__price}>
            {convertIDR(product?.price)}
          </h3>
          <p className={styles.detail__main__right__subtitle}>Select Size</p>
          <div className={styles.detail__main__right__size}>
            {product?.stock?.map(
              (stock: { size: string; qty: number }, index: number) => (
                <div
                  className={styles.detail__main__right__size__item}
                  key={index}
                >
                  <input
                    className={styles.detail__main__right__size__item__input}
                    type="radio"
                    name="size"
                    id={`size-${stock.size}`}
                    disabled={stock.qty === 0}
                    onChange={() => {
                      setSelectedSize(stock.size);
                    }}
                    checked={stock.size === selectedSize}
                  />
                  <label
                    className={styles.detail__main__right__size__item__label}
                    htmlFor={`size-${stock.size}`}
                  >
                    {stock.size}
                  </label>
                </div>
              )
            )}
          </div>
          <Button
            className={styles.detail__main__right__button}
            type="submit"
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailProductView;
