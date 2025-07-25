import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import HomeHritujeetIntro from "@/components/HomeHritujeetIntro";

export default function Home() {
    return (
        <div>
            <Hero />
            <div className="container mx-auto my-8">
                <Featured />
            </div>
            <HomeHritujeetIntro />
        </div>
    );
}
