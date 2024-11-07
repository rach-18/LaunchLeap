import { useState } from "react";

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is LaunchLeap, and how does it work?",
            answer: "LaunchLeap is a platform designed to help startup founders quickly identify and leverage the most effective marketing channels for their product. By analyzing your startup details, it provides personalized, data-driven insights into the best traction strategies. Simply enter your idea, and our AI will recommend marketing channels, content, and a step-by-step action plan tailored to you."
        },
        {
            question: "How is LaunchLeap different from using AI tools like ChatGPT or Claude?",
            answer: "Unlike general AI tools, LaunchLeap provides a structured, step-by-step growth plan specifically designed for startups. It uses validated strategies backed by case studies and offers a centralized dashboard to track your progress and ROI, making your marketing efforts more cohesive and results-oriented compared to generic advice."
        },
        {
            question: "Do I need marketing experience to use LaunchLeap?",
            answer: "No marketing experience is required! LaunchLeap is designed to guide both seasoned marketers and beginners. Our platform offers clear instructions and tailored strategies, making it easy for anyone to execute effective marketing campaigns and achieve traction."
        },
        {
            question: "What kind of results can I expect from using LaunchLeap?",
            answer: "LaunchLeap helps you identify and focus on the most impactful marketing channels for your startup, leading to reduced customer acquisition costs and increased traction. You can expect to see more efficient growth and measurable engagement within 30-60 days of following the recommended strategies."
        },
        {
            question: "Can LaunchLeap help me with content creation?",
            answer: "Absolutely! LaunchLeap provides channel-specific content ideas and suggestions tailored to your business, including examples for social media posts, blog content, and ad copy. Our AI ensures the content is targeted to your audience, making it much more effective compared to generic content."
        },
        {
            question: "How does LaunchLeap help me track progress?",
            answer: "LaunchLeap features an all-in-one traction dashboard where you can track campaign performance, measure ROI, and see how your different channels are performing. This allows you to make data-driven decisions on where to invest more and which channels to optimize."
        },
        {
            question: "How does the AI choose which channels are best for my startup?",
            answer: "Our AI analyzes your product details, audience, and business objectives to recommend specific channels. It looks at case studies, industry trends, and data from similar products to pinpoint which channels will be most effective for your unique needs."
        },
        {
            question: "What are the main advantages of using LaunchLeap over traditional marketing consulting?",
            answer: "Traditional consulting can be costly and time-consuming, whereas LaunchLeap offers fast, cost-effective insights tailored to startups. With AI-driven recommendations, you can get results without waiting for weeks of analysis. It’s like having a dedicated marketing strategist at a fraction of the cost."
        },
        {
            question: "Do I get ongoing support and updates to my strategy?",
            answer: "Yes! LaunchLeap is not a one-off solution. As your campaigns run, the platform continues to analyze performance and optimize recommendations based on what’s working best, ensuring that you continuously adapt to changes and grow effectively."
        },
        {
            question: "What types of startups benefit most from LaunchLeap?",
            answer: "LaunchLeap is ideal for early-stage startups, solopreneurs, and small teams looking for cost-effective ways to validate their product, gain traction, and grow. Whether you’re launching an app, an online service, or a consumer product, LaunchLeap provides personalized traction channels that fit your unique offering."
        }
    ];

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <div className="mt-20 w-11/12 mx-auto">
                <p className="text-center font-bold lg:text-5xl sm:text-4xl text-3xl text-[#1e1e1e]">FAQ</p>
                {faqs.map((faq, index) => (
                    <div key={index} className="my-10">
                        <div 
                            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-100"
                            onClick={() => toggleAnswer(index)}
                        >
                            <span className="lg:text-lg text-base font-semibold text-gray-800">{faq.question}</span>
                            <span className="text-xl font-bold text-green-500">{openIndex === index ? '-' : '+'}</span>
                        </div>
                        {openIndex === index && (
                            <div className="mt-2 px-6 py-4 text-gray-700 bg-gray-50 rounded-lg">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}             
            </div>
        </>
    )
}

export default FAQ;
