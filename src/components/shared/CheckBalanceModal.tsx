import React from "react";
import { useNavigate } from "react-router-dom";
import { fixedTariffs, type Tariff, unlimitedTariffs } from "../../pages/TariffPage.tsx";
import { useTariffStore } from "../../store/tariffStore.ts";
import { getDaysLabel } from "../../utils/getDaysLabel.ts";
import { getDaysLeft } from "../../utils/getDaysLeft.ts";
import Button from "../ui/Button.tsx";
import Chip from "../ui/Chip.tsx";
import Discount from "../ui/Discount.tsx";
import Input from "../ui/Input.tsx";
import Modal from "../ui/Modal.tsx";
import ProgressBar from "../ui/ProgressBar.tsx";
import { availableCountries } from "./CountriesModal.tsx";

const tariffData = {
    country: {
        id: '7a4e3b1c-9d2f-47e8-a1b9-c2d3e4f5a6b7',
        name: 'Турция',
        icon: '/icons/hero_countries_modal/turkey.svg'
    },
    isActive: true,
    type: 'unlimited',
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    gb: Infinity,
    usedGb: 0,
};

const CheckBalanceModal = () => {
    const [step, setStep] = React.useState<number>(1);
    const [selectedTariff, setSelectedTariff] = React.useState<Tariff | null>(null);
    const [iccid, setIccid] = React.useState<string>('');

    const navigate = useNavigate();

    const { checkBalanceModal, setCheckBalanceModal, checkBalanceCountryId, checkBalanceTariffId, checkBalanceTariffType, setCheckBalanceCountryId, setCheckBalanceTariffId, setCheckBalanceTariffType } = useTariffStore();

    const checkCountry = React.useMemo(() => availableCountries.find(country => country.id === checkBalanceCountryId) || tariffData.country, [checkBalanceCountryId, tariffData.country]);
    const checkTariff = React.useMemo(() => (checkBalanceTariffType === 'unlimited' ? unlimitedTariffs : fixedTariffs).find(tariff => tariff.id === checkBalanceTariffId), [checkBalanceTariffType, checkBalanceTariffId])

    const handleNextStep = React.useCallback(() => {
        setStep(prev => prev + 1);
        setIccid('')

    }, [step]);

    const progress = React.useMemo(() =>
        checkBalanceTariffType === 'unlimited'
            ? 100
            : ((checkTariff?.gb / 2) / checkTariff?.gb) * 100,
        [tariffData, checkTariff]);

    React.useEffect(() => {
        if (checkBalanceCountryId && checkTariff) {
            setStep(2)
        }
    }, [checkBalanceCountryId, checkTariff])

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
                                        alt={checkCountry.name} />
                                    <p className="text-[#333] text-xl max-md:text-sm font-semibold whitespace-nowrap">
                                        eSim {checkCountry.name}
                                    </p>
                                </span>

                                <Chip className={`text-[#F8AA37] md:px-7 max-md:px-3 max-md:text-sm py-1 ${tariffData.isActive ? 'bg-[#F8AA37] text-white' : ''}`}>
                                    {tariffData.isActive ? 'Тариф активен' : 'Тариф неактивен'}
                                </Chip>
                            </div>

                            <div className="space-y-1">
                                <div className="flex w-full justify-between text-xl max-md:text-sm">
                                    <p className="font-semibold text-[#333]">Безлимитный интернет</p>
                                    <p className="text-[#808080] whitespace-nowrap">{checkTariff?.gb === Infinity ? '∞' : checkTariff?.gb} GB</p>
                                </div>
                                <ProgressBar value={progress} />
                                <p className="mt-2 text-[#808080] text-sm">
                                    Действует еще {getDaysLeft(checkTariff?.days ? new Date(Date.now() + checkTariff.days * 24 * 60 * 60 * 1000) : tariffData.endDate)} дней
                                </p>
                            </div>
                        </div>

                        {/* Выбор тарифа */}
                        <div>
                            <h3 className="font-semibold text-[#333] text-lg">
                                Продлить или добавить трафик
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {(checkBalanceTariffType === 'fixed' ? fixedTariffs : unlimitedTariffs).map((tariff) => {
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
                                                            {checkBalanceTariffType === "fixed"
                                                                ? tariff.gbPrice * tariff.gb
                                                                : tariff.dayPrice * tariff.days
                                                                }₽
                                                        </p>
                                                        {tariff.oldPrice &&
                                                            <p
                                                                className={'line-through text-xs text-[#808080]'}>{tariff.oldPrice}₽</p>
                                                        }
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
                                                            <div className="w-3 h-3 rounded-full bg-[#F5A623]" />
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
                                disabled={!selectedTariff}
                                className={'font-semibold md:h-15 md:w-95 max-md:w-full'}
                                onClick={() => {
                                    setStep(1);
                                    navigate(`/order/${tariffData.country.id}/${selectedTariff?.id}?type=${checkBalanceTariffType || 'unlimited'}&orderType=renew`)
                                    setCheckBalanceModal(false)
                                }}
                            >
                                Продлить eSIM — {selectedTariff ? selectedTariff.dayPrice ? selectedTariff.dayPrice * selectedTariff.days : selectedTariff.gbPrice * selectedTariff.gb : 0}₽
                            </Button>
                        </div>
                    </>
                );

            default:
                return (
                    <div className="space-y-5 max-w-125 mx-auto">
                        <Input
                            type="number"
                            value={iccid}
                            onChange={(e) => setIccid(e.target.value)}
                            label="Введите ваш ICCID (номер eSIM):"
                            placeholder="123456789100000"
                            round="xl"
                        />

                        <p className="text-[#808080] max-md:text-sm">
                            Номер ICCID (номер eSIM) можно найти в инструкции по активации,
                            которая приходила на вашу электронную почту.
                        </p>

                        <div className={'flex w-full justify-center h-17 max-md:h-13'}>
                            <Button disabled={!iccid.trim()} onClick={handleNextStep}
                                className={'font-semibold md:h-15 md:w-95 max-md:w-full'}>
                                Продолжить
                            </Button>
                        </div>
                    </div>
                );
        }
    }, [checkCountry.icon, checkCountry.name, progress, selectedTariff?.dayPrice, selectedTariff?.days, selectedTariff?.id, iccid, handleNextStep, navigate, setCheckBalanceModal]);

    return (
        <Modal
            className={`max-[1024px]:min-h-screen
    max-[1024px]:max-w-full
    max-[1024px]:rounded-none
    max-[1024px]:p-5
    `}
            header={
                <h2 className="text-center ml-16 max-md:mt-16 text-3xl max-md:text-xl font-semibold">
                    Проверка баланса <br className="max-md:hidden" />
                    и пополнение eSim
                </h2>
            }
            opened={checkBalanceModal}
            setOpened={(data) => {
                setCheckBalanceModal(data);
                setStep(1)
                setCheckBalanceCountryId(null)
                setCheckBalanceTariffId(null)
                setCheckBalanceTariffType(null)
                setIccid('');
            }}
        >
            <div className="mt-3 space-y-5">
                {getStepContent(step)}
            </div>
        </Modal>
    );
};

export default CheckBalanceModal;