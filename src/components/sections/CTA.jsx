import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0B0F19] to-slate-950 border-t border-slate-800/50">
      {/* Resplandor decorativo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          ¿Listo para llevar tu proyecto al <span className="text-cyan-400">siguiente nivel</span>?
        </h2>
        <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
          Ponte en contacto con nosotros hoy mismo y conversemos sobre cómo podemos ayudarte a construir tu presencia digital.
        </p>
        <div className="mt-8">
          <Link
            to="/contacto"
            className="inline-block px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition duration-200 shadow-lg shadow-cyan-500/25"
          >
            Hablar con el equipo
          </Link>
        </div>
      </div>
    </section>
  );
}