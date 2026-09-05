"use client"

import * as motion from "motion/react-client";
import { useRef } from "react";

const Drag = () => {
    const constraintsRef = useRef<HTMLDivElement>(null)

    return (
        <motion.div ref={constraintsRef} className="w-[300px] h-[300px] bg-cyan-500 rounded-xl">
            <motion.div
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.2}
                className="w-[100px] h-[100px] bg-fuchsia-700 rounded-xl"
            />

        </motion.div>
    )
}

export default Drag

