import { motion, type HTMLMotionProps } from "framer-motion";

interface Props extends Omit<HTMLMotionProps<"button">, "ref"> {
  children: React.ReactNode;
  variant?: "default" | "outline";
}

const Button = ({
  children,
  className,
  variant = "default",
  ...rest
}: Props) => {
  const baseClasses =
    "cursor-pointer px-4 py-2 rounded-full transition-colors duration-200";
  const hoverClasses =
    variant === "outline" ? "hover:bg-[#F8AA37]/10" : "hover:bg-[#e89a18]";
  const variantClasses =
    variant === "default"
      ? "bg-[#F8AA37] text-white"
      : "border border-[#F8AA37] text-[#F8AA37]";

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`${baseClasses} ${variantClasses} ${hoverClasses} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button;
