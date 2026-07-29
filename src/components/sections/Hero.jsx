import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Luz de fondo con destello (Glow Effect) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Tag / Badge */}
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/50 border border-cyan-800/50 rounded-full">
          Estudio de Desarrollo & Diseño Web
        </span>

        {/* Título Principal */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
          Transformamos ideas en <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">experiencias digitales</span>
        </h1>

        {/* Subtítulo */}
        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          En <strong className="text-white">Nexora Studios</strong> creamos sitios web, plataformas y software a la medida diseñados para hacer crecer tu marca.
        </p>

        {/* Botones de Acción (CTAs) */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/contacto"
            className="w-full sm:w-auto px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-xl transition duration-200 shadow-lg shadow-cyan-500/20"
          >
            Iniciar Proyecto
          </Link>
          <Link
            to="/portafolio"
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl border border-slate-800 transition duration-200"
          >
            Ver Trabajos
          </Link>
        </div>
      </div>
    </section>
  );
}