import { motion } from "framer-motion";
import { fadeInUp } from "../ui/animation";

const Footer = () => {
  return (
    <motion.footer
      className="space-y-10 max-w-5xl mx-auto p-5"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="flex">
        <div className="relative w-full flex items-center">
          <div className="w-full h-0.5 bg-[#F8AA37]" />

          <img
            src="/images/airplane.png"
            alt="airplane"
            className="h-10 w-10"
          />
        </div>{" "}
      </div>

      <h1 className="text-xl text-[#808080]">ЛОГОТИП</h1>
      <div className="flex max-[600px]:flex-col gap-10 w-full justify-between">
        <div className="flex max-[600px]:flex-col gap-10">
          <span className="space-y-3">
            <h3 className="text-[#F8AA37] text-xl font-bold">ОСНОВНОЕ</h3>

            <div>
              <p className="text-[#808080] font-medium">Тарифы</p>
              <p className="text-[#808080] font-medium">О компании</p>
              <p className="text-[#808080] font-medium">FAQ</p>
            </div>
          </span>

          <span className="space-y-3">
            <h3 className="text-[#F8AA37] text-xl font-bold">
              ПРАВОВОЙ РАЗДЕЛ
            </h3>

            <div>
              <p className="text-[#808080] font-medium">
                Политика обработки персональных данных
              </p>
              <p className="text-[#808080] font-medium">Публичная оферта</p>
              <p className="text-[#808080] font-medium">Политика возврата</p>
            </div>
          </span>
        </div>

        <span className="space-y-3">
          <h3 className="text-[#F8AA37] text-xl font-bold">
            ПОДДЕРЖКА КЛИЕНТОВ
          </h3>

          <p className="text-[#808080] font-medium">
            <img
              src="/icons/footer/telegram.svg"
              alt="Telegram"
              className="inline-block w-10 h-10 mr-2"
            />
            username
          </p>
          <p className="text-[#808080] font-medium">
            <img
              src="/icons/footer/email.svg"
              alt="Email"
              className="inline-block w-10 h-10 mr-2"
            />
            email
          </p>
        </span>
      </div>
    </motion.footer>
  );
};

export default Footer;
