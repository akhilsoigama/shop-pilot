"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Box } from "@mui/material";
import { useRef } from "react";

const MotionCard = ({ title, description, image, className = "", imageHeight = 300 }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.4 }}
    className={`relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer ${className}`}
    style={{ height: `${imageHeight}px` }}
  >
    <Image
      src={image}
      alt={title}
      fill
      className="w-full h-full object-cover"
    />
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      whileHover={{ opacity: 1, backdropFilter: "blur(6px)" }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 group-hover:backdrop-blur-md flex flex-col justify-end p-4 text-white"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-sm text-slate-200 mt-1">{description}</p>
      )}
    </motion.div>
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
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Box className="py-12 px-4 dark:bg-gray-950 text-white md:px-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Explore Our Latest Collections For You
        </h2>

        <Box className="w-full flex gap-6">
          {/* Left Column */}
          <Box className="flex flex-col gap-4 w-1/2">
            <MotionCard
              title="Collection For Couples"
              description="Coordinated designs & styles to show your bond."
              image="/images/Bag.webp"
              imageHeight={200}
            />

            <Box className="flex gap-4">
              <Box className="w-1/2">
                <MotionCard
                  title="Leather Watch Collection"
                  description=""
                  image="/images/watch4.jpg"
                  imageHeight={200}
                />
              </Box>
              <Box className="w-1/2">
                <MotionCard
                  title="New Tote Bags Collection"
                  description=""
                  image="/images/goggles.jpg"
                  imageHeight={200}
                />
              </Box>
            </Box>
          </Box>

          {/* Right Column */}
          <Box className="w-1/2">
            <MotionCard
              title="Stylish Summer Looks"
              description=""
              image="/images/shoes.jpg"
              imageHeight={415}
            />
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
