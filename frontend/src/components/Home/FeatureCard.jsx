import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import AdsClickOutlinedIcon from '@mui/icons-material/AdsClickOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';

const iconMap = {
    ChecklistOutlinedIcon: <ChecklistOutlinedIcon />,
    CheckCircleOutlineOutlinedIcon: <CheckCircleOutlineOutlinedIcon />,
    AdsClickOutlinedIcon: <AdsClickOutlinedIcon />,
    InsightsOutlinedIcon: <InsightsOutlinedIcon />
}

function FeatureCard({icon, title, description}) {
    return (
        <div className="col-span-12 sm:col-span-6 md:col-span-3 flex-shrink-0 lg:w-[40%] w-full shadow-lg sm:px-5 px-1 py-6 rounded-xl bg-white">
            <div className="flex sm:flex-row flex-col sm:items-start items-center sm:gap-0 gap-2 p-4">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-[#B8FF33] text-white">
                    {iconMap[icon]}
                </div>
                <div className="flex flex-col flex-grow ml-4">
                    <div className="font-bold text-lg">{title}</div>
                    <div className="text-sm text-gray-500">{description}</div>
                </div>
            </div>
        </div>
    );
}

export default FeatureCard;
