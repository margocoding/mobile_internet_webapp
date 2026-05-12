import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TariffPage from "./pages/TariffPage";
import Footer from "./components/shared/Footer";
import ReviewsPage from "./pages/ReviewsPage";
import OrderPage from "./pages/OrderPage";
import InstallPage from "./pages/InstallPage";

function App() {
  return (
    <div className="pb-10 max-w-5xl mx-auto">
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
