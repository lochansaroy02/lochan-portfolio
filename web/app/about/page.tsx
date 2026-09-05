"use client";
import { BookOpen, ChevronDown, Code2, Quote, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Image from 'next/image';
import React from "react";

// const eb = EB_Garamond({
//     subsets: ['latin'],
//     weight: ['400', '600', '700'],
//     variable: '--font-eb',
//     display: 'swap',
// });

const testimonials = [
    { name: "Alex Rivera", role: "Senior Dev", text: "Incredible attention to detail in UI/UX. A rare find." },
    { name: "Sarah Chen", role: "Product Manager", text: "The Chrome extensions solved our workflow lag instantly." },
    { name: "James Bond", role: "Agent", text: "A developer who actually understands security protocols." },
    { name: "Elena Frost", role: "Designer", text: "Cleanest code I've had the pleasure to integrate." },
];

const hobbies = ["Swimming", "Dancing", "Art", "Singing", "Coding", "Blogging"];

const SectionWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`min-h-screen w-full flex flex-col justify-center px-6 md:px-24 py-20 ${className}`}
    >
        {children}
    </motion.section>
);

const FullPagePortfolio = () => {
    return (
        <div className=" text-white selection:bg-cyan-500/30">

            {/* 1. HERO / STATUS SECTION */}
            <SectionWrapper className="relative">
                <div className="absolute top-10 left-10 flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400">Available for hire • India</span>
                </div>

                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-2 text-cyan-400 mb-6"
                    >
                        <Code2 size={24} />
                        <span className="font-mono tracking-tighter">Full Stack Developer</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                        Crafting digital <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                            experiences.
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                        2+ years of expertise in Full Stack Development & Browser Automation.
                        Building tools that bridge the gap between complexity and elegance.
                    </p>

                    <div className="mt-12 flex gap-4">
                        {["TypeScript", "React", "Next.js", "Node"].map((tech) => (
                            <span key={tech} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20"
                >
                    <ChevronDown size={32} />
                </motion.div>
            </SectionWrapper>

            {/* 2. READING SECTION (IKIGAI) */}
            <SectionWrapper className="bg-[#0a1d2e]/50 rounded-xl border border-white/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <div className="flex items-center gap-2 text-orange-400 mb-4">
                            <BookOpen size={20} />
                            <span className="text-sm font-bold uppercase tracking-widest">On my desk</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 italic">IKIGAI</h2>
                        <p className={`text-3xl md:text-4xl text-gray-300 leading-snug mb-8 `}>
                            The Japanese Secret to a Long and Happy Life
                        </p>
                        <button className="group relative px-8 py-3 bg-orange-500 text-black font-bold rounded-full overflow-hidden transition-all hover:pr-12">
                            <span className="relative z-10">Read Summary</span>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                                →
                            </div>
                        </button>
                    </div>

                    <div className="order-1 md:order-2 flex justify-center">
                        <motion.div
                            whileHover={{ rotate: 5, scale: 1.05 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full" />
                            <Image
                                className="rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 relative z-10"
                                alt="Ikigai"
                                height={500}
                                width={320}
                                src="https://m.media-amazon.com/images/I/81l3rZK4lnL._UF1000,1000_QL80_.jpg"
                            />
                        </motion.div>
                    </div>
                </div>
            </SectionWrapper>

            {/* 3. TESTIMONIALS (Elegant Grid) */}
            <SectionWrapper>
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold mb-4">Collaborations</h2>
                    <p className="text-gray-500">Words from people I have had the pleasure to work with.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-10 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm"
                        >
                            <Quote className="text-cyan-500 mb-6 opacity-30" size={32} />
                            <p className="text-xl text-gray-200 mb-8 leading-relaxed italic">{t.text}</p>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center font-bold">
                                    {t.name[0]}
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{t.name}</p>
                                    <p className="text-sm text-cyan-500/60 uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </SectionWrapper>

            {/* 4. PASSIONS (Dynamic Pills) */}
            <SectionWrapper className=" overflow-hidden ">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-12">
                        <Sparkles className="text-cyan-400" />
                        <h2 className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">Beyond the Code</h2>
                    </div>

                    <div className="flex flex-wrap gap-4 md:gap-8 max-w-5xl">
                        {hobbies.map((hobby, index) => (
                            <motion.span
                                key={hobby}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                    scale: 1.1,
                                    color: "#fff",
                                    borderColor: "rgba(34, 211, 238, 1)"
                                }}
                                className="text-5xl md:text-8xl font-black transition-all duration-300 cursor-default text-white/10 border-b-4 border-transparent hover:border-cyan-500"
                            >
                                {hobby}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </SectionWrapper>


        </div>
    );
};

export default FullPagePortfolio;