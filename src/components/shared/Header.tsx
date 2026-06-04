import {motion} from "framer-motion";
import Button from "../ui/Button";
import {Link} from "react-router";
import {useTariffStore} from "../../store/tariffStore";
import Logo from "../ui/Logo";

interface Props {
    text?: "black" | "white";
}

const Header = ({text = "white"}: Props) => {
    const {setCheckBalanceModal} = useTariffStore();

    return (<motion.header
        className={`flex w-full max-w-5xl mx-auto justify-between text-${text} items-center py-4 `}
        initial={{opacity: 0, y: -12}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
    >
        <Link to="/" className="text-2xl">
            <Logo/>
        </Link>

        <Button onClick={() => setCheckBalanceModal(true)}>Баланс eSIM</Button>
    </motion.header>);
};

export default Header;
