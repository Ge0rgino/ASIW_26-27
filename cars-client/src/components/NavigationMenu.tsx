import { NavLink } from "react-router";
import type { User } from "../models/Auth";

interface NavigationMenuProps {
  user: User | null;
  favoriteCount: number;
  onLogout: () => void;
}

export function NavigationMenu({
  user,
  favoriteCount,
  onLogout,
}: NavigationMenuProps) {
  return (
    <nav className="flex w-full flex-row items-center min-h-10 bg-amber-100">
      <NavLink
        className="flex-1 text-center p-2 hover:bg-amber-300 transition"
        to="/"
        end
      >
        Strona główna
      </NavLink>

      {user && (
        <>
          <NavLink
            className="flex-1 text-center p-2 hover:bg-amber-300 transition"
            to="/cars"
            end
          >
            Lista samochodów
          </NavLink>

          <NavLink
            className="flex-1 text-center p-2 hover:bg-amber-300 transition"
            to="/cars/new"
            end
          >
            Formularz dodawania aut
          </NavLink>
        </>
      )}

      <NavLink
        className="flex-1 text-center p-2 hover:bg-amber-300 transition"
        to="/about"
        end
      >
        O aplikacji
      </NavLink>

      {user ? (
        <div className="flex items-center gap-3 px-3">
          <span className="text-center text-amber-700 font-bold">
            Ulubione: {favoriteCount}
          </span>

          <span className="text-sm text-amber-900">
            {user.userName}
            {user.roles?.length ? ` (${user.roles.join(", ")})` : ""}
          </span>

          <button
            type="button"
            className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded transition cursor-pointer"
            onClick={onLogout}
          >
            Wyloguj
          </button>
        </div>
      ) : (
        <>
          <NavLink
            className="flex-1 text-center p-2 hover:bg-amber-300 transition"
            to="/login"
          >
            Logowanie
          </NavLink>

          <NavLink
            className="flex-1 text-center p-2 hover:bg-amber-300 transition"
            to="/register"
          >
            Rejestracja
          </NavLink>
        </>
      )}
    </nav>
  );
}
