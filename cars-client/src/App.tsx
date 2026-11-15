import { Route, Routes } from "react-router";
import RootLayout from "../src/layouts/RootLayout";
import HomePage from "../src/pages/HomePage";
import CarsPage from "../src/pages/CarsPage";
import CarDetailsPage from "../src/pages/CarDetailsPage";
import CreateCarPage from "../src/pages/CreateCarPage";
import EditCarPage from "../src/pages/EditCarPage";
import NotFoundPage from "../src/pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="confirm-email" element={<ConfirmEmailPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="about" element={<AboutPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="cars">
            <Route index element={<CarsPage />} />
            <Route path="new" element={<CreateCarPage />} />
            <Route path=":id" element={<CarDetailsPage />} />
            <Route path=":id/edit" element={<EditCarPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
