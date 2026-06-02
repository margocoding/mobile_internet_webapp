import React from "react";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import CountriesModal from "./components/shared/CountriesModal";
import Footer from "./components/shared/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
import MainPage from "./pages/MainPage";
import {usePreloadAllImages} from "./utils/hooks/usePreloadImages";
import CheckBalanceModal from "./components/shared/CheckBalanceModal.tsx";

const TariffPage = React.lazy(() => import("./pages/TariffPage"));
const OrderPage = React.lazy(() => import("./pages/OrderPage"));
const InstallPage = React.lazy(() => import("./pages/InstallPage"));
const ReviewsPage = React.lazy(() => import("./pages/ReviewsPage"));

function App() {

    usePreloadAllImages();
    return (
        <div className="pb-10 mx-auto">
            <ScrollToTop/>
            <CountriesModal/>
            <CheckBalanceModal/>
            <ToastContainer hideProgressBar/>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/tariff/:id" element={<TariffPage/>}/>
                <Route path="/reviews" element={<ReviewsPage/>}/>
                <Route path="/order/:country_id/:tariff_id" element={<OrderPage/>}/>
                <Route
                    path="/install/:country_id/:tariff_id"
                    element={<InstallPage/>}
                />
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
