import HeroSection from "@/components/hero-section/Hero-Section";
import MiddleSection from "@/components/middle-section/Middle-Section";
import Navbaar from "@/components/navbaar/Navbaar";

export default function Home() {
  return (
    <div className="flex gap-12 flex-col  bg-gray-950 h-full">
      <header className="w-full bg-gray-950 py-4 px-2">
        <nav>
          <Navbaar />
        </nav>
      </header>
      <main>
        <section>
          <HeroSection />
        </section>
        <section>
          <MiddleSection />
        </section>
      </main>
    </div>
  );
}
