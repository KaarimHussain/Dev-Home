import AboutMe from "@/components/home/about-me";
import Experience from "@/components/home/experience";
import Hero from "@/components/home/hero";
import Projects from "@/components/home/projects";
import Techstack from "@/components/home/techstack";

export default function Home() {
  return (
    <>
      <div className="min-h-screen w-full">
        <Hero />
        <AboutMe />
        <Projects />
        <Experience />
        <Techstack />
      </div>
    </>
  );
}
