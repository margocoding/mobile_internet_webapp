import React, { useEffect, type ReactNode } from "react";

import { AnimatePresence, motion } from "framer-motion";

import CloseButton from "./CloseButton";

interface Props {
  opened: boolean;
  setOpened:
    | ((data: boolean) => boolean)
    | React.Dispatch<React.SetStateAction<boolean>>;
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
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [opened]);

  return (
    <AnimatePresence>
      {opened && (
        <motion.div
          onClick={() => setOpened(false)}
          className="
            fixed inset-0 z-50
            flex items-center justify-center

            bg-black/10
            p-10
            text-black
            backdrop-blur-xs

            max-[1024px]:items-end
            max-[1024px]:min-h-screen
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
            className={`
    relative
    z-30
    flex
    max-h-dvh
    w-full
    max-w-232.25
    flex-col
    overflow-hidden
    rounded-2xl
    bg-white
    p-7
    shadow-2xl

    max-[1024px]:h-dvh
    max-[1024px]:max-w-full
    max-[1024px]:rounded-none
    max-[1024px]:p-5

    ${className}
  `}
          >
            <div className="flex items-start justify-between gap-3 shrink-0">
              <div className="min-w-0 flex-1">{header}</div>

              <div className="shrink-0">
                <CloseButton color={color} onClick={() => setOpened(false)} />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
