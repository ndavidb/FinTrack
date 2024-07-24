import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

type Props = {};
const FAQs = (props: Props) => {
    const faqsList = [
        {
            q: "Is this a real stock trading platform?",
            a: "FinTrack is a  project created for demonstration purposes and not for commercial use. While it aims to be realistic by using real world data, it should not be used for actual investment decisions."
        },
        {
            q: "Does the application support all major stock exchanges?",
            a: "Currently, it supports NASDAQ. I'm continuously working to add more exchanges to the platform."
        },
        {
            q: "Does the app have a mobile version?",
            a: "FinTrack is mobile-friendly and can be accessed from any device with an internet connection."
        },
        {
            q: "Can I export my portfolio data for analysis?",
            a: "Yes, you can export your portfolio data in various formats such as CSV or Excel for further analysis. Go to your portfolio page and look for the \'Export' option."
        },
        {
            q: "Can I share my portfolio with others?",
            a: "At this time, sharing your portfolio with others directly through the app is not available. However, you can export your portfolio data and share it with others as needed."
        },
        {
            q: "Does the app provide stock recommendations or investment advice?",
            a: "No, FinTrack is not designed to provide financial advice. It's a demonstration tool to understand how stock tracking works."
        },
    ]

    return (
        <section id="FAQS" className="leading-relaxed max-w-screen-xl mt-20 mb-10 mx-auto px-4 md:px-8">
            <div className="space-y-3 text-center">
                <h1 className="text-3xl text-gray-800 font-semibold">
                    Frequently Asked Questions
                </h1>
                <p className="text-gray-600 max-w-lg mx-auto text-lg">
                    Answered all frequently asked questions, Still confused? feel free to reach out to me on LinkedIn.
                </p>
            </div>
            <Accordion type="single" collapsible className="w-full mt-10">
                {
                    faqsList.map((item, idx) => (
                        <AccordionItem key={idx} value={`item-${idx}`}>
                            <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                            <AccordionContent>
                                {item.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </section>
    );
};
export default FAQs;
