export function Loading() {
    return(
        <div className="flex items-center justify-center min-h-screen bg-sky-50">
            <div className="text-center">
                <div className="inline-block">
                    <div className="w-12 h-12 border-4 border-sky-300 border-t-green-500 rounded-full animate-spin mb-4"></div>
                </div>
                <p className="text-xl font-semibold text-sky-700">Cargando...</p>
            </div>
        </div>
    )
}