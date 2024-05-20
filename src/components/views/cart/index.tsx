import styles from "./Cart.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Products } from "@/type/product.type";
import SummaryCart from "@/components/fragments/SummaryCart";
import ItemCart from "@/components/fragments/ItemCart";
import userServices from "@/services/user";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<any>>;
  products: Products[] | any;
  cart:
    | {
        productId: string;
        qty: number;
        size: string;
      }
    | any;
  session: any;
  favProduct: any;
  setCart: Dispatch<SetStateAction<{}[]>>;
};

const CartViewPage = (props: PropTypes) => {
  const { setToaster, cart, products, setCart, favProduct } = props;
  const [subTotalPrice, setSubTotalPrice] = useState<number>(0);
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isInfoVisible, setIsInfoVisible] = useState(true);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      let subTotal = 0;
      let delivery = 0;
      cart.forEach((item: any) => {
        const product = products.find(
          (product: Products) => product.id === item.productId
        );
        if (product) {
          subTotal += product.price * item.qty;
          delivery += 50000;
        }
      });

      setSubTotalPrice(subTotal);
      setDeliveryPrice(subTotal > 3000000 ? 0 : delivery);
      setTotalPrice(subTotal + deliveryPrice);
    }
  }, [products, cart, deliveryPrice]);

  const updateCart = async (updatedCarts: any[]) => {
    try {
      const { data } = await userServices.addToCart({ carts: updatedCarts });

      if (data.statusCode !== 200) {
        setToaster({
          variant: "error",
          message: data.message,
        });
      } else {
        setCart(updatedCarts);
      }
    } catch (error) {
      console.error(error);
      setToaster({
        variant: "danger",
        message: "Failed to update the cart",
      });
    }
  };

  const handleChangeSize = async (e: any, id: string) => {
    const value = e.target.value;
    const updatedCarts = cart.map((item: any) =>
      item.productId === id ? { ...item, size: value.toString() } : item
    );

    await updateCart(updatedCarts);
  };

  const handleChangeQuantity = async (
    e: any,
    id: string,
    defaultValue: number
  ) => {
    const value = parseInt(e.target.value);
    const updatedCarts = cart.map((item: any) =>
      item.productId === id && item.qty === defaultValue
        ? { ...item, qty: value }
        : item
    );

    await updateCart(updatedCarts);
  };

  const handleDelete = async (id: string) => {
    const updatedCarts = cart.filter((item: any) => item.productId !== id);

    await updateCart(updatedCarts);
  };

  const handleFav = async (id: string) => {
    const updatedFavProduct = favProduct.includes(id)
      ? favProduct.filter((item: any) => item !== id)
      : [...favProduct, id];
    await userServices.addFav({ favorite: updatedFavProduct });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container__cart}>
          <div className={styles.container__cart__left}>
            {/* info */}
            {isInfoVisible && (
              <div className={styles.container__cart__left__info} id="info">
                <div className={styles.container__cart__left__info__content}>
                  <h4 className={styles.container__cart__left__info__title}>
                    FREE DELIVERY
                  </h4>
                  <p className={styles.container__cart__info__text}>
                    Applies to orders of Rp3.000.000 or more.
                  </p>
                </div>
                <div className={styles.container__cart__info__content}>
                  <i
                    className="bx bx-x"
                    onClick={() => setIsInfoVisible(false)}
                  ></i>
                </div>
              </div>
            )}
            {/* Bag */}
            <h1 className={styles.right__content__title}>Bag</h1>
            {/* item */}
            {products.length > 0 &&
              cart.length > 0 &&
              products.map((product: any) => {
                const productsInCart = cart.filter(
                  (item: any) => item.productId === product.id
                );

                return (
                  productsInCart.length > 0 &&
                  productsInCart.map((productInCart: any) => (
                    <ItemCart
                      key={`${product.id}-${productInCart.size}`}
                      product={product}
                      cart={productInCart}
                      totalPriceItem={product.price * productInCart.qty}
                      onChangeQuantity={handleChangeQuantity}
                      onChangeSize={handleChangeSize}
                      isFav={favProduct.find(
                        (item: any) => item === product.id
                      )}
                      onAddFav={(e) => handleFav(e)}
                      onDelete={(e) => handleDelete(e)}
                    />
                  ))
                );
              })}

            {cart.length === 0 && (
              <div className={styles.container__cart__left__empty}>
                <p className={styles.container__cart__left__empty__message}>
                  Your cart is empty
                </p>
              </div>
            )}

            {/* last item */}
          </div>
          <div className={styles.container__cart__right}>
            <SummaryCart
              subTotalPrice={subTotalPrice}
              deliveryPrice={deliveryPrice}
              totalPrice={totalPrice}
            />
            <div className={styles.container__cart__right__total__hr}></div>
            <Button
              type="button"
              variant="primary"
              className={styles.container__cart__right__button}
            >
              Checkout
            </Button>
          </div>
        </div>
        <div className={styles.container__fav}></div>
      </div>
    </>
  );
};

export default CartViewPage;
