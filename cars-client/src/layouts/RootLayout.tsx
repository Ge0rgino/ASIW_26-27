import { Outlet } from "react-router";
import { NavigationMenu } from "../components/NavigationMenu";

export default function RootLayout() {
    return (
        <div className="flex flex-col">
            <header>
                <NavigationMenu />
            </header>

            <div>
                <Outlet />
            </div>
        </div>
    );
}