import { motion } from "framer-motion";

const Separator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-0.5 bg-[#F8AA37] origin-left"
    />
  );
};

export default Separator;
