"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import CarouselItem from "./CarouselItem";

const GAP = 12;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
  items = [],
  baseWidth = 220,
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnHover = true,
  loop = true,
  round = false,
  bgColor = "bg-gray-100",
}) {
  const containerPadding = 0;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const containerRef = useRef(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === carouselItems.length - 1 ? 0 : prev + 1
        );
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, carouselItems.length]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const DRAG_BUFFER = 0;
    const VELOCITY_THRESHOLD = 500;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${bgColor} rounded-lg`}
      style={{ width: `${baseWidth * 3 + GAP * 2}px`, height: "180px" }} 
    >
      <motion.div
        className="flex flex-wrap" 
        drag="x"
        dragConstraints={{ left: -trackItemOffset * (carouselItems.length - 1), right: 0 }}
        style={{
          width: itemWidth * 2 + GAP * 3, 
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className="w-[calc(33.33% - 8px)]" 
            style={{
              height: '180px',
              marginBottom: index < carouselItems.length - 3 ? GAP : 0 
            }}
          >
            <CarouselItem
              item={item}
              index={index}
              x={x}
              itemWidth={itemWidth}
              trackItemOffset={trackItemOffset}
              round={round}
              transition={effectiveTransition}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );

}