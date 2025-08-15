"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Settings,
    User as Person,
    Palette,
    Bell,
    HelpCircle,
    LogOut,
} from "lucide-react";
import {
    Button,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Switch,
    Avatar,
    Badge,
    useMediaQuery,
    Box,
    alpha,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import { useRouter } from "next/navigation";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useColorMode } from "@/hooks/DarkmodeProvider";
import { useUser } from "@clerk/nextjs";

const PremiumDropdown = styled(Paper)(({ theme }) => ({
    borderRadius: "12px",
    boxShadow: theme.shadows[6],
    overflow: "hidden",
    width: "auto",
    minWidth: 280,
    maxWidth: 360,
    backdropFilter: "blur(12px)",
    background: theme.palette.mode === "dark"
        ? "#040d1c"
        : "rgba(255, 255, 255, 0.98)",
    border: `1px solid ${theme.palette.divider}`,
    "& .MuiListItem-root": {
        padding: theme.spacing(1.5, 2),
        transition: "all 0.2s ease",
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100vw',
        borderRadius: "12px 12px 0 0",
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        top: 'auto',
        boxShadow: theme.shadows[16],
    },
}));

const SettingsDropdown = () => {
    const theme = useTheme();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { toggleColorMode, mode } = useColorMode();
    const { user } = useUser()
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        {
            icon: <Person size={20} />,
            label: "Profile",
            secondary: "View your account",
            action: () => router.push("/"),
        },
        {
            icon: <Palette size={20} />,
            label: "Appearance",
            secondary: mode === 'dark' ? "Dark mode" : "Light mode",
            hasToggle: true,
        },
        {
            icon: (
                <Badge badgeContent={3} color="error">
                    <Bell size={20} />
                </Badge>
            ),
            label: "Notifications",
            secondary: "3 unread alerts",
            action: () => router.push("/"),
        },
        {
            icon: <HelpCircle size={20} />,
            label: "Support",
            secondary: "Help center",
            action: () => window.open("https://support.example.com", "_blank"),
        },
    ];

    const accountItems = [
        {
            icon: <Avatar sx={{ width: 24, height: 24 }}>{user?.firstName.charAt(0)||'U'}</Avatar>,
            label: user?.emailAddresses[0]?.emailAddress || "User",
            secondary: user?.firstName + " " + user?.lastName || "Guest",
            action: () => router.push("/"),
        },
    ];

    const handleItemClick = (item) => {
        if (item.action) {
            item.action();
            setIsOpen(false);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                aria-label="Settings"
                aria-haspopup="true"
                aria-expanded={isOpen}
                variant="text"
                onClick={() => setIsOpen(!isOpen)}
                sx={{
                    minWidth: "auto",
                    p: { xs: 1, sm: 1.25 },
                    borderRadius: "50%",
                    backgroundColor: "transparent !important",
                    "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                    },
                }}
            >
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: isOpen ? 1.1 : 1
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                >
                    <Settings
                        size={22}
                        color={theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.text.primary}
                    />
                </motion.div>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: isMobile ? 100 : 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: isMobile ? 100 : 8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        style={{
                            position: isMobile ? "fixed" : "absolute",
                            right: isMobile ? 0 : -8,
                            bottom: isMobile ? 0 : "auto",
                            top: isMobile ? "auto" : "calc(100% + 8px)",
                            left: isMobile ? 0 : "auto",
                            width: isMobile ? "100%" : "auto",
                            zIndex: theme.zIndex.modal,
                        }}
                    >
                        <PremiumDropdown elevation={8}>
                            <List dense sx={{ py: 0 }}>
                                <ListItem sx={{
                                    pt: 2,
                                    pb: 1,
                                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
                                }}>
                                    <ListItemText
                                        primary="Settings"
                                        primaryTypographyProps={{
                                            variant: "subtitle1",
                                            fontWeight: 600,
                                            letterSpacing: 0.5,
                                        }}
                                    />
                                </ListItem>

                                <Divider />

                                {menuItems.map((item, index) => (
                                    <ListItem
                                        key={`menu-${index}`}
                                        onClick={() => !item.hasToggle && handleItemClick(item)}
                                        sx={{
                                            cursor: 'pointer',
                                            "&:hover": {
                                                backgroundColor: theme.palette.action.hover,
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{
                                            minWidth: 36,
                                            color: theme.palette.text.secondary
                                        }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.label}
                                            secondary={item.secondary}
                                            primaryTypographyProps={{
                                                variant: "body2",
                                                fontWeight: 500,
                                            }}
                                            secondaryTypographyProps={{
                                                variant: "caption",
                                                color: "text.secondary",
                                            }}
                                            sx={{
                                                my: 0
                                            }}
                                        />
                                        {item.hasToggle && (
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>

                                                <Switch
                                                    checked={mode === 'dark'}
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        toggleColorMode();
                                                    }}
                                                    edge="end"
                                                    size="small"
                                                    color="primary"
                                                    sx={{ ml: 1 }}
                                                />
                                            </Box>
                                        )}
                                    </ListItem>
                                ))}

                                <Divider sx={{ my: 0.5 }} />

                                {accountItems.map((item, index) => (
                                    <ListItem
                                        key={`account-${index}`}
                                        onClick={() => {
                                            item.action();
                                            setIsOpen(false);
                                        }}
                                        sx={{
                                            cursor: 'pointer',
                                            "&:hover": {
                                                backgroundColor: theme.palette.action.hover,
                                            },
                                            ...(item.label === "Sign out" && {
                                                color: theme.palette.error.main,
                                                "&:hover": {
                                                    backgroundColor: theme.palette.error.background,
                                                },
                                            }),
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 36,
                                                ...(item.label === "Sign out" && {
                                                    color: theme.palette.error.main,
                                                }),
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.label}
                                            secondary={item.secondary}
                                            primaryTypographyProps={{
                                                variant: "body2",
                                                fontWeight: 500,
                                            }}
                                            secondaryTypographyProps={{
                                                variant: "caption",
                                                color: "text.secondary",
                                            }}
                                            sx={{
                                                my: 0
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </PremiumDropdown>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SettingsDropdown;