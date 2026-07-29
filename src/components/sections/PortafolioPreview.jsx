import { Link } from 'react-router-dom';

export default function PortafolioPreview() {
  const projects = [
    {
      title: "E-Commerce de Moda",
      category: "Desarrollo Web",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "App de Gestión Financiera",
      category: "Diseño UI/UX & Web",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-20 bg-[#0B0F19] relative border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Proyectos <span className="text-cyan-400">Destacados</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl">
              Echa un vistazo a algunos de los trabajos más recientes que hemos desarrollado.
            </p>
          </div>
          <Link 
            to="/portafolio" 
            className="mt-4 md:mt-0 text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-2 group transition"
          >
            Ver portafolio completo 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Tarjetas de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mt-1 group-hover:text-cyan-400 transition">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
