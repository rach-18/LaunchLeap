import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { v4 as uuidv4 } from 'uuid'

function Question() {
    const { allResponses, setAllResponses, questions } = useAppContext()

    const [query, setQuery] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)
    const [index, setIndex] = useState(0);
    const [userName, setUserName] = useState('')
    const [userNameReceived, setUserNameReceived] = useState(false)
    const [userId, setUserId] = useState(() => {
        // Check if userId exists in localStorage, if not create new one
        const savedId = localStorage.getItem('userId')
        return savedId || uuidv4()
    })

    // Add useEffect to save userId to localStorage
    useEffect(() => {
        localStorage.setItem('userId', userId)
        if (userName) {
            localStorage.setItem('userName', userName)
        }
    }, [userId, userName])

    const handleNameSubmit = (e) => {
        e.preventDefault()
        if (!userName.trim()) return
        // Just save the name and continue
        localStorage.setItem('userName', userName)
        setUserNameReceived(true)
    }

    const handleQuestionSubmit = async (e) => {
        e.preventDefault()
        if (!query.trim() || !userName.trim()) return

        setLoading(true)
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/claude`, {query, userName, userId}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                // withCredentials: true
            })
            setResponse(data.response)
            setAllResponses([...allResponses, {
                userName,
                userId,
                question: questions[index].main,
                subQuestion: questions[index].sub,
                userInput: query,
                response: data.response
            }])
        } catch (error) {
            console.error('Error:', error)
            setResponse('Sorry, something went wrong. Please try again.')
        }
        setLoading(false)
    }

    const handleContinue = () => {
        setIndex(index + 1)
        setResponse('')
    }

    return (
        <>
            {!userNameReceived ? (
                <form onSubmit={handleNameSubmit} className="flex flex-col items-center gap-4 max-w-3xl mx-auto p-8 border-2 border-gray-200
                                rounded-lg shadow-lg bg-white">
                    <p className='text-lg font-bold'>Please enter your name to begin</p>
                    <input 
                        type="text" 
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder='Enter your name...' 
                        className='w-full max-w-3xl border-2 border-gray-200 rounded-lg p-4 
                                    bg-white text-gray-900 placeholder-gray-400 
                                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                    hover:border-green-500 transition-all duration-300
                                    shadow-sm hover:shadow-md'
                    />
                    <button 
                        type="submit"
                        className="relative px-8 py-3 bg-green-600 text-white rounded-lg 
                                    hover:bg-green-700 disabled:bg-gray-400 
                                    transition-all duration-300 hover:scale-105
                                    shadow-md hover:shadow-lg"
                    >
                        Continue
                    </button>
                </form>
            ) : (
                <form onSubmit={handleQuestionSubmit} className="flex flex-col items-center gap-4 max-w-3xl mx-auto p-8 border-2 border-gray-200
                                rounded-lg shadow-lg bg-white">
                    <div className='text-left w-full'>
                        <p className='text-lg font-bold'>{questions[index].main}</p>
                        <p className='text-gray-500'>{questions[index].sub}</p>
                    </div>
                    <input 
                        type="text" 
                        name='query'
                        required
                        value={query}
                        disabled={loading || response}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder='Type your answer here...' 
                        className='w-full max-w-3xl border-2 border-gray-200 rounded-lg p-4 
                                    bg-white text-gray-900 placeholder-gray-400 
                                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                    hover:border-green-500 transition-all duration-300
                                    shadow-sm hover:shadow-md' 
                    />
                    {!response && (
                        <button 
                            type="submit"
                            disabled={loading}
                            className="relative px-8 py-3 bg-green-600 text-white rounded-lg 
                                        hover:bg-green-700 disabled:bg-gray-400 
                                        transition-all duration-300 hover:scale-105
                                        shadow-md hover:shadow-lg"
                        >
                            {loading ? 'Getting Answer...' : 'Get Answer'}
                        </button>
                    )}
                </form>
            )}
            {response && (
                <div className="mt-8 p-6 bg-white border-2 border-gray-200
                    rounded-lg max-w-3xl mx-auto text-left 
                    shadow-lg animate-slide flex flex-col items-center gap-4"
                >
                    <div>
                        <h2 className="font-bold mb-4 text-green-600">Response:</h2>
                        <p className="whitespace-pre-wrap text-gray-700">{response}</p>
                    </div>
                    {
                        index < questions.length - 1 ? (
                            <button 
                                className="relative px-8 py-3 bg-green-600 text-white rounded-lg 
                                    hover:bg-green-700 disabled:bg-gray-400 
                                    transition-all duration-300 hover:scale-105
                                    shadow-md hover:shadow-lg"
                                onClick={handleContinue}
                            >
                                Continue
                            </button>
                        ) : (
                            <Link 
                                to="/responses"
                                className="relative px-8 py-3 bg-green-600 text-white rounded-lg 
                                    hover:bg-green-700 disabled:bg-gray-400 
                                    transition-all duration-300 hover:scale-105
                                    shadow-md hover:shadow-lg"
                            >
                                See All Responses
                            </Link>
                        )
                    }
                </div>
            )}
        </>
    )
}

export default Question;
