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
  const [profile, setProfile] = useState<User | {}>({});

  const session: any = useSession();

  useEffect(() => {
    if (session.data?.accessToken && Object.keys(profile).length === 0) {
      const getProfile = async () => {
        if (!session.data?.accessToken) {
          return;
        }
        const { data } = await userServices.getProfile();
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
