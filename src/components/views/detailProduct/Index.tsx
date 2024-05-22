import Image from "next/image";
import styles from "./DetailProduct.module.scss";
import { Products } from "@/type/product.type";
import { convertIDR } from "@/utils/currency";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import userServices from "@/services/user";

type PropTypes = {
  product: Products;
  carts: any;
  fav: any;
  productId: string;
  setToaster: Dispatch<
    SetStateAction<{
      varian: string;
      message: string;
    }>
  >;
};

const DetailProductView = (props: PropTypes) => {
  const { product, carts, productId, setToaster, fav } = props;

  const [selectedSize, setSelectedSize] = useState("");
  const [isFav, setisFav] = useState(false);

  const { status }: any = useSession();
  const router = useRouter();

  useEffect(() => {
    if (fav.includes(productId)) setisFav(true);
  }, [fav, productId]);

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
          const result = await userServices.addToCart({ carts: updatedCarts });

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
          setToaster({
            varian: "error",
            message: "Failed add to cart",
          });
        }
      } else {
        alert("Please select size");
      }
    } else {
      router.push(`/auth/login?callbackUrl=${router.asPath}`);
    }
  };

  const handleFav = async () => {
    if (status === "authenticated") {
      try {
        if (fav.includes(productId)) {
          setisFav(false);
          const updatedFav = fav.filter((item: any) => item !== productId);
          const result = await userServices.addFav(updatedFav);
          if (result.status === 200) {
            setisFav(true);
          } else {
            setToaster({
              varian: "error",
              message: "Failed add to fav",
            });
          }
        } else {
          const result = await userServices.addFav({
            favorite: [...fav, productId],
          });
          if (result.status === 200) {
            setisFav(true);
          } else {
            setToaster({
              varian: "error",
              message: "Failed add to fav",
            });
          }
        }
      } catch (error) {
        setToaster({
          varian: "error",
          message: "Failed add to fav",
        });
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
            className={styles.detail__main__right__add}
            type="submit"
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>
          <Button
            className={styles.detail__main__right__fav}
            type="submit"
            onClick={handleFav}
            variant="secondary"
          >
            <span>Favorite</span>
            {isFav ? (
              <i className="bx bxs-heart"></i>
            ) : (
              <i className="bx bx-heart"></i>
            )}
          </Button>

          <div className={styles.detail__main__right__desc}>
            <p className={styles.detail__main__right__desc}>{product?.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductView;
