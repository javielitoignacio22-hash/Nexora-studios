import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Portfolio() {
  const [filter, setFilter] = useState('Todos');

  const categories = ['Todos', 'Diseño Web', 'Chatbots & IA', 'Reservas & Pagos'];

  const projects = [
    {
      id: 1,
      title: "Clínica Dental DentalCare",
      category: "Reservas & Pagos",
      description: "Sitio web corporativo con sistema de agendamiento de citas en tiempo real y pagos en línea.",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
      tags: ["React", "Sistema de Citas", "Pasarela de Pago"]
    },
    {
      id: 2,
      title: "Asistente Virtual IA - Ecommerce",
      category: "Chatbots & IA",
      description: "Chatbot inteligente integrado en WhatsApp y Web para responder dudas frecuentes y recomendar productos 24/7.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop",
      tags: ["Inteligencia Artificial", "WhatsApp Bot", "Automatización"]
    },
    {
      id: 3,
      title: "Landing Page Nexora Tech",
      category: "Diseño Web",
      description: "Diseño y desarrollo de sitio web ultra rápido con animaciones modernas y optimización para captar clientes.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      tags: ["React", "Tailwind CSS", "SEO"]
    },
    {
      id: 4,
      title: "Restaurante Gourmet & Reservas",
      category: "Reservas & Pagos",
      description: "Plataforma de menú digital interactivo con reservas de mesas automáticas y depósitos con tarjeta.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
      tags: ["Menú Digital", "Reservas", "Stripe"]
    }
  ];

  const filteredProjects = filter === 'Todos' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="bg-[#0B0F19] text-white min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Proyectos Realizados</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-3 tracking-tight">
            Nuestro <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Portafolio</span>
          </h1>
          <p className="text-gray-400 text-lg mt-4">
            Explora algunos de los trabajos que hemos desarrollado para ayudar a nuestros clientes a automatizar y crecer.
          </p>
        </div>

        {/* Filtros por Categoria */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setFilter(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition duration-200 ${
                filter === category
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-gray-400 hover:text-white border border-slate-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grilla de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="group rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-xs font-semibold text-cyan-400">
                    {project.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  {/* Etiquetas de Tecnología */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner CTA Final */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 border border-slate-800 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">¿Tienes una idea para tu negocio en mente?</h3>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto text-sm">
            Hagámosla realidad. Creamos la solución a la medida de lo que tu empresa necesita.
          </p>
          <Link
            to="/contacto"
            className="inline-block mt-6 px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition duration-200 shadow-lg shadow-cyan-500/20"
          >
            Cotizar mi Proyecto
          </Link>
        </div>

      </div>
    </div>
  );
}