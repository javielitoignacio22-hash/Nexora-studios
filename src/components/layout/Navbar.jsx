import { Link } from "react-router-dom";

    


function Navbar() {
  return (
    <nav className="bg-[#0B0F19] text-white px-6 py-5 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <Link 
          to="/"
          className="text-2xl font-bold text-cyan-400"
        >
          NEXORA
        </Link>

        <div className="flex gap-6 text-gray-300">
          <Link to="/" className="hover:text-cyan-400">
            Inicio
          </Link>

          <Link to="/nosotros" className="hover:text-cyan-400">
            Nosotros
          </Link>

          <Link to="/servicios" className="hover:text-cyan-400">
            Servicios
          </Link>

          <Link to="/portafolio" className="hover:text-cyan-400">
            Portafolio
          </Link>

          <Link to="/contacto" className="hover:text-cyan-400">
            Contacto
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;