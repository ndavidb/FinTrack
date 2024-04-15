import Link from "next/link";
import Image from "next/image";

const footerMenu = [
    {
        href: 'https://www.linkedin.com/in/ndavidbello/',
        name: 'LinkedIn',
        icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
        </svg>
    },
    {
        href: 'https://github.com/ndavidb/FinTrack/blob/main/LICENSE',
        name: 'License'
    },
    {
        href: 'https://github.com/ndavidb/FinTrack/blob/main/LICENSE',
        name: 'Privacy'
    },
    {
        href: 'https://ndavidbello.live',
        name: 'About me'
    }
]

const Footer = () => {
    return (
        <footer className="pt-10 mt-20">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="space-y-6 sm:max-w-md sm:mx-auto sm:text-center">
                    <Image src="/FinTrackLogo.svg" width={130}
                           height={65}  className="w-32 sm:mx-auto" alt="FinTrack Logo"/>
                    <p>
                        Nulla auctor metus vitae lectus iaculis, vel euismod massa efficitur.
                    </p>
                </div>
                <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
                    <p className="text-md">© 2024 <a href="https://github.com/ndavidb" className="hover:text-blue-600">Nilson David Bello</a>. All rights reserved.</p>
                    <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-md sm:mt-0">
                        {
                            footerMenu.map((item, idx) => (
                                <li key={idx} className="text-gray-800 hover:text-blue-600 duration-150">
                                    <Link key={idx} href={item.href}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
