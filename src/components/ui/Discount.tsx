import {motion} from "framer-motion";
import type React from "react";

interface Props {
    children: React.ReactNode;
}

const Discount = ({children}: Props) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
            className="bg-[url('/images/discount.png')] ml-auto bg-cover text-black font-semibold w-[57px] h-[27px] flex items-center justify-center text-center text-md shrink-0"
        >
            {children}
        </motion.div>
    );
};

export default Discount;
