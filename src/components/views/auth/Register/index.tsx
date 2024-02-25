import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const RegisterViews = ({ setToaster }: PropTypes) => {
  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };
    try {
      await authServices.registerAccount(data);
      form.reset();
      push("/auth/login");
      setIsLoading(false);
      setToaster({
        variant: "success",
        message: "Register success",
      });
    } catch (error: any) {
      const resultFromApi = error.response
        ? error.response.data
        : "failed to register account";
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: resultFromApi?.message,
      });
    }
  };

  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText="Have an account? Sign In"
    >
      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" />
        <Input label="Fullname" name="fullname" type="text" />
        <Input label="Phone" name="phone" type="number" />
        <Input label="Password" name="password" type="password" />
        <Button
          type="submit"
          className={styles.register__button}
          isDisabled={isLoading}
        >
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterViews;
