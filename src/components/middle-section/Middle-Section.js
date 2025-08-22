"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Box } from "@mui/material";
import { useRef } from "react";

const MotionCard = ({ title, description, image, className = "", imageHeight = 300 }) => (
 <motion.div
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
  transition={{
    duration: 0.4,
    hover: { type: "spring", stiffness: 400, damping: 10 }
  }}
  className={`relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer ${className}`}
  style={{ height: `${imageHeight}px` }}
>
  <div className="absolute inset-0 dark:bg-black/10 bg-black/20 z-10" />
  <Image
    src={image}
    alt={title}
    fill
    className="w-full h-full object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
  />

  {/* Overlay */}
  <div
    className="absolute inset-0 flex flex-col justify-end p-6 text-white z-20
               opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0
               transition-all duration-300 ease-in-out
               bg-gradient-to-t from-black/70 via-black/30 to-transparent"
  >
    <h3 className="text-xl font-bold">{title}</h3>
    {description && (
      <p className="text-sm text-white/90 mt-2">{description}</p>
    )}
  </div>
</motion.div>

);

export default function MiddleSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Box className="py-16 px-4  md:px-20">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 dark:text-white text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Explore Our Latest Collections For You
        </motion.h2>

        <Box className="w-full flex flex-col md:flex-row gap-6">
          {/* Left Column */}
          <Box className="flex flex-col gap-6 w-full md:w-1/2">
            <MotionCard
              title="Collection For Couples"
              description="Coordinated designs & styles to show your bond."
              image="/images/Bag.webp"
              imageHeight={200}
              className="hover:shadow-xl"
            />

            <Box className="flex flex-col md:flex-row gap-6">
              <Box className="w-full md:w-1/2">
                <MotionCard
                  title="Leather Watch Collection"
                  description="Premium craftsmanship for timeless elegance"
                  image="/images/watch4.jpg"
                  imageHeight={200}
                  className="hover:shadow-xl"
                />
              </Box>
              <Box className="w-full md:w-1/2">
                <MotionCard
                  title="New Tote Bags Collection"
                  description="Functional fashion for everyday carry"
                  image="/images/goggles.jpg"
                  imageHeight={200}
                  className="hover:shadow-xl"
                />
              </Box>
            </Box>
          </Box>

          {/* Right Column */}
          <Box className="w-full md:w-1/2">
            <MotionCard
              title="Stylish Summer Looks"
              description="Lightweight fabrics for warm weather comfort"
              image="/images/shoes.jpg"
              imageHeight={415}
              className="hover:shadow-xl"
            />
          </Box>
        </Box>

      </Box>
    </motion.div>
  );
}