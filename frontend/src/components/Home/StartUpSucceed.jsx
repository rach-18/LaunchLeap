import Card from "./Card";
import successData from "../../data/successData";
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';

function StartUpSucceed() {


    return (
        <div className="mt-20 w-11/12 mx-auto">
            <p className="text-center font-bold text-5xl text-[#1e1e1e]">The Rare Few That Succeed</p>
            <div className="grid grid-cols-1 gap-2 mt-12 sm:grid-cols-3 lg:mt-20">
                {
                    successData.map((item) => {
                        return <Card key={item.id} icon={item.icon} title={item.title} description={item.description} type='succeed' />
                    })
                }
            </div>
            <p className="text-center mt-5">AfterBurn helps you do just that - so you can break through the noise, save money and build something your audience truly wants.</p>
            <div className="scroll-txt w-1/2 mx-auto">
                <p className="text-center mt-10">Scroll down to discover how AfterBurn can help you succeed <KeyboardDoubleArrowDownOutlinedIcon /></p>
            </div>
        </div>
    )
}

export default StartUpSucceed;
