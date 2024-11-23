import Navbar from '../Navbar'
import Footer from '../Footer'
import Question from './Question'

function Query() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white relative">
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

                <div className='relative px-4 mx-auto max-w-screen-xl text-center xl:py-28 py-36 z-10'>
                    <h1 className='mb-4 font-extrabold tracking-tight leading-tight lg:text-6xl md:text-5xl sm:text-4xl text-3xl text-gray-900 typewriter px-2'>
                        Validate Your Startup Idea
                    </h1>
                    <p className='mb-8 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 text-gray-600 px-2'>
                        Get AI-powered insights to refine your business concept in minutes
                    </p>
                    
                    <Question />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Query