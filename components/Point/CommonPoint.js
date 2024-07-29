import React, {useState} from 'react';
import styles from "./CommonPoint.module.css";
import {nextConfig} from "../../next.config";

const CommonPoint = ({info}) => {
    const backImg = nextConfig.API_URL + info.photos[0]


    return (
        <div
            className={styles.point}
        >
            <div className={styles.pointImageBox}>
                <img
                    src={backImg}
                    alt={"фотография места"}
                    className={styles.pointImage}
                />
            </div>

            <span
                className={styles.pointName}
            >
                {info.name}
            </span>
        </div>
    );
};

export default CommonPoint;