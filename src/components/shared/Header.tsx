import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../ui/Button";
import Separator from "../ui/Separator";
import CloseButton from "../ui/CloseButton";
import { Link } from "react-router";

const navLinks = [
  { label: "Тарифы", href: "/#tariffs", icon: "/icons/header/tariffs.svg" },
  { label: "О нас", href: "/#about_us", icon: "/icons/header/about_us.svg" },
  { label: "Отзывы", href: "/#reviews", icon: "/icons/header/reviews.svg" },
  {
    label: "Как установить",
    href: "/#how_to_install",
    icon: "/icons/header/install_guide.svg",
  },
  { label: "FAQ", href: "/#faq", icon: "/icons/header/faq.svg" },
];

interface Props {
  text?: "black" | "white";
}

const Header = ({ text = "white" }: Props) => {
  const [opened, setOpened] = React.useState<boolean>(false);

  return (
    <motion.header
      className={`grid grid-cols-[1fr_2fr_1fr] text-${text} items-center py-4 px-4 min-[762px]:px-10`}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to="/" className="text-2xl">
        ЛОГОТИП
      </Link>
      <nav className="flex gap-4 text-xl justify-center max-[1024px]:hidden">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:text-[#F8AA37] transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <span className="ml-auto max-[1024px]:hidden">
        <Button>Выбрать тариф</Button>
      </span>

      <button
        className="absolute right-5"
        onClick={() => setOpened((prev) => !prev)}
      >
        {text === "white" ? (
          <img
            src="/icons/two_lines.svg"
            alt="Menu"
            className="w-6 h-6 max-[1024px]:block hidden"
          />
        ) : (
          <img
            src="/icons/two_lines_black.svg"
            alt="Menu"
            className="w-6 h-6 max-[1024px]:block hidden"
          />
        )}
      </button>

      <AnimatePresence>
        {opened && (
          <motion.nav
            className="fixed z-50 top-0 left-0 right-0 bg-white h-screen p-10 space-y-7 flex flex-col gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className=" absolute top-4.5 right-4.5">
              <CloseButton onClick={() => setOpened(false)} />
            </div>
            <div className="mt-20 flex flex-col gap-10 font-semibold text-xl">
              <a
                onClick={() => setOpened(false)}
                className="hover:text-[#F8AA37] flex items-center gap-3 text-black transition-colors"
              >
                <img
                  src="/icons/header/home.svg"
                  alt="Home"
                  className="w-7 h-7"
                />
                Главная
              </a>
              {navLinks.map((link) => (
                <a
                  onClick={() => setOpened(false)}
                  key={link.href}
                  href={link.href}
                  className="hover:text-[#F8AA37] flex items-center gap-3 text-black transition-colors"
                >
                  <img src={link.icon} alt={link.label} className="w-7 h-7" />
                  {link.label}
                </a>
              ))}
            </div>

            <Separator />
            <div className="space-y-3">
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
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
