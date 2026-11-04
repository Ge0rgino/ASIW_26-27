import type { Car } from "../models/Car"
import { Link } from "react-router"

interface CarCardProps {
    car: Car;  
}

export default function CarCard({car}: CarCardProps) {
    return (
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
    )
}