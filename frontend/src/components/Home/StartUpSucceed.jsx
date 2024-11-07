import Card from "./Card";
import successData from "../../data/successData";
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';

function StartUpSucceed() {


    return (
        <div className="mt-20 w-11/12 mx-auto">
            <h2 className="text-center font-bold lg:text-5xl sm:text-4xl text-3xl text-[#1e1e1e]">The Rare Few That Succeed</h2>
            <div className="grid grid-cols-1 gap-2 mt-12 lg:grid-cols-3 lg:mt-20">
                {
                    successData.map((item) => {
                        return <Card key={item.id} icon={item.icon} title={item.title} description={item.description} type='succeed' />
                    })
                }
            </div>
            <p className="text-center sm:text-base text-sm mt-8">LaunchLeap helps you do just that - so you can break through the noise, save money and build something your audience truly wants.</p>
            <div className="scroll-txt lg:w-1/2 w-full mx-auto">
                <p className="text-center sm:text-base text-sm mt-10">Scroll down to discover how LaunchLeap can help you succeed <KeyboardDoubleArrowDownOutlinedIcon /></p>
            </div>
        </div>
    )
}

export default StartUpSucceed;
