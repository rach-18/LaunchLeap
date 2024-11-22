import Navbar from '../Navbar'
import Footer from '../Footer'
import { useAppContext } from '../context/AppContext'
import ResponseCard from './ResponseCard'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { CircularProgress } from '@mui/material'

function Responses() {
    const { allResponses, setAllResponses, analysisResponse, formData, questions } = useAppContext()
    const [showModal, setShowModal] = useState(false)
    const [submitStatus, setSubmitStatus] = useState({success: false, message: ''})
    const navigate = useNavigate()

    // const submitAllResponses = async () => {
    //     // Debug log
    //     console.log('Sending data:', { responses: allResponses });

    //     try {
    //         await axios.post(`${import.meta.env.VITE_API_URL}/api/responses`, {
    //             responses: allResponses
    //         }, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             withCredentials: true
    //         })
    //         setSubmitStatus({success: true, message: 'Responses saved successfully!'})
    //     } catch (error) {
    //         console.error('Error saving responses:', error)
    //         setSubmitStatus({success: false, message: 'Error saving responses. Please try again.'})
    //     }
    //     setShowModal(true)
    // }

    const submitAllResponses = async () => {
        try {
            // Add responses to Firestore with a unique ID
            const responsesCollectionRef = collection(db, "responses")
            const docRef = await addDoc(responsesCollectionRef, {
                responses: allResponses,
                timestamp: new Date(),
                formData,
                analysisResponse,
                // Add any other metadata you want to store
            });
            
            setSubmitStatus({
                success: true, 
                message: 'Thank you for your responses! You can bookmark this page to access your results anytime.'
            })
            setAllResponses([])
            
            // Redirect to the unique response URL
            navigate(`/response/${docRef.id}`)
        } catch (error) {
            console.error('Error saving responses:', error)
            setSubmitStatus({success: false, message: 'Error saving responses. Please try again.'})
            setShowModal(true)
        }
    }

    return (
        <>
            <Navbar />
            <div className='min-h-[80vh] pt-20 pb-10 relative'>
                {/* Animation */}
                <div className="fixed h-screen w-screen top-0 inset-0 z-0 overflow-hidden">
                    <div className="absolute w-full h-full">
                        <div className="absolute left-1/4 w-[3px] h-32 bg-green-500/50 animate-line"></div>
                        <div className="absolute left-1/2 w-[3px] h-32 bg-green-500/50 animate-line delay-1000"></div>
                        <div className="absolute left-3/4 w-[3px] h-32 bg-green-500/50 animate-line delay-2000"></div>
                    </div>

                    <div className="absolute w-full h-full">
                        <div className="absolute top-1/4 w-32 h-[3px] bg-green-500/50 animate-line-horizontal"></div>
                        <div className="absolute top-1/2 w-32 h-[3px] bg-green-500/50 animate-line-horizontal delay-1000"></div>
                        <div className="absolute top-3/4 w-32 h-[3px] bg-green-500/50 animate-line-horizontal delay-2000"></div>
                    </div>

                    <div className="absolute sm:left-20 left-8 top-20 sm:w-32 w-28 sm:h-32 h-28 border-2 border-green-500/30 rounded-full animate-pulse-circle"></div>
                    <div className="absolute sm:right-20 right-8 bottom-20 sm:w-32 w-28 sm:h-32 h-28 border-2 border-green-500/30 rounded-full animate-pulse-circle delay-1000"></div>
                </div>

                {/* Main content */}
                <h1 className='text-center text-4xl font-bold'>Responses</h1>
                <p className='text-center text-gray-600'>{formData.userName}, we have analysed your startup, {formData.startupName} and here are the results</p>
                <div className='flex flex-col items-center gap-10 mt-4 max-w-3xl mx-auto relative z-10'>
                    {
                        questions.map((question, index) => {
                            return (
                                <>
                                    <div key={index} className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                                        <div className='text-left w-full mb-4'>
                                            <p className='text-lg font-bold'>{question.main}</p>
                                        <p className='text-gray-500'>{question.sub}</p>
                                        </div>
                                        <input 
                                            type="text" 
                                            required
                                            disabled
                                            value={formData[question.field]}
                                            className='w-full border-2 border-gray-200 rounded-lg p-4 
                                                    bg-white text-gray-900 placeholder-gray-400 
                                                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                                    hover:border-green-500 transition-all duration-300
                                                    shadow-sm hover:shadow-md' 
                                            />
                                    </div>
                                    {
                                        index === 0 ? (
                                            <div className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                                                <p className='font-bold text-center text-green-600'>Response:</p>
                                                <div className='text-left w-full mb-4'>
                                                    <p className='text-2xl font-bold'>StartUp Uniqueness Score:</p>
                                                    <p className='text-gray-500'>How unique is your startup idea?</p>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    {/* <CircularProgress 
                                                        variant="determinate" 
                                                        thickness={5}
                                                        size={50}
                                                        value={analysisResponse.startupAnalysis.startupUniquenessScore.score * 10}
                                                     /> */}
                                                    <p className='font-bold text-2xl pb-4'>{analysisResponse.startupAnalysis.startupUniquenessScore.score} / 10</p>
                                                    <p className='text-gray-500'>{analysisResponse.startupAnalysis.startupUniquenessScore.marketComplexity}</p>
                                                </div>
                                                <p>{analysisResponse.startupAnalysis.startupUniquenessScore.rationale}</p>
                                            </div>
                                        ) : index === 1 ? (
                                            <div className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                                                <p className='font-bold text-center text-green-600'>Response:</p>
                                                <div className='text-left w-full mb-4'>
                                                    <p className='text-2xl font-bold'>Founder's Thought Clarity:</p>
                                                    <p className='text-gray-500'>Assessing the clarity of your startup vision</p>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    {/* <CircularProgress 
                                                        variant="determinate" 
                                                        thickness={5}
                                                        size={50}
                                                        value={analysisResponse.startupAnalysis.startupUniquenessScore.score * 10}
                                                     /> */}
                                                    <p className='text-gray-500'>Fluff Meter: </p>
                                                    <p className='font-bold text-2xl pb-4'>{analysisResponse.startupAnalysis.foundersThoughtClarity.fluffMeter} / 10</p>
                                                </div>
                                                <div className='mb-4'>
                                                    <p className='font-semibold'>Potential Assumptions:</p>
                                                    <ul className='list-disc list-inside'>
                                                        {analysisResponse.startupAnalysis.foundersThoughtClarity.potentialAssumptions.map((assumption, index) => (
                                                            <li key={index}>{assumption}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <p className='font-semibold'>Biases identified:</p>
                                                    <ul className='list-disc list-inside'>
                                                        {analysisResponse.startupAnalysis.foundersThoughtClarity.biasesIdentified.map((bias, index) => (
                                                            <li key={index} className='l'>{bias}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : index === 2 ?  (
                                            <>
                                                <div className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                                                    <p className='font-bold text-center text-green-600'>Response:</p>
                                                    <div className='text-left w-full mb-4'>
                                                        <p className='text-2xl font-bold'>Market Assessment:</p>
                                                        <p className='text-gray-500'>Analyzing your total addressable market</p>
                                                    </div>
                                                    <div className='mb-4'>
                                                        <p><span className='font-semibold mb-2'>Global Digital Health Market:</span> {analysisResponse.startupAnalysis.marketAssessment.totalAddressableMarket.globalDigitalHealthMarket}</p>
                                                        <p><span className='font-semibold mb-2'>Nutrition Coaching Segment:</span> {analysisResponse.startupAnalysis.marketAssessment.totalAddressableMarket.nutritionCoachingSegment}</p>
                                                        <p><span className='font-semibold mb-2'>Realistic Addressable SAM:</span> {analysisResponse.startupAnalysis.marketAssessment.totalAddressableMarket.realisticAddressableSAM}</p>
                                                    </div>
                                                </div>
                                            </>
                                        ) : <>
                                            <div className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                                                <p className='font-bold text-center text-green-600'>Response:</p>
                                                <div className='text-left w-full mb-4'>
                                                    <p className='text-2xl font-bold'>Recommended Traction Channels:</p>
                                                    <p className='text-gray-500'>Top channels to focus on for your startup</p>
                                                </div>
                                                {
                                                    analysisResponse.startupAnalysis.tractionChannels.map((channel, index) => {
                                                        return (
                                                            <div key={index} className='mb-4'>
                                                                <p className='font-bold mb-1'>{channel.channel}</p>
                                                                <p><span className='font-semibold mb-2'>CAC:</span> {channel.customerAcquisitionCost}</p>
                                                                <p><span className='font-semibold mb-2'>Complexity:</span> {channel.complexity}</p>
                                                                <p><span className='font-semibold mb-2'>Time To Results:</span> {channel.timeToResults}</p>
                                                                <p><span className='font-semibold mb-2'>Rationale:</span> {channel.rationale}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            
                                            <div className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                                                <p className='font-bold text-center text-green-600'>Response:</p>
                                                <div className='text-left w-full mb-4'>
                                                    <p className='text-2xl font-bold'>Recommended Next Steps:</p>
                                                    <p className='text-gray-500'>Action items to move your startup forward</p>
                                                </div>
                                                <ul className='list-disc list-inside'>
                                                    {
                                                        analysisResponse.startupAnalysis.recommendedNextSteps.map((step, index) => (
                                                            <li key={index}>{step}</li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </>
                                    }                                
                                </>
                            )
                        })
                    }

                    <button 
                        to="/signup"
                        onClick={submitAllResponses}
                        className="relative px-8 py-3 bg-green-600 text-white rounded-lg 
                            hover:bg-green-700 disabled:bg-gray-400 
                            transition-all duration-300 hover:scale-105
                            shadow-md hover:shadow-lg"
                    >
                        Submit
                    </button>
                </div>

                {/* <div className='flex flex-col items-center gap-4 mt-4 w-11/12 mx-auto text-center'>
                    <p className='font-semibold'>To identify the best traction channels suggested uniquely for your product from a cutom trained AI which extracts insigts from 20+ strategies, 200+ tactics, 500 + case studies, click below to sign up! </p>
                    <Link 
                        to="/signup"
                        className="relative px-8 py-3 bg-green-600 text-white rounded-lg 
                            hover:bg-green-700 disabled:bg-gray-400 
                            transition-all duration-300 hover:scale-105
                            shadow-md hover:shadow-lg"
                    >
                        Sign Up
                    </Link>
                </div> */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md">
                            <div className="text-center">
                                {submitStatus.success ? (
                                    <svg className="mx-auto h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                ) : (
                                    <svg className="mx-auto h-12 w-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                )}
                                <h3 className={`mt-2 text-xl font-semibold ${submitStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                                    {submitStatus.success ? 'Responses saved successfully!' : 'Error'}
                                </h3>
                                <p className="mt-2 mb-5 text-gray-600">{submitStatus.message}</p>
                                {
                                    submitStatus.success ? (
                                        <div className='flex flex-col items-center gap-4 mt-4 w-11/12 mx-auto text-center'>
                                            <p>To identify the best traction channels suggested uniquely for your product from a cutom trained AI which extracts insigts from 20+ strategies, 200+ tactics, 500 + case studies, click below to sign up! </p>
                                            <Link 
                                                to="/signup"
                                                className="relative px-8 py-3 bg-green-600 text-white rounded-lg 
                                                    hover:bg-green-700 disabled:bg-gray-400 
                                                    transition-all duration-300 hover:scale-105
                                                    shadow-md hover:shadow-lg"
                                            >
                                                Sign Up
                                            </Link>
                                            <Link to='/' className='text-gray-600 underline'>Not Now</Link>
                                        </div>
                                    ) : (
                                        <Link 
                                            to="/query"
                                            className="mt-10 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                                        >
                                            Try Again
                                        </Link>   
                                    )
                                }
                                {/* <button
                                    onClick={() => setShowModal(false)}
                                    className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                                >
                                    Close
                                </button> */}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}

export default Responses;
