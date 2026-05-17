import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Header from "../components/shared/Header";
import { availableCountries } from "../components/shared/CountriesModal";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { fixedTariffs, unlimitedTariffs } from "./TariffPage";
import Popup from "../components/ui/Popup";

// OrderPage.tsx

const OrderPage = () => {
  const [selectedPayment, setSelectedPayment] = React.useState<
    "international" | "russian"
  >("international");

  const [openedPopup, setOpenedPopup] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [checked, setChecked] = React.useState<boolean>(false);
  const [promoOpened, setPromoOpened] = React.useState(false);
  const [promoCode, setPromoCode] = React.useState("");
  const [promoApplied, setPromoApplied] = React.useState(false);
  const [discountedPrice, setDiscountedPrice] = React.useState<number | null>(
    null,
  );

  const tariffId = useParams().tariff_id;
  const countryId = useParams().country_id;

  const [searchParams] = useSearchParams();

  const tariffType = searchParams.get("type");

  const tariff = React.useMemo(() => {
    if (!tariffId || !tariffType) return null;

    if (tariffType === "unlimited") {
      return unlimitedTariffs.find((t) => t.id === parseInt(tariffId));
    } else {
      return fixedTariffs.find((t) => t.id === parseInt(tariffId));
    }
  }, [tariffId, tariffType]);

  const country = React.useMemo(
    () => availableCountries.find((c) => c.id === countryId),
    [countryId],
  );

  if (!tariff || !country) return null;

  const handleApplyPromo = () => {
    const discounted = Math.round(tariff.dayPrice * tariff.days * 0.9);

    setDiscountedPrice(discounted);
    setPromoApplied(true);
    setPromoOpened(false);
  };

  return (
    <div className="min-h-screen flex flex-col max-md:px-4">
      <div className="max-w-5xl w-full mx-auto flex-1 flex flex-col space-y-8">
        <Header text="black" />

        <h1 className="text-4xl font-bold text-center max-md:text-2xl">
          Оформление заказа
        </h1>

        <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
          {/* LEFT */}
          <Card className="space-y-3 h-fit">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold">Ваш заказ</h2>

              <p className="bg-[#F8AA37] text-white p-2 rounded-full px-4">
                {tariffType === "unlimited"
                  ? "Безлимитный тариф"
                  : "Фиксированный тариф"}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/icons/order/globe.svg"
                  alt="country"
                  className="w-5 h-5"
                />

                <p className="text-[#333333] font-semibold">{country?.name}</p>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src="/icons/order/sensors.svg"
                  alt="internet"
                  className="w-5 h-5"
                />

                <p className="text-[#333333] font-semibold">
                  {tariff.gb || "∞ GB"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src="/icons/order/calendar.svg"
                  alt="days"
                  className="w-5 h-5"
                />

                <p className="text-[#333333] font-semibold">
                  {tariff.days || "30"} дней
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[#808080]">Итого к оплате</p>

              <h3 className="text-3xl font-bold max-sm:text-2xl">
                {promoApplied ? (
                  <div className="flex gap-3">
                    <p className="line-through">
                      {tariff.dayPrice * tariff.days}
                    </p>
                    <p className="text-[#F8AA37]">{discountedPrice} руб.</p>
                  </div>
                ) : (
                  <div>{tariff.dayPrice * tariff.days} руб.</div>
                )}
              </h3>

              {promoApplied && (
                <p className="text-[#B0B0B0] underline underline-offset-4 w-fit">
                  Промокод успешно применён
                </p>
              )}
            </div>

            {!promoOpened && !promoApplied && (
              <button
                onClick={() => setPromoOpened(true)}
                className="text-[#B0B0B0] underline underline-offset-4 w-fit"
              >
                У меня есть промокод
              </button>
            )}

            {/* PROMO INPUT */}
            {promoOpened && (
              <div className="flex items-center gap-2">
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Введите промокод"
                  round="xl"
                  rightIcon={
                    <Button
                      onClick={handleApplyPromo}
                      className="aspect-square rounded-xl h-11 flex justify-center items-center"
                    >
                      <img
                        src="/icons/arrow-right_white.svg"
                        alt="apply"
                        className="w-5 h-5"
                      />
                    </Button>
                  }
                />
              </div>
            )}

            <p className="text-[#808080] leading-relaxed mt-3">
              После оплаты вы получите QR-код и инструкцию по установке на
              указанный e-mail.
            </p>

            <Input
              type="email"
              round="xl"
              placeholder="Введите e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14"
            />

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                type="checkbox"
                className="mt-1 accent-[#F5A623]"
              />

              <p className="text-sm text-[#808080] leading-relaxed">
                Подтверждаю наличие технологии eSIM на моём устройстве, а также
                даю согласие на получение информационных сообщений.
              </p>
            </label>
          </Card>

          {/* RIGHT */}
          <Card className="space-y-6 h-fit">
            <h2 className="text-xl font-bold">Выберите способ оплаты</h2>

            <div className="space-y-4 lg:grid lg:grid-cols-2 gap-3">
              <Card
                onClick={() => setSelectedPayment("international")}
                className={`w-full cursor-pointer h-full ${
                  selectedPayment === "international"
                    ? "border-[#F5A623]"
                    : "border-[#E8E8E8]"
                } border-2 p-4 text-left transition-all`}
              >
                <div className="space-y-2">
                  <div>
                    <h3 className="text-2xl font-bold">21,5 $</h3>

                    <p className="text-[#808080]">Международные карты</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <img
                      src="/icons/payment/visa.svg"
                      alt="visa"
                      className="h-4"
                    />

                    <img
                      src="/icons/payment/mastercard.svg"
                      alt="mastercard"
                      className="h-4"
                    />
                  </div>
                </div>
              </Card>

              <Card
                onClick={() => setSelectedPayment("russian")}
                className={`w-full cursor-pointer h-full ${
                  selectedPayment === "russian"
                    ? "border-[#F5A623]"
                    : "border-[#E8E8E8]"
                } border-2 p-4 text-left transition-all`}
              >
                <div className="space-y-2">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {discountedPrice || tariff.dayPrice * tariff.days} руб.
                    </h3>

                    <p className="text-[#808080]">Российские карты</p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <img
                      src="/icons/payment/visa.svg"
                      alt="visa"
                      className="h-4"
                    />

                    <img
                      src="/icons/payment/mastercard.svg"
                      alt="mastercard"
                      className="h-4"
                    />

                    <img
                      src="/icons/payment/mir.svg"
                      alt="mir"
                      className="h-4"
                    />

                    <img
                      src="/icons/payment/sberpay.svg"
                      alt="sberpay"
                      className="h-4"
                    />
                  </div>
                </div>
              </Card>
            </div>

            <p className="text-[#808080] text-lg leading-tight">
              Продолжая, вы подтверждаете своё согласие с{" "}
              <span className="underline">
                пользовательским соглашением и политикой обработки персональных
                данных.
              </span>
            </p>

            <Button
              onClick={() => setOpenedPopup(true)}
              disabled={
                !email.trim() ||
                !checked ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
              }
              className="w-full h-14 text-lg font-semibold max-sm:text-base"
            >
              Оформить eSIM
            </Button>
          </Card>
        </div>
      </div>
      <Popup opened={openedPopup} setOpened={setOpenedPopup}>
        {" "}
        <div className="flex flex-col items-center text-center">
          {" "}
          {/* ICON */}
          <img
            src="/icons/order/success_order.svg"
            alt="success"
            className="w-28 h-28 max-sm:w-24 max-sm:h-24"
          />
          {/* TITLE */}
          <h2 className="mt-4 text-3xl font-bold max-sm:text-2xl">
            eSIM отправлена
          </h2>
          {/* DESCRIPTION */}
          <p className="mt-2 text-[#808080] leading-relaxed max-w-[320px] max-sm:text-sm">
            Мы отправили данные для установки eSIM на вашу почту
          </p>
          {/* EMAIL */}
          <div className=" mt-5 w-full rounded-2xl border border-[#DCE7FF] bg-[#F7FAFF] px-4 py-3 flex items-center gap-3 ">
            <img src="/icons/mail.svg" alt="mail" className="w-5 h-5" />{" "}
            <p className="font-medium break-all">{email}</p>{" "}
          </div>
          {/* INFO */}
          <div className=" mt-4 w-full rounded-2xl border border-[#F5A623] bg-[#FFF9F1] px-4 py-3 flex items-start gap-3 text-left ">
            <img src="/icons/time.svg" alt="info" className="w-5 h-5 mt-0.5" />
            <p className="text-sm text-[#808080] leading-relaxed">
              Письмо придёт в течение 1–2 минут. Проверьте папки «Входящие» и
              «Спам».
            </p>
          </div>
          <Link
            to={`/install/${countryId}/${tariffId}?type=${tariffType}`}
            className="w-full"
          >
            <Button className="mt-6 w-full h-14 text-lg font-semibold">
              Открыть данные eSIM
            </Button>
          </Link>
        </div>
      </Popup>
    </div>
  );
};

export default OrderPage;
