import styles from "./Footer.module.css"
import LogoImg from "../LogoImg/LogoImg";
import GradientText from "../Text/GradientText";
import BoxWidth from "../Box/BoxWidth";
import PointImg  from "../../assets/point.svg"
import LetterImg  from "../../assets/letter.svg"
import BellImg  from "../../assets/bell.svg"
import Image from "next/image";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <BoxWidth> 
                <BoxWidth style={{display:"flex", justifyContent:"space-between"}} className={"  flex-column flex-md-row "}>
                    <div className={"col-12 col-md-5  flex-column flex-md-row mt-1 mt-md-4"} style={{display: "flex", margin: "40px 0"}}>
                        <LogoImg/>
                        <div
                            style={{display: "flex", flexDirection: "column"}}
                        >
                            <GradientText style={{fontSize: "100%", marginBottom: 10}}>
                                КУЛЬТУРНЫЙ.ДОСТУПНЫЙ.МОЙ
                            </GradientText>
                            <GradientText style={{fontSize: 15, maxWidth: 520}}>
                                карта доступности учрждений культуры и досуга Новосибирска и Новосибирской области для
                                молодёжи с инвалидностью, участвующей в программе “Пушкинская карта”
                            </GradientText>
                        </div>
                    </div>
                    <div className={"col-12 col-md-5"} style={{display: "flex"}}>
                        <div
                            style={{display: "flex", flexDirection: "column", justifyContent:"space-around"}}
                        >

                            <GradientText style={{fontSize: 24}}>
                                КОНТАКТНАЯ ИНФОРМАЦИЯ
                            </GradientText>
                            <GradientText id="contactInfo1" style={{fontSize: 15, maxWidth: 520, display: "flex"}}>
                                <Image
                                    src={PointImg}
                                    className={"d-flex d-md-none"}
                                    style={{marginRight: "10px", width: 20}}
                                />
                                Адрес: 630073, г. Новосибирск, пр-т К. Маркса, 20
                            </GradientText>
                            <GradientText id="contactInfo2" style={{fontSize: 15, maxWidth: 520, display: "flex"}}>
                                <Image
                                    src={LetterImg}
                                    className={"d-flex d-md-none"}
                                    style={{marginRight: "10px", width: 20}}
                                />
                                Контактный номер: +7-913-870-4799
                            </GradientText>
                            <GradientText id="contactInfo3" style={{fontSize: 15, maxWidth: 520, display: "flex"}}>
                                <Image
                                    src={BellImg}
                                    className={"d-flex d-md-none"}
                                    style={{marginRight: "10px", width: 20}}
                                />
                                Телеграм-канал: t.me/kdm_map
                            </GradientText>
                        </div>
                    </div>
                </BoxWidth>
            </BoxWidth>
        </div>
    );
};

export default Footer;