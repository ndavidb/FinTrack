import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Safari from "@/components/ui/safari";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-white dark:bg-gray-900">
            <div className="max-w-screen-xl mx-auto px-4 py-16 lg:py-24 gap-12 text-gray-600 dark:text-gray-400 md:px-8">
                <div className="space-y-8 max-w-4xl mx-auto text-center">
                    <h1 className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                        Track Your NASDAQ Stocks
                    </h1>
                    <h2 className="text-4xl text-gray-800 dark:text-white font-extrabold mx-auto md:text-5xl">
                        Perform a review of your stocks using{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
                            the most convenient stock tracking app
                        </span>
                    </h2>
                    <div className="flex items-center justify-center gap-x-6 mt-8">
                        <a
                            href="#FAQS"
                            className={buttonVariants({ variant: "outline" })}
                        >
                            FAQs
                        </a>
                        <Link
                            href="/register"
                            className={buttonVariants({ variant: "default" })}
                        >
                            Sign Up now
                        </Link>
                    </div>
                </div>

                <div className="mt-16 relative w-full max-w-5xl mx-auto">
                    {/* Desktop View */}
                    <div className="hidden md:block">
                        <Safari
                            className="w-full h-auto"
                            src="/images/hero-fintrack.jpg"
                            width={1200}
                            height={750}
                        />
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden">
                        <Image
                            src="/images/hero-mobile.png"
                            width={375}
                            height={812}
                            className="w-full rounded-lg shadow-lg"
                            alt="fintrack_dashboard_mobile"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}