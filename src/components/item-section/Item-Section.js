"use client";

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";

const items = [
  {
    title: "Modern Living",
    category: "Home & Living",
    description: "Elevate your space with our premium furniture collection",
    image: "/images/Home-living.webp",
    accentColor: "#8B5FBF",
  },
  {
    title: "Urban Fashion",
    category: "Clothing & Shoes",
    description: "Discover the latest trends in contemporary streetwear",
    image: "/images/Clothing-Shoes.webp",
    accentColor: "#E94F64",
  },
  {
    title: "Classic Toys",
    category: "Toys & Entertainment",
    description: "Timeless toys that spark creativity and imagination",
    image: "/images/toy-train.webp",
    accentColor: "#FFBE0B",
  },
  {
    title: "Celebration Essentials",
    category: "Party Decors",
    description: "Everything you need for unforgettable celebrations",
    image: "/images/PARTY-DECORS.webp",
    accentColor: "#3A86FF",
  },
  {
    title: "Elegant Accessories",
    category: "Jewelry & Accessories",
    description: "Sophisticated pieces for every occasion",
    image: "/images/DIAMOND-RING.webp",
    accentColor: "#06D6A0",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hover: {
    y: -15,
    transition: {
      duration: 0.4,
    },
  },
};

export default function PremiumCollectionSection() {
  const theme = useTheme();
  
  return (
    <Box 
      component="section"
      sx={{ 
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 4 },
        position: 'relative',
        overflow: 'hidden',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          height: '1px',
          zIndex: 1
        },
        '&::before': {
          top: 0
        },
        '&::after': {
          bottom: 0
        }
      }}
    >
      <Box sx={{ 
        maxWidth: 1600, 
        mx: 'auto', 
        position: 'relative',
        px: { xs: 0, sm: 2 }
      }}>
        {/* Section Header */}
        <Box sx={{ 
          textAlign: 'center',
          mb: { xs: 6, md: 10 },
          position: 'relative'
        }}>
          <Typography
            variant="h2"
            component={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "text.primary",
              letterSpacing: { xs: "-0.02em", md: "-0.03em" },
              fontSize: { xs: "1.25rem", md: "2rem" },
              lineHeight: { xs: 1.1, md: 1 },
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '5px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '3px',
                opacity: 0.8
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '150px',
                height: '1px',
                background: theme.palette.divider,
              }
            }}
          >
            OUR COLLECTIONS
          </Typography>
          
          <Typography
            variant="subtitle1"
            component={motion.p}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            sx={{
              mb: { xs: 4, md: 6 },
              color: "text.secondary",
              maxWidth: 700,
              mx: 'auto',
              px: 2,
              fontWeight: 400,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontSize: { xs: "0.8rem", md: "0.95rem" },
              fontFamily: '"Montserrat", sans-serif',
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                width: { xs: '20px', md: '40px' },
                height: '1px',
                background: theme.palette.divider,
                display: { xs: 'none', sm: 'block' }
              },
              '&::before': {
                left: 0
              },
              '&::after': {
                right: 0
              }
            }}
          >
            Curated Selections For The Discerning Tastemaker
          </Typography>
        </Box>

        {/* Collection Grid */}
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(5, 1fr)",
            },
            gap: { xs: 3, md: 4 },
            mx: 'auto',
            position: 'relative',
          }}
        >
          {items.map((item, index) => (
            <CollectionCard key={index} item={item} variants={itemVariants} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function CollectionCard({ item, variants }) {
  const theme = useTheme();
  
  return (
    <Box
      component={motion.div}
      variants={variants}
      whileHover="hover"
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 6px 30px rgba(0,0,0,0.4)' 
          : '0 6px 40px rgba(0,0,0,0.1)',
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "&:hover": {
          boxShadow: theme.palette.mode === 'dark' 
            ? `0 12px 40px ${item.accentColor}40` 
            : `0 12px 40px rgba(0,0,0,0.15)`,
          "& .collection-image": {
            transform: "scale(1.08)",
            filter: "grayscale(0%) contrast(100%) brightness(1)"
          },
          "& .collection-overlay": {
            opacity: 1,
            background: `linear-gradient(to top, ${item.accentColor}60 10%, transparent 70%)`,
          },
          "& .collection-category": {
            color: "#fff",
            transform: "translateY(0)",
            opacity: 1
          },
          "& .collection-title": {
            transform: "translateY(0)"
          },
          "& .collection-description": {
            opacity: 1,
            transform: "translateY(0)"
          }
        }
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "320px", sm: "360px", md: "320px", lg: "360px" },
          overflow: "hidden",
        }}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="collection-image"
          style={{ 
            objectFit: "cover",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            filter: "grayscale(20%) contrast(110%) brightness(0.85)"
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
          priority={false}
          loading="lazy"
        />
        
        <Box 
          className="collection-overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to top, ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.6)'} 20%, transparent 60%)`,
            opacity: 0.8,
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            p: 4
          }}
        >
          <Typography
            variant="caption"
            className="collection-category"
            component={motion.span}
            initial={{ y: 10 }}
            sx={{
              color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.9)',
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: 'uppercase',
              fontSize: '0.7rem',
              mb: 1.5,
              display: 'inline-block',
              transform: 'translateY(15px)',
              opacity: 0.8,
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {item.category}
          </Typography>

          <Typography
            variant="h3"
            component="h3"
            className="collection-title"
            sx={{
              fontWeight: 800,
              color: "#fff",
              fontSize: { xs: "1.5rem", md: "1.75rem" },
              lineHeight: 1.2,
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              transform: 'translateY(20px)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.05s'
            }}
          >
            {item.title}
          </Typography>

          <Typography
            variant="body2"
            className="collection-description"
            sx={{
              color: "rgba(255,255,255,0.95)",
              mt: 2,
              fontSize: { xs: "0.85rem", md: "0.95rem" },
              textShadow: "0 1px 4px rgba(0,0,0,0.4)",
              opacity: 0,
              transform: 'translateY(25px)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
            }}
          >
            {item.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}