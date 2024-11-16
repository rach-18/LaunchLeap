import { useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import axios from 'axios'

function Query() {
    const [query, setQuery] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!query.trim()) return

        setLoading(true)
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/claude`, {query}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            setResponse(data.response)
        } catch (error) {
            console.error('Error:', error)
            setResponse('Sorry, something went wrong. Please try again.')
        }
        setLoading(false)
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white relative">
                <div className="absolute inset-0 z-0 overflow-hidden">
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

                <div className='relative px-4 mx-auto max-w-screen-xl text-center xl:py-28 py-36 z-10'>
                    <h1 className='mb-4 font-extrabold tracking-tight leading-none lg:text-6xl md:text-5xl text-4xl text-gray-900 typewriter'>
                        Ask Claude Anything
                    </h1>
                    <p className='mb-8 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 text-gray-600'>
                        Get instant answers to your questions using Claude AI
                    </p>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4" 
                        data-aos="fade-up" 
                        data-aos-duration="1500"
                    >
                        <input 
                            type="text" 
                            name='query'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='Type your query here...' 
                            className='w-full max-w-2xl border-2 border-gray-200 rounded-lg p-4 
                                     bg-white text-gray-900 placeholder-gray-400 
                                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                     hover:border-green-500 transition-all duration-300
                                     shadow-sm hover:shadow-md' 
                        />
                        <button 
                            type="submit"
                            disabled={loading}
                            className="relative px-8 py-3 bg-green-600 text-white rounded-lg 
                                     hover:bg-green-700 disabled:bg-gray-400 
                                     transition-all duration-300 hover:scale-105
                                     shadow-md hover:shadow-lg"
                        >
                            {loading ? 'Getting Answer...' : 'Ask Claude'}
                        </button>
                    </form>

                    {response && (
                        <div className="mt-8 p-6 bg-white border-2 border-gray-200
                                      rounded-lg max-w-3xl mx-auto text-left 
                                      shadow-lg animate-slide">
                            <h2 className="font-bold mb-4 text-green-600">Claude's Response:</h2>
                            <p className="whitespace-pre-wrap text-gray-700">{response}</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Query