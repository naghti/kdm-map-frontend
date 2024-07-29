import styles from './PointActive.module.css'
import point from "./Point";
import AvailableComponent from "../AvailableComponent/AvailableComponent";
import {nextConfig} from "../../next.config";
import {usePointsStore} from "../../store/Store";

const PointActive = ({info}) => {
    const {activePointer, changeActivePointer} = usePointsStore()

    const availableArray = JSON.parse(info.accessibility[0])
    const backImg = nextConfig.URL + info.photos[0]

    function click (event) {
        event.stopPropagation()
        changeActivePointer({})
    }

    return (
        <div
            className={styles.point}
            onClick={(e) => click(e)}
        >
            <div style={{textAlign: "center"}}>
                <span className={styles.name}>{info.name}</span>
            </div>
            <img
                className={styles.pointImage}
                src={backImg}
                alt="фотография места"
            />
            <span
                className={styles.pointType}
            >
                {info.type}
            </span>
            <span
                className={styles.pointDescription}
            >
                {info.description}
            </span>
            <div className={styles.availableBox}>
                {
                    availableArray.map((item, i) => (
                        <AvailableComponent
                            key={i}
                            name={item.name}
                            available={item.available}
                            description={item.description}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default PointActive;