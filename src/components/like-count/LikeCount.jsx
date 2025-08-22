'use client'

import useSWR, { mutate } from "swr"
import axios from "axios"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
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

    if (isLoading) return <span>Loading...</span>
    if (error) return <span>Error loading product</span>

    const likeCount = data?.likes || 0
    const isFavorite = data?.likedBy?.includes(userId)
    // Safe check for productData
    const isInWishlistState = productData ? isInWishlist(productData._id) : false

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
                
                // Add safe checks for productData
                if (res.data.message === "Like added" && productData) {
                    addToWishlist(productData);
                    toast.success("Added to wishlist");
                } else if (res.data.message === "Like removed") {
                    removeFromWishlist(productId);
                    toast.success("Removed from wishlist");
                }
                
            } else {
                toast.error("Failed to update like")
            }

        } catch (err) {
            console.error("Error liking product:", err)
            if (err.response?.data?.details) {
                toast.error(err.response.data.details)
            } else {
                toast.error("Failed to update like")
            }
        }
    }

    return (
        <div className="flex items-center gap-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleToggleLike}
                            className="relative flex items-center gap-1"
                            disabled={!userId}
                        >
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Heart
                                    className={`w-5 h-5 transition-colors ${isFavorite
                                            ? "fill-red-500 text-red-500"
                                            : "text-gray-400 hover:text-red-500"
                                        }`}
                                />
                            </motion.div>

                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {likeCount}
                            </span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{isFavorite ? "Remove from wishlist" : "Add to wishlist"}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}