import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { CircularProgress, Button, Box } from '@mui/material'
import { ContentCopy } from '@mui/icons-material'
import UserCard from './UserCard'
import { Link } from 'react-router-dom'

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
                    <div className="w-full flex sm:justify-end justify-center sm:mt-0 mt-8">
                        <button 
                            onClick={handleCopyLink}
                            className="px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm sm:text-base"
                        >
                            <ContentCopy className='w-4 h-4 sm:w-5 sm:h-5' /> {copySuccess ? 'Copied!' : 'Copy Share Link'}
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="w-full space-y-6">
                        <div className='text-left w-full mb-4'>
                            <p className='text-xl sm:text-2xl font-bold'>Startup Information</p>
                        </div>
                        <UserCard field="Owner" value={responseData.formData.userName} type="user" />
                        <UserCard field="Startup Name" value={responseData.formData.startupName} type="user" />
                        <UserCard field="Budget" value={responseData.formData.budget} type="user" />
                        <hr className='mt-8 border-gray-300' />

                        {/* Startup Uniqueness Score */}
                        <UserCard field="What problem are you trying to solve and what is your unique edge?" value={responseData.formData.startupIdea} type="idea" />
                        <div className="p-4 sm:p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                            <p className='font-bold text-center text-green-600 text-sm sm:text-base'>Response</p>
                            <div className='text-left w-full mb-4'>
                                <p className='text-xl sm:text-2xl font-bold'>StartUp Uniqueness Score:</p>
                                <p className='text-gray-500 text-sm sm:text-base'>How unique is your startup idea?</p>
                            </div>
                            <div className='flex items-center w-full justify-center my-2'>
                                <Box position="relative" display="inline-flex">
                                    <CircularProgress 
                                        variant="determinate" 
                                        value={responseData.analysisResponse?.startupAnalysis?.startupUniquenessScore?.score * 10}
                                        size={100}
                                        thickness={4}
                                        sx={{
                                            color: getScoreColor(responseData.analysisResponse?.startupAnalysis?.startupUniquenessScore?.score),
                                            backgroundColor: '#e5e7eb',
                                            borderRadius: '50%',
                                            '& .MuiCircularProgress-circle': {
                                                transition: 'stroke-dashoffset 0.5s ease 0s',
                                            }
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
                                        <p className='text-xl font-bold' style={{ color: getScoreColor(responseData.analysisResponse?.startupAnalysis?.startupUniquenessScore?.score) }}>
                                            {responseData.analysisResponse?.startupAnalysis?.startupUniquenessScore?.score}/10
                                        </p>
                                    </Box>
                                </Box>
                            </div>
                            <p>
                                <span className='font-bold'>Complexity:</span> {responseData.analysisResponse?.startupAnalysis?.startupUniquenessScore?.marketComplexity}
                            </p>
                            <p><span className='font-bold'>Rationale:</span> {responseData.analysisResponse?.startupAnalysis?.startupUniquenessScore?.rationale}</p>
                        </div>
                        <hr className='mt-8 border-gray-300' />

                        {/* Target Audience */}
                        <UserCard field="Target Audience" value={responseData.formData.targetAudience} type="idea" />
                        <div className="p-4 sm:p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                            <p className='font-bold text-center text-green-600 text-sm sm:text-base'>Response</p>
                            <div className='text-left w-full mb-4'>
                                <p className='text-xl sm:text-2xl font-bold'>Founder's Thought Clarity:</p>
                                <p className='text-gray-500 text-sm sm:text-base'>Assessing the clarity of your startup vision</p>
                            </div>
                            <div className='flex flex-col items-center w-full justify-center my-2'>
                                <Box position="relative" display="inline-flex">
                                    <CircularProgress 
                                        variant="determinate" 
                                        value={responseData.analysisResponse?.startupAnalysis?.foundersThoughtClarity?.fluffMeter * 10}
                                        size={100}
                                        thickness={4}
                                        sx={{
                                            color: getScoreColor(responseData.analysisResponse?.startupAnalysis?.foundersThoughtClarity?.fluffMeter),
                                            backgroundColor: '#e5e7eb',
                                            borderRadius: '50%',
                                            '& .MuiCircularProgress-circle': {
                                                transition: 'stroke-dashoffset 0.5s ease 0s',
                                            }
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
                                        <p className='text-xl font-bold' style={{ color: getScoreColor(responseData.analysisResponse?.startupAnalysis?.foundersThoughtClarity?.fluffMeter) }}>
                                            {responseData.analysisResponse?.startupAnalysis?.foundersThoughtClarity?.fluffMeter}/10
                                        </p>
                                    </Box>
                                </Box>
                                <p className='mt-2 text-gray-500'>Fluff Meter</p>
                            </div>
                            <p className='font-bold'>Potential Assumptions:</p>
                            <ul className='list-disc list-inside mb-2'>
                                {
                                    responseData.analysisResponse?.startupAnalysis?.foundersThoughtClarity?.potentialAssumptions?.map((assumption, index) => {
                                        return <li key={index}>{assumption}</li>
                                    })
                                }
                            </ul>
                            <p className='font-bold'>Biases Identified:</p>
                            <ul className='list-disc list-inside mb-2'>
                                {
                                    responseData.analysisResponse?.startupAnalysis?.foundersThoughtClarity?.biasesIdentified?.map((assumption, index) => {
                                        return <li key={index}>{assumption}</li>
                                    })
                                }
                            </ul>
                        </div>
                        <hr className='mt-8 border-gray-300' />

                        {/* TAM */}
                        <UserCard field="Estimated Total Addressable Market (TAM)?" value={responseData.formData.estimatedTAM} type="idea" />
                        <div className="p-4 sm:p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                            <p className='font-bold text-center text-green-600 text-sm sm:text-base'>Response</p>
                            <div className='text-left w-full mb-4'>
                                <p className='text-xl sm:text-2xl font-bold'>Market Assessment:</p>
                                <p className='text-gray-500 text-sm sm:text-base'>Analyzing your total addressable market</p>
                            </div>
                            {
                                Object.keys(responseData.analysisResponse?.startupAnalysis?.marketAssessment?.totalAddressableMarket).map((key, index) => {
                                    return <p key={index}><span className='font-bold mb-2'>{formatCamelCaseToTitle(key)}:</span> {responseData.analysisResponse?.startupAnalysis?.marketAssessment?.totalAddressableMarket[key]}</p>
                                })
                            }
                        </div>
                        <hr className='mt-8 border-gray-300' />
                        
                        {/* Resources */}
                        <UserCard field="Your current resources at hand for marketing / traction building ?" value={responseData.formData.resources} type="idea" />
                        <div className="p-4 sm:p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                            <p className='font-bold text-center text-green-600 text-sm sm:text-base'>Response</p>
                            <div className='text-left w-full mb-4'>
                                <p className='text-xl sm:text-2xl font-bold'>Recommended Traction Channels:</p>
                                <p className='text-gray-500 text-sm sm:text-base'>Top channels to focus on for your startup</p>
                            </div>
                            {
                                responseData.analysisResponse?.startupAnalysis?.tractionChannels?.map((channel, index) => {
                                    return (
                                        <>
                                            <div key={index}>
                                                <p className='font-bold'>{channel.channel}</p>
                                                <p><span className='text-gray-500'>CAC:</span> {channel.customerAcquisitionCost}</p>
                                                <p><span className='text-gray-500'>Complexity:</span> {channel.complexity}</p>
                                                <p><span className='text-gray-500'>Time to Results:</span> {channel.timeToResults}</p>
                                                <p><span className='text-gray-500'>Rationale:</span> {channel.rationale}</p>
                                            </div>
                                            {
                                                index !== responseData.analysisResponse?.startupAnalysis?.tractionChannels?.length - 1 && (
                                                    <hr className='my-4' />
                                                )
                                            }
                                        </>
                                    )
                                })
                            }
                        </div>

                        <div className="p-4 sm:p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                            <p className='font-bold text-center text-green-600 text-sm sm:text-base'>Response</p>
                            <div className='text-left w-full mb-4'>
                                <p className='text-xl sm:text-2xl font-bold'>Underutilized Channels:</p>
                                <p className='text-gray-500 text-sm sm:text-base'>Potential high-impact, low-competition channels</p>
                            </div>
                            {
                                responseData.analysisResponse?.startupAnalysis?.underutilizedChannels?.map((channel, index) => {
                                    return (
                                        <>
                                            <div key={index}>
                                                <p className='font-bold'>{channel.channel}</p>
                                                <p><span className='text-gray-500'>CAC:</span> {channel.customerAcquisitionCost}</p>
                                                <p><span className='text-gray-500'>Complexity:</span> {channel.complexity}</p>
                                                <p><span className='text-gray-500'>Time to Results:</span> {channel.timeToResults}</p>
                                                <p><span className='text-gray-500'>Potential Reach:</span> {channel.potentialReach}</p>
                                            </div>
                                            {
                                                index !== responseData.analysisResponse?.startupAnalysis?.underutilizedChannels?.length - 1 && (
                                                    <hr className='my-4' />
                                                )
                                            }
                                        </>
                                    )
                                })
                            }
                        </div>

                        <div className="p-4 sm:p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                            <p className='font-bold text-center text-green-600 text-sm sm:text-base'>Response</p>
                            <div className='text-left w-full mb-4'>
                                <p className='text-xl sm:text-2xl font-bold'>Recommended Next Steps:</p>
                                <p className='text-gray-500 text-sm sm:text-base'>Action items to move your startup forward</p>
                            </div>
                            <ul className='list-disc list-inside mb-2'>
                                {
                                    responseData.analysisResponse?.startupAnalysis?.recommendedNextSteps?.map((step, index) => {
                                        return <li key={index}>{step}</li>
                                    })
                                }
                            </ul>
                        </div>

                        {/* Add this new CTA section before closing the main container */}
                        <div className="mt-16 p-6 sm:p-10 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                            <div className="space-y-8 text-center">
                                {/* Hook Question */}
                                <h2 className="text-xl sm:text-2xl text-gray-600 font-medium">
                                    Liking what you see?
                                </h2>

                                {/* Brand Name & Description */}
                                <div className="space-y-3">
                                    <h1 className='font-extrabold tracking-tight leading-tight 
                                        text-2xl sm:text-3xl md:text-4xl
                                        text-gray-900'>
                                        🚀 LAUNCHLEAP
                                    </h1>
                                    <p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
                                        Your growth co-pilot, powered by the world's largest repository of decoded startup success patterns and proven playbooks.
                                    </p>
                                </div>

                                {/* Tagline */}
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                                    Stop guessing. Start growing.
                                </h3>

                                {/* Features List */}
                                <div className="max-w-xl mx-auto text-left space-y-3">
                                    {[
                                        "Custom growth roadmap with proven strategies for your startup",
                                        "AI generates your marketing content - social, emails, ads & more",
                                        "Track traction in real-time & get optimization insights",
                                        "Execute data-backed experiments that actually work"
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-start gap-2 text-gray-700">
                                            <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                                            <p className="text-sm sm:text-base">{feature}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Social Proof & Urgency */}
                                <div className="space-y-2 text-gray-600">
                                    <p className="text-sm sm:text-base">→ Join 500+ founders gaining unfair advantages with LaunchLeap</p>
                                    <p className="text-sm sm:text-base font-medium">→ Limited early access spots available</p>
                                </div>

                                {/* CTA Button */}
                                <div>
                                    <Link 
                                        to="/signup"
                                        className="bg-[#B8FF33] hover:bg-[#a5e82d] text-black font-semibold 
                                            py-3 px-8 rounded-full text-base sm:text-lg transition-colors
                                            shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                                    >
                                        Sign Up to Request Early Access Now
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* <UserCard field="Start Up Idea" value={responseData.formData.startUpIdea} type="idea" /> */}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Responses
