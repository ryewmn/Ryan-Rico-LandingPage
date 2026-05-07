import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { CurrentWork } from "@/components/current-work";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Builds } from "@/components/builds";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50 text-neutral-900">
      <Navbar />
      <Hero />
      <About />
      <CurrentWork />
      <Projects />
      <Skills />
      <Builds />
      <Contact />
      <Footer />
    </main>
  );
}
