import Navbar from '../Navbar'
import Footer from '../Footer'
import { useAppContext } from '../context/AppContext'
import ResponseCard from './ResponseCard'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'
import { collection, addDoc } from 'firebase/firestore'

function Responses() {
    const { allResponses, setAllResponses } = useAppContext()
    const [showModal, setShowModal] = useState(false)
    const [submitStatus, setSubmitStatus] = useState({success: false, message: ''})

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
            // Add responses to Firestore
            const responsesCollectionRef = collection(db, "responses")
            await addDoc(responsesCollectionRef, {
                responses: allResponses,
                timestamp: new Date(),
                // Add any other metadata you want to store
            });
            
            setSubmitStatus({success: true, message: 'Thank you for your responses!'})
            setAllResponses([])
        } catch (error) {
            console.error('Error saving responses:', error)
            setSubmitStatus({success: false, message: 'Error saving responses. Please try again.'})
        }
        setShowModal(true)
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
                <div className='flex flex-col items-center gap-10 mt-4'>
                    <div className='w-11/12 mx-auto mt-5 flex flex-wrap gap-5 justify-center relative z-10'>
                        {allResponses.map((response, index) => (
                            <ResponseCard key={index} main={response.question} userInput={response.userInput} response={response.response} />
                        ))}
                    </div>

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
