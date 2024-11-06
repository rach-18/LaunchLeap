import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';

function ScoreCard() {
    return (
        <>
            <div className="playbook-card w-5/6 mx-auto py-4 px-6 rounded-lg mt-10">
                <div className="flex items-center space-x-2 mb-4">
                    <FingerprintOutlinedIcon sx={{fontSize: 34, color: '#689F38'}} />
                    <p className="text-3xl font-semibold text-[#689F38]">Startup Idea Uniqueness Score</p>
                </div>
                <div className="flex gap-5 items-center my-5">
                    <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                        <div
                        className="bg-gray-800 h-2.5 rounded-full"
                        style={{ width: "70%" }}
                        ></div>
                    </div>
                    <span className="text-2xl font-semibold text-[#689F38]">7/10</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-600 text-sm">
                    Your AI-powered fitness app stands out with its personalized workout
                    plans and real-time form correction. This uniqueness will help you
                    create distinctive content across all channels.
                    </p>
                </div>
            </div>
        </>
    )
}

export default ScoreCard;
