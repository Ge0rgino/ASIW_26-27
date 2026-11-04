import { NavLink } from "react-router";
import { useCarUiStore } from "../store/useCarUiStore";

export function NavigationMenu() {
    const favoriteCount = useCarUiStore((state) => state.favoriteCarIds.length);

    return(
        <nav className="flex w-full flex-row min-h-10 bg-amber-100">
            <NavLink className="flex-1 text-center p-2 hover:bg-amber-300 transition" to="/" end>
                Strona główna
            </NavLink>

            <NavLink className="flex-1 text-center p-2 hover:bg-amber-300 transition" to="/cars" end>
                Lista samochodów
            </NavLink>

            <NavLink className="flex-1 text-center p-2 hover:bg-amber-300 transition" to="/cars/new" end>
                Formularz dodawania aut
            </NavLink>

            <div className="flex flex-col justify-center text-center text-amber-700 font-bold p-1 mr-2">
                Ulubione: {favoriteCount}
            </div>
        </nav>
    );
}