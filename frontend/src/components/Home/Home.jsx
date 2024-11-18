import Footer from "../Footer";
import Navbar from "../Navbar";
import Brands from "./Brands";
import FAQ from "./FAQ";
import Features from "./Features";
import Growth from "./Growth";
import Hero from "./Hero";
import Playbook from "./Playbook";
import StartUpFail from "./StartUpFail";
import StartUpSucceed from "./StartUpSucceed";
import TractionTracker from "./TractionTracker";

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <div className="relative">
                {/* <div className="fixed h-screen w-screen top-0 inset-0 z-[-1] overflow-hidden">
                    <div className="absolute w-full h-full">
                        
                        <div className="absolute left-[20%] w-[1px] h-48 bg-black/20 animate-scanline"></div>
                        <div className="absolute left-[40%] w-[1px] h-48 bg-black/20 animate-scanline" style={{animationDelay: '0.7s'}}></div>
                        <div className="absolute left-[60%] w-[1px] h-48 bg-black/20 animate-scanline" style={{animationDelay: '1.4s'}}></div>
                        <div className="absolute left-[80%] w-[1px] h-48 bg-black/20 animate-scanline" style={{animationDelay: '2.1s'}}></div>
                    </div>

                    <div className="absolute w-full h-full">
                        
                        <div className="absolute top-1/4 left-1/4 w-8 h-8 border border-black/30 animate-float"></div>
                        <div className="absolute top-2/3 left-2/3 w-12 h-12 border border-black/30 animate-float" style={{animationDelay: '1s'}}></div>
                        <div className="absolute top-1/3 right-1/4 w-6 h-6 border border-black/30 animate-float" style={{animationDelay: '2s'}}></div>
                    </div>

                    
                    <div className="absolute left-10 top-1/4 w-40 h-40 border-2 border-dashed border-black/20 rounded-full animate-spin-slow"></div>
                    <div className="absolute right-10 bottom-1/4 w-32 h-32 border-2 border-dashed border-black/20 rounded-full animate-spin-slow-reverse"></div>
                </div> */}
                <StartUpFail />
                <StartUpSucceed />
                <Growth />
                <Playbook />
                <TractionTracker />
                <Features />
                <Brands />
                <FAQ />
            </div>
            <Footer />
        </>
    )
}

export default Home;
