import Benefits from "./Benefits";
import Features from "./Features";
import Growth from "./Growth";
import Hero from "./Hero";
import StartUpFail from "./StartUpFail";
import StartUpSucceed from "./StartUpSucceed";

function Home() {
    return (
        <>
            <Hero />
            <StartUpFail />
            <StartUpSucceed />
            <Benefits />
            <Features />
            <Growth />
        </>
    )
}

export default Home;
