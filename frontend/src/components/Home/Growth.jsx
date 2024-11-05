import React from "react";

function Growth() {
  const steps = [
    {
      id: 1,
      title: "Share Your Vision",
      description:
        "Tell us about your startup and customers. A simple 2 minute questionnaire to understand your unique needs.",
      tag: "Quick Setup",
    },
    {
      id: 2,
      title: "Get Your Growth Playbook",
      description:
        "Recreate your personalized list of high-potential, unsaturated marketing channels, complete with costs, content strategies, and real success stories.",
      tag: "Data-Backed Insights",
    },
    {
      id: 3,
      title: "Launch & Monitor",
      description:
        "Execute your campaigns with confidence. Track performance in real-time to identify your winning channels.",
      tag: "Clear ROI Tracking",
    },
    {
      id: 4,
      title: "Scale What Works",
      description:
        "Double down your best channels. Get AI-powered suggestions to best optimize your content and approach for exponential growth.",
      tag: "Continuous Growth",
    },
  ];

  return (
    <>
        <div className="mt-20 w-11/12 mx-auto">
            <p className="text-center font-bold text-5xl text-[#1e1e1e]">Your Path To Predictable Growth</p>
            <div className="flex flex-col items-center space-y-12 p-8">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-start space-x-4">
                        {
                            index % 2 === 1 && (
                                <div className="bg-green-50 border-l-4 border-green-200 rounded-lg p-4 shadow-lg max-w-xs">
                                    <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                                    <p className="text-gray-600 mt-2 text-sm">{step.description}</p>
                                    <span className="inline-block bg-green-100 text-green-600 text-xs font-medium mt-4 px-2 py-1 rounded-full">
                                    {step.tag}
                                    </span>
                                </div>
                            )
                        }
                        <div className="flex items-center">
                            {
                                index % 2 === 1 && (
                                    <div className="w-24 bg-green-200 h-0.5"></div>
                                )
                            }
                            <div className="w-10 h-10 bg-green-200 text-green-600 font-semibold rounded-full flex items-center justify-center text-lg">
                            {step.id}
                            </div>
                            {
                                index % 2 === 0 && (
                                    <div className="w-24 bg-green-200 h-0.5"></div>
                                )
                            }
                        </div>
                        {
                            index % 2 === 0 && (
                                <div className="bg-green-50 border-l-4 border-green-200 rounded-lg p-4 shadow-lg max-w-xs">
                                    <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                                    <p className="text-gray-600 mt-2 text-sm">{step.description}</p>
                                    <span className="inline-block bg-green-100 text-green-600 text-xs font-medium mt-4 px-2 py-1 rounded-full">
                                    {step.tag}
                                    </span>
                                </div>
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    </>
  );
}

export default Growth;
