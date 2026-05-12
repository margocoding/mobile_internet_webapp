interface TogglerOption<T extends string> {
  label: string;
  value: T;
}

interface TogglerProps<T extends string> {
  value: T;
  options: TogglerOption<T>[];
  onChange?: (value: T) => void;
}

import { motion } from "framer-motion";

const Toggler = <T extends string>({
  value,
  options,
  onChange,
}: TogglerProps<T>) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center rounded-full bg-white/20 p-1 w-full max-w-100 h-12"
    >
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onChange?.(option.value)}
            className={`flex-1 h-full rounded-full text-sm sm:text-base font-medium transition-all duration-200 whitespace-nowrap px-4 ${
              isActive
                ? "bg-white text-black shadow-md"
                : "text-white hover:bg-white/10"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </motion.div>
  );
};

export default Toggler;
