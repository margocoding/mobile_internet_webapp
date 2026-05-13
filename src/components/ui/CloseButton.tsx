import { motion, type HTMLMotionProps } from "framer-motion";

interface Props extends Omit<HTMLMotionProps<"button">, "ref"> {
  color?: "default" | "primary";
}

const CloseButton = ({ color = "default", className, ...rest }: Props) => {
  const colorClassName = color === "default" ? "bg-[#F8AA37]" : "bg-[#6383FF]";
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`p-3 cursor-pointer h-full flex items-center justify-center aspect-square rounded-xl ${colorClassName} ${className}`}
      {...rest}
    >
      <img src="/icons/close.svg" alt="Close" className="w-7 h-7" />
    </motion.button>
  );
};

export default CloseButton;
