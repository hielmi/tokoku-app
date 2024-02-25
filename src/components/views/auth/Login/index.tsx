import Link from "next/link";
import styles from "./Login.module.scss";
import { useRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/AuthLayout";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const LoginViews = ({ setToaster }: PropTypes) => {
  const [isLoading, setIsLoading] = useState(false);

  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
        setToaster({
          variant: "success",
          message: "Login success",
        });
      } else {
        setIsLoading(false);
        setToaster({
          variant: "danger",
          message:
            res?.error == "CredentialsSignin"
              ? "Email or Password is incorrect"
              : res?.error,
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Don't have an account? Sign Up"
    >
      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" />
        <Input label="Password" name="password" type="password" />
        <Button type="submit" className={styles.login__button}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
      <hr className={styles.login__devider} />
      <div className={styles.login__other}>
        <Button
          type="button"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
          className={styles.login__other__button}
        >
          <i className="bx bxl-google" />
          Login With Google
        </Button>
      </div>
    </AuthLayout>
  );
};

export default LoginViews;
