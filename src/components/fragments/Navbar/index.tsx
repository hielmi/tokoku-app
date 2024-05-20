import { signIn, useSession } from "next-auth/react";
import styles from "./Navbar.module.scss";
import { Figtree } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfileNavbar from "./ProfileNavbar";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const Navbar = () => {
  const { data }: any = useSession();
  const { pathname } = useRouter();

  const NavItems = [
    { url: "/", title: "Home" },
    { url: "/products", title: "Products" },
  ];

  return (
    <div className={styles.navbar}>
      <h1 className={figtree.className}>
        Toko<span className={styles.navbar__span}>ku</span>
      </h1>
      <div className={styles.navbar__nav}>
        {NavItems.map((item, index) => (
          <Link
            key={index}
            className={`${styles.navbar__nav__item} ${
              pathname === item.url && styles["navbar__nav__item--active"]
            }`}
            href={item.url}
          >
            {item.title}
          </Link>
        ))}
      </div>
      {data ? (
        <ProfileNavbar data={data} />
      ) : (
        <button className={styles.navbar__button} onClick={() => signIn()}>
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
