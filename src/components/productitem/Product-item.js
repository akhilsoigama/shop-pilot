'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Box, Typography, Card, CardContent } from '@mui/material'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function ProductGrid({ products }) {
  return (
    <Box className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 p-2 sm:p-4 lg:p-6">
      {products.map((product) => (
        <motion.div
          key={product._id}
          whileHover={{ scale: 1.02 }}
          className="cursor-pointer"
        >
          <Link href={`/product/${product.productKey}`} className="block h-full">
            <Card
              elevation={3}
              className={cn(
                'rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full'
              )}
            >
              <div className="relative w-full aspect-[4/3] bg-white dark:bg-black">
                {product.productImage?.[0] && (
                  <Image
                    src={product.productImage[0]}
                    alt={product.productName}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-2 transition-transform duration-300 hover:scale-105"
                  />
                )}
              </div>

              <CardContent className="p-3 sm:p-4 flex flex-col gap-1 flex-1 justify-between">
                <Typography
                  variant="subtitle2"
                  className="font-medium text-sm sm:text-base text-zinc-900 dark:text-white line-clamp-2"
                >
                  {product.productName}
                </Typography>

                <Box className="flex items-center gap-2 flex-wrap">
                  <Typography
                    variant="body2"
                    className="line-through text-gray-500 dark:text-gray-400 text-xs sm:text-sm"
                  >
                    ₹{product.price.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="font-bold text-black dark:text-white text-sm sm:text-base"
                  >
                    ₹{product.discountPrice.toFixed(2)}
                  </Typography>
                  {product.discount > 0 && (
                    <Badge
                      variant="success"
                      className="text-[10px] sm:text-xs font-semibold"
                    >
                      {product.discount}% OFF
                    </Badge>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </Box>
  )
}
