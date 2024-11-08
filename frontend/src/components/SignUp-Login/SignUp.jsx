import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { setDoc, doc } from 'firebase/firestore';
import { Link } from "react-router-dom";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('pending');

    async function handleSignup(e) {
        e.preventDefault();
        try {
            await setDoc(doc(db, 'Users', email), {
                email: email,
                name: name
            });
            console.log('User data saved successfully!');
            setSuccessMessage('success');  // Show success message
        } catch (err) {
            console.log(err);
            setSuccessMessage('fail');
        }
    }

    function reset() {
        setSuccessMessage('pending');
    }

    return (
        <>            
            <div className="signup flex flex-col min-h-screen gap-20 pt-24">
                <h1 className="text-5xl font-bold text-center text-[#1e1e1e]">LAUNCH LEAP</h1>
                <div className="relative flex flex-col sm:px-0 px-5 justify-center items-center">
                    <div className="relative sm:max-w-sm w-full">
                        <div className="card bg-[#1e1e1e] shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
                        <div className="card bg-[#BEE477] shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
                        <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
                            <label className="block mt-3 text-2xl text-gray-700 text-center font-semibold">
                                Sign Up for Early access
                            </label>
                            {
                                successMessage === 'pending' ? (
                                <form onSubmit={handleSignup} className="mt-10">
                                    <div>
                                        <input 
                                            type="text" 
                                            placeholder="Enter your name" 
                                            className="mt-1 px-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" 
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mt-7">
                                        <input 
                                            type="email" 
                                            placeholder="Enter your email" 
                                            className="mt-1 px-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" 
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {/* <div className="mt-7">                
                                        <input 
                                            type="password" 
                                            placeholder="Enter your password" 
                                            className="mt-1 px-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" 
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />                           
                                    </div> */}
                                    <div className="mt-7">
                                        <button className="bg-black w-full py-3 rounded-xl text-[#BEE477] shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                            Sign Up
                                        </button>
                                    </div>
                                    {/* <div className="flex mt-7 items-center text-center">
                                        <hr className="border-gray-300 border-1 w-full rounded-md" />
                                        <label className="block font-medium text-sm text-gray-600 w-full">
                                            Or
                                        </label>
                                        <hr className="border-gray-300 border-1 w-full rounded-md" />
                                    </div>
                                    <div className="flex mt-7 justify-center w-full">
                                        <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                            Google
                                        </button>
                                    </div> */}
                                </form>
                                ) : successMessage === 'success' ? (
                                    <div className="flex flex-col items-center mt-5 gap-2">
                                        <TaskAltOutlinedIcon className="text-[#BEE477]" sx={{fontSize: 60}} />
                                        <p className="text-2xl">Sign up was successful!</p>
                                        <Link to='/'>Go back to Home Page</Link>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center mt-5 gap-2">
                                        <ErrorOutlinedIcon className="text-[#FF3960]" sx={{fontSize: 60}} />
                                        <p className="text-2xl">Sign up failed!</p>
                                        <button className="bg-[#FF3960] text-white rounded-lg px-5 py-2" onClick={reset}>Try Again</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
