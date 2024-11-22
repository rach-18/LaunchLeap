import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

function Question() {
    const navigate = useNavigate()
    const { allResponses, setAllResponses, questions, formData, setFormData, analysisResponse, setAnalysisResponse } = useAppContext()

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
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            
            console.log('Response from server:', data)
            
            if (data.response) {
                console.log('Analysis Response:', data.response);
                setAnalysisResponse(data.response);
                setResponses(data.response)
                
                const formattedResponse = {
                    userName: formData.userName,
                    userId,
                    startupName: formData.startupName,
                    input: structuredInput,
                    response: data.response
                }
                
                setAllResponses([...allResponses, formattedResponse])
                navigate('/responses')
            } else {
                console.error('Unexpected response format:', data)
                setResponses({ error: 'Unexpected response format from server' })
            }
            console.log('Analysis Response:', analysisResponse)
        } catch (error) {
            console.error('Error:', error)
            setResponses({ error: 'Sorry, something went wrong. Please try again.' })
        }
        setLoading(false)
        console.log('Form data:', formData)
        console.log('All Responses:', allResponses)
    }

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

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

                {/* Budget Box */}
                <div className="p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white">
                    <div className='text-left w-full mb-4'>
                        <p className='text-lg font-bold'>Budget</p>
                        <p className='text-gray-500'>What's your estimated budget for this project? (in USD)</p>
                    </div>
                    <input 
                        type="number" 
                        required
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        placeholder='Enter your budget...' 
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
                            <p className='text-gray-500'>{question.sub}</p>
                        </div>
                        <input 
                            type="text" 
                            required
                            value={formData[question.field] || ''}
                            onChange={(e) => handleInputChange(question.field, e.target.value)}
                            placeholder='Type your answer here...' 
                            className='w-full border-2 border-gray-200 rounded-lg p-4 
                                    bg-white text-gray-900 placeholder-gray-400 
                                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                    hover:border-green-500 transition-all duration-300
                                    shadow-sm hover:shadow-md' 
                        />
                    </div>
                ))}
                
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
        </div>
    )
}

export default Question;
