import { useEffect, useRef, useState } from "react";
import styles from "./Toaster.module.scss";

type PropTypes = {
  variant?: string;
  message?: string;
  setToaster?: any;
};

const toasterVariant: any = {
  success: {
    title: "Success",
    icon: "bx-check-circle",
    color: "#a3d9a5",
    barColor: "#3f9242",
  },
  danger: {
    title: "Failed",
    icon: "bx-error",
    color: "#f39b9a",
    barColor: "#bb2525",
  },
  warning: {
    title: "Warning",
    icon: "bx-error",
    color: "#f8e3a2",
    barColor: "#e9b949",
  },
};

const Toaster = (props: PropTypes) => {
  const { variant = "success", message, setToaster } = props;
  const [lengthBar, setLengthBar] = useState(100);
  const timeRef = useRef<any>(null);

  const timerStart = () => {
    timeRef.current = setInterval(() => {
      setLengthBar((prev) => prev - 0.18);
    }, 1);
  };

  useEffect(() => {
    timerStart();
    return () => {
      clearInterval(timeRef.current);
    };
  }, []);

  return (
    <div className={`${styles.toaster} ${styles[`toaster--${variant}`]}`}>
      <div className={styles.toaster__main}>
        <div className={styles.toaster__main__icon}>
          <i
            className={`bx ${toasterVariant[variant].icon}`}
            style={{
              color: toasterVariant[variant].barColor,
            }}
          />
        </div>
        <div className={styles.toaster__main__message}>
          <div
            className={styles.toaster__main__message__title}
            style={{
              color: toasterVariant[variant].barColor,
            }}
          >
            {toasterVariant[variant].title}
          </div>
          <div className={styles.toaster__main__message__desc}>{message}</div>
        </div>
        <i
          className={`bx bx-x ${styles.toaster__main__close}`}
          onClick={() => setToaster({})}
        ></i>
      </div>
      <div
        className={`${styles.toaster__timer}`}
        style={{
          backgroundColor: toasterVariant[variant].color,
        }}
      >
        <div
          style={{
            width: `${lengthBar}%`,
            height: "100%",
            backgroundColor: toasterVariant[variant].barColor,
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
};

export default Toaster;
