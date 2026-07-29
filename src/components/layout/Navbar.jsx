import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Portafolio', path: '/portafolio' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0B0F19]/90 backdrop-blur-md z-50 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO MEJORADO: Nexora Studios */}
        <Link to="/" className="flex items-center gap-3 group">
          {/* Isotipo / Icono del Logo */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition duration-300">
            <span className="text-slate-950 font-black text-xl tracking-tighter">N</span>
          </div>

          {/* Texto del Logo */}
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-wider text-white flex items-center gap-1">
              NEXORA
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-black">
                .
              </span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.25em] text-cyan-400 uppercase -mt-1">
              Studios
            </span>
          </div>
        </Link>

        {/* Links de Navegación (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition duration-200 ${
                isActive(link.path)
                  ? 'text-cyan-400 font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Botón CTA Navbar */}
          <Link
            to="/contacto"
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-md shadow-cyan-500/20"
          >
            Cotizar
          </Link>
        </div>

        {/* Botón Menú Hamburguesa (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-white text-2xl focus:outline-none"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Menú Desplegable (Mobile) */}
      {isOpen && (
        <div className="md:hidden bg-[#0B0F19] border-b border-slate-800 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block text-base font-medium ${
                isActive(link.path) ? 'text-cyan-400 font-bold' : 'text-gray-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contacto"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center py-3 bg-cyan-500 text-slate-950 font-bold rounded-xl text-sm"
          >
            Cotizar
          </Link>
        </div>
      )}
    </nav>
  );
}