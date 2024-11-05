import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <div className="fixed top-0 left-0 z-10 w-full flex justify-between items-center px-12 py-5 text-[#5E5E5E] font-semibold">
                <div className="flex gap-5">
                    <Link>ABOUT</Link>
                    <Link>ABOUT</Link>
                    <Link>ABOUT</Link>
                    <Link>ABOUT</Link>
                </div>
                <div>
                    <p className="text-xl font-bold">LOGO AFTERBURN</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-[#B8FF33] text-black py-2 px-4 rounded-lg">LOGIN</button>
                    <button className="bg-[#B8FF33] text-black py-2 px-4 rounded-lg">SIGN UP</button>
                </div>
            </div>
        </>
    )
}

export default Navbar;
