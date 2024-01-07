import styles from './Select.module.scss'

type Option = {
    label: string;
    value: string;
}

type Proptytpes = {
    label?: string;
    name: string;
    defaultValue? : string;
    disabled?: boolean;
    option: Option[]
}
const Select = (props: Proptytpes) => {
    const { label, name, defaultValue, disabled, option } = props;
    return (
        <div className={styles.container}>
            <label htmlFor={name}> {label}</label>
            <select
                name={name}
                id={name}
                defaultValue={defaultValue}
                disabled={disabled}
                className={styles.container__select}
            >
                {option.map((option) => (
                    <option value={option.value} key={option.label} >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select;