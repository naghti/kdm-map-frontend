import styles from "./UsersCount.module.css"
import userIcon from "../../assets/userIcon.png"
import Image from "next/image"
import GradientText from "../Text/GradientText"
import { usePointsStore } from "../../store/Store"

function UsersCount() {
    const {visitsAmount} = usePointsStore()

    return (
    <div className={styles.box}>
        <div className={styles.outline}>
            <div className={styles.outline_text}>
                <GradientText style={{fontSize: "1.25rem"}}>
                    кол-во посетителей
                </GradientText>
            </div>
            <Image 
                src={userIcon}
                className={styles.image}
            />
            <div className={styles.num}>
                {visitsAmount}
            </div>
        </div>
    </div>
  )
}

export default UsersCount