import CountryCard from "../../ui/CountryCard";
import Input from "../../ui/Input";
import Modal from "../../ui/Modal";

interface Props {
  opened: boolean;
  setOpened: (data: boolean) => void;
}

export const availableCountries = [
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    name: "Австралия",
    icon: "/icons/hero_countries_modal/australia.svg",
    startPrice: 100,
    isPopular: false,
  },
  {
    id: "a1d23e45-b6f7-49c8-92d1-f3e4a5b6c7d8",
    name: "Австрия",
    icon: "/icons/hero_countries_modal/austria.svg",
    startPrice: 100,
    isPopular: false,
  },
  {
    id: "b2e34f56-c7g8-50d9-a3e2-g4f5a6b7c8d9",
    name: "Албания",
    icon: "/icons/hero_countries_modal/albania.svg",
    startPrice: 100,
    isPopular: false,
  },
  {
    id: "c3f45g67-d8h9-51e0-b4f3-h5g6a7b8c9da",
    name: "Алжир",
    icon: "/icons/hero_countries_modal/algeria.svg",
    startPrice: 100,
    isPopular: false,
  },
  {
    id: "d4g56h78-e9i0-52f1-c5g4-i6h7a8b9c0db",
    name: "Аргентина",
    icon: "/icons/hero_countries_modal/argentina.svg",
    startPrice: 100,
    isPopular: false,
  },
  {
    id: "e5h67i89-f0j1-53g2-d6h5-j7i8a9b0c1dc",
    name: "Армения",
    icon: "/icons/hero_countries_modal/armenia.svg",
    startPrice: 100,
    isPopular: false,
  },
  {
    id: "f6i78j90-g1k2-54h3-e7i6-k8j9a0b1c2dd",
    name: "Багамы",
    icon: "/icons/hero_countries_modal/bahamas.svg",
    startPrice: 100,
    isPopular: false,
  },
  {
    id: "g7j89k01-h2l3-55i4-f8j7-l9k0a1b2c3de",
    name: "Бангладеш",
    icon: "/icons/hero_countries_modal/bangladesh.svg",
    startPrice: 100,
    isPopular: false,
  },
  {
    id: "h8k90l12-i3m4-56j5-g9k8-m0l1a2b3c4df",
    name: "Барбадос",
    icon: "/icons/hero_countries_modal/barbados.svg",
    startPrice: 100,
    isPopular: false,
  },
  {
    id: "i9l01m23-j4n5-57k6-h0l9-n1m2a3b4c5dg",
    name: "Бахрейн",
    icon: "/icons/hero_countries_modal/bahrain.svg",
    startPrice: 100,
    isPopular: false,
  },
  {
    id: "j0m12n34-k5o6-58l7-i1m0-o2n3a4b5c6dh",
    name: "Беларусь",
    icon: "/icons/hero_countries_modal/belarus.svg",
    startPrice: 100,
    isPopular: false,
  },
  {
    id: "7a4e3b1c-9d2f-47e8-a1b9-c2d3e4f5a6b7",
    name: "Турция",
    icon: "/icons/hero_countries_modal/turkey.svg",
    startPrice: 100,
    isPopular: true,
    miniIcon: "/icons/countries/turkey.svg",
  },
  {
    id: "8b5f4c2d-0e3g-48f9-b2c0-d3e4f5g6a7c8",
    name: "Египет",
    icon: "/icons/hero_countries_modal/egypt.svg",
    startPrice: 100,
    isPopular: true,
    miniIcon: "/icons/countries/egypt.svg",
  },
  {
    id: "9c6g5d3e-1f4h-49g0-c3d1-e4f5g6h7a8d9",
    name: "Китай",
    icon: "/icons/hero_countries_modal/china.svg",
    startPrice: 100,
    isPopular: true,
    miniIcon: "/icons/countries/china.svg",
  },
  {
    id: "0d7h6e4f-2g5i-50h1-d4e2-f5g6h7i8a9da",
    name: "ОАЭ",
    icon: "/icons/hero_countries_modal/uae.svg",
    startPrice: 100,
    isPopular: true,
    miniIcon: "/icons/countries/uae.svg",
  },
  {
    id: "1e8i7f5g-3h6j-51i2-e5f3-g6h7i8j9a0db",
    name: "Тайланд",
    icon: "/icons/hero_countries_modal/thailand.svg",
    startPrice: 100,
    isPopular: true,
    miniIcon: "/icons/countries/thailand.svg",
  },
  {
    id: "2f9j8g6h-4i7k-52j3-f6g4-h7i8j9k0a1dc",
    name: "Вьетнам",
    icon: "/icons/hero_countries_modal/vietnam.svg",
    startPrice: 100,
    isPopular: true,
    miniIcon: "/icons/countries/vietnam.svg",
  },
];

import React from "react";

interface Props {
  opened: boolean;
  setOpened: (data: boolean) => void;
}

const CountriesModal = ({ opened, setOpened }: Props) => {
  const [search, setSearch] = React.useState<string>("");

  // Фильтрация всех стран
  const filteredCountries = React.useMemo(() => {
    if (!search.trim()) return availableCountries;

    return availableCountries.filter(
      (country) =>
        country.name.toLowerCase().indexOf(search.toLowerCase()) > -1,
    );
  }, [search]);

  // Фильтрация популярных стран
  const filteredPopularCountries = React.useMemo(() => {
    return filteredCountries.filter((country) => country.isPopular);
  }, [filteredCountries]);

  console.log(search);
  console.log(filteredCountries);

  return (
    <Modal
      className="space-y-5"
      color="primary"
      opened={opened}
      setOpened={setOpened}
      header={
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          options={availableCountries.map((country) => country.name)}
          color="primary"
          round="xl"
          autoFocus
          placeholder="Найдите свое направление..."
          leftIcon={<img src="/icons/search.svg" alt="search" />}
        />
      }
    >
      {!!filteredPopularCountries.length && (
        <div>
          <h2 className="font-semibold text-xl">Популярные страны</h2>

          <div className="grid md:grid-cols-2 gap-3">
            {filteredPopularCountries.map((country) => (
              <CountryCard
                key={country.id}
                name={country.name}
                icon={country.icon}
                startPrice={country.startPrice}
                id={country.id}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-semibold text-xl">
          {search ? "Результаты поиска" : "Все страны"}
        </h2>

        {filteredCountries.length ? (
          <div className="grid md:grid-cols-2 gap-3">
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.id}
                id={country.id}
                name={country.name}
                icon={country.icon}
                startPrice={country.startPrice}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-3">
            По вашему запросу ничего не найдено
          </p>
        )}
      </div>
    </Modal>
  );
};

export default CountriesModal;
