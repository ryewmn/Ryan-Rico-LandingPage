import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Spotlight } from "@/components/spotlight";
import { CurrentWork } from "@/components/current-work";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

// Builds defers IG iframe loaders until scrolled to.
const Builds = dynamic(() => import("@/components/builds").then((m) => m.Builds), {
  loading: () => (
    <section className="bg-background py-24 md:py-32 border-t border-white/10">
      <div className="container">
        <div className="h-7 w-32 rounded bg-white/5 animate-pulse" />
        <div className="mt-4 h-12 w-2/3 rounded bg-white/5 animate-pulse" />
      </div>
    </section>
  ),
});

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <Navbar />
      <Hero />
      <About />
      <Spotlight />
      <CurrentWork />
      <Projects />
      <Skills />
      <Builds />
      <Contact />
      <Footer />
    </main>
  );
}
