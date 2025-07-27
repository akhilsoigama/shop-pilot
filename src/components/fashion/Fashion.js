'use client'

import { useRouter } from 'next/navigation'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { fashionCategories } from '@/lib/category'
import { motion } from 'framer-motion'

export default function Fashion() {
  const router = useRouter()

  return (
    <Box className="p-6">
      <Typography
        variant="h4"
        className="text-black mb-6 font-bold text-center"
      >
        Fashion & Apparel
      </Typography>

      {/* Scrollable container */}
      <Box
        className="flex overflow-x-auto space-x-6 justify-center items-center scrollbar-hide px-3 h-[200px]"
        sx={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {fashionCategories.map((item) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={item.slug}
            className="flex flex-col items-center flex-shrink-0 cursor-pointer"
            style={{ scrollSnapAlign: 'center' }}
            onClick={() => router.push(`/fashion/${item.slug}`)}
          >
            {/* Responsive image size */}
            <Box
              className="relative rounded-full overflow-hidden border-4 border-red-500 shadow-lg"
              sx={{
                width: { xs: 80, sm: 100, md: 120 },
                height: { xs: 80, sm: 100, md: 120 },
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 600px) 80px, (max-width: 900px) 100px, 120px"
              />
            </Box>

            <Typography
              variant="body1"
              className="text-white text-center mt-2 font-medium"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
              }}
            >
              {item.name}
            </Typography>
          </motion.div>
        ))}
      </Box>
    </Box>
  )
}
