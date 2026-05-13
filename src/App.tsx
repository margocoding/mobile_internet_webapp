import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Footer from "./components/shared/Footer";
import React from "react";
import ScrollToTop from "./components/ui/ScrollToTop";
import { ToastContainer } from "react-toastify";

const TariffPage = React.lazy(() => import("./pages/TariffPage"));
const OrderPage = React.lazy(() => import("./pages/OrderPage"));
const InstallPage = React.lazy(() => import("./pages/InstallPage"));
const ReviewsPage = React.lazy(() => import("./pages/ReviewsPage"));

function App() {
  return (
    <div className="pb-10 max-w-5xl mx-auto">
      <ScrollToTop />
      <ToastContainer hideProgressBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/tariff/:id" element={<TariffPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/order/:country_id/:tariff_id" element={<OrderPage />} />
        <Route path="/install" element={<InstallPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
