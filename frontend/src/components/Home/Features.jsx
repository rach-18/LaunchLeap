import FeatureCard from "./FeatureCard";

function Features() {
    return (
        <>
            <div className="mt-20 w-11/12 mx-auto">
                <p className="text-center font-bold text-5xl text-[#1e1e1e]">Features</p>
                <div className="flex overflow-x-scroll mt-10">
                    <FeatureCard />
                    <FeatureCard />
                    <FeatureCard />
                    <FeatureCard />
                    <FeatureCard />
                </div>
            </div>
        </>
    )
}

export default Features;
