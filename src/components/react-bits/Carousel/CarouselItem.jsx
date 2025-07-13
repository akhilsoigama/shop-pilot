"use client";

import { Box } from "@mui/material";
import { motion, useTransform } from "framer-motion";
import React from "react";

export default function CarouselItem({
    item,
    index,
    x,
    itemWidth,
    trackItemOffset,
    round,
    transition,
}) {
    const range = [
        -(index + 1) * trackItemOffset,
        -index * trackItemOffset,
        -(index - 1) * trackItemOffset,
    ];
    const outputRange = [90, 0, -90];
    const rotateY = useTransform(x, range, outputRange, { clamp: false });

    return (
        <motion.div
            className={`relative shrink-0 overflow-hidden cursor-grab active:cursor-grabbing ${
                round ? "items-center justify-center text-center" : "rounded-lg"
            }`}
            style={{
                width: itemWidth,
                height: 180,
                rotateY,
                ...(round && { borderRadius: "50%" }),
            }}
            transition={transition}
        >
            <Box className="px-4 relative w-full h-full">
                {typeof item.icon === "string" ? (
                    <img
                        src={item.icon}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <Box className="relative right-0 w-full h-full">
                        {item.icon}
                    </Box>
                )}
                <div className=" bg-black/60 text-white p-2">
                    <h3 className="text-sm font-semibold truncate">{item.title}</h3>
                    {item.description && (
                        <p className="text-xs text-gray-300 truncate">{item.description}</p>
                    )}
                </div>
            </Box>
        </motion.div>
    );
}