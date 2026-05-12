import React from "react";
import Header from "../components/shared/Header";
import Reviews from "../components/shared/Reviews";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import SearchSelect from "../components/ui/SearchSelect";

const ReviewsPage = () => {
  const [openedModal, setOpenedModal] = React.useState<boolean>(false);
  const [rating, setRating] = React.useState<number>(0);

  return (
    <div className="space-y-10 max-md:px-5 max-md:space-y-5">
      <Header text="black" />

      <Modal
        header={
          <div className="text-center">
            <h2 className="font-bold text-2xl sm:text-3xl">Оставить отзыв</h2>
          </div>
        }
        opened={openedModal}
        setOpened={setOpenedModal}
      >
        <div className="space-y-3">
          <p className="text-[#808080] text-center text-sm sm:text-base">
            Поделитесь своим опытом — это поможет нам стать лучше
          </p>

          {/* NAME */}
          <div className="space-y-1">
            <label className="font-semibold text-sm sm:text-base">
              Ваше имя:
            </label>

            <Input
              round="xl"
              placeholder="Иван Иванов"
              className="h-12 sm:h-14"
            />
          </div>

          {/* SELECT */}
          <div className="space-y-1">
            <label className="font-semibold text-sm sm:text-base">
              Какой тариф использовали:
            </label>

            <SearchSelect
              placeholder="Выберите страну"
              options={[
                { label: "Турция", value: "turkey" },
                { label: "ОАЭ", value: "uae" },
                { label: "Таиланд", value: "thailand" },
                { label: "Франция", value: "france" },
                { label: "Италия", value: "italy" },
                { label: "Испания", value: "spain" },
              ]}
            />
          </div>

          {/* RATING */}
          <div className="space-y-1">
            <label className="font-semibold text-sm sm:text-base">
              Насколько вы довольны качеством услуг:
            </label>

            <div className="flex items-center gap-1 sm:gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = star <= rating;

                return (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`transition-all duration-200 hover:scale-110 ${
                      active ? "text-[#F5A623]" : "text-[#D9D9D9]"
                    }`}
                  >
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8 sm:w-10 sm:h-10"
                    >
                      <path d="M12 2L14.9 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L9.1 8.26L12 2Z" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>

          {/* REVIEW */}
          <div className="space-y-1">
            <label className="font-semibold text-sm sm:text-base">
              Ваш отзыв:
            </label>

            <textarea
              placeholder="Поделитесь вашим мнением..."
              className="w-full min-h-25 rounded-2xl border border-[#F5A623] px-5 py-4 outline-none resize-none bg-white text-sm sm:text-base"
            />
          </div>

          {/* BUTTON */}
          <div className="flex justify-center pt-2">
            <Button className="max-w-105 w-full md:h-14 md:text-xl font-bold rounded-full">
              Оставить свой отзыв
            </Button>
          </div>
        </div>
      </Modal>

      <Reviews />

      <div className="flex justify-center items-center w-full">
        <Button
          className="max-w-105 w-full md:h-15 md:text-xl font-bold"
          onClick={() => setOpenedModal(true)}
        >
          Оставить свой отзыв
        </Button>
      </div>
    </div>
  );
};

export default ReviewsPage;
