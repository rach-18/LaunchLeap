import ScoreCard from './ScoreCard';
import ChannelCard from './ChannelCard';

function Playbook() {
    return (
        <>
            <div className="mt-20 w-11/12 mx-auto">
                <h2 className="text-center font-bold lg:text-5xl sm:text-4xl text-3xl text-[#1e1e1e]">Your Personalized Growth Playbook</h2>
                <ScoreCard />
                <ChannelCard />
            </div>
        </>
    )
}

export default Playbook;
