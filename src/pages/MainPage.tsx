import FAQ from "../components/shared/FAQ";
import Header from "../components/shared/Header";
import Hero from "../components/shared/hero/Hero";
import InstallGuide from "../components/shared/hero/InstallGuide";
import Reviews from "../components/shared/Reviews";
import WhyUs from "../components/shared/hero/WhyUs";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import CountriesModal from "../components/shared/hero/CountriesModal";
import React from "react";

export default function MainPage() {
  const [openedModal, setOpenedModal] = React.useState<boolean>(false);
  return (
    <div>
      <CountriesModal opened={openedModal} setOpened={setOpenedModal} />

      <div className="bg-linear-to-r from-[#2663FF] to-[#8495FF]">
        <Header />
        <Hero setOpenedModal={setOpenedModal} />
      </div>
      <div className="bg-white -mt-80 max-[950px]:-mt-60 px-5 max-[762px]:-mt-10 pt-10 relative z-10 rounded-t-[50px] space-y-15">
        <WhyUs setOpenedModal={setOpenedModal} />
        <div className="space-y-5">
          <Reviews />
          <Link to="/reviews" className="flex w-full justify-center">
            <Button
              variant="outline"
              className="max-w-105 w-full md:h-15 md:text-xl font-bold "
            >
              Все отзывы
            </Button>
          </Link>
        </div>
        <InstallGuide />
        <FAQ />
      </div>
    </div>
  );
}
