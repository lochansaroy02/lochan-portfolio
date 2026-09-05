export const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2, // control how fast each child animates
        },
    },
};

export const itemVariants: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
    },
};