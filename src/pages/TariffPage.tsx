import React from "react";

import Header from "../components/shared/Header";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Toggle from "../components/ui/Toggle";
import Discount from "../components/ui/Discount";
import FAQ from "../components/shared/FAQ";
import { Link, useParams } from "react-router-dom";
import { availableCountries } from "../components/shared/CountriesModal";
import { getDaysLabel } from "../utils/getDaysLabel";

interface Tariff {
  id: number;
  gb?: string;
  gbPrice?: number;
  dayPrice: number;
  days: number;
  discount?: number;
  badge?: string;
}

export const unlimitedTariffs: Tariff[] = [
  {
    id: 1,
    days: 1,
    dayPrice: 200,
    discount: -9,
  },
  {
    id: 2,
    days: 3,
    dayPrice: 300,
    discount: -13,
  },
  {
    id: 3,
    days: 7,
    dayPrice: 300,
    discount: -21,
  },
  {
    id: 4,
    days: 15,
    dayPrice: 200,
    discount: -28,
    badge: "☆ Популярный",
  },
  {
    id: 5,
    days: 30,
    dayPrice: 200,
    discount: -35,
  },
];

export const fixedTariffs: Tariff[] = [
  {
    id: 7,
    gb: "1 GB",
    gbPrice: 200,
    days: 7,
    badge: "Для новых клиентов",
    dayPrice: 200,
    discount: -9,
  },
  {
    id: 8,
    gb: "3 GB",
    gbPrice: 1000,
    days: 15,
    badge: "⭐ Популярный",
    dayPrice: 100,
    discount: -13,
  },
  {
    id: 9,
    gb: "10 GB",
    gbPrice: 2000,
    days: 30,
    dayPrice: 100,
    discount: -21,
  },
  {
    id: 10,
    gb: "20 GB",
    gbPrice: 3000,
    days: 30,
    dayPrice: 300,
    discount: -28,
  },
  {
    id: 11,
    gb: "30 GB",
    gbPrice: 5000,
    days: 30,
    dayPrice: 100,
    discount: -35,
  },
  {
    id: 12,
    gb: "50 GB",
    gbPrice: 6000,
    days: 30,
    dayPrice: 100,
    discount: -35,
  },
];

const faq = [
  {
    question: "На каких устройствах работает eSIM?",
    answer:
      "eSIM работает на iPhone XR и новее, Google Pixel 3 и новее, Samsung Galaxy S20 и новее, а также на ряде других устройств с поддержкой eSIM.",
  },
  {
    question: "Основная SIM-карта продолжит работать?",
    answer:
      "Да, основная SIM-карта продолжит работать. Вы сможете одновременно использовать обычную SIM и eSIM, например для звонков и мобильного интернета.",
  },
  {
    question: "Как позвонить или отправить SMS через eSIM?",
    answer:
      "Большинство туристических eSIM предназначены только для мобильного интернета. Для звонков и SMS можно использовать основную SIM-карту или мессенджеры: Telegram, WhatsApp, FaceTime и другие.",
  },
  {
    question: "Можно ли раздавать интернет?",
    answer:
      "Да, вы можете использовать режим модема и раздавать интернет на другие устройства, если это не ограничено выбранным тарифом.",
  },
  {
    question: "Есть ли дополнительные платежи или комиссии?",
    answer:
      "Нет, стоимость тарифа фиксированная. Дополнительные комиссии или скрытые платежи отсутствуют.",
  },
  {
    question: "Как установить eSIM на моё устройство?",
    answer:
      "После оплаты вы получите QR-код и инструкцию по установке. Достаточно открыть настройки устройства, выбрать раздел eSIM и отсканировать QR-код.",
  },
  {
    question: "Сколько времени занимает установка eSIM?",
    answer:
      "Обычно установка занимает не более 3–5 минут. Активация происходит практически мгновенно после подключения.",
  },
  {
    question:
      "Что делать, если eSIM долго устанавливается или произошёл «Сбой активации»?",
    answer:
      "Проверьте подключение к интернету, перезагрузите устройство и попробуйте повторить установку. Если проблема сохраняется — обратитесь в поддержку.",
  },
  {
    question:
      "Что делать, если я вижу надпись «Пригодные данные не найдены» во время установки?",
    answer:
      "Такая ошибка может появиться при повторном сканировании уже активированного QR-кода или при несовместимости устройства. Проверьте поддержку eSIM и обратитесь в поддержку сервиса.",
  },
  {
    question: "С какого момента начинается срок действия моей eSIM?",
    answer:
      "Срок действия начинается с момента первой активации eSIM и подключения к сети в стране назначения.",
  },
  {
    question: "Можно ли вернуть оплату за eSIM?",
    answer:
      "Возврат возможен только в случае, если eSIM не была активирована и не использовалась. Подробные условия возврата уточняйте в правилах сервиса.",
  },
  {
    question: "Что делать, если интернет на eSIM не работает?",
    answer:
      "Убедитесь, что eSIM выбрана для передачи мобильных данных, включён роуминг данных и устройство подключено к поддерживаемой сети.",
  },
  {
    question: "Как проверить остаток или докупить трафик?",
    answer:
      "Проверить остаток трафика и приобрести дополнительный пакет можно в личном кабинете или в приложении сервиса.",
  },
  {
    question: "eSIM — это безопасно?",
    answer:
      "Да, eSIM является безопасной технологией. Данные защищены так же, как и на обычной SIM-карте, а риск физической потери карты отсутствует.",
  },
];

const facts = [
  {
    id: 1,
    icon: "/icons/tariff/wifi.svg",
    title: "В тариф входит только мобильный интернет",
  },
  {
    id: 2,
    icon: "/icons/tariff/phone.svg",
    title: "Все сайты и мессенджеры доступны без VPN",
  },
  {
    id: 3,
    icon: "/icons/tariff/wifi.svg",
    title: "Бесплатная раздача интернета через «режим модема»",
  },
  {
    id: 4,
    icon: "/icons/tariff/phone.svg",
    title: "Ваша основная сим-карта продолжит работать",
  },
  {
    id: 5,
    icon: "/icons/tariff/phone.svg",
    title:
      "Срок действия тарифа начинается с момента, когда вы начнётё использовать eSIM в стране назначения",
  },
];

const TariffPage = () => {
  const [toggleValue, setToggleValue] = React.useState<string>("unlimited");
  const [selectedTariff, setSelectedTariff] = React.useState<Tariff | null>(
    null,
  );

  const id = useParams().id;

  const tariff = React.useMemo(
    () => availableCountries.find((c) => c.id === id),
    [id],
  );

  if (!tariff) return null;

  return (
    <div className="min-h-screen flex flex-col max-md:px-4">
      <div className="max-w-5xl w-full mx-auto space-y-5 sm:space-y-7 flex-1 flex flex-col">
        <Header text="black" />

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center leading-tight">
          Интернет за границей без роуминга
        </h1>
        <div className="bg-linear-to-br p-5 space-y-5 rounded-3xl from-[#2663FF] to-[#8495FF]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.75fr] gap-4 sm:gap-6">
            {/* LEFT  bg-[url('/images/tariff/background.png')]*/}
            <div className="bg-cover bg-center rounded-2xl overflow-hidden md:min-h-105 lg:h-full">
              <div className="bg-[#11345CB5] h-full px-5 max-sm:px-8 md:py-8 max-md:p-3 flex md:flex-col max-md:justify-between justify-center items-center text-center">
                <div className="md:space-y-3">
                  <h3 className="text-white/80 text-xl max-md:text-base">
                    Туристические eSIM
                  </h3>

                  <h2 className="text-white text-3xl font-bold max-md:text-xl">
                    eSIM {tariff.name}
                  </h2>
                </div>

                <img
                  src={tariff.icon}
                  alt="Turkey"
                  className="w-50 max-md:w-20 md:mt-6 sm:mt-10 rounded-lg"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col h-full">
              <div className="space-y-4 sm:space-y-5 flex flex-col flex-1 min-h-0">
                <div className="overflow-x-auto pb-1 shrink-0">
                  <div className="mx-auto w-full justify-center flex">
                    <Toggle
                      options={[
                        {
                          label: "Безлимитный",
                          value: "unlimited",
                        },
                        {
                          label: "Фиксированный",
                          value: "fixed",
                        },
                      ]}
                      value={toggleValue}
                      onChange={setToggleValue}
                    />
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-4 pr-1  min-h-0">
                  {(toggleValue === "unlimited"
                    ? unlimitedTariffs
                    : fixedTariffs
                  ).map((tariff: Tariff) => (
                    <div
                      className="relative cursor-pointer"
                      key={tariff.id}
                      onClick={() => setSelectedTariff(tariff)}
                    >
                      {tariff.badge && (
                        <div className="absolute right-3 font-semibold sm:right-6 -top-2 sm:-top-3 z-10 bg-white text-[#F5A623] border border-[#F5A623] rounded-full px-2 sm:px-3 py-1 text-[10px] sm:text-xs whitespace-nowrap">
                          {tariff.badge}
                        </div>
                      )}

                      <Card
                        className={`grid grid-cols-[minmax(90px,120px)_1fr_auto] max-md:grid-cols-3 items-center gap-4 border-2 shadow-none ${
                          selectedTariff?.id === tariff.id
                            ? "border-[#F5A623]"
                            : "border-transparent"
                        }`}
                      >
                        <div>
                          <h3 className="font-bold text-[#2B2B2B]">
                            {tariff.gb || getDaysLabel(tariff.days)}
                          </h3>

                          <p className="text-[#8C8C8C] mt-1">
                            {!tariff.gb ? "∞ GB" : getDaysLabel(tariff.days)}
                          </p>
                        </div>

                        {/* PRICE */}
                        <div className="min-w-0">
                          <h3 className="font-bold text-[#2B2B2B]">
                            {toggleValue === "unlimited"
                              ? tariff.dayPrice * tariff.days
                              : tariff.gbPrice}
                            ₽
                          </h3>

                          <p className="text-[#8C8C8C] text-sm mt-1">
                            {tariff.dayPrice}₽ / день
                          </p>
                        </div>

                        {tariff.discount && (
                          <Discount>{tariff.discount}%</Discount>
                        )}
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <Link to={`/order/${id}/${selectedTariff?.id}?type=${toggleValue}`}>
              <Button
                disabled={!selectedTariff}
                className="px-20 py-3 text-xl max-md:text-base font-semibold"
              >
                Оформить eSIM —{" "}
                {selectedTariff
                  ? `${selectedTariff.days * selectedTariff.dayPrice}₽`
                  : "0₽"}
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {facts.map((fact) => (
            <Card key={fact.id} className="flex gap-3 items-center">
              <img
                src={fact.icon}
                alt={fact.title}
                className="w-6 h-6 flex-none"
              />
              <p className="text-[#333333]">{fact.title}</p>
            </Card>
          ))}
        </div>

        <FAQ questions={faq} />
      </div>
    </div>
  );
};

export default TariffPage;
