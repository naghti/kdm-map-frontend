import styles from "./GradientText.module.css"

const GradientText = ({children, ...props}) => {
    return (
        <span {...props} className={styles.text}>
            {children}
        </span>
    );
};

export default GradientText;