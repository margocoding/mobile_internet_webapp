import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SearchSelectOption {
  label: string;
  value: string;
}

interface SearchSelectProps {
  options: SearchSelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  hasArrowIcon?: boolean;
}

const SearchSelect = ({
  options,
  placeholder = "Выберите страну",
  value,
  hasArrowIcon = true,
  onChange,
}: SearchSelectProps) => {
  const [query, setQuery] = React.useState(value || "");
  const [opened, setOpened] = React.useState(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="relative w-full">
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpened(true);
        }}
        onFocus={() => setOpened(true)}
        placeholder={placeholder}
        className="w-full h-12 sm:h-14 rounded-2xl border border-[#F5A623] px-5 pr-12 outline-none bg-white text-sm sm:text-base"
      />

      {/* ARROW */}
      {hasArrowIcon && (
        <svg
          className={`absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none transition-transform ${
            opened ? "rotate-180" : ""
          }`}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="#2B2B2B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {/* DROPDOWN */}
      <AnimatePresence>
        {opened && filteredOptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 mt-2 w-full bg-white border border-[#F5A623] rounded-2xl shadow-lg overflow-hidden z-50 max-h-64 overflow-y-auto"
          >
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setQuery(option.label);
                  onChange?.(option.value);
                  setOpened(false);
                }}
                className="w-full text-left px-5 py-3 hover:bg-[#FFF7EA] transition-colors text-sm sm:text-base"
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchSelect;
