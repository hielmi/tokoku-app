import ProfileMemberViews from "@/components/views/member/Profile";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MemberProfilePage = ({ setToaster }: any) => {
  const [profile, setProfile] = useState([]);

  const session: any = useSession();

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
