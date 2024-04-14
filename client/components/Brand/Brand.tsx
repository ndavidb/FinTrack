import Image from "next/image";
const Brand = () => {
    return (
        <Image src="/FinTrackLogo.svg" 
               alt="FinTrackLogo" 
               width={130} 
               height={65} 
               priority
        />
    );
};
export default Brand;
