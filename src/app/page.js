'use client'
import BannerSection from "@/components/banner-section/Banner-Section";
import CategorySection from "@/components/category-section/Category-Section";
import FooterSection from "@/components/footer-section/Footer";
import HeroSection from "@/components/hero-section/Hero-Section";
import ItemSection from "@/components/item-section/Item-Section";
import LoadingLogo from "@/components/loadingLogo/LoadingLogo";
import MiddleSection from "@/components/middle-section/Middle-Section";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950" suppressHydrationWarning>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingLogo />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {children}
          <main className="flex-grow mt-16 space-y-20">
            <section>
              <HeroSection />
            </section>
            
            <section>
              <MiddleSection />
            </section>
            
            <section>
              <CategorySection />
            </section>
            
            <section className="px-4 md:px-8 lg:px-20">
              <ItemSection />
            </section>
            
            <section className="py-10 md:py-15">
              <BannerSection />
            </section>
          </main>
          
          <section>
            <FooterSection />
          </section>
        </>
      )}
    </div>
  );
}