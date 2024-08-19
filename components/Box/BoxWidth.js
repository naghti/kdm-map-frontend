import styles from "./BoxWidth.module.css"

const BoxWidth = ({children, className = "", ...props}) => {
    return (
        <div className={styles.box + " " + className} {...props}>
            {children}
        </div>
    );
};

export default BoxWidth;