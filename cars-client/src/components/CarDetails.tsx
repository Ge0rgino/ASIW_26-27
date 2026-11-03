import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import type { Car } from "../models/Car";
import { getCarById, deleteCar } from "../services/carService"
import axios from "axios";

export default function CarDetails() {
    const {id} = useParams<{ id: string }>();
    const [car, setCar] = useState<Car | null>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        const controller = new AbortController();

        async function loadCar() {
            try {
                setIsLoading(true);
                setError(null);
                const data = await getCarById(id!, controller.signal);
                setCar(data);
            } catch (caughtError) {
                if (axios.isCancel(caughtError)) {
                    return;
                }

                if(caughtError instanceof Error) {
                    setError(`Nie udało się pobrać szczegółów: ${caughtError.message}`);
                } else {
                    setError("Nie udało się pobrać szczegółów samochodu.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        loadCar();

        return () => {
            controller.abort();
        }
    }, [id]);

    if (isLoading) {
        return <p className="p-4 text-center">Ładowanie szczegółów...</p>
    }

    if (error || !car) {
        return <p className="p-4 text-red-500 text-center">{error || "Nie znaleziono samochodu."}</p>
    }

    async function handleDelete() {
        if (!car) return;

        const confirmed = window.confirm(`Czy na pewno cchesz usunąć auto ${car.brand} ${car.model}?`);

        if(!confirmed) return;

        try {
            await deleteCar(car.id);
            navigate("/cars");
        } catch {
            setError("Nie udało się usunąć samochodu.");
        }
    }

    return (
        <div className="flex justify-center w-full p-5">
            <div className="w-full md:w-1/2 max-w-2xl bg-gray-100 p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-5">
                <h1 className="text-2xl font-bold text-gray-800 border-b pb-2">
                    {car.brand} {car.model}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                    <div><span className="font-semibold">Liczba drzwi: </span> {car.doorsNumber}</div>
                    <div><span className="font-semibold">Pojemność bagażnika: </span> {car.luggageCapacity}</div>
                    <div><span className="font-semibold">Pojemność silnika: </span> {car.engineCapacity}</div>
                    <div><span className="font-semibold">Typ paliwa: </span> {car.fuelType}</div>
                    <div><span className="font-semibold">Data produkcji: </span> {car.productionDate}</div>
                    <div><span className="font-semibold">Średnie spalanie: </span> {car.averageFuelConsumption}</div>
                    <div><span className="font-semibold">Typ nadwozia: </span> {car.bodyType}</div>
                </div>
            
                <div className="flex gap-3 mt-4 pt-3 border-t justify-end">
                    <Link
                        to="/cars"
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-300 font-medium transition"
                    >
                        Powrót do listy
                    </Link>

                    <Link
                        to={`/cars/${car.id}/edit`}
                        className="bg-amber-500 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-600 font-medium transition"
                    >
                        Wyedytuj
                    </Link>

                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 font-bold transition text-sm">
                        Usuń
                    </button>
                </div>
            </div>

        </div>
    )
}