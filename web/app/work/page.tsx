"use client";

import { ProjectData } from "@/utils/ProjectData";
import { ExternalLink, Github } from "lucide-react"; // Optional: for icons
import { motion } from "motion/react";
import Image from "next/image";

const ProjectsPage = () => {
    return (
        <div className="w-full px-8 min-h-screen  lg:py-12 lg:px-4 md:px-10 flex flex-col items-center  text-white">

            {/* Page Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8  lg:mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r lg:pb-4   from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Featured Projects
                </h1>
                <p className="text-gray-400 mt-4 text-sm lg:text-lg">A collection of my recent work and experiments.</p>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
                {ProjectData.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative bg-[#161616] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-colors"
                    >
                        {/* Image Container */}
                        <div className="relative lg:h-64 h-48 w-full overflow-hidden">
                            <Image
                                src={project.image}
                                alt={project.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                {project.repo !== "not found" && project.repo !== "" && (
                                    <a href={project.repo} target="_blank" className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition">
                                        <Github size={24} />
                                    </a>
                                )}
                                {project.live !== "" && (
                                    <a href={project.live} target="_blank" className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition">
                                        <ExternalLink size={24} />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:p-6 p-4 ">
                            <h3 className="lg:text-2xl text-lg font-semibold mb-3">{project.name}</h3>
                            <p className="text-gray-400 lg:text-sm  text-xs leading-relaxed line-clamp-3">
                                {project.description}
                            </p>

                            <div className="mt-6 flex gap-4">
                                {(
                                    <a
                                        href={project.live ? project.live : project.repo}
                                        className="text-sm font-medium text-blue-400 hover:text-blue-300 transition"
                                    >
                                        View Project →
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;