"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants } from "../motion/Motion";
import BlurText from "../react-bits/blur-text/Blur-text";
import ShinyText from "../react-bits/shiny-text/Shiny-Text";
import DecryptedText from "../react-bits/decrypted-text/Decrypted-Text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const watchImages = [
  "/images/watch 1.png",
  "/images/watch 2.png",
  "/images/watch.png",
];

export default function HeroSection() {
  const [currentWatch, setCurrentWatch] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWatch((prev) => {
        const next = (prev + 1) % watchImages.length;
        setAnimationKey((key) => key + 1);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`text-white h-full overflow-hidden flex flex-col-reverse md:flex-row items-center justify-between px-6 pt-0 pb-20 gap-10 ${poppins.className}`}
    >
      {/* Left Content */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="flex flex-col h-[400px] justify-center gap-1 w-full md:w-1/2 text-center md:text-left  items-center md:items-start"
      >
        <ShinyText
          text="Experience fashion like never before"
          disabled={false}
          speed={3}
          className="text-sm text-slate-400 mb-2"
        />
        <BlurText
          text="Elevate Your Style With Fashion Store:Where Fashion Meets Passion"
          delay={50}
          animateBy="words"
          direction="top"
          className="text-2xl md:text-3xl lg:text-4xl  font-bold leading-snug md:leading-[1.3] mb-4"
        />
        <div className="w-full max-w-3xl px-2 md:px-0">
          <DecryptedText
            text="Discover a world of fashion-forward trends, curated collections, and timeless pieces that inspire. Unleash your inner fashionista and embark on a journey of confidence, elegance and impeccable style."
            speed={50}
            maxIterations={20}
            animateOn="view"
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234!?"
            className="revealed text-sm sm:text-base text-slate-400 mb-8 leading-relaxed"
            parentClassName="all-letters"
            encryptedClassName="encrypted"
          />
        </div>
        <Box className="pt-4">
          <InteractiveHoverButton className="text-black">
            Start Shopping
          </InteractiveHoverButton>
        </Box>
      </motion.div>

      {/* Right Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
          initial={{ x: 900, y: -300, opacity: 0, rotate: 60 }}
          animate={{ x: 0, y: 30, opacity: 1, rotate: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="flex justify-center w-full md:w-1/2"
        >
          <Image
            src={watchImages[currentWatch]}
            alt="Watch"
            width={300}
            height={300}
            className="object-contain rounded-xl md:mb-0 mb-6"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
