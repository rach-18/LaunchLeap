import ScoreCard from './ScoreCard';
import ChannelCard from './ChannelCard';

function Playbook() {
    return (
        <>
            <div className="mt-20 w-11/12 mx-auto">
                <p className="text-center font-bold text-5xl text-[#1e1e1e]">Your Personalized Growth Playbook</p>
                <ScoreCard />
                <ChannelCard />
            </div>
        </>
    )
}

export default Playbook;
