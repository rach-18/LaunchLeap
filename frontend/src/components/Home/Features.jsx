import FeatureCard from "./FeatureCard";
import features from "../../data/featuresData";

function Features() {
    return (
        <>
            <div className="mt-20 w-11/12 mx-auto">
                <p className="text-center font-bold text-5xl text-[#1e1e1e]">Features</p>
                <div className="flex flex-wrap gap-10 mt-10 justify-center">
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
