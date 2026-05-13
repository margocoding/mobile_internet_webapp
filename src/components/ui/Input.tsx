interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  color?: "default" | "primary";
  round?: "full" | "xl";
}

import { motion } from "framer-motion";

const Input = ({
  leftIcon,
  rightIcon,
  color = "default",
  round = "full",
  ...props
}: Props) => {
  const colorClassName =
    color === "default" ? "border-[#F8AA37]" : "border-[#6383FF]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center w-full"
    >
      {leftIcon && (
        <div className="absolute left-5 flex items-center pointer-events-none text-gray-600">
          {leftIcon}
        </div>
      )}

      {rightIcon && (
        <div className="absolute right-2 flex items-center text-gray-600">
          {rightIcon}
        </div>
      )}

      <input
        {...props}
        className={`
          w-full
          border
          outline-none
          text-black
          placeholder:text-[#808080]
          p-3
          text-lg
          rounded-${round}
          ${leftIcon ? "pl-13" : ""}
          ${rightIcon ? "pr-13" : ""}
          ${colorClassName}
        `}
      />
    </motion.div>
  );
};

export default Input;
