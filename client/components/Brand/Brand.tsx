import Image from "next/image";
const Brand = () => {
    return (
        <Image src="/FinTrackLogo.svg" 
               alt="FinTrackLogo" 
               width={140} 
               height={70} 
               priority
        />
    );
};
export default Brand;
