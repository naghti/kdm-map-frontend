import styles from "./Button.module.css"

const Button = ({text}) => {
    return (
        <input
            type={"button"}
            value={text}
            className={styles.button + " col-md-2"}
        />
    );
};

export default Button;