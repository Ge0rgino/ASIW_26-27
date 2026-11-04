import { useState, useEffect, type SubmitEvent } from "react";
import { useParams, useNavigate } from "react-router";
import { getCarById, updateCar } from "../services/carService";
import axios from "axios";

export default function EditCarForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [doorsNumber, setDoorsNumber] = useState<number>(0);
    const [luggageCapacity, setLuggageCapacity] = useState<number>(0);
    const [engineCapacity, setEngineCapacity] = useState<number>(0);
    const [fuelType, setFuelType] = useState<number>(0);
    const [productionDate, setProductionDate] = useState("");
    const [averageFuelConsumption, setAverageFuelConsumption] = useState<number>(0);
    const [bodyType, setBodyType] = useState<number>(0);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        if (!id) return;

        async function fetchCar() {
            try {
                setIsLoading(true);
                const car = await getCarById(id!);

                setBrand(car.brand);
                setModel(car.model);
                setDoorsNumber(car.doorsNumber);
                setLuggageCapacity(car.luggageCapacity)
                setEngineCapacity(car.engineCapacity);
                setFuelType(car.fuelType);
                setProductionDate(car.productionDate);
                setAverageFuelConsumption(car.averageFuelConsumption);
                setBodyType(car.bodyType);

            } catch (caughtError) {
                if(axios.isCancel(caughtError)) {
                    return;
                }
                if(caughtError instanceof Error) {
                    setError(`Nie udało się pobrać danych do formularza: ${caughtError.message}`);
                } else {
                    setError("Nie udało się pobrać danych samochodu.");
                } 
            } finally {
                setIsLoading(false);
            }
        }

        fetchCar();
    }, [id]);

    async function handleUpdate(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!id) return;

        try {
            await updateCar(id, {
                brand,
                model,
                doorsNumber,
                luggageCapacity,
                engineCapacity,
                fuelType,
                productionDate,
                averageFuelConsumption,
                bodyType
            });

            navigate(`/cars/${id}`);
        } catch {
            setError("Wystąpił błąd podcza zapisywania zmian.")
        }
    } 
    
    if (isLoading) return <p className="p-4 text-center">Wczytywanie danych samochodu...</p>;
    if (error) return <p className="p-4 text-red-500 text-center">{error}</p>

    return (
        <div className="flex justify-center w-full p-5">
            <form onSubmit={handleUpdate} className="flex flex-col gap-3 justify-center align-middle w-1/4">
               <h1 className="font-extrabold text-amber-800 self-center text-2xl">Wyedytuj auto</h1>
               <label className="text-l font-bold">
                Marka
               </label>
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Marka"
                    className="p-2 border rounded-xl w-full"
                />

                <label className="text-l font-bold">
                Model
               </label>
                <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Model"
                    className="p-2 border rounded-xl"
                />

                <label className="text-l font-bold">
                Liczba drzwi
               </label>
                <input
                    type="number"
                    value={doorsNumber}
                    onChange={(e) => setDoorsNumber(e.target.valueAsNumber)}
                    placeholder="Liczba drzwi"
                    className="p-2 border rounded-xl"
                />

                <label className="text-l font-bold">
                Pojemność bagażnika
               </label>
                <input
                    type="number"
                    value={luggageCapacity}
                    onChange={(e) => setLuggageCapacity(e.target.valueAsNumber)}
                    placeholder="Pojemność"
                    className="p-2 border rounded-xl"
                />

                <label className="text-l font-bold">
                Pojemność skokowa silnika
               </label>
                <input
                    type="number"
                    value={engineCapacity}
                    onChange={(e) => setEngineCapacity(e.target.valueAsNumber)}
                    placeholder="Pojemność skokowa silnika"
                    className="p-2 border rounded-xl"
                />

                <label className="text-l font-bold">
                Typ paliwa
               </label>
                <input
                    type="number"
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.valueAsNumber)}
                    placeholder="Typ paliwa"
                    className="p-2 border rounded-xl"
                />

                <label className="text-l font-bold">
                Data produkcji
               </label>
                <input
                    type="string"
                    value={productionDate}
                    onChange={(e) => setProductionDate(e.target.value)}
                    placeholder="Data produkcji"
                    className="p-2 border rounded-xl"
                />

                <label className="text-l font-bold">
                Średnie spalanie
               </label>
                <input
                    type="number"
                    value={averageFuelConsumption}
                    onChange={(e) => setAverageFuelConsumption(e.target.valueAsNumber)}
                    placeholder="Średnie spalanie"
                    className="p-2 border rounded-xl"
                />

                <label className="text-l font-bold">
                Typ nadwozia
               </label>
                <input
                    type="number"
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.valueAsNumber)}
                    placeholder="Typ nadwozia"
                    className="p-2 border rounded-xl"
                />

                <button type="submit" className="bg-amber-500 min-w-40 mt-2 self-center border rounded-2xl p-1 hover:bg-amber-600 transition">Zmień</button>
            </form>
        </div>
    );
}