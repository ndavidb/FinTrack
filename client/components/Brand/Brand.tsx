import Image from "next/image";
const Brand = () => {
    return (
        <Image src="/FinTrackLogo.svg" 
               alt="FinTrackLogo" 
               width={100} 
               height={50} 
               priority
        />
    );
};
export default Brand;
