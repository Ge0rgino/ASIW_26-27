import { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "./CarCard";
import SearchBar from "./SearchBar";
import type { Car } from "../models/Car";
import { getCars } from "../services/carService";
import { useCarUiStore } from "../store/useCarUiStore";
import { useAuthStore } from "../store/useAuthStore";

export default function CarsList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = useAuthStore((state) => state.user);
  const searchTerm = useCarUiStore((state) => state.searchTerm);
  const showFavoritesOnly = useCarUiStore((state) => state.showFavoritesOnly);
  const favoriteCarIdsByUser = useCarUiStore(
    (state) => state.favoriteCarIdsByUser,
  );
  const toggleFavorite = useCarUiStore((state) => state.toggleFavorite);

  const favoriteCarIds = user ? (favoriteCarIdsByUser[user.id] ?? []) : [];
  const normalizedSearch = searchTerm.trim().toLowerCase();

  useEffect(() => {
    const controller = new AbortController();

    async function loadCars() {
      try {
        setIsLoading(true);
        setError(null);
        const loadedCars = await getCars(controller.signal);
        setCars(loadedCars);
      } catch (caughtError) {
        if (axios.isCancel(caughtError)) {
          return;
        }

        if (caughtError instanceof Error) {
          setError(caughtError.message);
        } else {
          setError("Wystąpił nieznany błąd.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadCars();

    return () => {
      controller.abort();
    };
  }, []);

  const visibleCars = cars.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(normalizedSearch) ||
      car.model.toLowerCase().includes(normalizedSearch);

    const matchesFavorite =
      !showFavoritesOnly || favoriteCarIds.includes(car.id);

    return matchesSearch && matchesFavorite;
  });

  if (isLoading) {
    return <p>Ładowanie...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  if (cars.length === 0) {
    return <p>Nie znaleziono żadnych samochodów.</p>;
  }

  return (
    <div className="flex flex-col w-full p-4">
      <SearchBar />
      <div className="grid grid-cols-6 gap-4 p-4 w-full">
        {visibleCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            isFavorite={favoriteCarIds.includes(car.id)}
            onToggleFavorite={() => {
              if (user) {
                toggleFavorite(user.id, car.id);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
