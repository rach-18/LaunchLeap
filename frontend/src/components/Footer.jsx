import { Link } from "react-router-dom";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
    return (
        <>
            <footer className="bg-[#5E5E5E] text-white py-10">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
                    {/* Column 1 */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-lg">Lorem ipsum</h3>
                        <div className="space-y-1 flex flex-col">
                            <Link>Ut enim ad</Link>
                            <Link>Ut enim ad</Link>
                            <Link>Ut enim ad</Link>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-lg">Lorem ipsum</h3>
                        <div className="space-y-1 flex flex-col">
                            <Link>Ut enim ad</Link>
                            <Link>Ut enim ad</Link>
                            <Link>Ut enim ad</Link>
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-lg">Lorem ipsum</h3>
                        <div className="space-y-1 flex flex-col">
                            <Link>Ut enim ad</Link>
                            <Link>Ut enim ad</Link>
                            <Link>Ut enim ad</Link>
                        </div>
                    </div>

                    {/* Column 4 - Logo */}
                    <div className="flex justify-center">
                        <div className="bg-gray-300 rounded-lg w-40 h-24 flex items-center justify-center">
                            <span className="text-gray-700 font-semibold">LOGO</span>
                        </div>
                    </div>

                    {/* Column 5 - Input and Icons */}
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

                {/* Bottom Text */}
                <p className="text-sm text-center mt-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </footer>
        </>
    )
}

export default Footer;
