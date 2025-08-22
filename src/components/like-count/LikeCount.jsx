'use client'
import React from "react"
import useSWR, { mutate } from "swr"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { useAuth } from "@clerk/nextjs"
import { toast } from "sonner"
import { useWishlist } from "@/context/wishlistContext"

const fetcher = url => axios.get(url).then(res => res.data)

export default function LikeButton({ productId, userId, productData }) {
    const { data, error, isLoading } = useSWR(`/api/product/${productId}`, fetcher)
    const { getToken } = useAuth();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [isHovered, setIsHovered] = React.useState(false);

    React.useEffect(() => {
        if (data?.likedBy && productData) {
            const isFavorite = data.likedBy.includes(userId);
            const isInLocalWishlist = isInWishlist(productId);
            
            if (isFavorite && !isInLocalWishlist) {
                addToWishlist(productData);
            } else if (!isFavorite && isInLocalWishlist) {
                removeFromWishlist(productId);
            }
        }
    }, [data?.likedBy, isInWishlist, productData, productId, userId, addToWishlist, removeFromWishlist]);

    if (isLoading) return (
        <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            <div className="h-4 w-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
        </div>
    )
    
    if (error) return <span>Error loading product</span>

    const likeCount = data?.likes || 0
    const isFavorite = data?.likedBy?.includes(userId)

    async function handleToggleLike() {
        try {
            const token = await getToken()

            const res = await axios.patch(
                `/api/product/${productId}/like`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (res.data.success) {
                mutate(`/api/product/${productId}`, {
                    ...data,
                    likes: res.data.likes,
                    likedBy: res.data.likedBy
                }, false)

                if (res.data.message === "Like added") {
                    toast.success("Added to wishlist");
                } else if (res.data.message === "Like removed") {
                    toast.success("Removed from wishlist");
                }
            }
        } catch (err) {
            console.error("Error liking product:", err);
            toast.error("Failed to update like");
        }
    }

    return (
        <div className="flex items-center gap-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative"
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleToggleLike}
                                disabled={!userId}
                                className={`group relative h-10 w-10 transition-all duration-300 ${
                                    isFavorite 
                                    ? "bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/30" 
                                    : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                                } rounded-full`}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <AnimatePresence mode="wait">
                                    {isFavorite ? (
                                        <motion.div
                                            key="filled"
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0, rotate: 90 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                            className="relative"
                                        >
                                            <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                                            
                                            {/* Sparkle effect when liked */}
                                            <AnimatePresence>
                                                {isHovered && (
                                                    <>
                                                        {[0, 1, 2].map(i => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ scale: 0, opacity: 0 }}
                                                                animate={{ scale: 1, opacity: 1 }}
                                                                exit={{ scale: 0, opacity: 0 }}
                                                                transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                                                                className="absolute"
                                                                style={{
                                                                    top: `${Math.sin(i * 2) * 8}px`,
                                                                    left: `${Math.cos(i * 2) * 8}px`,
                                                                }}
                                                            >
                                                                <Sparkles className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                                                            </motion.div>
                                                        ))}
                                                    </>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="outline"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                        >
                                            <Heart className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-white dark:bg-white dark:text-black text-xs px-2 py-1">
                        <p>{isFavorite ? "Remove from wishlist" : "Add to wishlist"}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <AnimatePresence mode="wait">
                <motion.span
                    key={likeCount}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`text-sm font-medium min-w-[1.5rem] text-center ${
                        isFavorite 
                        ? "text-red-600 dark:text-red-400" 
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                >
                    {likeCount}
                </motion.span>
            </AnimatePresence>
        </div>
    )
}