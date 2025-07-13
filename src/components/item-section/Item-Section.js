"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Carousel from "../react-bits/Carousel/Carousel";

const CATEGORY_STYLES = {
    "Home & Living": {
        bgColor: "bg-amber-100",
        titleColor: "text-amber-800",
        borderColor: "border-amber-300",
        buttonStyle: "bg-amber-500 hover:bg-amber-600 text-white"
    },
    "Clothing & Shoes": {
        bgColor: "bg-blue-100",
        titleColor: "text-blue-800",
        borderColor: "border-blue-300",
        buttonStyle: "bg-blue-500 hover:bg-blue-600 text-white"
    },
    "Toys & Entertainment": {
        bgColor: "bg-purple-100",
        titleColor: "text-purple-800",
        borderColor: "border-purple-300",
        buttonStyle: "bg-purple-500 hover:bg-purple-600 text-white"
    },
    "Jewelry & Accessories": {
        bgColor: "bg-pink-100",
        titleColor: "text-pink-800",
        borderColor: "border-pink-300",
        buttonStyle: "bg-pink-500 hover:bg-pink-600 text-white"
    }
};

const items = [
    {
        title: "SOFA",
        category: "Home & Living",
        image: "/images/Home-living.webp",
        button: true,
    },
    {
        title: "SNEAKERS",
        category: "Clothing & Shoes",
        image: "/images/Clothing-Shoes.avif",
    },
    {
        title: "TOY TRAIN",
        category: "Toys & Entertainment",
        image: "/images/toy-train.webp",
    },
    {
        title: "PARTY DECORS",
        category: "Party decors",
        image: "/images/PARTY-DECORS.jpg",
    },
    {
        title: "DIAMOND RING",
        category: "Jewelry & Accessories",
        image: "/images/DIAMOND-RING.webp",
        button: true,
    },
];

const groupByCategory = (items) =>
    items.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

const toCarouselItems = (group) =>
    group.map((item) => ({
        title: item.title,
        description: item.button ? "Special Offer!" : "",
        icon: (
            <Image
                src={item.image}
                alt={item.title}
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        ),
        button: item.button,
    }));

export default function ItemSection() {
    const groupedItems = groupByCategory(items);
    const categories = Object.entries(groupedItems);

    return (
        <Box sx={{
            py: 4,
            overflow: 'hidden'
        }}>
            {categories.length > 0 && (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <Box sx={{
                        display: 'flex',
                        gap: '20px',
                    }}>
                        {categories[0] && (
                            <Box sx={{width:500}}>
                                <CategoryBox
                                    category={categories[0][0]}
                                    group={categories[0][1]}
                                    style={CATEGORY_STYLES[categories[0][0]]}
                                />
                            </Box>
                        )}

                        <Box sx={{
                            display: 'flex',
                            gap: '20px',
                            minWidth: '300px'
                        }}>
                            {categories[1] && (
                                <CategoryBox
                                    category={categories[1][0]}
                                    group={categories[1][1]}
                                    style={CATEGORY_STYLES[categories[1][0]]}
                                />
                            )}
                            {categories[2] && (
                                <CategoryBox
                                    category={categories[2][0]}
                                    group={categories[2][1]}
                                    style={CATEGORY_STYLES[categories[2][0]]}
                                />
                            )}
                        </Box>
                    </Box>

                    {categories.length > 3 && (
                        <Box sx={{
                            display: 'flex',
                            gap: '20px',
                            flexWrap: 'wrap'
                        }}>
                            {categories.slice(3, 6).map(([category, group], index) => (
                                <Box key={index + 3} sx={{
                                    flex: '1 1 30%',
                                    minWidth: '300px'
                                }}>
                                    <CategoryBox
                                        category={category}
                                        group={group}
                                        style={CATEGORY_STYLES[category] || {
                                            bgColor: "bg-gray-100",
                                            titleColor: "text-gray-800",
                                            borderColor: "border-gray-300",
                                            buttonStyle: "bg-gray-500 hover:bg-gray-600 text-white"
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}
function CategoryBox({ category, group, style }) {
    return (
        <Box
            sx={{
                border: '1px solid',
                borderColor: style.borderColor.replace('border-', ''),
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 1,
                transition: 'transform 0.2s',
                height: '100%',
                '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                }
            }}
            className={style.bgColor}
        >
            <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                px={2}
                pt={2}
                className={style.titleColor}
            >
                {category}
            </Typography>

            <Box sx={{ p: 1, height: 'calc(100% - 60px)' }}>
                <Carousel
                    items={toCarouselItems(group).map(item => ({
                        ...item,
                        buttonStyle: style.buttonStyle
                    }))}
                    baseWidth={220}
                    bgColor={style.bgColor}
                />
            </Box>
        </Box>
    );
}