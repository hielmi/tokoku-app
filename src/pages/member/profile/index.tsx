import ProfileMemberViews from "@/components/views/member/Profile";
import userServices from "@/services/user";
import { User } from "@/type/user.type";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Product } from "@/type/product.type";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
  product?: Product[];
  session: any;
  chart?: any;
};

const MemberProfilePage = (props: PropTypes) => {
  const { setToaster, session } = props;
  const [profile, setProfile] = useState<User | {}>({});

  useEffect(() => {
    if (session.data?.accessToken && Object.keys(profile).length === 0) {
      const getProfile = async () => {
        if (!session.data?.accessToken) {
          return;
        }
        const { data } = await userServices.getProfile(
          session.data?.accessToken
        );
        setProfile(data.data);
      };
      getProfile();
    }
  }, [profile, session]);
  return (
    <>
      <ProfileMemberViews
        profile={profile}
        setProfile={setProfile}
        session={session}
        setToaster={setToaster}
      />
    </>
  );
};

export default MemberProfilePage;
