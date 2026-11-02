import { Outlet } from "react-router";
import { NavigationMenu } from "../components/NavigationMenu";

export default function RootLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <div>
                <NavigationMenu />
            </div>

            <div className="flex-1 flex w-full">
                <Outlet />
            </div>
        </div>
    );
}