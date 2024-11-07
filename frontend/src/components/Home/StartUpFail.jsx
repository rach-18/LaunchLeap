import Card from "./Card";
import failData from "../../data/failData";

function StartUpFail() {
    return (
        <div className="mt-20 w-11/12 mx-auto">
            <h2 className="text-center font-bold lg:text-5xl sm:text-4xl text-3xl text-[#1e1e1e]">Why do many startups fail?</h2>
            <div className="grid grid-cols-1 gap-2 mt-12 lg:grid-cols-3 lg:mt-20">
                {
                    failData.map((item) => {
                        return <Card key={item.id} icon={item.icon} title={item.title} description={item.description} type='fail' />
                    })
                }
            </div>
        </div>
    )
}

export default StartUpFail;
