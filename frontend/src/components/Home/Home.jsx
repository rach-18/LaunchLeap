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
            <StartUpFail />
            <StartUpSucceed />
            <Growth />
            <Playbook />
            <TractionTracker />
            <Features />
            <Brands />
            <FAQ />
            <Footer />
        </>
    )
}

export default Home;
