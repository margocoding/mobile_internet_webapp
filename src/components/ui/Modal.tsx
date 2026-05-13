// components/ui/Modal.tsx
import {
  useEffect,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { AnimatePresence, motion } from "framer-motion";

import CloseButton from "./CloseButton";

interface Props {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  header?: ReactNode;
  className?: string;
  color?: "default" | "primary";
}

const Modal = ({
  opened,
  setOpened,
  color = "default",
  children,
  header,
  className = "",
}: Props) => {
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
            fixed inset-0 z-20
            p-10
            h-full
            text-black
            bg-black/10
            backdrop-blur-xs

            max-[1024px]:p-0
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
              absolute
              left-1/2
              top-1/2
              z-30
              w-232.25
              -translate-x-1/2
              -translate-y-1/2
              overflow-hidden
              rounded-2xl
              bg-white
              p-7

              max-[1024px]:w-full
              max-[1024px]:h-full
              max-[1024px]:min-h-screen
              max-[1024px]:max-h-full
              max-[1024px]:rounded-none
              max-[1024px]:p-5

              ${className}
            `}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">{header}</div>

              <div className="shrink-0">
                <CloseButton color={color} onClick={() => setOpened(false)} />
              </div>
            </div>

            <div className="mt-5 max-h-[calc(90vh-100px)] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
