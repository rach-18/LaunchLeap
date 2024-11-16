import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <div className="absolute z-20 w-full flex sm:flex-row flex-col sm:gap-0 gap-2 justify-between items-center lg:px-12 px-6 py-5 text-[#5E5E5E] font-semibold">
                {/* <div className="flex gap-5">
                    <Link>ABOUT</Link>
                    <Link>ABOUT</Link>
                    <Link>ABOUT</Link>
                    <Link>ABOUT</Link>
                </div> */}
                <div>
                    <Link to='/' className="text-xl font-bold">LaunchLeap</Link>
                </div>
                <div className="flex gap-2 md:text-base text-sm">
                    {/* <button className="bg-[#B8FF33] text-black py-2 px-4 rounded-lg">LOGIN</button> */}
                    <Link to='/signup' className="bg-[#B8FF33] text-black py-2 px-4 rounded-lg">Sign Up for Early Access</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar;
