type Props = {};
const FAQs = (props: Props) => {
    const faqsList = [
        {
            q: "Is this web app really free to use?",
            a: "Absolutely! We believe everyone should have access to tools that help them manage their financial portfolios. That's why our web app is completely free."
        },
        {
            q: "Does the application support all major stock exchanges?",
            a: "Currently, we support ASX, NASDAQ, and S&P 500. We're continuously working to add more exchanges to our platform."
        },
        {
            q: "Does the app have a mobile version?",
            a: "Yes, our app is mobile-friendly and can be accessed from any device with an internet connection. We also offer mobile apps for iOS and Android devices for your convenience."
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
            a: "We do not give specific stock recommendations or provide direct financial advice. This app is not intended to be used as a professional financial platform"
        },
    ]
    
    return (
        <section className="leading-relaxed max-w-screen-xl mt-8 mx-auto px-4 md:px-8">
            <div className="space-y-3 text-center">
                <h1 className="text-3xl text-gray-800 font-semibold">
                    Frequently Asked Questions
                </h1>
                <p className="text-gray-600 max-w-lg mx-auto text-lg">
                    Answered all frequently asked questions, Still confused? feel free to contact us.
                </p>
            </div>
            <div className="mt-14 gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                {
                    faqsList.map((item, idx) => (
                        <div
                            className="space-y-3 mt-5"
                            key={idx}
                        >
                            <h4 className="text-xl text-gray-700 font-medium">
                                {item.q}
                            </h4>
                            <p className="text-gray-500">
                                {item.a}
                            </p>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};
export default FAQs;
