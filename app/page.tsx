import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { CurrentWork } from "@/components/current-work";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

// Builds defers IG iframe loaders until scrolled to.
const Builds = dynamic(() => import("@/components/builds").then((m) => m.Builds), {
  loading: () => (
    <section className="bg-white py-24 md:py-32 border-t border-neutral-100">
      <div className="container">
        <div className="h-7 w-32 rounded bg-neutral-100 animate-pulse" />
        <div className="mt-4 h-12 w-2/3 rounded bg-neutral-100 animate-pulse" />
      </div>
    </section>
  ),
});

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
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
