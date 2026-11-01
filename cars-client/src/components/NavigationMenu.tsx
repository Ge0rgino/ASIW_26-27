import { NavLink } from "react-router";

export function NavigationMenu() {
    return(
        <nav className="flex w-full flex-row min-h-10 bg-amber-100">
            <NavLink className="flex-1 text-center p-2" to="/" end>
                Strona główna
            </NavLink>

            <NavLink className="flex-1 text-center p-2" to="/cars" end>
                Lista samochodów
            </NavLink>

            <NavLink className="flex-1 text-center p-2" to="/cars/new" end>
                Formularz dodawania aut
            </NavLink>
        </nav>
    );
}