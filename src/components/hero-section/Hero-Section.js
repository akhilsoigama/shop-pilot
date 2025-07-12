"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants, itemVariants } from "../motion/Motion";
import BlurText from "../react-bits/blur-text/Blur-text";
import ShinyText from "../react-bits/shiny-text/Shiny-Text";

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
            className={`text-white h-[400px] overflow-hidden flex flex-col-reverse md:flex-row items-center justify-between px-6 pt-0 pb-20 gap-10 md:gap-20 ${poppins.className}`}
        >
            {/* Left Content */}
            <motion.div
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{ flex: 4 }}
                className="flex flex-col text-center md:text-left items-center md:items-start w-full"
            >
                <ShinyText
                    text="Experience fashion like never before"
                    disabled={false}
                    speed={3}
                    className="text-sm text-slate-400 mb-2"
                />
                <BlurText
                    text={`Elevate Your Style With Fashion Store:Where Fashion Meets Passion`}
                    delay={100}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={() => console.log("Animation completed!")}
                    className="text-2xl md:text-4xl font-bold leading-snug md:leading-[1.3] mb-4 text-center md:text-left"
                />
                <Typography
                    variant="body1"
                    mt={2}
                    mb={4}
                    sx={{
                        color: "#cbd5e1",
                        maxWidth: 700,
                        fontSize: "1.05rem",
                        fontFamily: "Poppins, sans-serif",
                        textAlign: { xs: "center", md: "left" },
                    }}
                >
                    Discover a world of fashion-forward trends, curated collections, and
                    timeless pieces that inspire. Unleash your inner fashionista and
                    embark on a journey of confidence, elegance and impeccable style.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                        borderRadius: "999px",
                        px: 4,
                        py: 1.5,
                        textTransform: "none",
                    }}
                >
                    Start Shopping
                </Button>
            </motion.div>

            {/* Right Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={animationKey}
                    initial={{ x: 900, y: -300, opacity: 0, rotate: 60 }}
                    animate={{ x: 0, y: 30, opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    style={{ flex: 2 }}
                    className="flex justify-center w-full"
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