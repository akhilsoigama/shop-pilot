"use client";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Poppins } from "next/font/google";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "../ui/carousel";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const categories = [
  "Shirts",
  "Shorts",
  "Jackets",
  "Hoodies",
  "Trousers",
  "Shoes",
  "Accessories",
];

const productData = {
  Shirts: [
    { title: "Levis Dri-FIT", subtitle: "Men's T-shirt", img: "/images/shirts/shirt1.png" },
    { title: "Levis Stripes", subtitle: "Men's T-shirt", img: "/images/shirts/shirt2.png" },
    { title: "H&M Regular Fit", subtitle: "Men's T-shirt", img: "/images/shirts/shirt3.png" },
    { title: "Jack & Jones", subtitle: "Men's T-shirt", img: "/images/shirts/shirt6.png" },
    { title: "Zara Oversized", subtitle: "Men's T-shirt", img: "/images/shirts/tshirt4.png" },
    { title: "Roadster Fit", subtitle: "Men's T-shirt", img: "/images/shirts/tshirt5.png" },
    { title: "HRX Cotton Tee", subtitle: "Men's T-shirt", img: "/images/shirts/top7.png" },
    { title: "Superdry Slim", subtitle: "Men's T-shirt", img: "/images/shirts/top8.png" },
  ],
  Shorts: [],
  Jackets: [],
  Hoodies: [],
  Trousers: [],
  Shoes: [],
  Accessories: [],
};

const sectionVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function CategorySection() {
  const [selectedCategory, setSelectedCategory] = useState("Shirts");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const products = productData[selectedCategory] || [];

  return (
    <Box
      ref={ref}
      component={motion.div}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`w-full text-white py-16 px-4 sm:px-6 lg:px-8 ${poppins.className}`}
    >
      <Typography
        variant="h4"
        align="center"
        fontWeight={700}
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8"
      >
        Latest Arrivals By Categories
      </Typography>

      <Box className="flex justify-center mb-6 overflow-x-auto">
        <Tabs
          value={selectedCategory}
          onChange={(e, val) => setSelectedCategory(val)}
          textColor="inherit"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{
            "& .MuiTabs-scroller": {
              overflowX: "auto !important",
            },
          }}
        >
          {categories.map((cat) => (
            <Tab
              key={cat}
              label={cat}
              value={cat}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                color: "white",
                "&.Mui-selected": { color: "#cbd5e1" },
                px: { xs: 1.5, sm: 2 },
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
              }}
            />
          ))}
        </Tabs>
      </Box>

      {products.length > 0 ? (
        <Box
          component={motion.div}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Carousel className="w-full cursor-grab">
            <CarouselContent>
              {products.map((item, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/4">
                  <Box className="rounded-2xl overflow-hidden border border-neutral-800 bg-[#1f1f1f] flex flex-col">
                    <Box className="relative w-full pt-[125%] overflow-hidden">
                      <Box
                        component="img"
                        src={item.img}
                        alt={item.title}
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </Box>
                    <Box className="p-4 flex-grow">
                      <Typography className="font-semibold text-white text-base sm:text-lg">
                        {item.title}
                      </Typography>
                      <Typography className="text-gray-400 text-sm sm:text-base">
                        {item.subtitle}
                      </Typography>
                    </Box>
                  </Box>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots />
          </Carousel>
        </Box>
      ) : (
        <Typography align="center" className="text-gray-400">
          No products available.
        </Typography>
      )}
    </Box>
  );
}
