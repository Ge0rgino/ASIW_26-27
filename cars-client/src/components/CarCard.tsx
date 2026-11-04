import type { Car } from "../models/Car"
import { Link } from "react-router"

import { useCarUiStore } from "../store/useCarUiStore";



interface CarCardProps {
    car: Car;  
}

export default function CarCard({car}: CarCardProps) {
    const isFavorite = useCarUiStore(
        (state) => state.favoriteCarIds.includes(
            car.id,
        ),
    );

    const toggleFavorite = useCarUiStore(
        (state) =>
            state.toggleFavorite,
    );

    return (
        <div key={car.id} className="flex flex-col justify-between bg-orange-100 h-65 p-5 rounded-xl shadow-xs shadow-amber-100 border-orange-200">
            <div className="flex flex-col justify-center">
                <h2 className="font-bold text-xl">
                    {car.brand} {car.model}
                </h2>
                <p>
                    Data produkcji: {car.productionDate}
                </p>
                <p>
                    Rodzaj paliwa: {car.fuelType}
                </p>
                <button
                    type="button"
                    className={
                        isFavorite
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 m-2 rounded-xl shadow-xs transition-colors'
                            : 'bg-gray-50 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 m-2 rounded-xl shadow-xs transition-colors'
                    }
                    onClick={() =>
                        toggleFavorite(car.id)
                    }
                >
                    {isFavorite
                        ? 'Usuń z ulubionych'
                        : 'Dodaj do ulubionych'
                    }
                </button>
            </div>
            <div className="flex flex-row justify-between">
                <Link 
                    to={`/cars/${car.id}`}
                    className="bg-blue-600 text-center text-white p-1 w-20 rounded-lg text-sm font-medium hover:bg-blue-800 transition self-start"
                >
                        Szczegóły
                </Link>

                <Link 
                    to={`/cars/${car.id}/edit`}
                    className="bg-amber-400 text-center w-15 text-white p-1 rounded-lg text-sm font-medium hover:bg-amber-700 transition self-start"
                >
                    Edytuj
                </Link>
            </div>
        </div>
    )
}