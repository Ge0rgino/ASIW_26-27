import { useState, type SubmitEvent } from "react";
import { createCar } from "../services/carService";

export default function NewCarForm() {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [doorsNumber, setDoorsNumber] = useState<number>(0);
    const [luggageCapacity, setLuggageCapacity] = useState<number>(0);
    const [engineCapacity, setEngineCapacity] = useState<number>(0);
    const [fuelType, setFuelType] = useState<number>(0);
    const [productionDate, setProductionDate] = useState("");
    const [averageFuelConsumption, setAverageFuelConsumption] = useState<number>(0);
    const [bodyType, setBodyType] = useState<number>(0);
    
    async function addCar(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        await createCar({
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
    }
    

    return (
        <div className="flex justify-center w-full p-5">
            <form onSubmit={addCar} className="flex flex-col gap-3 justify-center align-middle w-1/4">
               <h1 className="font-extrabold text-amber-800 self-center text-2xl">Dodaj auto</h1>
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
                    type="date"
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

                <button type="submit" className="bg-green-400 min-w-40 mt-2 self-center border rounded-2xl p-1 hover:bg-green-600 transition">Dodaj</button>
            </form>
        </div>
    );
}