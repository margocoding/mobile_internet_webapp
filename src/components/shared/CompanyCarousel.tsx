import {motion} from 'framer-motion';
import {useState} from 'react';

const companies = [
    'airtel.png',
    'at&t.png',
    'o2.png',
    'orange.png',
    't2.png',
    'telefonica.png',
    'tmobile.png',
    'verizon.png',
    'vodafone.png',
];

const CompanyCarousel = () => {
    const [paused, setPaused] = useState(false);

    return (
        <div className="space-y-8 overflow-hidden">
            <p className="text-center max-w-2xl mx-auto text-[#808080]">
                Более 500+ мобильных операторов сотрудничают с eSim Name,
                чтобы у вас был стабильный мобильный интернет в 162 странах
            </p>

            <div className="overflow-hidden py-2">
                <div className={`carousel-track ${paused ? 'paused' : ''}`}>
                    {[...companies, ...companies].map((company, index) => (
                        <motion.img
                            key={`${company}-${index}`}
                            src={`/images/partners/${company}`}
                            alt={company.replace('.png', '')}
                            className="h-8 w-auto shrink-0 cursor-pointer"
                            initial={{
                                filter: 'grayscale(100%)',
                            }}
                            whileHover={{
                                filter: 'grayscale(0%)',
                                scale: 1.08,
                            }}
                            transition={{
                                duration: 0.35,
                            }}
                            onHoverStart={() => setPaused(true)}
                            onHoverEnd={() => setPaused(false)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompanyCarousel;