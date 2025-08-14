"use client";
import {
    Box,
    Container,
    Typography,
    useMediaQuery,
    Button,
    List,
    ListItemText,
    ListItemButton,
    alpha,
    useTheme,
    Collapse,
    Divider,
    ListItem
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { categories, Subcategories } from '@/lib/category';
import styled from '@emotion/styled';
import { ExpandMore, ExpandLess, Menu as MenuIcon } from '@mui/icons-material';

const MegaMenuContainer = styled(motion.div)(({ theme }) => ({
    position: 'fixed',
    left: 0,
    right: 0,
    top: '80px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[6],
    zIndex: theme.zIndex.modal,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(4),
    height:'60vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': { width: '6px' },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.divider,
        borderRadius: '3px',
    },
}));

const Navbar = () => {
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        setHoveredCategory(null);
        setMobileOpen(false);
    };

    const toggleCategory = (category) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const renderMegaMenu = (category) => (
        <MegaMenuContainer
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory(null)}
            className='scrollbar-hide'
        >
            <Container maxWidth="xl" sx={{ px: 0 }}>
                <Box sx={{ p: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                            mb: 2,
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        }}
                    >
                        {category}
                    </Typography>
                    <List sx={{ p: 0 }}>
                        {categoryMap[category]?.map((sub) => {
                            const subItem = typeof sub === 'string' ? { name: sub } : sub;
                            return (
                                <Link
                                    key={subItem.name}
                                    href={getCategoryUrl(category, subItem)}
                                    onClick={handleLinkClick}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <ListItemButton
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                            }
                                        }}
                                    >
                                        {subItem.imageUrl && (
                                            <Box sx={{
                                                position: 'relative',
                                                width: 24,
                                                height: 24,
                                                borderRadius: '4px',
                                                overflow: 'hidden',
                                                flexShrink: 0,
                                                mr: 1
                                            }}>
                                                <Image
                                                    src={subItem.imageUrl}
                                                    alt={subItem.name}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </Box>
                                        )}
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {subItem.name}
                                        </Typography>
                                    </ListItemButton>
                                </Link>
                            );
                        })}
                    </List>
                </Box>
            </Container>
        </MegaMenuContainer>
    );

    const renderAllMegaMenu = () => (
        <MegaMenuContainer
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredCategory("All")}
            onMouseLeave={() => setHoveredCategory(null)}
        >
            <Container maxWidth="xl" sx={{ px: 0 }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: theme.spacing(4),
                    p: 2
                }}>
                    {categories.map((cat) => (
                        <Box key={cat}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.primary.main,
                                    mb: 2,
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 1,
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                }}
                            >
                                {cat}
                            </Typography>
                            <List sx={{ p: 0 }}>
                                {categoryMap[cat]?.map((sub) => {
                                    const subItem = typeof sub === 'string' ? { name: sub } : sub;
                                    return (
                                        <Link
                                            key={subItem.name}
                                            href={getCategoryUrl(cat, subItem)}
                                            onClick={handleLinkClick}
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            <ListItemButton
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                                    }
                                                }}
                                            >
                                                {subItem.imageUrl && (
                                                    <Box sx={{
                                                        position: 'relative',
                                                        width: 24,
                                                        height: 24,
                                                        borderRadius: '4px',
                                                        overflow: 'hidden',
                                                        flexShrink: 0,
                                                        mr: 1
                                                    }}>
                                                        <Image
                                                            src={subItem.imageUrl}
                                                            alt={subItem.name}
                                                            fill
                                                            style={{ objectFit: 'cover' }}
                                                        />
                                                    </Box>
                                                )}
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {subItem.name}
                                                </Typography>
                                            </ListItemButton>
                                        </Link>
                                    );
                                })}
                            </List>
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
                // position: 'sticky',
                top: 0,
                zIndex: theme.zIndex.appBar,
                backgroundColor: isScrolled ? alpha(theme.palette.background.default, 0.95) : theme.palette.background.default,
                backdropFilter: isScrolled ? 'blur(10px)' : 'none',
                transition: 'all 0.3s ease',
                borderBottom: `1px solid ${theme.palette.divider}`,
                boxShadow: isScrolled ? theme.shadows[2] : 'none'
            }}
        >
            <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}>
                {/* Desktop Navigation */}
                {!isMobile && (
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            py: 1,
                            maxWidth: 'xl',
                            height: '64px'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                                overflowX: 'auto',
                                '&::-webkit-scrollbar': { height: '6px' },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: theme.palette.divider,
                                    borderRadius: '3px',
                                },
                            }}
                            className="scrollbar-hide"
                        >
                            {allCategories.map((category) => (
                                <Box
                                    key={category}
                                    sx={{
                                        flexShrink: 0, // prevents squishing
                                        height: '100%'
                                    }}
                                >
                                    <Button
                                        color="inherit"
                                        sx={{
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            fontSize: '0.875rem',
                                            whiteSpace: 'nowrap', // keep text in one line
                                           // more horizontal padding for long text
                                            height: '100%',
                                            '&:hover': {
                                                color: 'primary.main',
                                                backgroundColor: 'transparent'
                                            }
                                        }}
                                        onClick={() => setHoveredCategory(category)}
                                        endIcon={
                                            <ExpandMore
                                                sx={{
                                                    fontSize: '1rem',
                                                    transition: 'transform 0.2s',
                                                    transform:
                                                        hoveredCategory === category
                                                            ? 'rotate(180deg)'
                                                            : 'none'
                                                }}
                                            />
                                        }
                                    >
                                        {category}
                                    </Button>
                                    <AnimatePresence>
                                        {hoveredCategory === category &&
                                            (category === "All"
                                                ? renderAllMegaMenu()
                                                : renderMegaMenu(category))}
                                    </AnimatePresence>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )}


                {/* Mobile Navigation */}
                {isMobile && (
                    <Box sx={{ height: '56px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                            <Link href="/" style={{ textDecoration: 'none' }}>
                                <Button sx={{ fontWeight: 600, textTransform: 'none', fontSize: '0.875rem', minWidth: 'auto' }}>
                                    Home
                                </Button>
                            </Link>
                            <Button
                                color="inherit"
                                onClick={handleDrawerToggle}
                                sx={{ fontWeight: 600, textTransform: 'none', fontSize: '0.875rem', minWidth: 'auto' }}
                                startIcon={<MenuIcon />}
                            >
                                Menu
                            </Button>
                        </Box>

                        <Collapse in={mobileOpen} timeout="auto" unmountOnExit>
                            <Box sx={{
                                backgroundColor: theme.palette.background.paper,
                                boxShadow: theme.shadows[2],
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                zIndex: theme.zIndex.drawer,
                                maxHeight: 'calc(100vh - 56px)',
                                overflowY: 'auto'
                            }}>
                                <List sx={{ p: 0 }}>
                                    {allCategories.map((category) => (
                                        <Box key={category}>
                                            <ListItemButton
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                                    }
                                                }}
                                                onClick={() => toggleCategory(category)}
                                            >
                                                <ListItemText primary={category} primaryTypographyProps={{ fontWeight: 600 }} />
                                                {expandedCategories[category] ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>

                                            <Collapse in={expandedCategories[category]} timeout="auto" unmountOnExit>
                                                {category === "All" ? (
                                                    <Box sx={{ p: 1 }}>
                                                        {renderAllMegaMenu()}
                                                    </Box>
                                                ) : (
                                                    <List sx={{ pl: 2, py: 0 }}>
                                                        {categoryMap[category]?.map((sub) => (
                                                            <Link key={sub.name} href={getCategoryUrl(category, sub)} passHref>
                                                                <ListItemButton
                                                                    component="a"
                                                                    onClick={handleLinkClick}
                                                                    sx={{
                                                                        pl: 3,
                                                                        '&:hover': {
                                                                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                                                        },
                                                                    }}
                                                                >
                                                                    {sub.imageUrl && (
                                                                        <Box
                                                                            sx={{
                                                                                position: 'relative',
                                                                                width: 24,
                                                                                height: 24,
                                                                                borderRadius: '4px',
                                                                                overflow: 'hidden',
                                                                                mr: 2,
                                                                            }}
                                                                        >
                                                                            <Image
                                                                                src={sub.imageUrl}
                                                                                alt={sub.name}
                                                                                fill
                                                                                style={{ objectFit: 'cover' }}
                                                                            />
                                                                        </Box>
                                                                    )}
                                                                    <ListItemText
                                                                        primary={sub.name}
                                                                        primaryTypographyProps={{ variant: 'body2' }}
                                                                    />
                                                                </ListItemButton>
                                                            </Link>
                                                        ))}
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
