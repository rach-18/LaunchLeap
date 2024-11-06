import { useState } from "react";

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut."
        },
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut."
        },
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut."
        },
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut."
        }
    ];

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <div className="mt-20 w-11/12 mx-auto">
                <p className="text-center font-bold text-5xl text-[#1e1e1e]">FAQ</p>
                {faqs.map((faq, index) => (
                    <div key={index} className="my-10">
                        <div 
                            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-100"
                            onClick={() => toggleAnswer(index)}
                        >
                            <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
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
