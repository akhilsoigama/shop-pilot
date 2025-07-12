export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

export const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 10
        }
    },
    hover: {
        scale: 1.05,
        transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
};

export const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 10
        }
    },
    hover: {
        scale: 1.1,
        color: '#3b82f6',
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10
        }
    },
    tap: {
        scale: 0.95
    }
};