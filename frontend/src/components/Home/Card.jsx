import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WarningIcon from '@mui/icons-material/Warning';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RadarIcon from '@mui/icons-material/Radar';
import BoltIcon from '@mui/icons-material/Bolt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const iconMap = {
    PeopleAltIcon: <PeopleAltIcon className='w-16 h-16 fill-gray-400 group-hover:fill-white' />,
    WarningIcon: <WarningIcon className='w-16 h-16 fill-gray-400 group-hover:fill-white' />,
    MonetizationOnIcon: <MonetizationOnIcon className='w-16 h-16 fill-gray-400 group-hover:fill-white' />,
    RadarIcon: <RadarIcon className='w-16 h-16 fill-gray-400 group-hover:fill-white' />,
    BoltIcon: <BoltIcon className='w-16 h-16 fill-gray-400 group-hover:fill-white' />,
    TrendingUpIcon: <TrendingUpIcon className='w-16 h-16 fill-gray-400 group-hover:fill-white' />
}

function Card({icon, title, description, type}) {
    return (
        <>
            <div
                className={`transition-all duration-1000 bg-white ${type === 'fail' ? 'hover:bg-[#FF3960]' : 'hover:bg-[#BEE477]'} hover:shadow-xl m-2 p-4 relative z-40 group rounded-lg shadow-lg`}>
                <div
                    className={`absolute ${type === 'fail' ? 'bg-[#FF3960]/50' : 'bg-[#BEE477]/50'} top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2`}>
                </div>
                <div className="py-2 px-9 relative  ">
                    {iconMap[icon]}
                    <h3 className="mt-8 text-lg font-semibold text-black group-hover:text-white ">{title}</h3>
                    <p className="mt-4 text-base text-gray-600 group-hover:text-white  ">{description}</p>
                </div>
            </div>
        </>
    )
}

export default Card;
