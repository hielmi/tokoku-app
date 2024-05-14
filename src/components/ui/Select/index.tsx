import { ChangeEventHandler } from "react";
import styles from "./Select.module.scss";

type Option = {
  label: string | number;
  value: string | number;
};

type Proptytpes = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  option: Option[] | any;
  onChange?: ChangeEventHandler<HTMLSelectElement> | undefined;
  className?: string;
};
const Select = (props: Proptytpes) => {
  const { label, name, defaultValue, disabled, option, className, onChange } =
    props;

  const handleSelectChange = (event: any) => {
    const selectedValue = event.target.value;
    props.onChange && props.onChange(selectedValue); // Pass additional arguments
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <label htmlFor={name}> {label}</label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className={styles.container__select}
        onChange={onChange}
      >
        {option.map((option: any) => (
          <option
            selected={option.value === defaultValue}
            value={option.value}
            key={option.label}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
