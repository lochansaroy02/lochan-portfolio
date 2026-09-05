"use client";
import Docker from "@/assets/icons/Docker";
import Express from "@/assets/icons/Express";
import Java from "@/assets/icons/Java";
import Mongo from "@/assets/icons/Mongo";
import Next from "@/assets/icons/Next";
import Node from "@/assets/icons/Node";
import Postgres from "@/assets/icons/Postgres";
import ReactIcon from "@/assets/icons/React";
import Tailwind from "@/assets/icons/Tailwind";
import Leetcode from "@/components/Leetcode";
import Button from "@/components/ui/Button";
import { HyperText } from "@/components/ui/hyper-text";
import profile from "@/public/images/profile2.jpg";
import { MontserratFont } from "@/utils/fonts";
import { motion } from "motion/react";



import Heading from "@/components/Heading";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Code, Code2, Github, Lightbulb, Linkedin, Twitter } from "lucide-react";
import { Variants } from "motion/react"; // Note: ensure this matches your framer-motion version
import Image from "next/image";
import { useRef } from 'react';

const Page = () => {
    const paraRef = useRef(null);
    const data = [
        { name: "Leetcode", Icon: Code, link: "https://leetcode.com/u/lochansaroy14/" },
        { name: "Github", Icon: Github, link: "https://github.com/lochansaroy02" },
        { name: "Linkedin", Icon: Linkedin, link: "https://www.linkedin.com/in/lochankumar47/" },
        { name: "Twitter", Icon: Twitter, link: "https://x.com/LochanSaroy824" },

    ];

    const skills = [
        { name: "NextJS", icon: <Next /> },
        { name: "MongoDB", icon: <Mongo /> },
        { name: "NodeJS", icon: <Node /> },
        { name: "Express", icon: <Express /> },
        { name: "React", icon: <ReactIcon /> },
        { name: "Postgres", icon: <Postgres /> },
        { name: "Tailwind", icon: <Tailwind /> },
        { name: "Docker", icon: <Docker /> },
        { name: "Java", icon: <Java /> },
    ];

    // Duplicating skills array for seamless infinite scroll
    const marqueeSkills = [...skills, ...skills];

    useGSAP(() => {
        const elements = gsap.utils.toArray('.arr');
        if (elements.length > 0) {
            gsap.from(elements, {
                y: -20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.2 // Reduced stagger time slightly for better UX
            });
        }
    }, []);

    const marqueeVariants: Variants = {
        animate: {
            x: ["0%", "-50%"],
            transition: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
            }
        }
    };

    return (
        /* 1. Changed to min-h-screen so content can scroll if it exceeds screen height
           2. Changed w-fit to w-full max-w-5xl 
           3. Added mobile padding (px-4 py-8)
        */
        <div className="md:ml-56 lg:ml-64  w-screen  px-2  py-8 md:px-8 lg:py-12">
            <div className="w-screen lg:hidden flex my-4  flex-col justify-center items-center g:hidden">
                <motion.div
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="rounded-full mb-2 ">
                    <Image alt="no image" className="aspect-square rounded-full" src={profile} height={"200"} width={"200"} />
                </motion.div>
                <div className="mt-2 flex gap-2 items-center w-fit rounded-2xl border border-green-600 lg:px-3 px-1.5 py-0.5 lg:py-1">
                    <div className="relative w-2 h-2 rounded-full bg-green-500">
                        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping" />
                    </div>
                    <span className="text-sm lg:text-lg">Available for work</span>
                </div>
            </div>


            <div className=" flex  items-center lg:items-start flex-col">
                <div className="">

                    <HyperText
                        text="Lochan Saroy"
                        className="text-6xl font-black md:text-7xl lg:text-9xl"
                    />
                </div>
                <h2 ref={paraRef} className={`text-xl md:text-3xl lg:text-4xl opacity-75 mt-2 ${MontserratFont.className}`}>
                    Full Stack Developer
                </h2>
            </div>

            <p className="arr mt-4 p-2 lg:p-0 text-center lg:text-start text-xs md:text-base lg:text-lg text-balance font-light max-w-3xl text-neutral-300">
                I’m a Full Stack Developer crafting lightning-fast websites using MERN & Next.js. From frontend finesse to backend muscle — I bring your vision to life with pixel-perfect precision and performance-driven code.
            </p>

            {/* Social Links - Responsive Flex Wrap */}
            <div className="arr w-screen flex lg:justify-start  md:justify-start justify-center mt-8">
                <div className="flex lg:flex-wrap  items-center gap-2 md:gap-4">
                    {data.map((item, index) => (
                        <Button
                            onclick={() => {
                                window.open(item.link, '_blank', 'noopener,noreferrer');
                            }}
                            key={index}
                            text={item.name}
                            icon={<item.Icon className="w-3 h-3 md:w-5 md:h-5" />}
                            className="text-xs md:text-sm px-4 py-1.5 md:px-4 md:py-2"
                        />
                    ))}
                </div>
            </div>

            {/* Top Skills Marquee */}
            <div className="arr mt-12 w-full lg:max-w-[800px]">
                <Heading
                    title="Top Skills"
                    icon={Lightbulb}
                    bgColor="bg-[#442310]"
                    textColor="text-[#fcd34d]"
                />

                <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <motion.div
                        className="flex gap-6 md:gap-10 w-max"
                        variants={marqueeVariants}
                        animate="animate"
                    >
                        {marqueeSkills.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-2 items-center justify-center shrink-0"
                            >
                                {/* Removed hardcoded inline styles. Used responsive tailwind sizing */}
                                {(index % skills.length === 0) ? (
                                    <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-neutral-100 rounded-full p-2 flex items-center justify-center shadow-sm">
                                        {item.icon}
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Code Stats Section */}
            <div className="arr mt-12 mb-8">
                <Heading
                    title="Code Stats"
                    icon={Code2}
                    bgColor="bg-[#321212]"
                    textColor="text-[#bd4949]"
                />
                {/* Made the Leetcode container responsive instead of a fixed 64 width */}
                <div className="flex flex-col lg:flex-row gap-6 mt-4 w-full">
                    <div className="flex w-full md:w-auto min-w-[280px] max-w-sm items-center">
                        <Leetcode />
                    </div>
                    {/* Uncomment and adjust GithubMap wrappers similarly when ready */}
                    {/* <div className="flex flex-col gap-4 w-full">
                        ...
                    </div> */}
                </div>
            </div>

        </div>
    );
}

export default Page;
