import { useCarUiStore } from "../store/useCarUiStore"



export default function SearchBar() {
    const searchTerm = useCarUiStore((state) => state.searchTerm);
    const setSearchTerm = useCarUiStore((state) => state.setSearchTerm);
    const showFavoritesOnly = useCarUiStore((state) => state.showFavoritesOnly);
    const setShowFavoritesOnly = useCarUiStore((state) => state.setShowFavoritesOnly);


    return (
        <div className="flex justify-center mb-10 gap-2">
                <input
                    type="text"
                    placeholder="Szukaj po marce lub modelu"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                

                <label className="text-xl p-2">
                    <input 
                        type="checkbox"
                        checked={showFavoritesOnly}
                        onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                        className="m-1"
                    />
                    Tylko ulubione
                </label>
        </div>
    )
    
}