import { useState } from 'react';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

function ChannelCard() {
    const [activeTab, setActiveTab] = useState('Overview');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Overview':
                return (
                    <>
                        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col sm:items-start items-center">
                                <AttachMoneyOutlinedIcon className='text-[#689F38] mb-5' sx={{fontSize: 50}} />
                                <p className="text-gray-500 text-sm">Estimated CAC</p>
                                <p className="text-2xl font-semibold text-[#689F38]">$5</p>
                                <p className="text-gray-400 text-xs">per customer</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col sm:items-start items-center">
                                <SignalCellularAltOutlinedIcon className='text-[#689F38] mb-5' sx={{fontSize: 50}} />
                                <p className="text-gray-500 text-sm">Complexity</p>
                                <p className="text-2xl font-semibold text-[#689F38]">Medium</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col sm:items-start items-center">
                                <AccessTimeOutlinedIcon className='text-[#689F38] mb-5' sx={{fontSize: 50}} />
                                <p className="text-gray-500 text-sm">Time to Results</p>
                                <p className="text-2xl font-semibold text-[#689F38]">60 days</p>
                            </div>
                        </div>
                    </>
                );
            case 'Why?':
                return (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <div className='flex gap-2 sm:items-center items-start'>
                                <LightbulbOutlinedIcon sx={{color: '#F1CC71'}} />
                                <p className="text-black sm:text-xl text-base font-semibold">Why Community Building for Your AI Fitness App?</p>
                            </div>
                            <ul className='list-disc pl-5 space-y-4'>
                                <li>Your target audience of fitness enthusiasts actively seeks motivation and advice online</li>
                                <li>Community building allows you to showcase your AI's real-time form correction feature</li>
                                <li>Users can share their personalized workout plans, driving interest in your unique offering</li>
                                <li>Fitness communities on platforms like Reddit and Facebook are highly engaged and cost-effective to reach</li>
                                <li>Community engagement can provide valuable feedback for improving your AI algorithms</li>
                                <li>Success stories from your community can serve as powerful social proof for your app</li>
                            </ul>
                        </div>
                    </>
                );
            case 'Case Study':
                return (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <div className='flex gap-2 sm:items-center items-start'>
                                <PeopleAltOutlinedIcon sx={{color: '#F1CC71'}} />
                                <p className="text-black sm:text-xl text-base font-semibold">Case Study: Fitbod</p>
                            </div>
                            <p className='mb-2 mt-1'>Fitbod successfully grew their fitness app through community building:</p>
                            <ul className='list-disc pl-5 space-y-4'>
                                <li>Created engaged communities on social media platforms</li>
                                <li>Shared user success stories and workout tips</li>
                                <li>Hosted Q&A sessions with fitness experts</li>
                                <li>Built a loyal user base with high engagement and retention</li>
                                <li>Drove organic growth through word-of-mouth recommendations</li>
                                <li>Kept customer acquisition costs low while scaling rapidly</li>
                            </ul>
                        </div>
                    </>
                );
            case 'Action Plan':
                return (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <div className='flex gap-2 sm:items-center items-start'>
                                <ArrowForwardOutlinedIcon sx={{color: '#F1CC71'}} />
                                <p className="text-black sm:text-xl text-base font-semibold">Your AI Fitness App Action Plan</p>
                            </div>
                            <ol className='list-decimal pl-5 space-y-2'>
                                <li>
                                    <p className='font-semibold'>Setup (Week 1):</p>
                                    <ul className='list-disc sm:pl-5 space-y-4'>
                                        <li>Create a Facebook Page for your AI fitness app</li>
                                        <li>Set up a subreddit dedicated to your app</li>
                                        <li>Create accounts on Instagram and Twitter</li>
                                        <li>Join 5 relevant fitness-related Facebook groups</li>
                                        <li>Subscribe to 10 fitness-related subreddits</li>
                                    </ul>
                                </li>
                                <li>
                                    <p className='font-semibold'>Content Creation (Ongoing):</p>
                                    <ul className='list-disc sm:pl-5 space-y-4'>
                                        <li>Daily: Post one AI-generated workout tip across all platforms</li>
                                        <li>Weekly: Create and share one in-depth blog post about a fitness topic, highlighting your AI's capabilities</li>
                                        <li>Bi-weekly: Produce a video showcasing your AI's form correction feature</li>
                                    </ul>
                                </li>
                                <li>
                                    <p className='font-semibold'>Community Engagement (Ongoing):</p>
                                    <ul className='list-disc sm:pl-5 space-y-4'>
                                        <li>Daily: Respond to all comments and messages across platforms within 24 hours</li>
                                        <li>Weekly: Host a "Form Check Friday" where users can submit videos for AI analysis</li>
                                        <li>Monthly: Organize an "Ask Me Anything" session about AI in fitness</li>
                                    </ul>
                                </li>
                                <li>
                                    <p className='font-semibold'>User-Generated Content (Ongoing):</p>
                                    <ul className='list-disc sm:pl-5 space-y-4'>
                                        <li>Weekly: Feature one user transformation story</li>
                                        <li>Bi-weekly: Share a user-created workout generated by your AI</li>
                                        <li>Monthly: Run a contest for the most creative use of your AI fitness app</li>
                                    </ul>
                                </li>
                                <li>
                                    <p className='font-semibold'>Performance Tracking (Ongoing):</p>
                                    <ul className='list-disc sm:pl-5 space-y-4'>
                                        <li>Weekly: Review engagement metrics across all platforms</li>
                                        <li>Monthly: Analyze user growth, retention, and conversion rates</li>
                                        <li>Quarterly: Conduct a community survey to gather feedback and ideas for new features</li>
                                    </ul>
                                </li>
                            </ol>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="playbook-card sm:w-5/6 w-11/12 mx-auto py-4 px-6 rounded-lg mt-10">
                {/* Header */}
                <div className="flex lg:flex-row flex-col lg:items-center items-start lg:gap-0 gap-2 space-x-2 mb-4">
                    <div className='flex gap-2'>
                        {/* <span className="text-yellow-500 text-2xl font-bold">⭐</span> */}
                        <h3 className="lg:text-3xl sm:text-2xl text-xl font-semibold text-[#689F38]">#1 Recommended Channel: Community Building</h3>
                    </div>
                    <span className="ml-auto text-[#689F38] bg-[#DCFCE6] lg:text-sm text-xs font-semibold px-3 py-1 rounded-full">Top Pick</span>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap border-b border-gray-300 mb-4">
                    {['Overview', 'Why?', 'Case Study', 'Action Plan'].map((tab) => (
                        <button
                            key={tab}
                            className={`py-2 px-4 font-semibold ${
                                activeTab === tab ? 'text-gray-800 border-b-4 border-[#689F38]' : 'text-gray-500'
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="mb-6 text-gray-600">
                    {renderTabContent()}
                </div>

                {/* Content Boxes */}

                {/* Call to Action */}
                <div className="bg-[#689F38] p-6 rounded-lg text-center text-white">
                    <p className="text-lg font-semibold mb-2">🚀 Ready to Supercharge Your AI Fitness App Growth?</p>
                    <p className="text-sm mb-4">Let our AI create tailored content for your community building strategy, highlighting your app's unique features.</p>
                    <button className="bg-white text-[#689F38] font-semibold py-2 px-6 sm:rounded-full rounded-lg hover:bg-gray-100">
                        Generate AI-Powered Fitness Content
                    </button>
                </div>
            </div>
        </>
    )
}

export default ChannelCard;
