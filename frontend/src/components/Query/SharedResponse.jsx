import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { CircularProgress, Button } from '@mui/material'
import { ContentCopy } from '@mui/icons-material'

function SharedResponse() {
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
                console.log('URL copied:', currentUrl);
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            })
            .catch(err => {
                console.error('Copy failed:', err);
                alert('Failed to copy URL');
            });
    };

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

    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center gap-10 mt-4 max-w-3xl mx-auto relative z-10 mb-10'>
                <div className="w-full flex justify-end">
                    <button 
                        onClick={handleCopyLink}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
                    >
                        <ContentCopy /> {copySuccess ? 'Copied!' : 'Copy Share Link'}
                    </button>
                </div>

                <div className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                    <div className='text-left w-full mb-4'>
                        <p className='text-2xl font-bold'>Startup Information</p>
                    </div>
                    {Object.entries(responseData.formData || {}).map(([key, value]) => (
                        <div key={key} className="mb-4">
                            <p className='text-lg font-bold'>{key === 'userName' ? 'Name' : key === 'resources' ? 'Resources' : key === 'startUpName' ? 'Start Up Name' : key === 'targetAudience' ? 'Traget Audience' : key === 'budget' ? 'Budget' : key === 'estimatedTAM' ? 'TAM' : 'Start Up Idea'}</p>
                            <input 
                                type="text" 
                                disabled
                                value={value}
                                className='w-full border-2 border-gray-200 rounded-lg p-4 
                                        bg-white text-gray-900 placeholder-gray-400 
                                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                        hover:border-green-500 transition-all duration-300
                                        shadow-sm hover:shadow-md' 
                            />
                        </div>
                    ))}
                </div>

                <div className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                    <p className='font-bold text-center text-green-600'>Analysis</p>
                    <div className='text-left w-full mb-4'>
                        <p className='text-2xl font-bold'>StartUp Uniqueness Score:</p>
                        <p className='text-gray-500'>How unique is your startup idea?</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <p className='font-bold text-2xl pb-4'>
                            {responseData.analysisResponse?.startupAnalysis?.startupUniquenessScore?.score} / 10
                        </p>
                        <p className='text-gray-500'>
                            {responseData.analysisResponse?.startupAnalysis?.startupUniquenessScore?.marketComplexity}
                        </p>
                    </div>
                    <p>{responseData.analysisResponse?.startupAnalysis?.startupUniquenessScore?.rationale}</p>
                </div>

                <div className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                    <p className='font-bold text-center text-green-600'>Analysis</p>
                    <div className='text-left w-full mb-4'>
                        <p className='text-2xl font-bold'>Founder's Thought Clarity:</p>
                        <p className='text-gray-500'>Assessing the clarity of your startup vision</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <p className='text-gray-500'>Fluff Meter: </p>
                        <p className='font-bold text-2xl pb-4'>
                            {responseData.analysisResponse?.startupAnalysis?.foundersThoughtClarity?.fluffMeter} / 10
                        </p>
                    </div>
                    <div className='mb-4'>
                        <p className='font-semibold'>Potential Assumptions:</p>
                        <ul className='list-disc list-inside'>
                            {responseData.analysisResponse?.startupAnalysis?.foundersThoughtClarity?.potentialAssumptions?.map((assumption, index) => (
                                <li key={index}>{assumption}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className='font-semibold'>Biases identified:</p>
                        <ul className='list-disc list-inside'>
                            {responseData.analysisResponse?.startupAnalysis?.foundersThoughtClarity?.biasesIdentified?.map((bias, index) => (
                                <li key={index}>{bias}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                    <p className='font-bold text-center text-green-600'>Analysis</p>
                    <div className='text-left w-full mb-4'>
                        <p className='text-2xl font-bold'>Market Assessment:</p>
                        <p className='text-gray-500'>Analyzing your total addressable market</p>
                    </div>
                    <div className='mb-4'>
                        <p>
                            <span className='font-semibold mb-2'>Global Digital Health Market: </span>
                            {responseData.analysisResponse?.startupAnalysis?.marketAssessment?.totalAddressableMarket?.globalDigitalHealthMarket}
                        </p>
                        <p>
                            <span className='font-semibold mb-2'>Nutrition Coaching Segment: </span>
                            {responseData.analysisResponse?.startupAnalysis?.marketAssessment?.totalAddressableMarket?.nutritionCoachingSegment}
                        </p>
                        <p>
                            <span className='font-semibold mb-2'>Realistic Addressable SAM: </span>
                            {responseData.analysisResponse?.startupAnalysis?.marketAssessment?.totalAddressableMarket?.realisticAddressableSAM}
                        </p>
                    </div>
                </div>

                <div className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                    <p className='font-bold text-center text-green-600'>Analysis</p>
                    <div className='text-left w-full mb-4'>
                        <p className='text-2xl font-bold'>Recommended Traction Channels:</p>
                        <p className='text-gray-500'>Top channels to focus on for your startup</p>
                    </div>
                    {responseData.analysisResponse?.startupAnalysis?.tractionChannels?.map((channel, index) => (
                        <div key={index} className='mb-4'>
                            <p className='font-bold mb-1'>{channel.channel}</p>
                            <p><span className='font-semibold mb-2'>CAC:</span> {channel.customerAcquisitionCost}</p>
                            <p><span className='font-semibold mb-2'>Complexity:</span> {channel.complexity}</p>
                            <p><span className='font-semibold mb-2'>Time To Results:</span> {channel.timeToResults}</p>
                            <p><span className='font-semibold mb-2'>Rationale:</span> {channel.rationale}</p>
                        </div>
                    ))}
                </div>

                <div className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                    <p className='font-bold text-center text-green-600'>Analysis</p>
                    <div className='text-left w-full mb-4'>
                        <p className='text-2xl font-bold'>Underutilized Channels:</p>
                        <p className='text-gray-500'>Hidden opportunities for growth</p>
                    </div>
                    {responseData.analysisResponse?.startupAnalysis?.underutilizedChannels?.map((channel, index) => (
                        <div key={index} className='mb-4'>
                            <p className='font-bold mb-1'>{channel.channel}</p>
                            <p><span className='font-semibold mb-2'>CAC:</span> {channel.customerAcquisitionCost}</p>
                            <p><span className='font-semibold mb-2'>Complexity:</span> {channel.complexity}</p>
                            <p><span className='font-semibold mb-2'>Time To Results:</span> {channel.timeToResults}</p>
                            <p><span className='font-semibold mb-2'>Potential Reach:</span> {channel.potentialReach}</p>
                        </div>
                    ))}
                </div>

                <div className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full">
                    <p className='font-bold text-center text-green-600'>Analysis</p>
                    <div className='text-left w-full mb-4'>
                        <p className='text-2xl font-bold'>Recommended Next Steps:</p>
                        <p className='text-gray-500'>Action items to move your startup forward</p>
                    </div>
                    <ul className='list-disc list-inside'>
                        {responseData.analysisResponse?.startupAnalysis?.recommendedNextSteps?.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SharedResponse 