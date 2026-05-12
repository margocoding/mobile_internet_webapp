import Card from "../../ui/Card";

const ways = [
  {
    text: "Выберите страну и тарифный план",
    image: "/images/install_guide/choose_plan.png",
  },
  {
    text: "Получите на почту QR-код с инструкцией для установки eSIM ",
    image: "/images/install_guide/qr_code.png",
  },
  {
    text: "Установите eSIM до вылета — и сразу по прилёте пользуйтесь быстрым и выгодным интернетом",
    image: "/images/install_guide/ready_to_use.png",
  },
];

const InstallGuide = () => {
  return (
    <section id="how_to_install" className="space-y-10">
      <header>
        <h1 className="text-4xl max-md:text-2xl text-center font-semibold">
          Как установить eSIM
        </h1>
      </header>

      <main className="max-[1024px]:flex grid min-[1024px]:grid-cols-3 overflow-x-auto gap-5">
        {ways.map((way, index) => (
          <Card
            key={index}
            className="space-y-3 h-117 min-w-60 relative py-5 flex flex-col items-center"
          >
            <div className="w-12.5 flex justify-center items-center text-white rounded-full aspect-square text-xl bg-[#F8AA37]">
              {index + 1}
            </div>
            <p className="text-center text-[#333333] font-medium text-xl">
              {way.text}
            </p>
            <img
              src={way.image}
              alt={way.text}
              className="w-full absolute bottom-0"
            />
          </Card>
        ))}
      </main>
    </section>
  );
};

export default InstallGuide;
