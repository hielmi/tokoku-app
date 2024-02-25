import LoginViews from "@/components/views/auth/Login";
import { Dispatch, SetStateAction } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const LoginPage = ({ setToaster }: PropTypes) => {
  return (
    <>
      <LoginViews setToaster={setToaster} />
    </>
  );
};

export default LoginPage;
