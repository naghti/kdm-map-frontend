import Image from "next/image";
import LogoImage from "../../assets/logo.png"

const LogoImg = () => {
    return (
        <>
            <Image
                src={LogoImage}
                width={104}
                height={84}
                alt={'логотип'}
            />
        </>
    );
};

export default LogoImg;