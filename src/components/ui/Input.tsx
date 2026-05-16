import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

interface InputOption {
  label: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  color?: "default" | "primary";
  round?: "full" | "xl";
  options?: InputOption[];
  onOptionClick?: (value: string) => void;
}

const Input = ({
  leftIcon,
  rightIcon,
  color = "default",
  round = "full",
  options = [],
  ...props
}: Props) => {
  const [value, setValue] = useState(
    typeof props.value === "string" ? props.value : "",
  );

  const [isFocused, setIsFocused] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const colorClassName =
    color === "default"
      ? "border-[#F8AA37] focus:border-[#F8AA37]"
      : "border-[#6383FF] focus:border-[#6383FF]";

  const roundClass = round === "full" ? "rounded-full" : "rounded-xl";

  const filteredOptions = useMemo(() => {
    if (!value.trim()) return [];

    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(value.toLowerCase()) ||
        option.description?.toLowerCase().includes(value.toLowerCase()),
    );
  }, [value, options]);

  const showSuggestions =
    isFocused && value.trim() && filteredOptions.length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeof props.value === "string") {
      setValue(props.value);
    }
  }, [props.value]);

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative w-full"
    >
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-5 flex items-center pointer-events-none text-gray-500 z-10">
            {leftIcon}
          </div>
        )}

        {rightIcon && (
          <div className="absolute right-5 flex items-center text-gray-500 z-10">
            {rightIcon}
          </div>
        )}

        <input
          {...props}
          value={value}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => {
            setValue(e.target.value);
            props.onChange?.(e);
          }}
          className={`
            w-full
            border
            outline-none
            
            bg-white
            text-black
            placeholder:text-[#808080]
            p-3
            text-lg
            transition-all
            duration-200
            ${roundClass}
            ${leftIcon ? "pl-13" : ""}
            ${rightIcon ? "pr-13" : ""}
            ${colorClassName}
          `}
        />
      </div>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="
              absolute
              top-full
              left-0
              mt-2
              w-full
              bg-white
              border
              border-gray-200
              rounded-2xl
              shadow-xl
              overflow-hidden
              z-40
              backdrop-blur-xl
            "
          >
            {filteredOptions
              .map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setValue(option.label);
                    setIsFocused(false);

                    if (props.onOptionClick) {
                      console.log(option);
                      props.onOptionClick(option.value);
                    }

                    props.onChange?.({
                      target: {
                        value: option.label,
                      },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                  className="
                  w-full
                  text-left
                  px-4
                  py-3
                  hover:bg-gray-100
                  transition-colors
                  flex
                  items-center
                  gap-3
                "
                >
                  {option.icon && (
                    <div className="mt-0.5 text-gray-500 shrink-0">
                      {option.icon}
                    </div>
                  )}

                  <div className="flex flex-col min-w-0">
                    <span className="font-medium text-black truncate">
                      {option.label}
                    </span>

                    {option.description && (
                      <span className="text-sm text-gray-500 line-clamp-2">
                        {option.description}
                      </span>
                    )}
                  </div>
                </button>
              ))
              .slice(0, 3)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Input;
