import { Link } from "react-router-dom";
import Card from "./Card";

interface Props {
  icon: string;
  name: string;
  startPrice: number;
  id: string;
}

import { motion } from "framer-motion";

const CountryCard = ({ id, icon, name, startPrice }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <Link to={`/tariff/${id}`} className="w-full">
        <Card className="flex justify-between cursor-pointer">
          <div className="flex gap-3 items-center">
            <img className="rounded-lg" src={icon} alt={name} />

            {name}
          </div>

          <div className="flex gap-3 items-center">
            <span>
              от{" "}
              <span className="px-3 py-2 bg-[#F8AA37] rounded-lg text-white font-semibold">
                {startPrice}₽
              </span>
            </span>
            <img
              className="w-4 h-4"
              src="/icons/arrow-right.svg"
              alt="right arrow"
            />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default CountryCard;
