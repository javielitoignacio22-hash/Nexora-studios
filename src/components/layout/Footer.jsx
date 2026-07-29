import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Columna 1: Info Marca */}
        <div className="md:col-span-1">
          <Link to="/" className="text-2xl font-bold text-cyan-400">
            Nexora Studios
          </Link>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Transformamos ideas en experiencias digitales excepcionales. Desarrollo y diseño web de alto impacto.
          </p>
        </div>

        {/* Columna 2: Navegación */}
        <div>
          <h4 className="text-white font-semibold mb-4">Navegación</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-cyan-400 transition">Inicio</Link></li>
            <li><Link to="/servicios" className="hover:text-cyan-400 transition">Servicios</Link></li>
            <li><Link to="/portafolio" className="hover:text-cyan-400 transition">Portafolio</Link></li>
            <li><Link to="/nosotros" className="hover:text-cyan-400 transition">Nosotros</Link></li>
            <li><Link to="/contacto" className="hover:text-cyan-400 transition">Contacto</Link></li>
          </ul>
        </div>

        {/* Columna 3: Servicios */}
        <div>
          <h4 className="text-white font-semibold mb-4">Servicios</h4>
          <ul className="space-y-2 text-sm">
            <li><span className="hover:text-gray-300">Desarrollo Web</span></li>
            <li><span className="hover:text-gray-300">Diseño UI/UX</span></li>
            <li><span className="hover:text-gray-300">Aplicaciones Web</span></li>
            <li><span className="hover:text-gray-300">Optimización & SEO</span></li>
          </ul>
        </div>

        {/* Columna 4: Contacto / Redes */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contacto</h4>
          <p className="text-sm">javielitoignacio22@gmail.com</p>
          <div className="mt-4 flex gap-4 text-lg">
            <a href="https://wa.me/18093835504" className="hover:text-cyan-400 transition" target="_blank" rel="noopener noreferrer">🌐</a>
            <a href="mailto:javielitoignacio22@gmail.com" className="hover:text-cyan-400 transition">💻</a>
            <a href="#" className="hover:text-cyan-400 transition">📱</a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-900 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Nexora Studios. Todos los derechos reservados.
      </div>
    </footer>
  );
}