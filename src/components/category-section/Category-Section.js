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
import { categories } from "@/lib/category";
import { useProducts } from "@/hooks/useProduct";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
 
const sectionVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function CategorySection() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { products, isLoading } = useProducts(selectedCategory);

  const discountedProducts = products.filter((item) => item.discount > 50);
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

      {isLoading ? (
        <Typography align="center" className="text-gray-400">
          Loading products...
        </Typography>
      ) : discountedProducts.length > 0 ? (
        <Box
          component={motion.div}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Carousel className="w-full cursor-grab">
            <CarouselContent>
              {discountedProducts.map((item, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/4">
                  <Box className="rounded-2xl overflow-hidden border border-neutral-800 bg-[#1f1f1f] flex flex-col hover:shadow-lg transition-shadow duration-300">
                    <Box className="relative w-full pt-[125%] overflow-hidden">
                      <Box
                        component="img"
                        src={item.productImage[0]}
                        alt={item.productName}
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {!item.inStock && (
                        <Box className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                          Out of Stock
                        </Box>
                      )}
                      {Date.now() - new Date(item.createdAt).getTime() <
                        7 * 24 * 60 * 60 * 1000 && (
                        <Box className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                          Sale
                        </Box>
                      )}
                    </Box>
                    <Box className="p-4 flex flex-col gap-1">
                      <Typography className="font-semibold text-white text-base line-clamp-1">
                        {item.productName}
                      </Typography>
                      <Typography className="text-gray-400 text-sm">
                        Brand: <span className="text-white">{item.brand}</span>
                      </Typography>
                      <Box className="flex items-center gap-2 mt-1">
                        <Typography className="text-white font-bold text-lg">
                          ₹{item.discountPrice ?? item.price}
                        </Typography>
                        {item.discount > 0 && (
                          <>
                            <Typography className="line-through text-sm text-gray-500">
                              ₹{item.price}
                            </Typography>
                            <Typography className="text-sm text-green-400 font-medium">
                              {item.discount}% off
                            </Typography>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots />
          </Carousel>
        </Box>
      ) : (
        <Typography align="center" className="text-gray-400 mt-8">
          No products available.
        </Typography>
      )}
    </Box>
  );
}
