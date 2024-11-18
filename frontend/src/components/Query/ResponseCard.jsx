function ResponseCard({main, userInput, response}) {
    return (
        <div className='p-5 rounded-lg bg-white border-2 border-gray-200 shadow-lg w-[40%]'>
            <p className='text-lg font-bold mb-2'>{main}</p>
            <div className="mb-4">
                <h2 className="font-bold mb-1 text-green-600">Your Response:</h2>
                <p className="whitespace-pre-wrap text-gray-700">{userInput}</p>
            </div>
            <div>
                <h2 className="font-bold mb-1 text-green-600">Our Response:</h2>
                <p className="whitespace-pre-wrap text-gray-700">{response}</p>
            </div>
        </div>
    )
}

export default ResponseCard