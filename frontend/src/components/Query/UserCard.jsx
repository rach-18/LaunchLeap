function UserCard({ field, value, type }) {
    return (
        <div className="p-4 sm:p-6 border-2 border-gray-200 rounded-lg shadow-lg bg-white">
            <p className='font-bold mb-2 text-sm sm:text-base'>{field}</p>
            <p className='text-gray-600 text-sm sm:text-base whitespace-pre-wrap'>{value}</p>
        </div>
    )
}

export default UserCard;