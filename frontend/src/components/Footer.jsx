import { Link } from "react-router-dom";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
    return (
        <>
            <footer className="bg-[#5E5E5E] text-white py-10 relative z-10">
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
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto text-center">
                        <h1 className="sm:text-4xl text-3xl font-bold">LAUNCHLEAP</h1>
                        
                        <div className="space-y-6">
                            <div className="space-y-4 lg:text-xl md:text-lg text-base">
                                <p>A custom AI trained on 1000's of marketing strategies, tactics, and content to help your startup gain explosive growth</p>
                                <p>A platform to track and continuously improve your traction channels</p>
                            </div>
                            
                            <p className="lg:text-xl md:text-lg text-base">
                                If you're interested in either, this is what LaunchLeap does.
                            </p>
                        </div>

                        <Link 
                            to='/signup' 
                            className="bg-[#B8FF33] lg:text-xl sm:text-lg font-semibold text-black py-3 px-6 rounded-full lg:w-2/3 sm:w-3/4 w-11/12 text-center hover:bg-[#a5e82d] transition-colors"
                        >
                            Sign up for Early Access
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;
