import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CountriesModal from "./components/shared/CountriesModal";
import Footer from "./components/shared/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
import MainPage from "./pages/MainPage";
import { useTariffStore } from "./store/tariffStore";
import { usePreloadAllImages } from "./utils/hooks/usePreloadImages";

const TariffPage = React.lazy(() => import("./pages/TariffPage"));
const OrderPage = React.lazy(() => import("./pages/OrderPage"));
const InstallPage = React.lazy(() => import("./pages/InstallPage"));
const ReviewsPage = React.lazy(() => import("./pages/ReviewsPage"));

function App() {
  const { openedModal, setModal } = useTariffStore();

  usePreloadAllImages();
  return (
    <div className="pb-10 max-w-5xl mx-auto">
      <ScrollToTop />
      <CountriesModal opened={openedModal} setOpened={setModal} />
      <ToastContainer hideProgressBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/tariff/:id" element={<TariffPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/order/:country_id/:tariff_id" element={<OrderPage />} />
        <Route
          path="/install/:country_id/:tariff_id"
          element={<InstallPage />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
