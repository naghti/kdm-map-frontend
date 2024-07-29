import styles from "./BoxWidth.module.css"

const BoxWidth = ({children, ...props}) => {
    return (
        <div className={styles.box} {...props}>
            {children}
        </div>
    );
};

export default BoxWidth;