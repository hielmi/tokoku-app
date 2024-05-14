import Button from "@/components/ui/Button";
import Image from "next/image";
import styles from "./ItemCart.module.scss";
import { convertIDR } from "@/utils/currency";
import Link from "next/link";
import Select from "@/components/ui/Select";
import { useEffect, useState } from "react";

type PropTypes = {
  product: any;
  cart: any;
  totalPriceItem: number;
  onChangeSize: (e: any, id: string) => void;
  onChangeQuantity: (e: any, id: string) => void;
  onDelete: (id: string) => void;
  onAddFav: (id: string) => void;
};

const ItemCart = (props: PropTypes) => {
  const {
    product,
    onChangeSize,
    onChangeQuantity,
    onDelete,
    onAddFav,
    cart,
    totalPriceItem,
  } = props;

  const [animationStart, setAnimationStart] = useState<any>({
    heart: false,
  });

  const [optionQty, setOptionQty] = useState<any>([]);

  useEffect(() => {
    if (animationStart.heart && animationStart.id) {
      const heart = document.querySelector(`#heart-${animationStart.id}`);
      if (heart) {
        const classToAdd = heart.classList.contains("bxs-heart")
          ? "bx-heart"
          : "bxs-heart";
        heart.classList.add("bx-tada");
        setTimeout(() => {
          heart.classList.remove("bx-tada");
          heart.classList.remove("bxs-heart", "bx-heart");
          heart.classList.add(classToAdd);
        }, 1000);
      }
    }
  }, [animationStart]);

  useEffect(() => {
    if (product.stock.length > 0 && cart) {
      const selectedItem = product.stock.find(
        (item: any) => item.size === cart.size
      );
      const maxQty = selectedItem ? selectedItem.qty : 10;

      const optionQty = [...Array(maxQty > 10 ? 10 : maxQty)].map(
        (_, index) => {
          return { value: index + 1, label: index + 1 };
        }
      );
      setOptionQty(optionQty);
    }
  }, [product, cart]);

  return (
    <>
      <div className={styles.item} key={product.id}>
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className={styles.item__image}
        />
        <div className={styles.item__content}>
          <div className={styles.item__content__desc}>
            <div className={styles.item__content__desc__detail}>
              <Link
                href={`/products/${product.id}`}
                className={styles.item__content__desc__detail__name}
              >
                {product.name}
              </Link>
              <div className={styles.item__content__desc__detail__category}>
                {product.category}
              </div>
              <div className={styles.item__content__desc__detail__size}>
                <Select
                  name="size"
                  label="Size"
                  option={[
                    ...product.stock.map((stock: any) => {
                      return { value: stock.size, label: stock.size };
                    }),
                  ]}
                  defaultValue={cart.size}
                  onChange={(e: any) => onChangeSize(e, product.id)}
                  className={styles.item__content__desc__detail__size__select}
                />
                <Select
                  name="qty"
                  label="Quantity"
                  option={optionQty}
                  defaultValue={cart.qty}
                  onChange={(e: any) => onChangeQuantity(e, product.id)}
                  className={styles.item__content__desc__detail__size__select}
                />
              </div>
            </div>
            <div className={styles.item__content__desc__price}>
              <p>{convertIDR(totalPriceItem)}</p>
            </div>
          </div>

          <div className={styles.item__content__action}>
            <Button
              type="button"
              variant={"secondary"}
              className={styles.item__content__action__fav}
              onClick={() => {
                setAnimationStart({ heart: true, id: product.id });
                onAddFav(product.id);
              }}
            >
              <i className="bx bx-heart" id={`heart-${product.id}`}></i>
            </Button>
            <Button
              type="button"
              variant={"secondary"}
              className={styles.item__content__action__delete}
              onClick={() => onDelete(product.id)}
            >
              <i className="bx bx-trash"></i>
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.hr}></div>
    </>
  );
};

export default ItemCart;
