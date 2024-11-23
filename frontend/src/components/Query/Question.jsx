import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'

function Question() {
    const navigate = useNavigate()
    const { allResponses, setAllResponses, questions, formData, setFormData, analysisResponse, setAnalysisResponse } = useAppContext()
    const [showCopyModal, setShowCopyModal] = useState(false)
    const [responseUrl, setResponseUrl] = useState('')

    const [responses, setResponses] = useState({})
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState(() => {
        const savedId = localStorage.getItem('userId')
        return savedId || uuidv4()
    })

    const CLAUDE_PROMPT = `You are LaunchLeap. An AI that helps solopreneurs, individuals new to marketing with limited to no budget to identify unconventional channels to gain traction, based on the book Traction : How Any Startup Can Achieve Explosive Customer Growth By Gabriel Weinberg. 

        Users will share their startup idea, target audience, estimated TAM, Budget, resources at hand. You will Provide the following : 

        1. Startup uniqueness score - how well it is able to stand out / is unique. out of 10. Complexity to market.
        2. Founders thought clarity - identify fluff with fluff meter out of 10, highlight potential assumptions, biases.
        3. Provide a realistic assessment of TAM
        4. Based on the available data you will recommend 5 traction channels that are most suitable, taking into consideration user ability / app context / budget / resources etc.
        5. You will suggest the more underutilized channels whereevr possible and along with it provid the realistic Customer aquistion cost, complexity, Time to see results.
        You will receive inout in json and out put will also be in a structured json. Output will be structured exactly like the following Json : 

        {
        "startupAnalysis": {
            startupUniquenesScore": {
            "score": 7,
            "rationale": "AI-powered nutrition coaching has innovative elements, but the market is becoming increasingly crowded. Differentiation will be key.",
            "marketComplexity": "Medium-High"
            },
            "foundersThoughtClarity": {
            "fluffMeter": 6,
            "potentialAssumptions": [
                "All millennials want AI nutrition coaching",
                "Users will pay for digital nutrition guidance",
                "AI can effectively personalize nutrition recommendations"
            ],
            "biasesIdentified": [
                "Tech-solutionist bias",
                "Assumption of digital health literacy among target demographic"
            ]
            },
            "marketAssessment": {
            "totalAddressableMarket": {
                "globalDigitalHealthMarket": "$639.4 billion by 2026",
                "nutritionCoachingSegment": "$18.6 billion",
                "realisticAddressableSAM": "$5-10 million in first 2 years"
            }
            },
            "tractionChannels": [
            {
                "channel": "Targeted Instagram Influencer Marketing",
                "customerAcquisitionCost": "$15-25 per user",
                "complexity": "Medium",
                "timeToResults": "2-3 months",
                "rationale": "Direct access to health-conscious millennials"
            },
            {
                "channel": "Reddit Community Engagement",
                "customerAcquisitionCost": "$8-12 per user",
                "complexity": "Low",
                "timeToResults": "3-4 months",
                "rationale": "Highly engaged niche communities in fitness, nutrition"
            },
            {
                "channel": "Podcast Sponsorships (Health, Wellness)",
                "customerAcquisitionCost": "$35-50 per user",
                "complexity": "High",
                "timeToResults": ""4-6 months",
                "rationale": "Targeted audio content consumption by target demographic"
            },
            {
                "channel": "Viral TikTok Educational Content",
                "customerAcquisitionCost": "$5-10 per user",
                "complexity": "Low",
                "timeToResults": "1-2 months",
                "rationale": "Quick, engaging content format for younger millennials"
            },
            {
                "channel": "Product Hunt Launch",
                "customerAcquisitionCost": "$20-30 per user",
                "complexity"": ""Medium",
                "timeToResults": "Immediate initial spike",
                "rationale": "Tech-savvy audience, potential for viral tech community pickup"
            }
            ],
            "underutilizedChannels": [
            {
                "channel": "Micro-Niche Fitness/Nutrition Slack/Discord Communities",
                "customerAcquisitionCost": "$5-15 per user",
                "complexity": "Low",
                "timeToResults": "2-3 months",
                "potentialReach": "Highly engaged, low-competition spaces"
            }
            ],
            "recommendedNextSteps": [
                "Create highly targeted, value-driven content",
                "Build social proof through early user testimonials",
                "Develop a referral mechanism with incentives",
                "Focus on precise audience segmentation"
            ]
        }
    }`

    const RESPONSE_FORMAT = {
        startupAnalysis: {
            startupUniquenesScore: {
                score: 0,
                rationale: "",
                marketComplexity: ""
            },
            foundersThoughtClarity: {
                fluffMeter: 0,
                potentialAssumptions: [],
                biasesIdentified: []
            },
            marketAssessment: {
                totalAddressableMarket: {
                    globalDigitalHealthMarket: "",
                    nutritionCoachingSegment: "",
                    realisticAddressableSAM: ""
                }
            },
            tractionChannels: [
                {
                    channel: "",
                    customerAcquisitionCost: "",
                    complexity: "",
                    timeToResults: "",
                    rationale: ""
                }
            ],
            underutilizedChannels: [
                {
                    channel: "",
                    customerAcquisitionCost: "",
                    complexity: "",
                    timeToResults: "",
                    potentialReach: ""
                }
            ],
            recommendedNextSteps: []
        }
    }

    // Add useEffect to save userId to localStorage
    useEffect(() => {
        localStorage.setItem('userId', userId)
        if (formData.userName) {
            localStorage.setItem('userName', formData.userName)
        }
    }, [userId, formData.userName])

    const createUrlSafeId = (name) => {
        // Convert to lowercase, replace spaces with hyphens, remove special characters
        return name.toLowerCase()
            .trim()
            .replace(/[^a-z0-9-]/g, '-') // Replace special chars with hyphen
            .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    }

    const handleQuestionSubmit = async (e) => {
        e.preventDefault()
        if (!formData.userName.trim() || !formData.startupName.trim() || !formData.budget) return

        setLoading(true)
        try {
            const structuredInput = {
                startupIdea: formData.startupIdea || "",
                targetAudience: formData.targetAudience || "",
                estimatedTAM: formData.estimatedTAM || "",
                budget: parseInt(formData.budget),
                resources: formData.resources ? formData.resources.split(',').map(item => item.trim()) : []
            }

            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/claude`, {
                userName: formData.userName,
                startupName: formData.startupName,
                structuredInput: structuredInput,
                systemPrompt: CLAUDE_PROMPT,
                expectedFormat: JSON.stringify(RESPONSE_FORMAT)
            })
            
            console.log('Response from server:', data)
            
            if (data.response) {
                setAnalysisResponse(data.response);
                setResponses(data.response)
                
                try {
                    const responsesCollectionRef = collection(db, "responses")
                    const urlSafeName = createUrlSafeId(formData.userName)
                    const shortId = uuidv4().slice(0, 8) // Take first 8 characters of UUID
                    const customDocId = `${urlSafeName}-${shortId}`

                    // Use setDoc instead of addDoc to specify custom ID
                    const docRef = await setDoc(doc(db, "responses", customDocId), {
                        formData,
                        analysisResponse: data.response,
                        timestamp: new Date(),
                        userId: userId,
                        customId: customDocId
                    });

                    const url = `${window.location.origin}/response/${customDocId}`
                    setResponseUrl(url)
                    setShowCopyModal(true)

                    // Navigate to the response page
                    navigate(`/response/${customDocId}`)
                } catch (error) {
                    console.error('Error saving to Firebase:', error)
                }
            }
        } catch (error) {
            console.error('Error:', error)
            setResponses({ error: 'Sorry, something went wrong. Please try again.' })
        }
        setLoading(false)
    }

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(responseUrl)
            // Optionally show a success message
        } catch (err) {
            console.error('Failed to copy:', err)
            // Optionally show an error message
        }
    }

    // Add this useEffect at the top of your component
    useEffect(() => {
        // Function to adjust textarea height
        const adjustTextareaHeight = (textarea) => {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        };

        // Get all textareas
        const textareas = document.querySelectorAll('textarea');
        
        // Add input event listener to each textarea
        textareas.forEach(textarea => {
            // Initial adjustment
            adjustTextareaHeight(textarea);
            
            // Add event listener for future changes
            textarea.addEventListener('input', () => adjustTextareaHeight(textarea));
        });

        // Cleanup
        return () => {
            textareas.forEach(textarea => {
                textarea.removeEventListener('input', () => adjustTextareaHeight(textarea));
            });
        };
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto">
            <form onSubmit={handleQuestionSubmit} className="w-full space-y-8">
                {/* Name Box */}
                <div className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white">
                    <div className='text-left w-full mb-4'>
                        <p className='text-lg font-bold'>Your Name</p>
                        <p className='text-gray-500'>Please enter your name to begin</p>
                    </div>
                    <input 
                        type="text" 
                        required
                        value={formData.userName}
                        onChange={(e) => handleInputChange('userName', e.target.value)}
                        placeholder='Enter your name...' 
                        className='w-full border-2 border-gray-200 rounded-lg p-4 
                                bg-white text-gray-900 placeholder-gray-400 
                                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                hover:border-green-500 transition-all duration-300
                                shadow-sm hover:shadow-md' 
                    />
                </div>

                {/* Startup Name Box */}
                <div className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white">
                    <div className='text-left w-full mb-4'>
                        <p className='text-lg font-bold'>Startup Name</p>
                        <p className='text-gray-500'>What's the name of your startup?</p>
                    </div>
                    <input 
                        type="text" 
                        required
                        value={formData.startupName}
                        onChange={(e) => handleInputChange('startupName', e.target.value)}
                        placeholder='Enter your startup name...' 
                        className='w-full border-2 border-gray-200 rounded-lg p-4 
                                bg-white text-gray-900 placeholder-gray-400 
                                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                hover:border-green-500 transition-all duration-300
                                shadow-sm hover:shadow-md' 
                    />
                </div>

                {/* Questions */}
                {questions.map((question, idx) => (
                    <div key={idx} className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white">
                        <div className='text-left w-full mb-4'>
                            <p className='text-lg font-bold'>{question.main}</p>
                            <ReactMarkdown 
                                className='text-gray-500 prose prose-sm max-w-none space-y-6 mt-4' // Added space-y-6
                                components={{
                                    // Custom styling for specific markdown elements
                                    p: ({node, ...props}) => <p className="" {...props} />, // Added mb-6 for paragraph spacing
                                    strong: ({node, ...props}) => <span className="font-bold text-gray-700 block" {...props} />, // Added block and mb-4
                                    ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-4" {...props} />, // Added space-y-4
                                    li: ({node, ...props}) => <li className="" {...props} /> // Added mb-4
                                }}
                            >
                                {question.sub}
                            </ReactMarkdown>
                            {/* <p className='text-gray-500'>{question.sub}</p> */}
                        </div>
                        <textarea 
                            required
                            value={formData[question.field] || ''}
                            onChange={(e) => {
                                handleInputChange(question.field, e.target.value);
                                // Adjust height on change
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                            }}
                            placeholder='Type your answer here...' 
                            className='w-full border-2 border-gray-200 rounded-lg p-4 
                                    bg-white text-gray-900 placeholder-gray-400 
                                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                    hover:border-green-500 transition-all duration-300
                                    shadow-sm hover:shadow-md
                                    min-h-[100px] overflow-hidden resize-none' // Added these classes
                        />
                    </div>
                ))}

                {/* Budget Box */}
                <div className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white">
                    <div className='text-left w-full mb-4'>
                        <p className='text-lg font-bold'>Monthly Marketing Budget</p>
                        <p className='text-gray-500'>What's your estimated budget for this project? (in USD)</p>
                    </div>
                    <select 
                        name="budget" 
                        id="budget" 
                        required 
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className='w-full border-2 border-gray-200 rounded-lg p-4 
                                bg-white text-gray-900 placeholder-gray-400 
                                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                hover:border-green-500 transition-all duration-300
                                shadow-sm hover:shadow-md'
                    >
                        <option value="" disabled selected>Select your monthly budget</option>
                        <option value="$0 - $500">$0 - $500</option>
                        <option value="$501 - $2,000">$501 - $2,000</option>
                        <option value="$2,001 - $5,000">$2,001 - $5,000</option>
                        <option value="$5,001 - $10,000">$5,001 - $10,000</option>
                        <option value="$10,000+">$10,000+</option>
                    </select>
                </div>
                
                <div className="flex justify-center">
                    <button 
                        type="submit"
                        disabled={loading}
                        className="relative px-8 py-3 bg-green-600 text-white rounded-lg 
                                hover:bg-green-700 disabled:bg-gray-400 
                                transition-all duration-300 hover:scale-105
                                shadow-md hover:shadow-lg"
                    >
                        {loading ? 'Getting Answers...' : 'Submit All Questions'}
                    </button>
                </div>
            </form>

            {/* Copy Link Modal */}
            {showCopyModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-green-600 mb-4">
                                Responses saved successfully!
                            </h3>
                            <p className="mb-4">
                                You can access your results anytime using this link:
                            </p>
                            <div className="flex items-center gap-2 mb-4">
                                <input 
                                    type="text" 
                                    value={responseUrl} 
                                    readOnly 
                                    className="w-full p-2 border rounded"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Copy
                                </button>
                            </div>
                            <button
                                onClick={() => setShowCopyModal(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Question;
