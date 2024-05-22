import ProfileMemberViews from "@/components/views/member/Profile";
import userServices from "@/services/user";
import { User } from "@/type/user.type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Products } from "@/type/product.type";
import { useSession } from "next-auth/react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
  product?: Products[];
  chart?: any;
};

const MemberProfilePage = (props: PropTypes) => {
  const { setToaster } = props;

  return (
    <>
      <ProfileMemberViews setToaster={setToaster} />
    </>
  );
};

export default MemberProfilePage;
