function UserCard({ field, value, type }) {
    return (
        <div className={`p-8 border-2 border-gray-200 rounded-lg shadow-lg bg-white w-full ${type === 'user' ? 'mt-2' : 'mt-8'}`}>
            <div className="">
                <p className='text-lg font-bold mb-2'>
                    {field}
                </p>
                <p className='text-gray-500'>
                    {value}
                </p>
            </div>
        </div>
    )
}

export default UserCard;