import styles from "./AdminLayout.module.scss";
import Sidebar from "@/components/fragments/Sidebar";
import React from "react";

type PropsTypes = {
  children: React.ReactNode;
};

const listSidebarItem: { icon: string; title: string; url: string }[] = [
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
    title: "User",
    url: "/admin/users",
    icon: "bx bx-group",
  },
];

const AdminLayout = (props: PropsTypes) => {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem} panel="Admin" />
      <div className={styles.admin__main}>{children}</div>
    </div>
  );
};

export default AdminLayout;
