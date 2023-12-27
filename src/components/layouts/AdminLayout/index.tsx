import styles from "./AdminLayout.module.scss";
import Sidebar from "@/components/fragments/Sidebar";

type PropsTypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bx bxs-dashboard",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bx bxs-box",
  },
  {
    title: "Profile",
    url: "/admin/profile",
    icon: "bx bxs-user",
  },
];

const AdminLayout = (props: PropsTypes) => {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem} />
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
