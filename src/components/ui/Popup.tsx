import {
  useEffect,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { AnimatePresence, motion } from "framer-motion";

interface Props {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  className?: string;
}

const Popup = ({ opened, setOpened, children, className = "" }: Props) => {
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <AnimatePresence>
      {opened && (
        <motion.div
          onClick={() => setOpened(false)}
          className="
            fixed inset-0 z-50
            bg-black/20 backdrop-blur-sm
            flex items-center justify-center
            p-4
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 10,
            }}
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`
              w-full
              max-w-130
              rounded-4xl
              bg-white
              p-15
              shadow-2xl

              max-md:max-w-[95vw]
              max-md:p-5
              max-sm:rounded-[28px]

              ${className}
            `}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
