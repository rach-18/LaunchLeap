import React from "react";

function Growth() {
  return (
    <>
      <div className="mt-20 w-11/12 mx-auto">
        <h2 className="text-center font-bold lg:text-5xl sm:text-4xl text-3xl text-[#1e1e1e]">Your Path To Predictable Growth</h2>
        <div className="growth flex flex-col items-center space-y-12 p-8">
          {/* Step 1 */}
          <div>
            <div className="flex sm:flex-row flex-col sm:items-start items-center sm:gap-0 gap-2 space-x-4">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-200 text-green-600 font-semibold rounded-full flex items-center justify-center text-lg">
                        1
                    </div>
                    <div className="sm:block hidden w-24 bg-green-200 h-0.5"></div>
                </div>
                <div className="bg-green-50 border-l-4 border-green-200 rounded-lg p-4 shadow-lg max-w-xs">
                  <h3 className="text-lg font-semibold text-gray-800">Share Your Vision</h3>
                  <p className="text-gray-600 mt-2 text-sm">
                      Tell us about your startup and customers. A simple 2-minute questionnaire to understand your unique needs.
                  </p>
                  <span className="inline-block bg-green-100 text-green-600 text-xs font-medium mt-4 px-2 py-1 rounded-full">
                      Quick Setup
                  </span>
                </div>
            </div>

          </div>

          {/* Step 2 */}
          <div className="flex sm:flex-row flex-col sm:items-start items-center sm:gap-0 gap-2 space-x-4">
            <div className="sm:hidden block flex items-center">
              <div className="sm:block hidden w-24 bg-green-200 h-0.5"></div>
              <div className="w-10 h-10 bg-green-200 text-green-600 font-semibold rounded-full flex items-center justify-center text-lg">
                2
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-200 rounded-lg p-4 shadow-lg max-w-xs">
              <h3 className="text-lg font-semibold text-gray-800">Get Your Growth Playbook</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Recreate your personalized list of high-potential, unsaturated marketing channels, complete with costs, content strategies, and real success stories.
              </p>
              <span className="inline-block bg-green-100 text-green-600 text-xs font-medium mt-4 px-2 py-1 rounded-full">
                Data-Backed Insights
              </span>
            </div>
            <div className="sm:block hidden flex items-center">
              <div className="sm:block hidden w-24 bg-green-200 h-0.5"></div>
              <div className="w-10 h-10 bg-green-200 text-green-600 font-semibold rounded-full flex items-center justify-center text-lg">
                2
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex sm:flex-row flex-col sm:items-start items-center sm:gap-0 gap-2 space-x-4">
            <div className="flex items-center">
                <div className="w-10 h-10 bg-green-200 text-green-600 font-semibold rounded-full flex items-center justify-center text-lg">
                    3
                </div>
                <div className="sm:block hidden w-24 bg-green-200 h-0.5"></div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-200 rounded-lg p-4 shadow-lg max-w-xs">
              <h3 className="text-lg font-semibold text-gray-800">Launch & Monitor</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Execute your campaigns with confidence. Track performance in real-time to identify your winning channels.
              </p>
              <span className="inline-block bg-green-100 text-green-600 text-xs font-medium mt-4 px-2 py-1 rounded-full">
                Clear ROI Tracking
              </span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex sm:flex-row flex-col sm:items-start items-center sm:gap-0 gap-2 space-x-4">
            <div className="sm:hidden block flex items-center">
              <div className="sm:block hidden w-24 bg-green-200 h-0.5"></div>
              <div className="w-10 h-10 bg-green-200 text-green-600 font-semibold rounded-full flex items-center justify-center text-lg">
                4
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-200 rounded-lg p-4 shadow-lg max-w-xs">
              <h3 className="text-lg font-semibold text-gray-800">Scale What Works</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Double down your best channels. Get AI-powered suggestions to best optimize your content and approach for exponential growth.
              </p>
              <span className="inline-block bg-green-100 text-green-600 text-xs font-medium mt-4 px-2 py-1 rounded-full">
                Continuous Growth
              </span>
            </div>
            <div className="sm:block hidden flex items-center">
              <div className="sm:block hidden w-24 bg-green-200 h-0.5"></div>
              <div className="w-10 h-10 bg-green-200 text-green-600 font-semibold rounded-full flex items-center justify-center text-lg">
                4
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Growth;
