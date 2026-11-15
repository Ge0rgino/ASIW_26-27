import { Outlet, useNavigate } from "react-router";
import { NavigationMenu } from "../components/NavigationMenu";
import { useAuthStore } from "../store/useAuthStore";
import { useCarUiStore } from "../store/useCarUiStore";

export default function RootLayout() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const favoriteCarIdsByUser = useCarUiStore(
    (state) => state.favoriteCarIdsByUser,
  );
  const favoriteCount = user ? (favoriteCarIdsByUser[user.id]?.length ?? 0) : 0;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <NavigationMenu
          user={user}
          favoriteCount={favoriteCount}
          onLogout={handleLogout}
        />
      </div>

      <div className="flex-1 flex w-full">
        <Outlet />
      </div>
    </div>
  );
}
