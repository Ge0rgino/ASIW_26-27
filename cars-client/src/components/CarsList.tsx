import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Car } from "../models/Car";
import { getCars } from "../services/carService"
import axios from "axios";

export default function CarsList() {
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const controller = new AbortController;


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

   
    const query = searchQuery.toLocaleLowerCase().trim();

    const filteredCars = query 
        ? cars.filter((car) =>
            car.brand.toLocaleLowerCase().includes(query) ||
            car.model.toLocaleLowerCase().includes(query)
        )
        : cars;
        

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
        <div className="flex flex-col w-full p-4">
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Szukaj po marce lub modelu"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-md p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300">

                    </input>
            </div>
            <div className="grid grid-cols-7 gap-4 p-4 w-full">
                {filteredCars.map((car) => (
                    <div key={car.id} className="flex flex-row justify-between bg-orange-100 h-52 p-5 rounded-xl shadow-xs shadow-amber-100 border-orange-200">
                            <div className="space-y-1">
                                <h2 className="font-bold text-xl">
                                    {car.brand} {car.model}
                                </h2>
                                <p>
                                    Data produkcji: {car.productionDate}
                                </p>
                                <p>
                                    Rodzaj paliwa: {car.fuelType}
                                </p>
                                <Link 
                                    to={`/cars/${car.id}`}
                                    className="bg-blue-600  text-white p-0.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition self-start"
                                >
                                    Szczegóły
                                </Link>

                                <Link 
                                    to={`/cars/${car.id}/edit`}
                                    className="bg-amber-400  text-white p-0.5 rounded-lg text-sm font-medium hover:bg-amber-700 transition self-start m-1"
                                >
                                    Edytuj
                                </Link>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    )
}