import HeroSection from "@/components/hero-section/Hero-Section";
import Navbaar from "@/components/navbaar/Navbaar";

export default function Home() {
  return (
    <div className="flex gap-12 flex-col  bg-slate-950 h-screen">
      <header className="w-full bg-slate-950 py-4 px-2">
        <nav>
          <Navbaar />
        </nav>
      </header>
      <main>
        <section>
          <HeroSection />
        </section>
      </main>
    </div>
  );
}
