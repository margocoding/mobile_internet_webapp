import { motion } from "framer-motion";

const Chip = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="border border-[#F8AA37] min-w-25 text-black rounded-full p-2"
    >
      {children}
    </motion.div>
  );
};

export default Chip;
