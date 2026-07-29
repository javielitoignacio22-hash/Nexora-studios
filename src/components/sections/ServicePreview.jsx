import { Link } from 'react-router-dom';

export default function ServicePreview() {
  const services = [
    {
      title: "Desarrollo Web",
      description: "Sitios web ultra rápidos, responsivos y optimizados para SEO y conversión.",
      icon: "💻"
    },
    {
      title: "Diseño UI/UX",
      description: "Interfaces modernas, intuitivas y atractivas para que tus usuarios se enamoren.",
      icon: "🎨"
    },
    {
      title: "Software a Medida",
      description: "Plataformas y aplicaciones web personalizadas adaptadas a tus necesidades.",
      icon: "⚡"
    }
  ];

  return (
    <section className="py-20 bg-slate-950/50 relative border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Nuestros <span className="text-cyan-400">Servicios</span>
          </h2>
          <p className="text-gray-400 mt-4">
            Ofrecemos soluciones digitales integrales para impulsar el crecimiento de tu marca.
          </p>
        </div>

        {/* Tarjetas de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Botón hacia la página completa de Servicios */}
        <div className="text-center mt-12">
          <Link 
            to="/servicios" 
            className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-2 group transition"
          >
            Ver todos los servicios 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}