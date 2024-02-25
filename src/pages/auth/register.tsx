import RegisterViews from "@/components/views/auth/Register";
import { Dispatch, SetStateAction } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const RegisterPage = ({ setToaster }: PropTypes) => {
  return (
    <>
      <RegisterViews setToaster={setToaster} />
    </>
  );
};

export default RegisterPage;
