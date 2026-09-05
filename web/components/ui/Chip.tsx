import { ReactNode } from "react";

interface ChipProps {
    icon: ReactNode;
    text: string;
    bgColor: string;
    textColor: string;
}

const Chip = ({ icon, text, bgColor, textColor }: ChipProps) => {
    return (
        <div className={`${bgColor} flex  gap-2 px-2 py-1  w-fit rounded-full items-center `}>
            <div className={`size-4`}>{icon}</div>
            <h1 className={`${textColor}`}>{text}</h1>
        </div >
    );
};

export default Chip
