import { Route, Routes } from 'react-router';
import RootLayout from '../src/layouts/RootLayout';
import HomePage from '../src/pages/HomePage';
import CarsPage from '../src/pages/CarsPage';
import CarDetailsPage from '../src/pages/CarDetailsPage';
import CreateCarPage from '../src/pages/CreateCarPage';
import EditCarPage from '../src/pages/EditCarPage';
import NotFoundPage from '../src/pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />} />
        <Route index element={<HomePage />} />

        <Route path="cars">
          <Route index element={<CarsPage />} />
          <Route path="new" element={<CreateCarPage />} />
          <Route path=":id" element={<CarDetailsPage />} />
          <Route path=":id/edit" element={<EditCarPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
