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

// Feature items data
const features = [
  { id: 1, text: "Free Shipping", icon: "🚚" },
  { id: 2, text: "Secure Payment", icon: "🔒" },
  { id: 3, text: "30-Day Returns", icon: "↩️" },
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
      className={`dark:text-white h-full overflow-hidden flex flex-col-reverse md:flex-row items-center justify-between p-4 ${poppins.className}`}
    >
      {/* Left Content */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col h-full justify-center  w-full md:w-1/2 text-center md:text-left items-center md:items-start"
      >
        <ShinyText
          text="Experience fashion like never before"
          disabled={false}
          speed={3}
          className="text-sm md:text-base text-blue-500 dark:text-blue-400  font-medium"
        />
        
        <BlurText
          text="Elevate Your Style With Fashion Store"
          delay={50}
          animateBy="words"
          direction="top"
          className="text-3xl my-3 sm:text-4xl md:text-5xl font-bold leading-tight md:leading-[1.2] mb-3 "
        />
        
        <div className="w-full my-3 max-w-xl px-2 md:px-0">
          <DecryptedText
            text="Discover a world of fashion-forward trends, curated collections, and timeless pieces that inspire. Unleash your inner fashionista and embark on a journey of confidence, elegance and impeccable style."
            speed={50}
            maxIterations={20}
            animateOn="view"
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234!?"
            className="revealed text-base sm:text-lg  mb-6 leading-relaxed"
            parentClassName="all-letters"
            encryptedClassName="encrypted"
          />
        </div>

        {/* Feature badges */}
        <motion.div 
          className="flex flex-wrap gap-3 mt-2 justify-center md:justify-start mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="flex items-center gap-2 bg-white dark:bg-gray-800/50 px-3 py-1.5 rounded-full shadow-sm border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-lg">{feature.icon}</span>
              <span className="text-sm font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Box className="w-full sm:w-auto">
            <InteractiveHoverButton className="text-black dark:text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 w-full py-2.5 text-base font-medium">
              Start Shopping
            </InteractiveHoverButton>
          </Box>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:border-blue-500 dark:hover:border-blue-400 transition-colors w-full sm:w-auto"
          >
            Explore Collections
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-3 gap-4 mt-4 w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[
            { value: "10K+", label: "Products" },
            { value: "2M+", label: "Customers" },
            { value: "15+", label: "Years" },
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800/30"
              whileHover={{ y: -3 }}
            >
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right Content - Watch Image */}
      <motion.div 
        className="relative w-full md:w-1/2 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Background decorative elements */}
        <motion.div 
          className="absolute -z-10 w-72 h-72 rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute -z-10 w-60 h-60 rounded-full bg-purple-100 dark:bg-purple-900/20 blur-3xl  right-8"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={animationKey}
            initial={{ x: 200, opacity: 0, rotate: 15, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ x: -200, opacity: 0, rotate: -15, scale: 0.9 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="relative"
          >
            <Image
              src={watchImages[currentWatch]}
              alt="Watch"
              width={340}
              height={340}
              className="object-contain rounded-xl drop-shadow-2xl"
              priority
            />
            
            <motion.div
              className="absolute -top-3 -right-3 bg-white dark:bg-gray-800 rounded-lg p-1.5 shadow-lg border border-gray-200 dark:border-gray-700"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-xs font-bold text-green-600">🔥 Popular</span>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-3 -left-3 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-lg border border-gray-200 dark:border-gray-700"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <span className="text-xs font-bold text-amber-600">⭐ Best Seller</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}