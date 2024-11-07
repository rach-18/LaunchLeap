import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

function Hero() {
    return (
        <>
            <section className="hero bg-center bg-no-repeat">
                <div className="px-4 mx-auto max-w-screen-xl text-center py-32 xl:py-56 text-[#1e1e1e] flex flex-col items-center">
                    <h1 className="mb-4 font-extrabold tracking-tight leading-none lg:text-5xl md:text-4xl text-3xl">Solopreneur? New to Marketing? <br /> Dont Break a Sweat.</h1>
                    <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 lg:px-48">Reach your exact customers - cheaply, easily, quickly.</p>
                    {/* <div className="flex items-center bg-white border border-[#1e1e1e] rounded-lg overflow-hidden px-2 py-1 justify-between w-5/6">
                        <input className="text-base text-gray-400 flex-grow outline-none px-2 sm:py-0 py-2" type="email" placeholder="Enter your email" />
                        <div className="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto sm:block hidden">
                            <button className="bg-[#1e1e1e] text-[#B8FF33] text-base rounded-lg px-4 py-2 font-thin">Sign Up for early Access</button>
                        </div>
                    </div> */}
                    <div className="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto">
                        <button className="bg-[#1e1e1e] text-[#B8FF33] text-base rounded-lg px-4 py-2 font-thin">Sign Up for early Access</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero;
