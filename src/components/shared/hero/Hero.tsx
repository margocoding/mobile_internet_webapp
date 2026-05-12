import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { fadeInUp, fadeInUpStagger } from "../../ui/animation";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import Chip from "../../ui/Chip";
import Input from "../../ui/Input";
import { availableCountries } from "./CountriesModal";

const Hero = ({
  setOpenedModal,
}: {
  setOpenedModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <motion.div
      className="text-white min-[762px]:space-y-10 max-[762px]:space-y-5 flex min-[762px]:h-225 flex-col items-center py-10 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeInUpStagger}
    >
      <motion.h1
        variants={fadeInUp}
        className="text-6xl max-[762px]:text-4xl font-bold z-10 text-center"
      >
        Мобильный интернет <br /> за границей для вас <br /> и ваших близких
      </motion.h1>

      <motion.div
        variants={fadeInUp}
        className="py-2 min-[762px]:text-xl px-10 z-10 border-2 border-[#FFFFFF] rounded-full"
      >
        Быстро. Выгодно. Безопасно.
      </motion.div>

      <motion.div variants={fadeInUp} className="z-10">
        <Card className="space-y-3 z-10 mx-4 p-5 rounded-4xl">
          <Input
            leftIcon={<img src="/icons/search.svg" alt="Search" />}
            placeholder="Где вам нужна eSIM?"
          />

          <div className="flex gap-3 max-md:gap-1 flex-wrap max-w-150">
            {availableCountries
              .filter((country) => country.isPopular)
              .map((country) => (
                <Link to={`/tariff/${country.id}`} key={country.id}>
                  <Chip>
                    <div className="flex gap-3 max-md:text-sm">
                      <img
                        src={country.miniIcon}
                        alt={country.name}
                        className="w-6 h-6 max-md:w-5 max-md:h-5"
                      />
                      <span>{country.name}</span>
                    </div>
                  </Chip>
                </Link>
              ))}
            <Button onClick={() => setOpenedModal(true)}>Показать все</Button>
          </div>
        </Card>
      </motion.div>
      <motion.img
        variants={fadeInUp}
        src="/images/earth.png"
        alt="Earth"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 min-[762px]:w-full max-[762px]:w-225"
      />
    </motion.div>
  );
};

export default Hero;
