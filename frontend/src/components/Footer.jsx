import { Link } from "react-router-dom";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
    return (
        <>
            <footer className="bg-[#5E5E5E] text-white py-10">
                {/* <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
                    <div className="space-y-2">
                        <h3 className="font-semibold text-lg">Lorem ipsum</h3>
                        <div className="space-y-1 flex flex-col">
                            <Link>Ut enim ad</Link>
                            <Link>Ut enim ad</Link>
                            <Link>Ut enim ad</Link>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold text-lg">Lorem ipsum</h3>
                        <div className="space-y-1 flex flex-col">
                            <Link>Ut enim ad</Link>
                            <Link>Ut enim ad</Link>
                            <Link>Ut enim ad</Link>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold text-lg">Lorem ipsum</h3>
                        <div className="space-y-1 flex flex-col">
                            <Link>Ut enim ad</Link>
                            <Link>Ut enim ad</Link>
                            <Link>Ut enim ad</Link>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="bg-gray-300 rounded-lg w-40 h-24 flex items-center justify-center">
                            <span className="text-gray-700 font-semibold">LOGO</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex space-x-3 justify-center">
                            <Link className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
                                <FacebookOutlinedIcon className="text-white" />
                            </Link>
                            <Link className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
                                <InstagramIcon className="text-white" />
                            </Link>
                            <Link className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
                                <LinkedInIcon className="text-white" />
                            </Link>
                            <Link className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
                                <EmailIcon className="text-white" />
                            </Link>
                        </div>
                    </div>
                </div>
                <p className="text-sm text-center mt-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p> */}
                <div className="flex flex-col items-center gap-5">
                    <h1 className="sm:text-4xl text-3xl font-bold">LAUNCHLEAP</h1>
                    <Link to='/signup' className="bg-[#B8FF33] lg:text-xl sm:text-lg font-semibold text-black py-2 px-4 rounded-full lg:w-1/3 sm:w-1/2 w-11/12 text-center">Sign up for Early access</Link>
                </div>
            </footer>
        </>
    )
}

export default Footer;
