import { signOut } from "next-auth/react";
import styles from "./ProfileNavbar.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import userServices from "@/services/user";
import Link from "next/link";

type PropTypes = {
  data: any;
};

const ProfileNavbar = (props: PropTypes) => {
  const { data } = props;
  const { push } = useRouter();

  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleDropdownMenu = () => {
    setShowDropdownMenu(!showDropdownMenu);
  };

  const getCountCart = async () => {
    const { data } = await userServices.getCarts();
    setCartCount(data.data.length);
  };

  useEffect(() => {
    getCountCart();
  });

  return (
    <div className={styles.profile}>
      <div className={styles.profile__cart}>
        <Link href="/cart">
          <i className="bx bx-cart-alt"></i>
        </Link>
        <div className={styles.profile__cart__wrap}>
          <p className={styles.profile__cart__wrap__value}>{cartCount}</p>
        </div>
      </div>
      <div className={styles.profile__pictures}>
        <Image
          width={40}
          height={40}
          src={data?.user?.image}
          alt="profile"
          className={styles.profile__pictures__image}
          onClick={toggleDropdownMenu}
        />

        {showDropdownMenu && (
          <div className={styles.profile__pictures__dropdown}>
            <button
              className={styles.profile__pictures__dropdown__item}
              onClick={() => push("/member/profile")}
            >
              Profile
            </button>
            <button
              className={styles.profile__pictures__dropdown__item}
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileNavbar;
