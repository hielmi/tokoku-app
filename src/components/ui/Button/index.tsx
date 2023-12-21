import styles from "./Button.module.scss";

type PropTypes = {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: string;
  className?: string;
  isDisabled?: boolean;
};
const Button = (props: PropTypes) => {
  const {
    type,
    onClick,
    children,
    variant = "primary",
    className,
    isDisabled = false,
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
