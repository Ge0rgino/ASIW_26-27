import { useEffect, useState } from "react";
import type { Car } from "../models/Car";
import { getCars } from "../services/carService"

export default function CarsList() {
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController;


        async function loadCars() {
            try {
                setIsLoading(true);
                setError(null);
                const loadedCars = await getCars(controller.signal);
                setCars(loadedCars);
            } catch (caughtError) {
                if (
                    caughtError instanceof DOMException &&
                    caughtError.name === "AbortError"
                ) {
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

    if (isLoading) {
        return <p>Ładowanie...</p>
    }

    if (error) {
        return <p className="txt-red-400">{error}</p>
    }

    if (cars.length === 0) {
        return <p>Nie znaleziono żadnych samochodów.</p>;
    }

    return (
        <div className="flex flex-row flex-wrap">
            {cars.map((car) => (
                <div key={car.id} className="flex-1 m-2 bg-orange-100 min-h-30 flex-col justify-center p-7 rounded-xs shadow-xs">
                    <h2 className="font-bold text-xl">
                        {car.brand} {car.model}
                    </h2>
                    <p>
                        Data produkcji: {car.productionDate}
                    </p>
                    <p>
                        Rodzaj paliwa: {car.fuelType}
                    </p>
                </div>
            ))}
        </div>
    )
}