// pages/InstallPage.tsx
import Header from "../components/shared/Header";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import {toast} from "react-toastify";
import React from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {fixedTariffs, unlimitedTariffs} from "./TariffPage";
import {availableCountries} from "../components/shared/CountriesModal";
import {useTariffStore} from "../store/tariffStore.ts";
import {getDaysLabel} from "../utils/getDaysLabel.ts";

const steps = [
    {
        id: 1,
        title: "Как активировать eSIM?",
        content: `
Активация eSIM возможна двумя способами:
• С помощью сканирования QR-кода
• Ручной ввод данных
Удостоверьтесь, что ваше устройство подключено
к сети интернет (Wi-Fi или передача данных).
    `,
    },
    {
        id: 2,
        title: "Сканирование QR-кода:",
        content: `
1. Перейдите в меню «Настройки» > «Сотовая связь» или «Мобильные данные»
2. Нажмите «Добавить eSIM» или сотовый тариф
3. Выберите способ настройки «По QR-коду»
4. С помощью мобильного устройства отсканируйте QR-код
5. Подтвердите выбор сотового оператора
6. По прибытии в страну назначения переключитесь на нужную eSIM
7. Включите роуминг и передачу данных в настройках eSIM
    `,
    },
    {
        id: 3,
        title: "Сканирование QR-кода:",
        content: `
При необходимости можно ввести сведения о тарифном плане вручную.

1. Перейдите в меню «Настройки» > «Сотовая связь»
2. Нажмите «Добавить eSIM»
3. Выберите «Ввести данные вручную»
4. Подтвердите выбор оператора
5. По прибытии в страну назначения переключитесь на нужную eSIM
6. Включите роуминг и передачу данных
    `,
    },
];

const esimData = [
    {
        label: "ICCID",
        value: "89480101001002859479300",
    },
    {
        label: "Код активации",
        value: "K2-2XF13Q-6ZMLQI",
    },
    {
        label: "Адрес SM-DP+",
        value: "smdp.io",
    },
];

const InstallPage = () => {
    const [searchParams] = useSearchParams();

    const tariffType = searchParams.get("type");
    const tariffId = useParams().tariff_id;
    const countryId = useParams().country_id;

    const {setCheckBalanceModal, setCheckBalanceCountryId, setCheckBalanceTariffType, setCheckBalanceTariffId} = useTariffStore();

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

    return (
        <div className="min-h-screen flex flex-col max-md:px-4">
            <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col space-y-8">
                <Header text="black"/>

                {/* TITLE */}
                <h1 className="text-4xl font-bold text-center max-md:text-2xl">
                    Инструкция по подключению eSIM
                </h1>

                <div className="grid grid-cols-[1fr_420px] gap-6 max-lg:grid-cols-1">
                    <div className="space-y-5">
                        <div
                            className="
                                        rounded-4xl
                                        overflow-hidden
                                        bg-linear-to-br
                                        from-[#DCE6FF]
                                        to-[#FFF0D8]
                                        p-8

                                        max-md:p-5
                                      "
                        >
                            <div className="flex flex-col items-center text-center">
                                <p className={'text-[#F8AA37] flex gap-1 items-center'}>
                                    <svg className={'h-2 w-2'} width="6" height="6" viewBox="0 0 6 6" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="3" cy="3" r="3" fill="currentColor"/>
                                    </svg>
                                    Не активна
                                </p>
                                <div className="flex items-center gap-3 ">
                                    <h2 className="text-4xl font-medium max-md:text-2xl">
                                        eSIM {country.name}
                                    </h2>

                                    <img
                                        src={country.miniIcon || "/icons/hero_countries_modal/vietnam.svg"}
                                        alt="turkey"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                </div>

                                <h3 className="mt-4 text-4xl font-bold max-md:text-2xl">
                                    {tariff.gb === Infinity ? "∞" : tariff.gb} GB • {getDaysLabel(tariff.days)}
                                </h3>

                                <div className="mt-5">
                                    <div
                                        className="
                      rounded-full
                      bg-[#F5A623]
                      px-5 py-1
                      text-white
                      text-sm
                    "
                                    >
                                        {tariffType === "unlimited"
                                            ? "Безлимитный"
                                            : "Фиксированный тариф"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* DATA */}
                        <div className="space-y-3">
                            {esimData.map((item) => (
                                <div
                                    key={item.label}
                                    className="
                    grid
                    grid-cols-[20px_160px_1fr_24px]
                    items-center
                    gap-3

                    max-md:grid-cols-[20px_1fr_24px]
                  "
                                >
                                    <img
                                        src="/icons/install/magnific.svg"
                                        alt="icon"
                                        className="w-5 h-5"
                                    />

                                    <p className="font-semibold max-md:hidden">{item.label}</p>

                                    <div className="min-w-0">
                                        <p
                                            className="
                        text-[#333333]
                        truncate
                        max-md:text-sm
                      "
                                        >
                      <span className="font-semibold md:hidden mr-2">
                        {item.label}:
                      </span>

                                            {item.value}
                                        </p>
                                    </div>

                                    <button
                                        className="cursor-pointer"
                                        onClick={() => {
                                            navigator.clipboard.writeText(item.value);
                                            toast(
                                                `${item.label} был успешно скопирован в буфер обмена`,
                                                {type: "success"},
                                            );
                                        }}
                                    >
                                        <img
                                            src="/icons/install/copy.svg"
                                            alt="copy"
                                            className="w-8 h-8"
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* QR */}
                        <div className="flex flex-col items-center pt-4 gap-4">
                            <img
                                src="/images/install/qr.png"
                                alt="qr"
                                className="w-44 h-44 max-md:w-36 max-md:h-36"
                            />

                            <p className=" text-center font-semibold">
                                Ваш QR-код для подключения
                            </p>

                        </div>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setCheckBalanceCountryId(country.id)
                                setCheckBalanceTariffId(tariff.id)
                                setCheckBalanceTariffType(tariffType as 'unlimited' | 'fixed')
                                setCheckBalanceModal(true);
                            }}
                            className="
                  
                  w-full
                  h-14
                  text-base
                  font-semibold
                "
                        >
                            Проверить остаток трафика
                        </Button>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-4">
                        {steps.map((step) => (
                            <Card
                                key={step.id}
                                className="
                  rounded-[28px]
                  border border-[#DCE6FF]
                  shadow-none
                "
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className="
                      flex-none
                      w-7 h-7
                      rounded-full
                      bg-[#F5A623]
                      text-white
                      flex items-center justify-center
                      text-sm font-bold
                    "
                                    >
                                        {step.id}
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold max-md:text-lg">
                                            {step.title}
                                        </h3>

                                        <p
                                            className="
                        
                        whitespace-pre-line
                        text-[#808080]
                        leading-tight
                        
                      "
                                        >
                                            {step.content}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstallPage;
