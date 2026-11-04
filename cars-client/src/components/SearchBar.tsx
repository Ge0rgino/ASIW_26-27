interface SearchBarProps {
    value: string,
    onChange: (value: string) => void,
}

export default function SearchBar({value, onChange}: SearchBarProps) {
    return (
        <div className="mb-6 flex justify-center">
            <input
                type="text"
                placeholder="Szukaj po marce lub modelu"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full max-w-md p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300">
            </input>
        </div>
    )
    
}