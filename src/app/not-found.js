'use client'
import { motion } from 'framer-motion';
import { Button, Container, Typography } from '@mui/material';
import { Home, ShoppingCart } from '@mui/icons-material';
import Link from 'next/link';
import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | ShopEase</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Head>
      
      <Container maxWidth="lg" className="min-h-screen flex items-center justify-center py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Animated 404 Text */}
          <div className="relative mb-8">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="text-9xl font-bold text-indigo-600"
            >
              4
            </motion.div>
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
              className="text-9xl font-bold text-indigo-600 inline-block mx-2"
            >
              0
            </motion.div>
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
              className="text-9xl font-bold text-indigo-600 inline-block"
            >
              4
            </motion.div>
          </div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Typography variant="h4" className="mb-4 text-gray-800">
              Oops! Page not found
            </Typography>
            <Typography variant="body1" className="mb-8 text-gray-600 max-w-md mx-auto">
              The page you are looking for might have been removed, had its name changed, 
              or is temporarily unavailable.
            </Typography>
          </motion.div>

          {/* Animated Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <svg className="w-64 h-64 mx-auto" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M250,50 L450,150 L450,350 L250,450 L50,350 L50,150 Z"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="10"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.path
                d="M150,200 L350,200 L350,300 L150,300 Z"
                fill="none"
                stroke="#ef4444"
                strokeWidth="8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
              />
              <motion.line
                x1="220"
                y1="230"
                x2="280"
                y2="270"
                stroke="#ef4444"
                strokeWidth="8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 1.5, ease: "easeInOut" }}
              />
              <motion.line
                x1="220"
                y1="270"
                x2="280"
                y2="230"
                stroke="#ef4444"
                strokeWidth="8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/" passHref>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<Home />}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Go Home
              </Button>
            </Link>
            <Link href="/products" passHref>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                startIcon={<ShoppingCart />}
              >
                Browse Products
              </Button>
            </Link>
          </motion.div>

          {/* Floating elements for visual interest */}
          <motion.div
            className="absolute top-20 left-10 w-10 h-10 rounded-full bg-indigo-200 opacity-50"
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-purple-200 opacity-50"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </motion.div>
      </Container>
    </>
  );
}
