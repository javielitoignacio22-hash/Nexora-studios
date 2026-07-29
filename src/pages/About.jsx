import { Link } from 'react-router-dom';

export default function About() {
  const values = [
    {
      title: "Innovación Constante",
      description: "Utilizamos las últimas herramientas tecnológicas, Inteligencia Artificial y mejores prácticas del mercado.",
      icon: "💡"
    },
    {
      title: "Enfoque en Resultados",
      description: "No creamos sitios solo para que se vean bonitos; diseñamos soluciones pensadas para vender y automatizar.",
      icon: "🎯"
    },
    {
      title: "Transparencia & Cercanía",
      description: "Mantenemos una comunicación clara y constante en cada etapa del desarrollo de tu proyecto.",
      icon: "🤝"
    }
  ];

  const stats = [
    { value: "100%", label: "Proyectos Entregados" },
    { value: "24/7", label: "Sistemas & Bots Activos" },
    { value: "10x", label: "Eficiencia en Automatizaciones" },
  ];

  return (
    <div className="bg-[#0B0F19] text-white min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Sobre Nosotros</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-3 tracking-tight">
            Impulsamos el futuro digital de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">tu empresa</span>
          </h1>
          <p className="text-gray-400 text-lg mt-4 leading-relaxed">
            En <strong className="text-white">Nexora Studios</strong> somos un estudio especializado en diseño web, Inteligencia Artificial y automatización de procesos para negocios modernos.
          </p>
        </div>

        {/* Historia / Misión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-28">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Transformamos la forma en que los negocios operan y venden en línea
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Sabemos que mantener un negocio competitivo hoy en día requiere más que una simple página web. Se necesitan sistemas eficientes: atención 24/7 mediante bots inteligentes, cobros automáticos y plataformas diseñadas estratégicamente para convertir visitantes en clientes.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Nuestra misión es democratizar el acceso a la tecnología de vanguardia para emprendedores y empresas que buscan escalar sin complicarse la vida.
            </p>
          </div>

          {/* Tarjeta de Estadísticas / Destacado */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-xl font-bold mb-6 text-cyan-400">¿Por qué elegir Nexora?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-3xl font-extrabold text-white block">{stat.value}</span>
                  <span className="text-xs text-gray-400 mt-1 block">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold">Nuestros Pilares</h2>
            <p className="text-gray-400 mt-2">Principios que guían cada uno de nuestros desarrollos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, index) => (
              <div 
                key={index}
                className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition duration-300"
              >
                <div className="text-4xl mb-4">{val.icon}</div>
                <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Llamado a la acción */}
        <div className="p-8 md:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">¿Quieres saber cómo podemos ayudarte?</h3>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto text-sm">
            Conversemos sobre tu proyecto y te propondremos la mejor estrategia tecnológica.
          </p>
          <Link
            to="/contacto"
            className="inline-block mt-6 px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition duration-200 shadow-lg shadow-cyan-500/20"
          >
            Contactar al Equipo
          </Link>
        </div>

      </div>
    </div>
  );
}