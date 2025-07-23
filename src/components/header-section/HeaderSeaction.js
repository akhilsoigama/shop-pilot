"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Close,
  Person,
  Language,
  DarkMode,
  LightMode,
  Menu,
} from "@mui/icons-material";
import { itemVariants } from "../motion/Motion";
import { Box } from "@mui/material";
import Image from "next/image";

const HeaderSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("EN");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsDrawerOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(prefersDark.matches);
    prefersDark.addEventListener("change", (e) => setDarkMode(e.matches));

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isSearchBarVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchBarVisible]);

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  //   document.documentElement.classList.add("animate-[pop_0.3s_ease]");
  //   setTimeout(() => {
  //     document.documentElement.classList.remove("animate-[pop_0.3s_ease]");
  //   }, 300);
  // };

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === "EN" ? "HI" : "EN");
    const ripple = document.createElement("span");
    ripple.classList.add("ripple-effect");
    document.querySelector(".language-btn")?.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  const cartItems = 3;

  return (
    <>
      <header
        className={`w-full py-3 px-4 md:px-8 flex items-center justify-between shadow-md transition-all ${
          darkMode ? "bg-[#111827] text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex items-center space-x-3">
          {isMobile && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDrawerOpen(true)}
            >
              <Menu />
            </motion.button>
          )}
          <motion.div variants={itemVariants}>
            <Box sx={{ flex: '0 0 auto' }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{ display: 'inline-block' }}
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={50}
                  height={30}
                  style={{
                    filter: 'invert(var(--logo-invert, 0))',
                    cursor: 'pointer'
                  }}
                />
              </motion.div>
            </Box>
          </motion.div>
        </div>

        {isMobile ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSearchBarVisible(!isSearchBarVisible)}
          >
            <Search />
          </motion.button>
        ) : (
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full max-w-md relative"
          >
            <input
              type="text"
              placeholder="Search products..."
              className={`w-full pl-10 pr-4 py-2 rounded-full shadow-sm transition-all ${
                darkMode
                  ? "bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                  : "bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
              }`}
            />
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="absolute left-3 top-2.5 text-gray-400"
            >
              <Search />
            </motion.div>
          </motion.div>
        )}

        <div className="flex items-center space-x-4">
          {!isMobile && (
            <motion.button
              className="language-btn relative overflow-hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLanguage}
            >
              <Language />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-1 right-0 text-xs"
              >
                {currentLanguage}
              </motion.span>
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <LightMode className="text-yellow-300" /> : <DarkMode />}
          </motion.button>
          {!isMobile && (
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Person />
            </motion.button>
          )}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative cursor-pointer"
          >
            <ShoppingCart />
            <motion.span
              key={cartItems}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-2 bg-purple-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
            >
              {cartItems}
            </motion.span>
          </motion.div>
        </div>
      </header>

      <AnimatePresence>
        {isMobile && isSearchBarVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-3 ${
              darkMode ? "bg-[#1f2937]" : "bg-white"
            }`}
          >
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                autoFocus
                className={`w-full py-2 pl-10 pr-10 rounded-full ${
                  darkMode
                    ? "bg-gray-700 text-white placeholder-gray-400"
                    : "bg-gray-100 text-gray-900 placeholder-gray-500"
                }`}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" />
              <button
                onClick={() => setIsSearchBarVisible(false)}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                <Close />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobile && isDrawerOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className={`w-64 h-full ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <div className="p-4 flex justify-between items-center border-b">
              <span className="text-lg font-semibold">Menu</span>
              <Close className="cursor-pointer" onClick={() => setIsDrawerOpen(false)} />
            </div>
            <div className="p-4 space-y-4">
              <button className="flex items-center gap-2">
                <Person />
                Account
              </button>
              <button className="flex items-center gap-2" onClick={toggleLanguage}>
                <Language />
                Language ({currentLanguage})
              </button>
              <button className="flex items-center gap-2" >
                {darkMode ? <LightMode className="text-yellow-300" /> : <DarkMode />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
          width: 40px;
          height: 40px;
          top: -10px;
          left: -10px;
        }
        @keyframes ripple {
          to {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default HeaderSection;