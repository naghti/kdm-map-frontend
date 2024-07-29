import styles from './Navbar.module.css';
import LogoImg from "../LogoImg/LogoImg";
import PushkinCard from "../../assets/PushckinCard.png";
import Image from "next/image";
import GradientText from "../Text/GradientText";
import React from "react";
import BoxWidth from "../Box/BoxWidth";

const Navbar = () => {
    return (
        <div className={styles.Navbar}>
            <BoxWidth style={{display: "flex", justifyContent: "space-between"}}>
                <div className={styles.logoBox}>
                    <LogoImg/>
                    <div className={" d-none d-md-block"}>
                        <GradientText style={{fontSize: 32}}>КУЛЬТУРНЫЙ.ДОСТУПНЫЙ.МОЙ</GradientText>
                    </div>
                </div>

                <div className={styles.pushckinCard + " d-none d-lg-block"}>
                    <Image
                        src={PushkinCard}
                        alt={"пушкинская карта"}
                        height={100}
                    />
                </div>
            </BoxWidth>
        </div>
    );
};

export default Navbar;