import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { CircularProgress, Button, Box } from '@mui/material'
import { ContentCopy } from '@mui/icons-material'
import ReactMarkdown from 'react-markdown'
import UserCard from './UserCard'
function Responses() {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [responseData, setResponseData] = useState(null)
    const [error, setError] = useState(null)
    const [copySuccess, setCopySuccess] = useState(false)

    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const docRef = doc(db, "responses", id)
                const docSnap = await getDoc(docRef)
                
                if (docSnap.exists()) {
                    const data = docSnap.data()
                    console.log('Firebase Data:', data)
                    setResponseData(docSnap.data())
                } else {
                    setError("Response not found")
                }
            } catch (err) {
                setError("Error loading response")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchResponse()
    }, [id])

    const handleCopyLink = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            })
            .catch(err => {
                console.error('Copy failed:', err);
                alert('Failed to copy URL');
            });
    };

    const getScoreColor = (score) => {
        if (score >= 7) return '#22c55e' // green-500
        if (score >= 4) return '#eab308' // yellow-500
        return '#ef4444' // red-500
    }

    const formatCamelCaseToTitle = (input) => {
        return input
            .replace(/([A-Z])/g, " $1") // Insert space before uppercase letters
            .replace(/^./, str => str.toUpperCase()) // Capitalize the first letter
            .trim(); // Remove any leading/trailing spaces
    }

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <CircularProgress />
                </div>
                <Footer />
            </>
        )
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-red-600">{error}</h1>
                        <p className="text-gray-600">Please check the URL and try again</p>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    console.log(responseData)

    return (
        <>
            <Navbar />
            <div className='min-h-[80vh] pt-16 sm:pt-20 pb-10 relative'>
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

                <div className='flex flex-col items-center gap-6 sm:gap-10 mt-4 mx-4 sm:mx-auto max-w-3xl relative z-10 mb-10'>
                    {/* Copy Link Button */}
                    <div className="w-full flex justify-end">
                        <button 
                            onClick={handleCopyLink}
                            className="px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm sm:text-base"
                        >
                            <ContentCopy className="w-4 h-4 sm:w-5 sm:h-5" /> 
                            {copySuccess ? 'Copied!' : 'Copy Share Link'}
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="w-full space-y-6">
                        <div className='text-left w-full mb-4'>
                            <p className='text-xl sm:text-2xl font-bold'>Startup Information</p>
                        </div>
                        
                        {/* User Cards */}
                        <UserCard field="Owner" value={responseData.formData.userName} type="user" />
                        <UserCard field="Startup Name" value={responseData.formData.startupName} type="user" />
                        <UserCard field="Budget" value={responseData.formData.budget} type="user" />
                        <hr className='mt-8 border-gray-300' />

                        {/* Response Cards */}
                        <div className="space-y-6">
                            {/* Startup Uniqueness Score Card */}
                            <div className="p-4 sm:p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                                <p className='font-bold text-center text-green-600 text-sm sm:text-base'>Response</p>
                                <div className='text-left w-full mb-4'>
                                    <p className='text-xl sm:text-2xl font-bold'>StartUp Uniqueness Score:</p>
                                    <p className='text-gray-500 text-sm sm:text-base'>How unique is your startup idea?</p>
                                </div>
                                
                                {/* Score Circle */}
                                <div className='flex items-center w-full justify-center my-2'>
                                    <Box position="relative" display="inline-flex">
                                        <CircularProgress 
                                            variant="determinate" 
                                            value={responseData.analysisResponse?.startupAnalysis?.startupUniquenessScore?.score * 10}
                                            size={80} // Smaller on mobile
                                            className="sm:w-[100px] sm:h-[100px]" // Larger on desktop
                                            thickness={4}
                                            sx={{
                                                color: getScoreColor(responseData.analysisResponse?.startupAnalysis?.startupUniquenessScore?.score),
                                                backgroundColor: '#e5e7eb',
                                                borderRadius: '50%',
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                top: 0,
                                                left: 0,
                                                bottom: 0,
                                                right: 0,
                                                position: 'absolute',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <p className='text-lg sm:text-xl font-bold' style={{ color: getScoreColor(responseData.analysisResponse?.startupAnalysis?.startupUniquenessScore?.score) }}>
                                                {responseData.analysisResponse?.startupAnalysis?.startupUniquenessScore?.score}/10
                                            </p>
                                        </Box>
                                    </Box>
                                </div>

                                {/* Score Details */}
                                <div className="space-y-2 text-sm sm:text-base">
                                    <p>
                                        <span className='font-bold'>Complexity:</span> {responseData.analysisResponse?.startupAnalysis?.startupUniquenessScore?.marketComplexity}
                                    </p>
                                    <p>
                                        <span className='font-bold'>Rationale:</span> {responseData.analysisResponse?.startupAnalysis?.startupUniquenessScore?.rationale}
                                    </p>
                                </div>
                            </div>

                            {/* Similar pattern for other cards... */}
                            {/* For each subsequent card, follow the same pattern of responsive padding, text sizes, and spacing */}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Responses
