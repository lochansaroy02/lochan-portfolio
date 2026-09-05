"use client";

import { itemVariants } from "@/utils/animations";
import { motion } from "motion/react";
import Image, { StaticImageData } from "next/image";
import Button from "./ui/Button";

type Project = {
    name: string;
    image: string | StaticImageData;
    techStack: string[];
};

type ProjectsProps = {
    project: Project;
};

const Projects = ({ project }: ProjectsProps) => {
    return (
        <motion.div variants={itemVariants}>
            <div className="rounded-2xl">
                <Image
                    className="rounded-2xl"
                    src={typeof project.image === "string" ? project.image : project.image.src}
                    alt={project.name}
                    width={400}
                    height={250}
                />
            </div>

            <div className="px-2">
                <h1 className="text-xl py-2">{project.name}</h1>

                <div className="flex gap-2 flex-wrap">
                    {project.techStack.map((item, index) => (
                        <Button key={index} text={item} />
                    ))}
                </div>
            </div>

            <div className="px-2 mt-2">
                <Button text="Live" onclick={() => { }} />
            </div>
        </motion.div>
    );
};

export default Projects;
