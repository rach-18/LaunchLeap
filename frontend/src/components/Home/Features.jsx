import FeatureCard from "./FeatureCard";
import features from "../../data/featuresData";

function Features() {
    return (
        <>
            <div className="mt-20 w-11/12 mx-auto">
                <h2 className="text-center font-bold lg:text-5xl sm:text-4xl text-3xl text-[#1e1e1e]">Features</h2>
                <div className="flex flex-wrap lg:flex-row flex-col gap-10 mt-10 justify-center">
                    {
                        features.map((feature) => {
                            return <FeatureCard key={feature.id} icon={feature.icon} title={feature.title} description={feature.description} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Features;
