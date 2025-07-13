"use client";

import { Box, TextField, InputAdornment, Divider, Typography, Link as MuiLink } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { Search } from "@mui/icons-material";
import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export default function FooterSection() {
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

    return (
        <motion.footer
            ref={ref}
            className="bg-[#0d1117] text-white px-4 md:px-20 py-12"
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
                <Box className="w-full max-w-xl flex">
                    <TextField
                        fullWidth
                        placeholder="Enter your email..."
                        variant="outlined"
                        size="small"
                        sx={{
                            backgroundColor: "white",
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
                                color: "#111827",
                                fontSize: '0.875rem',
                                "&::placeholder": {
                                    color: "#6B7280",
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" sx={{ color: "#9CA3AF", mr: 0 }}>
                                    <Search fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <button
                        className="px-3 h-10 min-w-fit text-[0.8125rem] font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-98 transition-all duration-150 ease-in rounded-r-[10px] whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        aria-label="Subscribe to newsletter"
                    >
                        Subscribe
                    </button>
                </Box>
            </Box>

            <Divider sx={{ backgroundColor: "#374151", mb: 8 }} />

            {/* Columns - Added staggered animations */}
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
                                sx={{
                                    fontWeight: 600,
                                    mb: 3,
                                    color: "white",
                                    fontSize: "1.1rem"
                                }}
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
                                                sx={{
                                                    color: "#9CA3AF",
                                                    "&:hover": {
                                                        color: "white",
                                                        textDecoration: "underline",
                                                    },
                                                    transition: "color 0.2s ease",
                                                    cursor: "pointer",
                                                    display: "inline-block",
                                                }}
                                            >
                                                {link}
                                            </MuiLink>
                                        </motion.li>
                                    ))}
                                </ul>
                            ) : (
                                <Box>
                                    <Typography sx={{ color: "#9CA3AF", mb: 3 }}>
                                        Follow us on social media for updates
                                    </Typography>
                                    <Box className="flex gap-4">
                                        {[
                                            { icon: <FaFacebookF />, color: "#4267B2" },
                                            { icon: <FaTwitter />, color: "#1DA1F2" },
                                            { icon: <FaInstagram />, color: "#E1306C" },
                                            { icon: <FaLinkedinIn />, color: "#0077B5" },
                                            { icon: <FaYoutube />, color: "#FF0000" },
                                        ].map((social, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ y: -5, scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ type: "spring", stiffness: 400 }}
                                            >
                                                <MuiLink
                                                    href="#"
                                                    sx={{
                                                        color: "white",
                                                        backgroundColor: social.color,
                                                        borderRadius: "50%",
                                                        width: 36,
                                                        height: 36,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        "&:hover": {
                                                            boxShadow: `0 4px 8px ${social.color}80`,
                                                        },
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

            <Divider sx={{ backgroundColor: "#374151", mb: 4 }} />

            {/* Bottom Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={controls}
                transition={{ delay: 0.4 }}
            >
                <Box className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <Typography sx={{ color: "#9CA3AF" }}>
                        © {new Date().getFullYear()} Greelogik. All rights reserved.
                    </Typography>
                    <Box className="flex flex-wrap gap-4 justify-center">
                        {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((item, i) => (
                            <MuiLink
                                key={i}
                                href="#"
                                sx={{
                                    color: "#9CA3AF",
                                    "&:hover": {
                                        color: "white",
                                        textDecoration: "underline",
                                    },
                                    transition: "color 0.2s ease",
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