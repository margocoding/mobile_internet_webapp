import Modal from "../ui/Modal.tsx";
import {useTariffStore} from "../../store/tariffStore.ts";
import Input from "../ui/Input.tsx";
import Button from "../ui/Button.tsx";
import React from "react";
import Chip from "../ui/Chip.tsx";
import ProgressBar from "../ui/ProgressBar.tsx";
import {getDaysLeft} from "../../utils/getDaysLeft.ts";
import {getDaysLabel} from "../../utils/getDaysLabel.ts";
import Discount from "../ui/Discount.tsx";
import {type Tariff, unlimitedTariffs} from "../../pages/TariffPage.tsx";
import {useNavigate} from "react-router-dom";
import {availableCountries} from "./CountriesModal.tsx";

const tariffData = {
    country: {
        id: '7a4e3b1c-9d2f-47e8-a1b9-c2d3e4f5a6b7',
        name: 'Турция',
        icon: '/icons/hero_countries_modal/turkey.svg'
    },
    isActive: false,
    tariffType: 'unlimited',
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    totalGb: Infinity,
    usedGb: 0,
};

const tariffs = [
    {id: 1, days: 1, dayPrice: 300},
    {id: 2, days: 3, dayPrice: 250, discount: 13},
    {id: 3, days: 7, dayPrice: 200, discount: 21},
    {id: 4, days: 15, dayPrice: 150, discount: 28, isPopular: true},
    {id: 5, days: 30, dayPrice: 120, discount: 35},
];

const CheckBalanceModal = () => {
    const [step, setStep] = React.useState<number>(1);
    const [selectedTariff, setSelectedTariff] = React.useState<Tariff>(tariffs[3]);


    const navigate = useNavigate();

    const {checkBalanceModal, setCheckBalanceModal, checkBalanceCountryId} = useTariffStore();

    const checkCountry = React.useMemo(() => availableCountries.find(country => country.id === checkBalanceCountryId) || tariffData.country, [checkBalanceCountryId, tariffData.country]);

    const handleNextStep = React.useCallback(() => {
        setStep(prev => prev + 1);
    }, []);

    console.log(checkBalanceCountryId);
    React.useEffect(() => {
        setStep(2)
    }, [checkBalanceCountryId])


    const progress = React.useMemo(() =>
            tariffData.tariffType === "unlimited"
                ? 100
                : ((tariffData.totalGb - tariffData.usedGb) / tariffData.totalGb) * 100,
        [tariffData]);

    const getStepContent = React.useCallback((step: number) => {
        switch (step) {
            case 2:
                return (
                    <>
                        {/* Текущий тариф */}
                        <div className="p-5 border-[#F8AA37] border rounded-xl space-y-2">
                            <div className="flex w-full items-center justify-between">
                                <span className="flex gap-3 items-center">
                                    <img className="rounded-xl h-9 max-md:h-7" src={checkCountry.icon}
                                         alt={checkCountry.name}/>
                                    <p className="text-[#333] text-xl max-md:text-sm font-semibold whitespace-nowrap">
                                        eSim {checkCountry.name}
                                    </p>
                                </span>

                                <Chip className="text-[#F8AA37] md:px-7 max-md:px-3 max-md:text-sm py-1">
                                    {tariffData.isActive ? 'Тариф активен' : 'Тариф неактивен'}
                                </Chip>
                            </div>

                            <div className="space-y-1">
                                <div className="flex w-full justify-between text-xl max-md:text-sm">
                                    <p className="font-semibold text-[#333]">Безлимитный интернет</p>
                                    <p className="text-[#808080] whitespace-nowrap">∞ GB</p>
                                </div>
                                <ProgressBar value={progress}/>
                                <p className="mt-2 text-[#808080] text-sm">
                                    Действует еще {getDaysLeft(tariffData.endDate)} дней
                                </p>
                            </div>
                        </div>

                        {/* Выбор тарифа */}
                        <div>
                            <h3 className="font-semibold text-[#333] text-lg">
                                Продлить или добавить трафик
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {unlimitedTariffs.map((tariff) => {
                                    const isSelected = selectedTariff?.id === tariff.id;

                                    return (
                                        <div
                                            key={tariff.id}
                                            className="relative cursor-pointer"
                                            onClick={() => setSelectedTariff(tariff)}
                                        >


                                            <div
                                                className={`grid grid-cols-[minmax(90px,120px)_1fr_auto] items-center gap-4 border shadow-none rounded-2xl p-4 relative border-[#F5A623]`}>

                                                {/* Основной контент */}
                                                <div>
                                                    <h3 className="font-bold text-[#2B2B2B] text-lg">
                                                        {getDaysLabel(tariff.days)}
                                                    </h3>
                                                    <p className="text-[#8C8C8C] text-sm">∞ GB</p>
                                                </div>

                                                <div>
                                                    <h3 className="text-[#2B2B2B] flex gap-1">
                                                        <p className={'text-xl font-bold'}>
                                                            {tariff.dayPrice * tariff.days}₽
                                                        </p>
                                                        <p
                                                            className={'line-through text-xs text-[#808080]'}>{Math.round(tariff.dayPrice * tariff.days * (1 - (tariff.discount / 100)))}₽</p>
                                                    </h3>
                                                    <p className="text-[#8C8C8C] text-sm">
                                                        {tariff.dayPrice}₽ / день
                                                    </p>
                                                </div>

                                                {/* Радио кнопка */}
                                                <div className="flex items-center justify-end">
                                                    {tariff.discount &&
                                                        <div className={'mr-5'}>
                                                            <Discount>{tariff.discount}%</Discount>
                                                        </div>
                                                    }
                                                    <div
                                                        className={`w-5 h-5 absolute right-2 top-2 rounded-full border flex items-center justify-center transition-all border-[#F5A623]`}>
                                                        {isSelected && (
                                                            <div className="w-3 h-3 rounded-full bg-[#F5A623]"/>
                                                        )}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Кнопка продления */}
                        <div className={'flex w-full justify-center h-17 max-md:h-13'}>

                            <Button
                                className={'font-semibold md:h-15 md:w-95 max-md:w-full'}
                                onClick={() => {
                                    setStep(1)
                                    navigate(`/order/${tariffData.country.id}/${selectedTariff?.id}?type=${tariffData.tariffType}`)
                                    setCheckBalanceModal(false)
                                }}
                            >
                                Продлить eSIM — {selectedTariff.dayPrice * selectedTariff.days}₽
                            </Button>
                        </div>
                    </>
                );

            default:
                return (
                    <div className="space-y-5 max-w-125 mx-auto">
                        <Input
                            label="Введите ваш ICCID (номер eSIM):"
                            placeholder="123456789100000"
                            round="xl"
                        />

                        <p className="text-[#808080] max-md:text-sm">
                            Номер ICCID (номер eSIM) можно найти в инструкции по активации,
                            которая приходила на вашу электронную почту.
                        </p>

                        <div className={'flex w-full justify-center h-17 max-md:h-13'}>
                            <Button onClick={handleNextStep} className={'font-semibold md:h-15 md:w-95 max-md:w-full'}>
                                Продолжить
                            </Button>
                        </div>
                    </div>
                );
        }
    }, [handleNextStep, progress, selectedTariff]);

    return (
        <Modal
            className={`max-[1024px]:h-dvh
    max-[1024px]:max-w-full
    max-[1024px]:rounded-none
    max-[1024px]:p-5`}
            header={
                <h2 className="text-center ml-16 text-3xl max-md:text-xl font-semibold">
                    Проверка баланса <br className="max-md:hidden"/>
                    и пополнение eSim
                </h2>
            }
            opened={checkBalanceModal}
            setOpened={setCheckBalanceModal}
        >
            <div className="mt-3 space-y-5">
                {getStepContent(step)}
            </div>
        </Modal>
    );
};

export default CheckBalanceModal;