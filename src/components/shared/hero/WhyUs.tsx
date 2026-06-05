import { motion } from "framer-motion";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import { fadeInUp, fadeInUpStagger } from "../../ui/animation";

const blocks = [
  {
    name: "Интернет без переплат",
    description: "До 7 раз дешевле роуминга",
    icon: "/icons/why_us/low_cost.svg",
  },
  {
    name: "Связь в 162 странах",
    description: "Стабильное 4G/5G покрытие в 162 странах",
    icon: "/icons/why_us/internet.svg",
  },
  {
    name: "Активация за пару минут",
    description: "Мгновенное подключение по QR-коду",
    icon: "/icons/why_us/light.svg",
  },
  {
    name: "Поддержка 24/7",
    description: "Круглосуточная поддержка 24/7",
    icon: "/icons/why_us/support.svg",
  },
  {
    name: "Удобная оплата любыми картами",
    description: "Оплата российскими и зарубежными картами",
    icon: "/icons/why_us/payment.svg",
  },
  {
    name: "Бесплатная раздача интернета",
    description: "Раздавайте интернет без дополнительных плат",
    icon: "/icons/why_us/wifi.svg",
  },
];

const WhyUs = ({
  setOpenedModal,
}: {
  setOpenedModal: (data: boolean) => void;
}) => {
  return (
    <motion.section
      id="about_us"
      className="space-y-10 max-md:space-y-5"
      initial="hidden"
      animate="visible"
      variants={fadeInUpStagger}
    >
      <motion.h1
        variants={fadeInUp}
        className="text-4xl max-[762px]:text-2xl max-[400px]:text-xl text-center font-bold"
      >
        Почему в путешествие нужно взять eSIM от{" "}
        <span className="text-[#F8AA37]">Polet Mobile</span>?
      </motion.h1>

      <motion.div
        variants={fadeInUpStagger}
        className="grid min-[768px]:grid-cols-2 gap-3"
      >
        {blocks.map((block, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card>
              <div className="flex gap-4 items-center">
                <img
                  src={block.icon}
                  alt={block.name}
                  className="w-15 h-15 max-md:w-12 max-md:h-12"
                />

                <div>
                  <h2 className="text-lg font-semibold max-md:text-base">
                    {block.name}
                  </h2>
                  <p className="text-[#808080] max-md:text-sm">
                    {block.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeInUp} className="flex w-full justify-center">
        <Button
          className="w-105 md:h-15 md:text-xl relative"
          onClick={() => setOpenedModal(true)}
        >
          <span className="block w-full text-center">Выбрать свой тариф</span>
          <img
            className="absolute right-6 top-1/2 -translate-y-1/2 max-md:w-3 max-md:h-3"
            src="/icons/arrow-right_white.svg"
            alt="arrow right"
          />
        </Button>
      </motion.div>
    </motion.section>
  );
};

export default WhyUs;
