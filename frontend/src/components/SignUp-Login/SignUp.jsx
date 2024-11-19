import { useState } from "react";
import { Link } from "react-router-dom";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import axios from "axios"
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('pending');

    // async function handleSignup(e) {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
    //             name: name,
    //             email: email,
    //             password: password
    //         }, {
    //             withCredentials: true,
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    
    //         console.log(response.data.message);
    //         setSuccessMessage('success');  // Set success state if request succeeds
            
    //     } catch (error) {
    //         console.error("Full error:", error);
    //         if (error.response) {
    //             // Server responded with an error
    //             console.error("Server error:", error.response.data.error);
    //             setSuccessMessage('fail');
    //         } else if (error.request) {
    //             // Request was made but no response
    //             console.error("Network error - no response");
    //             setSuccessMessage('fail');
    //         } else {
    //             // Something else went wrong
    //             console.error("Error:", error.message);
    //             setSuccessMessage('fail');
    //         }
    //     }
    // }

    async function handleSignup(e) {
        e.preventDefault();
        try {
            const auth = getAuth();
            const db = getFirestore();
            
            // Create user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Store additional user data in Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                name: name,
                email: email,
                createdAt: new Date().toISOString()
            });

            setSuccessMessage('success');
            
        } catch (error) {
            console.error("Signup error:", error);
            setSuccessMessage('fail');
        }
    }

    async function handleGoogleSignup() {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            // Store user data in Firestore
            const db = getFirestore();
            await setDoc(doc(db, "users", result.user.uid), {
                name: result.user.displayName,
                email: result.user.email,
                createdAt: new Date().toISOString()
            });

            setSuccessMessage('success');
        } catch (error) {
            console.error("Google signup error:", error);
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
                                            name="name"
                                            className="mt-1 px-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" 
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mt-7">
                                        <input 
                                            type="email" 
                                            placeholder="Enter your email" 
                                            name="email"
                                            className="mt-1 px-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" 
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mt-7">                
                                        <input 
                                            type="password" 
                                            placeholder="Enter your password" 
                                            name="password"
                                            className="mt-1 px-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" 
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />                           
                                    </div>
                                    <div className="mt-7">
                                        <button className="bg-black w-full py-3 rounded-xl text-[#BEE477] shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                            Sign Up
                                        </button>
                                    </div>
                                    <div className="flex mt-7 items-center text-center">
                                        <hr className="border-gray-300 border-1 w-full rounded-md" />
                                        <label className="block font-medium text-sm text-gray-600 w-full">
                                            Or
                                        </label>
                                        <hr className="border-gray-300 border-1 w-full rounded-md" />
                                    </div>
                                    <div className="flex mt-7 justify-center w-full">
                                        <button onClick={handleGoogleSignup} className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                            Google
                                        </button>
                                    </div>
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
