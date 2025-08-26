"use client";
import {
    Box,
    Container,
    Typography,
    Button,
    List,
    ListItemText,
    ListItemButton,
    alpha,
    useTheme,
    Collapse,
    Divider,
    ListItem,
    useMediaQuery,
    IconButton
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { categories, Subcategories } from '@/lib/category';
import styled from '@emotion/styled';
import { ExpandMore, ExpandLess, Menu as MenuIcon, Close } from '@mui/icons-material';

const MegaMenuContainer = styled(motion.div)(({ theme }) => ({
    position: 'fixed',
    left: 0,
    right: 0,
    top: '56px',
    backgroundColor: alpha(theme.palette.background.paper, 0.98),
    backdropFilter: 'blur(16px)',
    boxShadow: theme.shadows[10],
    zIndex: theme.zIndex.modal,
    borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
    padding: theme.spacing(3),
    height: '55vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': { 
        width: '6px',
        background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: alpha(theme.palette.primary.main, 0.3),
        borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.5),
    },
}));

const Navbar = () => {
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const categoryMap = {};
    Subcategories.forEach(cat => {
        categoryMap[cat.name] = cat.subcategories;
    });

    const allCategories = ["All", ...categories];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
        setExpandedCategories({});
    };

    const getCategoryUrl = (category, subcategory) => {
        const subName = typeof subcategory === 'string' ? subcategory : subcategory.name;
        return `/categories/${encodeURIComponent(category)}/${encodeURIComponent(subName)}`;
    };

    const handleLinkClick = () => {
        setActiveCategory(null);
        setMobileOpen(false);
    };

    const toggleCategory = (category) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const handleCategoryClick = (category) => {
        if (activeCategory === category) {
            setActiveCategory(null);
        } else {
            setActiveCategory(category);
        }
    };

    const renderMegaMenu = (category) => (
        <MegaMenuContainer
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className='scrollbar-hide'
        >
            <Container maxWidth="xl" sx={{ px: 0, position: 'relative' }}>
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                        }
                    }}
                    onClick={() => setActiveCategory(null)}
                    size="small"
                >
                    <Close sx={{ fontSize: 16 }} />
                </IconButton>
                
                <Box sx={{ p: 2, pt: 4 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                            mb: 3,
                            px: 1.5,
                            py: 1,
                            borderRadius: 1.5,
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                            display: 'inline-block',
                            fontSize: '1.1rem'
                        }}
                    >
                        {category}
                    </Typography>
                    <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
                        gap: 2 
                    }}>
                        {categoryMap[category]?.map((sub) => {
                            const subItem = typeof sub === 'string' ? { name: sub } : sub;
                            return (
                                <Link
                                    key={subItem.name}
                                    href={getCategoryUrl(category, subItem)}
                                    onClick={handleLinkClick}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <motion.div
                                        whileHover={{ x: 3, backgroundColor: alpha(theme.palette.primary.main, 0.04) }}
                                        transition={{ duration: 0.15 }}
                                        style={{ borderRadius: 12 }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                p: 1.5,
                                                borderRadius: 2,
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                                                }
                                            }}
                                        >
                                            {subItem.imageUrl && (
                                                <Box sx={{
                                                    position: 'relative',
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    flexShrink: 0,
                                                    mr: 2,
                                                    boxShadow: theme.shadows[1],
                                                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                                                }}>
                                                    <Image
                                                        src={subItem.imageUrl}
                                                        alt={subItem.name}
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                </Box>
                                            )}
                                            <Typography variant="body2" sx={{ 
                                                fontWeight: 500,
                                                fontSize: '0.9rem',
                                                color: theme.palette.text.primary
                                            }}>
                                                {subItem.name}
                                            </Typography>
                                        </Box>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </Box>
                </Box>
            </Container>
        </MegaMenuContainer>
    );

    const renderAllMegaMenu = () => (
        <MegaMenuContainer
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
        >
            <Container maxWidth="xl" sx={{ px: 0, position: 'relative' }}>
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                        }
                    }}
                    onClick={() => setActiveCategory(null)}
                    size="small"
                >
                    <Close sx={{ fontSize: 16 }} />
                </IconButton>
                
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: theme.spacing(3),
                    p: 2,
                    pt: 4
                }}>
                    {categories.map((cat) => (
                        <Box key={cat}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.primary.main,
                                    mb: 2,
                                    px: 1.5,
                                    py: 1,
                                    borderRadius: 1.5,
                                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                    display: 'inline-block',
                                    fontSize: '1rem'
                                }}
                            >
                                {cat}
                            </Typography>
                            <Box sx={{ p: 0 }}>
                                {categoryMap[cat]?.slice(0, 6).map((sub) => {
                                    const subItem = typeof sub === 'string' ? { name: sub } : sub;
                                    return (
                                        <Link
                                            key={subItem.name}
                                            href={getCategoryUrl(cat, subItem)}
                                            onClick={handleLinkClick}
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            <motion.div
                                                whileHover={{ x: 3, backgroundColor: alpha(theme.palette.primary.main, 0.04) }}
                                                transition={{ duration: 0.15 }}
                                                style={{ borderRadius: 12 }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        p: 1.5,
                                                        borderRadius: 2,
                                                        transition: 'all 0.2s ease',
                                                        '&:hover': {
                                                            backgroundColor: alpha(theme.palette.primary.main, 0.04),
                                                        }
                                                    }}
                                                >
                                                    {subItem.imageUrl && (
                                                        <Box sx={{
                                                            position: 'relative',
                                                            width: 28,
                                                            height: 28,
                                                            borderRadius: '7px',
                                                            overflow: 'hidden',
                                                            flexShrink: 0,
                                                            mr: 2,
                                                            boxShadow: theme.shadows[1],
                                                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                                                        }}>
                                                            <Image
                                                                src={subItem.imageUrl}
                                                                alt={subItem.name}
                                                                fill
                                                                style={{ objectFit: 'cover' }}
                                                            />
                                                        </Box>
                                                    )}
                                                    <Typography variant="body2" sx={{ 
                                                        fontWeight: 500,
                                                        fontSize: '0.88rem',
                                                        color: theme.palette.text.primary
                                                    }}>
                                                        {subItem.name}
                                                    </Typography>
                                                </Box>
                                            </motion.div>
                                        </Link>
                                    );
                                })}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Container>
        </MegaMenuContainer>
    );

    return (
        <Box
            component="nav"
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: theme.zIndex.appBar,
                backgroundColor: isScrolled ? alpha(theme.palette.background.default, 0.97) : theme.palette.background.default,
                backdropFilter: isScrolled ? 'blur(16px)' : 'none',
                transition: 'all 0.3s ease',
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                boxShadow: isScrolled ? theme.shadows[1] : 'none'
            }}
        >
            <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}>
                {/* Desktop Navigation */}
                {!isMobile && (
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            py: 0.5,
                            maxWidth: 'xl',
                            height: '56px',
                            alignItems: 'center'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 0.25,
                                alignItems: 'center',
                                overflowX: 'auto',
                                '&::-webkit-scrollbar': { height: '3px' },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.3),
                                    borderRadius: '3px',
                                },
                            }}
                            className="scrollbar-hide"
                        >
                            {allCategories.map((category) => (
                                <Box
                                    key={category}
                                    sx={{
                                        flexShrink: 0,
                                        height: '100%',
                                        position: 'relative'
                                    }}
                                >
                                    <Button
                                        color="inherit"
                                        onClick={() => handleCategoryClick(category)}
                                        sx={{
                                            fontWeight: 500,
                                            textTransform: 'none',
                                            fontSize: '0.87rem',
                                            whiteSpace: 'nowrap',
                                            px: 1.75,
                                            py: 1,
                                            height: '100%',
                                            borderRadius: 1.5,
                                            color: activeCategory === category ? 'primary.main' : 'text.primary',
                                            backgroundColor: activeCategory === category ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                            transition: 'all 0.2s ease',
                                            minWidth: 'auto',
                                            '&:hover': {
                                                color: 'primary.main',
                                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                            }
                                        }}
                                        endIcon={
                                            <ExpandMore
                                                sx={{
                                                    fontSize: '1.1rem',
                                                    transition: 'transform 0.2s',
                                                    transform: activeCategory === category ? 'rotate(180deg)' : 'none',
                                                    color: activeCategory === category ? theme.palette.primary.main : 'inherit'
                                                }}
                                            />
                                        }
                                    >
                                        {category}
                                    </Button>
                                    <AnimatePresence>
                                        {activeCategory === category &&
                                            (category === "All"
                                                ? renderAllMegaMenu()
                                                : renderMegaMenu(category))}
                                    </AnimatePresence>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )}

                {/* Mobile Navigation - Remained the same as before */}
                {isMobile && (
                    <Box sx={{ height: '56px', display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Link href="/" style={{ textDecoration: 'none' }}>
                                <Button 
                                    sx={{ 
                                        fontWeight: 600, 
                                        textTransform: 'none', 
                                        fontSize: '0.95rem', 
                                        minWidth: 'auto',
                                        color: theme.palette.primary.main
                                    }}
                                >
                                    Home
                                </Button>
                            </Link>
                            <Button
                                color="inherit"
                                onClick={handleDrawerToggle}
                                sx={{ 
                                    fontWeight: 500, 
                                    textTransform: 'none', 
                                    fontSize: '0.9rem', 
                                    minWidth: 'auto',
                                    borderRadius: 1.5,
                                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                                    px: 1.5,
                                    py: 0.75
                                }}
                                startIcon={<MenuIcon sx={{ fontSize: '1.1rem' }} />}
                            >
                                Menu
                            </Button>
                        </Box>

                        <Collapse in={mobileOpen} timeout="auto" unmountOnExit>
                            <Box sx={{
                                backgroundColor: alpha(theme.palette.background.paper, 0.98),
                                backdropFilter: 'blur(16px)',
                                boxShadow: theme.shadows[4],
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: '56px',
                                zIndex: theme.zIndex.drawer,
                                maxHeight: 'calc(100vh - 56px)',
                                overflowY: 'auto',
                                borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                            }}>
                                <List sx={{ p: 0 }}>
                                    {allCategories.map((category) => (
                                        <Box key={category}>
                                            <ListItemButton
                                                sx={{
                                                    py: 1.25,
                                                    '&:hover': {
                                                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                                    }
                                                }}
                                                onClick={() => toggleCategory(category)}
                                            >
                                                <ListItemText 
                                                    primary={category} 
                                                    primaryTypographyProps={{ 
                                                        fontWeight: 500,
                                                        fontSize: '0.95rem'
                                                    }} 
                                                />
                                                {expandedCategories[category] ? 
                                                    <ExpandLess sx={{ fontSize: '1.1rem' }} /> : 
                                                    <ExpandMore sx={{ fontSize: '1.1rem' }} />}
                                            </ListItemButton>

                                            <Collapse in={expandedCategories[category]} timeout="auto" unmountOnExit>
                                                {category === "All" ? (
                                                    <Box sx={{ p: 1 }}>
                                                        {categories.map((cat) => (
                                                            <Box key={cat} sx={{ mb: 2 }}>
                                                                <Typography
                                                                    variant="subtitle2"
                                                                    sx={{
                                                                        fontWeight: 600,
                                                                        color: theme.palette.primary.main,
                                                                        mb: 1,
                                                                        pl: 2,
                                                                    }}
                                                                >
                                                                    {cat}
                                                                </Typography>
                                                                <List sx={{ p: 0 }}>
                                                                    {categoryMap[cat]?.slice(0, 3).map((sub) => {
                                                                        const subItem = typeof sub === 'string' ? { name: sub } : sub;
                                                                        return (
                                                                            <Link 
                                                                                key={subItem.name} 
                                                                                href={getCategoryUrl(cat, subItem)} 
                                                                                passHref
                                                                            >
                                                                                <ListItemButton
                                                                                    component="a"
                                                                                    onClick={handleLinkClick}
                                                                                    sx={{
                                                                                        pl: 3,
                                                                                        borderRadius: 1,
                                                                                        py: 0.75,
                                                                                        '&:hover': {
                                                                                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                                                                        },
                                                                                    }}
                                                                                >
                                                                                    {subItem.imageUrl && (
                                                                                        <Box
                                                                                            sx={{
                                                                                                position: 'relative',
                                                                                                width: 22,
                                                                                                height: 22,
                                                                                                borderRadius: '4px',
                                                                                                overflow: 'hidden',
                                                                                                mr: 1.5,
                                                                                            }}
                                                                                        >
                                                                                            <Image
                                                                                                src={subItem.imageUrl}
                                                                                                alt={subItem.name}
                                                                                                fill
                                                                                                style={{ objectFit: 'cover' }}
                                                                                            />
                                                                                        </Box>
                                                                                    )}
                                                                                    <ListItemText
                                                                                        primary={subItem.name}
                                                                                        primaryTypographyProps={{ 
                                                                                            variant: 'body2',
                                                                                            fontSize: '0.85rem'
                                                                                        }}
                                                                                    />
                                                                                </ListItemButton>
                                                                            </Link>
                                                                        );
                                                                    })}
                                                                </List>
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                ) : (
                                                    <List sx={{ pl: 1.5, py: 0 }}>
                                                        {categoryMap[category]?.map((sub) => {
                                                            const subItem = typeof sub === 'string' ? { name: sub } : sub;
                                                            return (
                                                                <Link key={subItem.name} href={getCategoryUrl(category, subItem)} passHref>
                                                                    <ListItemButton
                                                                        onClick={handleLinkClick}
                                                                        sx={{
                                                                            pl: 3,
                                                                            borderRadius: 1,
                                                                            py: 0.75,
                                                                            '&:hover': {
                                                                                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                                                            },
                                                                        }}
                                                                    >
                                                                        {subItem.imageUrl && (
                                                                            <Box
                                                                                sx={{
                                                                                    position: 'relative',
                                                                                    width: 22,
                                                                                    height: 22,
                                                                                    borderRadius: '4px',
                                                                                    overflow: 'hidden',
                                                                                    mr: 1.5,
                                                                                }}
                                                                            >
                                                                                <Image
                                                                                    src={subItem.imageUrl}
                                                                                    alt={subItem.name}
                                                                                    fill
                                                                                    style={{ objectFit: 'cover' }}
                                                                                />
                                                                            </Box>
                                                                        )}
                                                                        <ListItemText
                                                                            primary={subItem.name}
                                                                            primaryTypographyProps={{ 
                                                                                variant: 'body2',
                                                                                fontSize: '0.85rem'
                                                                            }}
                                                                        />
                                                                    </ListItemButton>
                                                                </Link>
                                                            );
                                                        })}
                                                    </List>
                                                )}
                                            </Collapse>
                                            <Divider />
                                        </Box>
                                    ))}
                                </List>
                            </Box>
                        </Collapse>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Navbar;