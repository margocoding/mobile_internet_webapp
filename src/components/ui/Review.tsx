import Card from "./Card";

interface Props {
  username: string;
  tariff: {
    countryName: string;
    countryIcon: string;
  };
  rating: number;
  text: string;
}

import { motion } from "framer-motion";

const Review: React.FC<Props> = ({ username, tariff, rating, text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Card className="space-y-3 p-7 h-full">
        <header className="flex justify-between items-center">
          <div className="flex gap-3 max-md:gap-2 items-center">
            <span className="rounded-full bg-[#F8AA37] text-white aspect-square h-10 w-10 max-md:h-8 max-md:w-8 flex items-center justify-center font-Bold">
              B
            </span>
            <div>
              <div className="font-semibold text-xl max-md:text-sm">
                {username}
              </div>
              <div className="text-[#808080] flex gap-1 items-center max-md:text-xs">
                Тариф:{" "}
                <span>
                  <img
                    className="w-4 h-4 max-md:w-3 max-md:h-3"
                    src={tariff.countryIcon}
                    alt={tariff.countryName}
                  />
                </span>{" "}
                <span>{tariff.countryName}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 max-md:gap-1">
            {Array.from({ length: rating }).map((_, index) => (
              <img
                className="w-7 h-7 max-md:w-5 max-md:h-5"
                src="/icons/star.svg"
                alt="star"
                key={index}
              />
            ))}
          </div>
        </header>

        <main className="text-[#808080]">{text}</main>
      </Card>
    </motion.div>
  );
};

export default Review;
