import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.scss";

interface PropTypes {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

const Modal = ({ children, onClose, className }: PropTypes) => {
  const ref: any = useRef();
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className={styles.modal}>
      <div className={`${styles.modal__main} ${className}`} ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
