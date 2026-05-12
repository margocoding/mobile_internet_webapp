import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Question = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <motion.div
      layout
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={`space-y-3 ${isOpen ? "border border-[#6383FF]" : ""} shadow-[0_0_30px_rgba(214,232,247,0.65)] rounded-2xl p-5 cursor-pointer`}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <h2 className="text-xl max-md:text-base font-semibold flex justify-between items-center">
        <span className="whitespace-break">{question}</span>
        <motion.div
          className="w-5 h-5 flex items-center justify-center flex-none ml-3"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ ease: "easeInOut" }}
        >
          <img
            src="/icons/arrow-bottom.svg"
            alt="arrow bottom"
            className="w-5 h-5"
          />
        </motion.div>
      </h2>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.p
            className="text-[#808080]"
            key="answer"
            initial={{ opacity: 0, height: 0, y: -5 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -5 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Question;
