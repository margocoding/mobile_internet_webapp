import React from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
}

import { motion } from "framer-motion";

const Select = ({
  options,
  placeholder,
  className = "",
  ...props
}: SelectProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full"
    >
      <select
        className={`w-full h-12 sm:h-14 rounded-2xl border border-[#F5A623] px-5 pr-12 outline-none bg-white appearance-none text-sm sm:text-base text-[#2B2B2B] ${className}`}
        defaultValue=""
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <img
        src="/icons/arrow-bottom.svg"
        alt="arrow down"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
      />
    </motion.div>
  );
};

export default Select;
