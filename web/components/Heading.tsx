import { LucideIcon } from 'lucide-react';

interface HeadingProps {
    title: string;
    // We use LucideIcon type so we can treat it as a component
    icon: LucideIcon;
    // Pass full tailwind classes like "bg-amber-900/20"
    bgColor: string;
    // Pass full tailwind classes like "text-amber-500"
    textColor: string;
}

const Heading = ({ title, icon: Icon, bgColor, textColor }: HeadingProps) => {
    return (
        <div className="flex gap-3 md:gap-4 items-center mb-6">
            {/* Using square brackets or full class names is best for Tailwind */}
            <span className={`p-1.5 md:p-2 rounded-lg ${bgColor}`}>
                <Icon className={`w-4 h-4 md:w-5 md:h-5 ${textColor}`} />
            </span>
            <h1 className="text-xl md:text-2xl font-semibold text-white">
                {title}
            </h1>
        </div>
    );
};

export default Heading;