"use client";

import { Box, TextField, InputAdornment, Divider, Typography, Link as MuiLink, useTheme } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { Search } from "@mui/icons-material";
import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export default function FooterSection() {
    const theme = useTheme();
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, y: 0 });
        }
    }, [controls, inView]);

    // Colors for both modes
    const colors = {
        dark: {
            bg: "bg-gray-950",
            text: "text-white",
            divider: "border-gray-700",
            link: "text-gray-400 hover:text-white",
            inputBg: "bg-gray-800",
            inputText: "text-white",
            inputPlaceholder: "placeholder-gray-500",
            footerText: "text-gray-400",
        },
        light: {
            bg: "bg-gray-50",
            text: "text-gray-900",
            divider: "border-gray-200",
            link: "text-gray-600 hover:text-gray-900",
            inputBg: "bg-white",
            inputText: "text-gray-900",
            inputPlaceholder: "placeholder-gray-400",
            footerText: "text-gray-500",
        }
    };

    const mode = theme.palette.mode;
    const currentColors = colors[mode];

    return (
        <motion.footer
            ref={ref}
            className={`${currentColors.bg} ${currentColors.text} px-4 md:px-20 py-12 shadow-md shadow-gray-500`}
            initial={{ opacity: 0, y: 80 }}
            animate={controls}
            transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1] 
            }}
        >
            <Box className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                <Box sx={{ flex: '0 0 auto' }}>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ display: 'inline-block' }}
                    >
                        <Image
                            src= "/logo.png"
                            alt="Logo"
                            width={50}
                            height={30}
                            className="cursor-pointer"
                        />
                    </motion.div>
                </Box>
                <Box className="w-full max-w-xl flex">
                    <TextField
                        fullWidth
                        placeholder="Enter your email..."
                        variant="outlined"
                        size="small"
                        className={`${currentColors.inputBg} ${currentColors.inputText}`}
                        sx={{
                            borderTopLeftRadius: '10px',
                            borderBottomLeftRadius: '10px',
                            flexGrow: 1,
                            "& .MuiOutlinedInput-root": {
                                paddingRight: 0,
                                height: '40px',
                                "& fieldset": {
                                    border: "none",
                                    borderRadius: '10px',
                                },
                                "&:hover fieldset": {
                                    border: "none",
                                },
                                "&.Mui-focused fieldset": {
                                    border: "none",
                                    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                                },
                            },
                            "& .MuiInputBase-input": {
                                py: 0,
                                px: 2,
                                height: '100%',
                                fontSize: '0.875rem',
                                "&::placeholder": {
                                    opacity: 1,
                                    color: currentColors.inputPlaceholder.replace('placeholder-', ''),
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" sx={{ color: theme.palette.text.secondary, mr: 0 }}>
                                    <Search fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <button
                        className={`px-3 h-10 min-w-fit text-[0.8125rem] font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-98 transition-all duration-150 ease-in rounded-r-[10px] whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                        aria-label="Subscribe to newsletter"
                    >
                        Subscribe
                    </button>
                </Box>
            </Box>

            <Divider className={currentColors.divider} sx={{ mb: 8 }} />

            <Box className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                {[
                    {
                        title: "Company",
                        links: ["About Us", "Careers", "Blog", "Press"],
                    },
                    {
                        title: "Products",
                        links: ["Features", "Pricing", "Documentation", "Integrations"],
                    },
                    {
                        title: "Resources",
                        links: ["Help Center", "Community", "Tutorials", "Webinars"],
                    },
                    {
                        title: "Connect With Us",
                        links: [],
                    },
                ].map((column, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={controls}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: "easeOut"
                        }}
                    >
                        <Box>
                            <Typography
                                variant="subtitle1"
                                className={`font-semibold mb-6 text-lg ${currentColors.text}`}
                            >
                                {column.title}
                            </Typography>
                            {column.links.length > 0 ? (
                                <ul className="space-y-2">
                                    {column.links.map((link, i) => (
                                        <motion.li
                                            key={i}
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <MuiLink
                                                href="#"
                                                className={`${currentColors.link} transition-colors duration-200`}
                                                sx={{
                                                    display: "inline-block",
                                                    textDecoration: "none",
                                                    "&:hover": {
                                                        textDecoration: "underline",
                                                    },
                                                }}
                                            >
                                                {link}
                                            </MuiLink>
                                        </motion.li>
                                    ))}
                                </ul>
                            ) : (
                                <Box>
                                    <Typography className={`${currentColors.link} mb-4`}>
                                        Follow us on social media for updates
                                    </Typography>
                                    <Box className="flex flex-wrap gap-4">
                                        {[
                                            { icon: <FaFacebookF />,  },
                                            { icon: <FaTwitter />,  },
                                            { icon: <FaInstagram />,  },
                                            { icon: <FaLinkedinIn />,},
                                            { icon: <FaYoutube />,  },
                                        ].map((social, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ y: -5, scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ type: "spring", stiffness: 400 }}
                                            >
                                                <MuiLink
                                                    href="#"
                                                    className="flex items-center justify-center rounded-full w-9 h-9 text-white"
                                                    sx={{
                                                        backgroundColor: social.color,
                                                        
                                                        transition: "all 0.2s ease",
                                                    }}
                                                >
                                                    {social.icon}
                                                </MuiLink>
                                            </motion.div>
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </motion.div>
                ))}
            </Box>

            <Divider className={currentColors.divider} sx={{ mb: 4 }} />

            {/* Bottom Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={controls}
                transition={{ delay: 0.4 }}
            >
                <Box className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <Typography className={currentColors.footerText}>
                        © {new Date().getFullYear()} ShopPilot. All rights reserved.
                    </Typography>
                    <Box className="flex flex-wrap gap-4 justify-center">
                        {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((item, i) => (
                            <MuiLink
                                key={i}
                                href="#"
                                className={`${currentColors.link} transition-colors duration-200`}
                                sx={{
                                    textDecoration: "none",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                {item}
                            </MuiLink>
                        ))}
                    </Box>
                </Box>
            </motion.div>
        </motion.footer>
    );
}