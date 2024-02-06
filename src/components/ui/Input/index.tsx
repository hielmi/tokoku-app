import styles from "./Input.module.scss";
type PropsTypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
};

const Input = (props: PropsTypes) => {
  const {
    label,
    name,
    type,
    placeholder,
    defaultValue,
    disabled = false,
  } = props;
  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={styles.container__input}
        disabled={disabled}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Input;
