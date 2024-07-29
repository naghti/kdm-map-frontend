import styles from "./BoxPosition.module.css"

const BoxPosition = ({children}) => {
    return (
        <div className={styles.box}>
            {children}
        </div>
    );
};

export default BoxPosition;