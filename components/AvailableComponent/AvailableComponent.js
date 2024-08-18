import earRed from '../../assets/earRed.svg';
import earGreen from '../../assets/earGreen.svg';
import earOrange from '../../assets/earOrange.svg';
import bleedRed from '../../assets/bleedRed.svg';
import bleedGreen from '../../assets/bleedGreen.svg';
import bleedOrange from '../../assets/bleedOrange.svg';
import invalidRed from '../../assets/invalidRed.svg';
import invalidGreen from '../../assets/invalidGreen.svg';
import invalidOrange from '../../assets/invalidOrange.svg';
import Image from "next/image";
import styles from "./AvailableComponent.module.css"

const AvailableComponent = ({name, available, description}) => {
    const images = {
        ear: [earRed, earOrange, earGreen],
        invalid: [invalidRed, invalidOrange, invalidGreen],
        bleed: [bleedRed, bleedOrange, bleedGreen],
    }
    const text = [
        {
            text: "Не доступно",
            color: "rgba(214, 18, 18, 1)"
        },
        {
            text: "Частично доступно",
            color: "rgba(255, 135, 12, 1)"
        },
        {
            text: "Полностью доступно",
            color: "rgba(23, 180, 34, 1)"
        },
    ]
    const currentImage = images[name][available]

    return (
        <div className={styles.availableComponent}>
            <div className={styles.imageBox}>
                <Image
                    className={styles.availableImg}
                    src={currentImage}
                    alt={"icon"}
                />
            </div>
            <div className={styles.infoBox}>
                <span
                    className={styles.infoHeader}
                    style={{color: text[available].color}}
                >
                    {text[available].text}
                </span>
                <ul>
                {
                    description.map((item, i) => (
                        <li
                            className={styles.availableDescription}
                            key={i}
                        >
                            {item}
                        </li>
                    ))
                }
                </ul>
            </div>
        </div>
    );
};

export default AvailableComponent;