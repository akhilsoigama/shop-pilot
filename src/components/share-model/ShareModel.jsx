'show client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import {
    Check,
    Copy,
    Facebook,
    Linkedin,
    MessageCircle,
    Mail,
    Link as LinkIcon,
} from "lucide-react"
import { FaXTwitter } from 'react-icons/fa6'
import Image from "next/image"

export default function ShareModal({ product, isOpen, onClose }) {
    const [isCopied, setIsCopied] = useState(false)
    const [currentUrl, setCurrentUrl] = useState("")

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href)
        }
    }, [])

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl)
            setIsCopied(true)
            toast.success("Link copied to clipboard!")
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            toast.error("Failed to copy link")
        }
    }

    const shareOnSocialMedia = (platform) => {
        let url = ""
        const text = `Check out ${product.productName} on our store!`

        switch (platform) {
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
                break
            case 'x':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`
                break
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
                break
            case 'whatsapp':
                url = `https://wa.me/?text=${encodeURIComponent(text + " " + currentUrl)}`
                break
            case 'email':
                url = `mailto:?subject=${encodeURIComponent(product.productName)}&body=${encodeURIComponent(text + "\n\n" + currentUrl)}`
                break
            default:
                return
        }

        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-full max-w-[95vw] sm:max-w-xl md:max-w-xl bg-white dark:bg-gray-950 border-0 rounded-2xl overflow-hidden p-0 shadow-2xl max-h-[85vh] overflow-y-auto">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 p-4 sm:p-6 text-white relative">
                                <DialogHeader className="space-y-2 sm:space-y-3 text-center">
                                    <DialogTitle className="text-base sm:text-xl font-bold">
                                        Share this product
                                    </DialogTitle>
                                    <p className="text-white/80 text-xs">
                                        Spread the word about this amazing product!
                                    </p>
                                </DialogHeader>
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-6">
                                <div className="flex items-center gap-2 sm:gap-3 mb-4 p-2 w-[275px] sm:w-full sm:p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                                    <div className="relative h-10 w-10 sm:h-16 sm:w-16 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src={product.productImage[0]}
                                            alt={product.productName}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-xs w-[200px] sm:w-[430px] sm:text-sm truncate text-gray-900 dark:text-white">
                                            {product.productName}
                                        </h4>
                                        <p className="text-primary font-bold text-xs sm:text-sm">
                                            ₹{product.discountPrice || product.price}
                                            {product.discount > 0 && (
                                                <span className="line-through text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs ml-1">
                                                    ₹{product.price}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {/* Copy link */}
                                <div className="mb-4">
                                    <Label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        Copy link
                                    </Label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 relative max-w-[70vw] sm:max-w-full">
                                            <Input
                                                value={currentUrl}
                                                readOnly
                                                className="pr-8 pl-8 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 truncate font-mono text-[10px] sm:text-sm h-8 sm:h-10"
                                            />
                                            <LinkIcon className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                                            {isCopied && (
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 text-green-500">
                                                    <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </div>
                                            )}
                                        </div>
                                        <Button
                                            onClick={copyToClipboard}
                                            className="whitespace-nowrap bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-md h-8 sm:h-10 px-2 sm:px-4 text-xs"
                                        >
                                            {isCopied ? (
                                                <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                                            ) : (
                                                <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                                            )}
                                            <span className="ml-1 hidden sm:inline">
                                                {isCopied ? "Copied" : "Copy"}
                                            </span>
                                        </Button>
                                    </div>
                                </div>

                                {/* Social sharing */}
                                <div>
                                    <Label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                                        Share via
                                    </Label>
                                    <div className="grid grid-cols-5 gap-2 sm:gap-3">
                                        {[
                                            { platform: 'facebook', icon: Facebook, label: 'Facebook', color: 'bg-blue-600' },
                                            { platform: 'x', icon: FaXTwitter, label: 'x', color: 'bg-blue-400' },
                                            { platform: 'whatsapp', icon: MessageCircle, label: 'WhatsApp', color: 'bg-green-500' },
                                            { platform: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: 'bg-blue-700' },
                                            { platform: 'email', icon: Mail, label: 'Email', color: 'bg-gray-600' },
                                        ].map((social) => (
                                            <button
                                                key={social.platform}
                                                onClick={() => shareOnSocialMedia(social.platform)}
                                                className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl ${social.color} text-white transition-colors`}
                                            >
                                                <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                                                <span className="hidden sm:block text-[10px] sm:text-xs">
                                                    {social.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    )
}
