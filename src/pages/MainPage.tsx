import FAQ from "../components/shared/FAQ";
import Header from "../components/shared/Header";
import Hero from "../components/shared/hero/Hero";
import InstallGuide from "../components/shared/hero/InstallGuide";
import Reviews, { type Review } from "../components/shared/Reviews";
import WhyUs from "../components/shared/hero/WhyUs";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import CountriesModal from "../components/shared/hero/CountriesModal";
import React from "react";
import { mockReviews } from "../data/reviews";
import { useTariffStore } from "../store/tariffStore";

export default function MainPage() {
  const { openedModal, setModal } = useTariffStore();
  const [reviews] = React.useState<Review[]>(mockReviews);
  return (
    <div>
      <CountriesModal opened={openedModal} setOpened={setModal} />

      <div className="bg-linear-to-r from-[#2663FF] z-20 to-[#8495FF]">
        <div className="max-md:px-4 px-10">
          <Header />
        </div>
        <Hero setOpenedModal={setModal} />
      </div>
      <div className="bg-white -mt-80 max-[950px]:-mt-60 px-5 max-[762px]:-mt-10 pt-10 relative rounded-t-[50px] space-y-15">
        <WhyUs setOpenedModal={setModal} />
        <div className="space-y-5">
          <Reviews reviews={reviews} />
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
