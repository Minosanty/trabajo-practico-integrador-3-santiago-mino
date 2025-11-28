export function Footer() {
    const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sky-100 border-t border-sky-300 text-sky-800 text-center py-6">
      <p className="text-sm">
        &copy; {currentYear}{" "}
        <span className="text-green-600 font-medium hover:text-green-700 transition">
 Miño Presentado Santiago Cristian Fabian         </span>
      </p>
      <p className="text-xs mt-1 text-sky-600 tracking-wide">
        Trabajo Práctico Integrador III
      </p>
    </footer>
  );
};

