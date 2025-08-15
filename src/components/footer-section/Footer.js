"use client";

import { Box, TextField, InputAdornment, Divider, Typography, Link as MuiLink, useTheme } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { Search } from "@mui/icons-material";
import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export default function PremiumFooter() {
    const theme = useTheme();
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    const socialColors = {
        facebook: "#1877F2",
        twitter: "#1DA1F2",
        instagram: "linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737, #FCAF45, #FFDC80)",
        linkedin: "#0A66C2",
        youtube: "#FF0000"
    };

    return (
        <Box
            component="footer"
            sx={{
                position: 'relative',
                overflow: 'hidden',
                pt: 6,
                pb: 3,
                px: { xs: 4, md: 8 },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: `linear-gradient(90deg, transparent, ${theme.palette.divider}, transparent)`,
                }
            }}
        >
            <Box
                ref={ref}
                component={motion.div}
                initial="hidden"
                animate={controls}
                variants={containerVariants}
                sx={{
                    maxWidth: 1600,
                    mx: 'auto',
                    position: 'relative'
                }}
            >
                {/* Header with Search */}
                <Box
                    component={motion.div}
                    variants={itemVariants}
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 6,
                        mb: 5
                    }}
                >
                    {/* Logo */}
                    <Box
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexShrink: 0
                        }}
                    >
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={60}
                            height={60}
                            style={{
                                filter: theme.palette.mode === 'dark' ? 'drop-shadow(0 2px 8px rgba(255,255,255,0.2))' : 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                            }}
                        />
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 900,
                                letterSpacing: '-0.03em',
                                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                display: 'block',
                                textShadow: theme.palette.mode === 'dark' ? '0 2px 10px rgba(255,255,255,0.1)' : '0 2px 10px rgba(0,0,0,0.05)'
                            }}
                        >
                            ShopPilot
                        </Typography>
                    </Box>

                    {/* Search */}
                    <Box
                        component={motion.div}
                        whileHover={{ y: -3 }}
                        sx={{
                            width: '100%',
                            maxWidth: 600,
                            position: 'relative',
                            mx: 'auto',
                            px: { xs: 2, sm: 0 },
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' }, // mobile -> column, desktop -> row
                            gap: { xs: 1.5, sm: 0 },
                        }}
                    >
                        {/* Input */}
                        <TextField
                            fullWidth
                            placeholder="Stay updated with our newsletter..."
                            variant="outlined"
                            size="medium"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    height: { xs: 48, sm: 56 },
                                    borderRadius: { xs: '12px', sm: '12px 0 0 12px' },
                                    bgcolor: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? 'rgba(255,255,255,0.08)'
                                            : 'rgba(0,0,0,0.03)',
                                    "& fieldset": {
                                        border: 'none',
                                        transition: 'all 0.3s ease',
                                    },
                                    "&:hover fieldset": {
                                        boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.light}`,
                                    },
                                    "&.Mui-focused fieldset": {
                                        boxShadow: (theme) => `0 0 0 3px ${theme.palette.primary.main}`,
                                    },
                                },
                                "& .MuiInputBase-input": {
                                    px: { xs: 2, sm: 3 },
                                    height: '100%',
                                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                                    "&::placeholder": {
                                        opacity: 0.8,
                                        color: (theme) => theme.palette.text.secondary,
                                    },
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                        sx={{ color: (theme) => theme.palette.text.secondary }}
                                    >
                                        <Search fontSize="medium" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Button */}
                        <Box
                            component={motion.button}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            sx={{
                                height: { xs: 48, sm: 56 },
                                px: { xs: 3, sm: 4 },
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText',
                                borderRadius: { xs: '12px', sm: '0 12px 12px 0' },
                                fontWeight: 600,
                                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                border: 'none',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                },
                            }}
                        >
                            Subscribe
                        </Box>
                    </Box>

                </Box>

                {/* Divider */}
                <Divider
                    component={motion.div}
                    variants={itemVariants}
                    sx={{
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                        mb: 5,
                        height: '1px',
                        background: `linear-gradient(90deg, transparent, ${theme.palette.divider}, transparent)`
                    }}
                />

                {/* Links Grid */}
                <Box
                    component={motion.div}
                    variants={containerVariants}
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)'
                        },
                        gap: 8,
                        mb: 5
                    }}
                >
                    {/* Company */}
                    <Box component={motion.div} variants={itemVariants}>
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                fontWeight: 700,
                                mb: 4,
                                color: 'text.primary',
                                fontSize: '1.1rem',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                position: 'relative',
                                display: 'inline-block',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: -8,
                                    left: 0,
                                    width: '40px',
                                    height: '3px',
                                    background: theme.palette.primary.main,
                                    borderRadius: '3px'
                                }
                            }}
                        >
                            Company
                        </Typography>
                        <Box
                            component="ul"
                            sx={{
                                listStyle: 'none',
                                p: 0,
                                m: 0,
                                display: 'grid',
                                gap: 2
                            }}
                        >
                            {["About Us", "Careers", "Blog", "Press"].map((item, index) => (
                                <Box
                                    key={index}
                                    component={motion.li}
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                    sx={{
                                        position: 'relative'
                                    }}
                                >
                                    <MuiLink
                                        href="#"
                                        sx={{
                                            color: 'text.secondary',
                                            textDecoration: 'none',
                                            fontWeight: 400,
                                            fontSize: '0.95rem',
                                            transition: 'all 0.3s ease',
                                            display: 'inline-block',
                                            '&:hover': {
                                                color: 'primary.main',
                                                transform: 'translateX(5px)'
                                            },
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                left: -12,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                bgcolor: 'primary.main',
                                                opacity: 0,
                                                transition: 'all 0.3s ease'
                                            },
                                            '&:hover::before': {
                                                opacity: 1,
                                                left: -8
                                            }
                                        }}
                                    >
                                        {item}
                                    </MuiLink>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Products */}
                    <Box component={motion.div} variants={itemVariants}>
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                fontWeight: 700,
                                mb: 4,
                                color: 'text.primary',
                                fontSize: '1.1rem',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                position: 'relative',
                                display: 'inline-block',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: -8,
                                    left: 0,
                                    width: '40px',
                                    height: '3px',
                                    background: theme.palette.secondary.main,
                                    borderRadius: '3px'
                                }
                            }}
                        >
                            Products
                        </Typography>
                        <Box
                            component="ul"
                            sx={{
                                listStyle: 'none',
                                p: 0,
                                m: 0,
                                display: 'grid',
                                gap: 2
                            }}
                        >
                            {["Features", "Pricing", "Documentation", "Integrations"].map((item, index) => (
                                <Box
                                    key={index}
                                    component={motion.li}
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                    sx={{
                                        position: 'relative'
                                    }}
                                >
                                    <MuiLink
                                        href="#"
                                        sx={{
                                            color: 'text.secondary',
                                            textDecoration: 'none',
                                            fontWeight: 400,
                                            fontSize: '0.95rem',
                                            transition: 'all 0.3s ease',
                                            display: 'inline-block',
                                            '&:hover': {
                                                color: 'secondary.main',
                                                transform: 'translateX(5px)'
                                            },
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                left: -12,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                bgcolor: 'secondary.main',
                                                opacity: 0,
                                                transition: 'all 0.3s ease'
                                            },
                                            '&:hover::before': {
                                                opacity: 1,
                                                left: -8
                                            }
                                        }}
                                    >
                                        {item}
                                    </MuiLink>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Resources */}
                    <Box component={motion.div} variants={itemVariants}>
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                fontWeight: 700,
                                mb: 4,
                                color: 'text.primary',
                                fontSize: '1.1rem',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                position: 'relative',
                                display: 'inline-block',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: -8,
                                    left: 0,
                                    width: '40px',
                                    height: '3px',
                                    background: theme.palette.success.main,
                                    borderRadius: '3px'
                                }
                            }}
                        >
                            Resources
                        </Typography>
                        <Box
                            component="ul"
                            sx={{
                                listStyle: 'none',
                                p: 0,
                                m: 0,
                                display: 'grid',
                                gap: 2
                            }}
                        >
                            {["Help Center", "Community", "Tutorials", "Webinars"].map((item, index) => (
                                <Box
                                    key={index}
                                    component={motion.li}
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                    sx={{
                                        position: 'relative'
                                    }}
                                >
                                    <MuiLink
                                        href="#"
                                        sx={{
                                            color: 'text.secondary',
                                            textDecoration: 'none',
                                            fontWeight: 400,
                                            fontSize: '0.95rem',
                                            transition: 'all 0.3s ease',
                                            display: 'inline-block',
                                            '&:hover': {
                                                color: 'success.main',
                                                transform: 'translateX(5px)'
                                            },
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                left: -12,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                bgcolor: 'success.main',
                                                opacity: 0,
                                                transition: 'all 0.3s ease'
                                            },
                                            '&:hover::before': {
                                                opacity: 1,
                                                left: -8
                                            }
                                        }}
                                    >
                                        {item}
                                    </MuiLink>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Social */}
                    <Box component={motion.div} variants={itemVariants}>
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                fontWeight: 700,
                                mb: 4,
                                color: 'text.primary',
                                fontSize: '1.1rem',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                position: 'relative',
                                display: 'inline-block',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: -8,
                                    left: 0,
                                    width: '40px',
                                    height: '3px',
                                    background: theme.palette.warning.main,
                                    borderRadius: '3px'
                                }
                            }}
                        >
                            Connect With Us
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                mb: 4,
                                fontSize: '0.95rem'
                            }}
                        >
                            Follow us on social media for updates and promotions
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                flexWrap: 'wrap'
                            }}
                        >
                            {[
                                { icon: <FaFacebookF />, color: socialColors.facebook, name: 'Facebook' },
                                { icon: <FaTwitter />, color: socialColors.twitter, name: 'Twitter' },
                                { icon: <FaInstagram />, color: socialColors.instagram, name: 'Instagram' },
                                { icon: <FaLinkedinIn />, color: socialColors.linkedin, name: 'LinkedIn' },
                                { icon: <FaYoutube />, color: socialColors.youtube, name: 'YouTube' },
                            ].map((social, index) => (
                                <MuiLink
                                    key={index}
                                    href="#"
                                    component={motion.a}
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                    sx={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        background: social.color,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-3px)',
                                            boxShadow: `0 5px 15px ${social.color}40`
                                        }
                                    }}
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </MuiLink>
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* Bottom Bar */}
                <Box
                    component={motion.div}
                    variants={itemVariants}
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 3,
                        pt: 4,
                        borderTop: `1px solid ${theme.palette.divider}`
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.85rem'
                        }}
                    >
                        © {new Date().getFullYear()} ShopPilot. All rights reserved.
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 3,
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        }}
                    >
                        {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((item, index) => (
                            <MuiLink
                                key={index}
                                href="#"
                                component={motion.a}
                                whileHover={{ color: theme.palette.primary.main }}
                                sx={{
                                    color: 'text.secondary',
                                    textDecoration: 'none',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                {item}
                            </MuiLink>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}