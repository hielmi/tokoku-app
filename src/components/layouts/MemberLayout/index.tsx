import styles from "./MemberLayout.module.scss";
import Sidebar from "@/components/fragments/Sidebar";
import React from "react";

type PropsTypes = {
  children: React.ReactNode;
};

const listSidebarItem: { icon: string; title: string; url: string }[] = [
  {
    title: "Dashboard",
    url: "/member",
    icon: "bx bxs-dashboard",
  },
  {
    title: "Orders",
    url: "/member/orders",
    icon: "bx bxs-cart",
  },
  {
    title: "Profile",
    url: "/member/profile",
    icon: "bx bxs-user",
  },
];

const MemberLayout = (props: PropsTypes) => {
  const { children } = props;
  return (
    <div className={styles.member}>
      <Sidebar lists={listSidebarItem} panel="Member" />
      <div className={styles.member__main}>{children}</div>
    </div>
  );
};

export default MemberLayout;
