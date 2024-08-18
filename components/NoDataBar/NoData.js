import styles from "./NoData.module.css"

const NoData = () => {
    return (
        <div className={styles.noData}>
            <h4
                className={styles.text}
            >
                Нету подходящих по запросу мест
            </h4>
        </div>
    )
}

export default NoData