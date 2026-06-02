import {motion} from "framer-motion";
import Review from "../ui/Review";
import {fadeInUp, fadeInUpStagger} from "../ui/animation";

export interface Review {
    username: string;
    rating: number;
    text: string;
    tariff: {
        countryName: string;
        countryIcon: string;
    };
}

const Reviews = ({reviews}: { reviews: Review[] }) => {
    const leftColumn = reviews.filter((_, index) => index % 2 === 0);
    const rightColumn = reviews.filter((_, index) => index % 2 !== 0);
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
                <div className="flex flex-col gap-5">
                    {leftColumn.map((review, index) => (
                        <motion.div key={index} variants={fadeInUp}>
                            <Review {...review} />
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-col gap-5">
                    {rightColumn.map((review, index) => (
                        <motion.div key={index} variants={fadeInUp}>
                            <Review {...review} />
                        </motion.div>
                    ))}
                </div>
            </motion.main>
        </motion.section>
    );
};

export default Reviews;
