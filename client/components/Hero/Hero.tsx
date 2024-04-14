import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

export default () => {
    return (
        <section>
            <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
                <div className="space-y-8 max-w-4xl mx-auto text-center">
                    <h1 className="text-sm text-indigo-600 font-medium">
                        Track your financial stocks
                    </h1>
                    <h2 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
                        Perform a review of your stocks using <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">the most convenient stock tracking app</span>
                    </h2>
                    <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:flex-row sm:space-y-0">
                        <Link href="/" className={buttonVariants({ variant: "outline" })}>
                            Features
                        </Link>
                        <Link href="/" className={buttonVariants({ variant: "default" })}>
                            Sign Up now
                        </Link>
                    </div>
                </div>
                <div className="mt-14">
                    <img src="/images/hero.png" className="w-full shadow-lg rounded-lg border" alt="" />
                </div>
            </div>
        </section>
    )
}