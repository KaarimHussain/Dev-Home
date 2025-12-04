import AboutMe from "@/components/home/about-me";
import Contact from "@/components/home/contact";
import Experience from "@/components/home/experience";
import FloatingSocials from "@/components/home/floating-socials";
import Hero from "@/components/home/hero";
import Projects from "@/components/home/projects";
import Techstack from "@/components/home/techstack";

export default function Home() {
  return (
    <>
      <div className="min-h-screen w-full">
        <FloatingSocials />
        <Hero />
        <AboutMe />
        <Projects />
        <Experience />
        <Techstack />
        <Contact />
      </div>
    </>
  );
}
