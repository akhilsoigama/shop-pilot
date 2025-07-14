"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    useCarousel,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const banners = [
    {
        id: 1,
        img: "/images/banners/banner1.png",
        title: "Your Cozy Era",
        subtitle: "Get peak comfy-chic with new winter essentials.",
        cta: "Shop Now",
    },
    {
        id: 2,
        img: "/images/banners/banner2.png",
    },
    {
        id: 3,
        img: "/images/banners/banner3.jpg",
    },
];

function BannerNavigationButtons() {
    const { api } = useCarousel();

    if (!api) return null;

    return (
        <>
            <Button
                onClick={() => api.scrollPrev()}
                className="absolute z-30 size-10 rounded-full bg-white text-black hover:bg-gray-200 left-4 top-1/2 -translate-y-1/2 shadow-md"
            >
                <ArrowLeft />
            </Button>
            <Button
                onClick={() => api.scrollNext()}
                className="absolute z-30 size-10 rounded-full bg-white text-black hover:bg-gray-200 right-4 top-1/2 -translate-y-1/2 shadow-md"
            >
                <ArrowRight />
            </Button>
        </>
    );
}

export default function BannerSection() {
    return (
        <section className="w-full overflow-hidden relative">
            <Carousel
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 5000 })]}
                className="w-full"
            >
                <CarouselContent>
                    {banners.map((banner, index) => (
                        <CarouselItem key={banner.id} className="w-full">
                            <div className="relative w-full h-[300px] md:h-[450px] lg:h-[600px]">
                                <Image
                                    src={banner.img}
                                    alt={`Banner ${index + 1}`}
                                    fill
                                    priority={index === 0}
                                    className="object-fill"
                                />

                                {index === 0 && (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.8 }}
                                            className="absolute z-20 left-4 md:left-16 top-1/3 max-w-md text-white"
                                        >
                                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                                {banner.title}
                                            </h2>
                                            <p className="text-base md:text-lg mb-6">
                                                {banner.subtitle}
                                            </p>
                                            <button className="bg-white text-black px-6 py-2 text-sm font-medium rounded shadow">
                                                {banner.cta}
                                            </button>
                                        </motion.div>

                                        <div className="absolute inset-0 bg-black/30 z-10" />
                                    </>
                                )}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Buttons */}
                <BannerNavigationButtons />
            </Carousel>
        </section>
    );
}
