import BenefitCard from "./BenefitCard";

function Benefits() {
    return (
        <>
            <div className="mt-20 w-11/12 mx-auto">
                <p className="text-center font-bold text-5xl text-[#1e1e1e]">Benefits</p>
                <div className="flex flex-wrap mt-10">
                    <BenefitCard />
                    <BenefitCard />
                    <BenefitCard />
                </div>
            </div>
        </>
    )
}

export default Benefits;
