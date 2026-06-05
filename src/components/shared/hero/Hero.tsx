import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { fadeInUp, fadeInUpStagger } from "../../ui/animation";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import Chip from "../../ui/Chip";
import Input from "../../ui/Input";
import { availableCountries } from "../CountriesModal";

const Hero = ({
    setOpenedModal,
}: {
    setOpenedModal: (data: boolean) => void;
}) => {
    const navigate = useNavigate();
    return (
        <motion.div
            className="text-white max-w-5xl mx-auto space-y-3 flex min-[762px]:h-225 max-[762px]:h-125 flex-col items-center py-10 relative overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={fadeInUpStagger}
        >
            <motion.h1
                variants={fadeInUp}
                className="text-6xl max-[762px]:text-3xl font-bold z-10 text-center"
            >
                Мобильный интернет <br /> за границей для вас <br /> и ваших близких
            </motion.h1>

            <motion.div
                variants={fadeInUp}
                className="min-[762px]:text-xl max-md:px-6 max-md:mb-8 px-10 z-10 rounded-full"
            >
                Быстро • Выгодно • Безопасно
            </motion.div>

            <motion.div variants={fadeInUp} className="z-10 mt-5">
                <Card className="space-y-3 z-10 mx-4 p-5 rounded-4xl shadow-none">
                    <Input
                        leftIcon={<img src="/icons/search.svg" alt="Search" />}
                        options={availableCountries.map((country) => ({
                            label: country.name,
                            value: country.id,
                            description: `От ${country.startPrice}/день`,
                            icon: country.miniIcon ? (
                                <img src={country.miniIcon} className="h-5 w-5 object-cover rounded-full" />
                            ) : undefined,
                        }))}
                        onOptionClick={(value) => navigate(`/tariff/${value}`)}
                        placeholder="Где вам нужна eSIM?"
                    />

                    <div className="flex gap-3 items-center max-md:gap-1 flex-wrap max-w-125">
                        {availableCountries
                            .filter((country) => country.isPopular)
                            .map((country) => (
                                <Link to={`/tariff/${country.id}`} key={country.id}>
                                    <Chip>
                                        <div
                                            className="flex gap-3 max-md:gap-1 text-[#808080] items-center max-md:text-sm">
                                            <img
                                                src={country.miniIcon}
                                                alt={country.name}
                                                className="w-6 h-6 object-cover rounded-full max-md:w-4.5 max-md:h-4.5"
                                            />
                                            <span>{country.name}</span>
                                        </div>
                                    </Chip>
                                </Link>
                            ))}
                        <Button
                            className="max-md:h-7 max-md:text-xs max-md:flex max-md:items-center"
                            onClick={() => setOpenedModal(true)}
                        >
                            Показать все
                        </Button>
                    </div>
                </Card>
            </motion.div>  
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 min-[762px]:w-full max-[762px]:w-115 flex justify-center overflow-hidden">
            <motion.img
                variants={fadeInUp}
                src="/images/earth.png"
                alt="Earth"
                className=""
            />
            </div>
        </motion.div>
    );
};

export default Hero;
