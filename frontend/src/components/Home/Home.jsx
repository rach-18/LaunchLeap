import Brands from "./Brands";
import FAQ from "./FAQ";
import Features from "./Features";
import Growth from "./Growth";
import Hero from "./Hero";
import Playbook from "./Playbook";
import StartUpFail from "./StartUpFail";
import StartUpSucceed from "./StartUpSucceed";

function Home() {
    return (
        <>
            <Hero />
            <StartUpFail />
            <StartUpSucceed />
            <Growth />
            <Playbook />
            <Features />
            <Brands />
            <FAQ />
        </>
    )
}

export default Home;
