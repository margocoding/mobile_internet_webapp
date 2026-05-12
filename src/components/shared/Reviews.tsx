import { motion } from "framer-motion";
import Review from "../ui/Review";
import { fadeInUp, fadeInUpStagger } from "../ui/animation";

const reviews = [
  {
    username: "Born_Free777",
    rating: 5,
    text: "Я фрилансер, мне не важно где быть, лишь бы был стабильный интернет. Весь этот год я катаюсь по Европе. Чтобы оставаться на связи в любой стране выбираю маркетплейс eSIM eSIM.World. Это самый бюджетный и, к моему удивлению, самый вариант.",
    tariff: {
      countryName: "Тайланд",
      countryIcon: "/icons/countries/thailand.svg",
    },
  },
  {
    username: "Марк Новак",
    rating: 5,
    text: "Для подключения eSIM на планшете воспользовался сервисом eSIM.World. Всё очень удобно. Пошагово и просто. Буквально несколько кликов и настроил. Времени это также много не отнимает. Совершенно не обязательно куда‑либо ездить и настраивать, платить менеджеру.",
    tariff: {
      countryName: "Китай",
      countryIcon: "/icons/countries/china.svg",
    },
  },
  {
    username: "Алексей",
    rating: 5,
    text: "Активировал себе электронную сим-карту в телефоне с помощью сайта eSIM.World. Действительно сделано удобно и понятно. Регистрация без проблем, дальше инструкция с понятными указаниями. В принципе весь процесс занял минуты 3.",
    tariff: {
      countryName: "Турция",
      countryIcon: "/icons/countries/turkey.svg",
    },
  },
  {
    username: "Мехмед Демир",
    rating: 5,
    text: "Отличные цены и удобный сервис. Инструкция понятная, связь работает отлично, протестировала уже в 4-х странах во время путешествия по Европе. Первый раз были сложности, техподдержка быстро помогла.",
    tariff: {
      countryName: "Германия",
      countryIcon: "/icons/countries/egypt.svg",
    },
  },
];

const Reviews = () => {
  return (
    <motion.section
      id="reviews"
      className="space-y-10"
      initial="hidden"
      animate="visible"
      variants={fadeInUpStagger}
    >
      <motion.header variants={fadeInUp} className="text-center">
        <h1 className="text-4xl max-md:text-2xl text-center font-semibold">
          Отзывы
        </h1>
        <h3 className="text-[#808080] md:text-xl">Что о нас говорят клиенты</h3>
      </motion.header>

      <motion.main
        variants={fadeInUpStagger}
        className="grid min-[986px]:grid-cols-2 gap-5"
      >
        {reviews.map((review, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Review
              username={review.username}
              rating={review.rating}
              text={review.text}
              tariff={review.tariff}
            />
          </motion.div>
        ))}
      </motion.main>
    </motion.section>
  );
};

export default Reviews;
