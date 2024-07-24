import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
    return (
        <section>
            <div className="max-w-screen-xl mx-auto px-4 py-24 gap-12 text-gray-600 md:px-8">
                <div className="space-y-8 max-w-4xl mx-auto text-center">
                    <h1 className="text-sm text-indigo-600 font-medium">
                        Track Your NASDAQ Stocks
                    </h1>
                    <h2 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
                        Perform a review of your stocks using <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">the most convenient stock tracking app</span>
                    </h2>
                    <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:flex-row sm:space-y-0 [&>*]:mx-5">
                        <Link href="/" className={buttonVariants({ variant: "outline" })}>
                            Features
                        </Link>
                        <Link href="/register" className={buttonVariants({ variant: "default" })}>
                            Sign Up now
                        </Link>
                    </div>
                </div>
                <div className="mt-10 relative">
                    <Image
                        src="/images/hero.jpg"
                        width={720}
                        height={1280}
                        className="w-full hidden md:block"
                        alt="fintrack_dashboard_desktop"
                    />
                    <Image
                        src="/images/hero-mobile.png"
                        width={375}
                        height={812}
                        className="w-full md:hidden"
                        alt="fintrack_dashboard_mobile"
                    />
                </div>
            </div>
        </section>
    )
}