import styles from "./Loader.module.css"
import Image from 'next/image'
import spinner from "../../assets/Spinner.gif"

const Loader = () => {
    return (
        <div className={styles.loader}>
            <Image
                src={spinner}
            />
        </div>
    )
}

export default Loader