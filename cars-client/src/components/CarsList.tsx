import { useEffect, useState } from "react";
import CarCard from "./CarCard";
import type { Car } from "../models/Car";
import { getCars } from "../services/carService"
import axios from "axios";
import SearchBar from "./SearchBar";

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
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <div className="grid grid-cols-7 gap-4 p-4 w-full">
                {filteredCars.map((car) => (
                    <CarCard key={car.id} car={car}/>
                ))}
            </div>
        </div>
    )
}