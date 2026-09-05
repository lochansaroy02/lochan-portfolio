'use client';

import { Briefcase, CircleUserRound, Home, Phone } from "lucide-react";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();

    const data = [
        { name: "Home", icon: <Home size={18} />, to: "/home" },
        { name: "Work", icon: <Briefcase size={18} />, to: "/work" },
        { name: "About", icon: <CircleUserRound size={18} />, to: "/about" },
        { name: "Contact", icon: <Phone size={18} />, to: "/contact" },
    ];

    return (
        <nav className="fixed bottom-6 md:top-6 left-1/2 -translate-x-1/2 z-50">
            {/* The Outer Shell: High Blur, Thin Border, Minimal Opacity */}
            <div className="relative flex items-center p-1.5 rounded-full 
                bg-white/3 dark:bg-black/20 
                backdrop-blur-2xl 
                border border-white/10 
                shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                ring-1 ring-inset ring-white/5">

                <div className="flex items-center gap-1 relative">
                    {data.map((item) => {
                        const isActive = pathname === item.to;

                        return (
                            <button
                                key={item.to}
                                onClick={() => router.push(item.to)}
                                className={`
                                    relative px-4 py-2 md:px-5 md:py-2 rounded-full 
                                    flex items-center gap-2 group transition-all duration-300
                                    ${isActive ? 'text-black' : 'text-white/60 hover:text-white'}
                                `}
                            >
                                {/* The "Liquid" Slider: Animates only on the X-axis */}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 rounded-full z-0
                                            bg-white/30 
                                            backdrop-blur-xl
                                            border border-white/20
                                            shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4_12px_rgba(0,0,0,0.2)]"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30,
                                        }}
                                    >
                                        {/* Inner Gloss Shine (The secret 'Liquid' layer) */}
                                        <div className="absolute inset-0 rounded-full bg-linear-to-b from-white/10 to-transparent opacity-50" />
                                    </motion.div>
                                )}

                                {/* Icon and Text Content */}
                                <span className="relative z-10">
                                    {item.icon}
                                </span>

                                <span className="relative z-10 text-sm font-medium hidden md:block">
                                    {item.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Specular Highlight (The 'Liquid' edge effect on top of the bar) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        </nav>
    );
};

export default Header;