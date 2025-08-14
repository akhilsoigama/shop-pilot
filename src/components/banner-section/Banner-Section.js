"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const banners = [
  {
    id: 1,
    img: "/images/banners/banner1.png",
    title: "Your Cozy Era",
    subtitle: "Get peak comfy-chic with new winter essentials.",
    cta: "Shop Now",
    colorTheme: "from-amber-900/10 to-amber-600/10",
  },
  {
    id: 2,
    img: "/images/banners/banner2.png",
    title: "Summer Vibes",
    subtitle: "Fresh styles for warm days ahead.",
    cta: "Explore Collection",
    colorTheme: "from-blue-900/20 to-blue-600/20",
  },
  {
    id: 3,
    img: "/images/banners/banner3.jpg",
    title: "Urban Elegance",
    subtitle: "City-inspired looks for modern living.",
    cta: "Discover More",
    colorTheme: "from-gray-900/80 to-gray-600/50",
  },
];

function BannerNavigationButtons() {
  const { api } = useCarousel();
  const [isHoveringPrev, setIsHoveringPrev] = useState(false);
  const [isHoveringNext, setIsHoveringNext] = useState(false);

  if (!api) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute z-30 left-4 top-1/2 -translate-y-1/2"
      >
        <Button
          onClick={() => api.scrollPrev()}
          onMouseEnter={() => setIsHoveringPrev(true)}
          onMouseLeave={() => setIsHoveringPrev(false)}
          className="relative size-12 rounded-full bg-white/90 text-black hover:bg-white shadow-2xl backdrop-blur-sm border border-white/20"
        >
          <ArrowLeft className="absolute" />
          <motion.div
            animate={{
              scale: isHoveringPrev ? 1.2 : 1,
              rotate: isHoveringPrev ? -10 : 0,
            }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <ArrowLeft />
          </motion.div>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute z-30 right-4 top-1/2 -translate-y-1/2"
      >
        <Button
          onClick={() => api.scrollNext()}
          onMouseEnter={() => setIsHoveringNext(true)}
          onMouseLeave={() => setIsHoveringNext(false)}
          className="relative size-12 rounded-full bg-white/90 text-black hover:bg-white shadow-2xl backdrop-blur-sm border border-white/20"
        >
          <ArrowRight className="absolute" />
          <motion.div
            animate={{
              scale: isHoveringNext ? 1.2 : 1,
              rotate: isHoveringNext ? 10 : 0,
            }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <ArrowRight />
          </motion.div>
        </Button>
      </motion.div>
    </>
  );
}

function ProgressIndicator({ api, currentIndex }) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
      {banners.map((_, index) => (
        <button
          key={index}
          onClick={() => api?.scrollTo(index)}
          className="relative h-1.5 rounded-full overflow-hidden"
        >
          <div className="w-8 h-full bg-white/30 backdrop-blur-sm" />
          <motion.div
            className="absolute top-0 left-0 h-full bg-white/30 backdrop-blur-sm"
            initial={{ width: 0 }}
            animate={{
              width: currentIndex === index ? "100%" : "0%",
              transition: { duration: 5, ease: "linear" },
            }}
          />
        </button>
      ))}
    </div>
  );
}

export default function BannerSection() {
  const [api, setApi] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSelect = useCallback((api) => {
    setCurrentIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;

    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api, onSelect]);

  return (
    <section className="w-full overflow-hidden relative group">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
        className="w-full"
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id} className="w-full">
              <div className="relative w-full h-[300px] md:h-[450px] lg:h-[80vh] max-h-[800px]">
                <Image
                  src={banner.img}
                  alt={`Banner ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  quality={100}
                />

                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className={`absolute inset-0 bg-gradient-to-br ${banner.colorTheme} z-10`}
                  />
                </AnimatePresence>

                <div className="absolute inset-0 z-20 flex items-center">
                  <div className="container px-6 md:px-12 lg:px-24">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="max-w-2xl"
                    >
                      <motion.h2
                        initial={{ letterSpacing: "0.05em" }}
                        animate={{ letterSpacing: "0.025em" }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-white drop-shadow-xl"
                      >
                        {banner.title}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 drop-shadow-md max-w-lg"
                      >
                        {banner.subtitle}
                      </motion.p>
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9, type: "spring" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="lg"
                          className="bg-white text-black hover:bg-white/90 px-8 py-6 text-base font-medium rounded-full shadow-2xl backdrop-blur-sm border border-white/20"
                        >
                          {banner.cta}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <BannerNavigationButtons />

        {/* Progress Indicator */}
        {api && <ProgressIndicator api={api} currentIndex={currentIndex} />}
      </Carousel>

      {/* Subtle hover effect for entire carousel */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none"
        initial={{ backdropFilter: "blur(0px)" }}
        whileHover={{ backdropFilter: "blur(2px)" }}
        transition={{ duration: 0.3 }}
      />
    </section>
  );
}