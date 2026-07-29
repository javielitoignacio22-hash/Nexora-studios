import { Link } from 'react-router-dom';

export default function Services() {
  const servicesList = [
    {
      title: "Creación y Diseño Web",
      description: "Diseñamos y desarrollamos páginas web modernas, rápidas y adaptadas a la identidad de tu negocio para atraer más clientes.",
      features: ["Diseño 100% Personalizado", "Adaptable a Celulares y Tablets", "Optimización de Carga", "Estructura para Vender Más"],
      icon: "🌐"
    },
    {
      title: "Creación de IA para tu Negocio",
      description: "Desarrollamos e integramos soluciones de Inteligencia Artificial personalizadas para automatizar tareas y optimizar procesos internos.",
      features: ["Modelos de IA Personalizados", "Automatización de Tareas", "Análisis Inteligente de Datos", "Optimización de Procesos"],
      icon: "🧠"
    },
    {
      title: "Incorporación de Chatbots",
      description: "Implementamos bots inteligentes que atienden a tus clientes 24/7 en tu sitio web o redes sociales sin perder oportunidades de venta.",
      features: ["Atención al Cliente 24/7", "Integración con WhatsApp y Web", "Respuestas Automáticas Inteligentes", "Captura de Prospectos (Leads)"],
      icon: "🤖"
    },
    {
      title: "Pasarelas de Pago, Reservas y Citas",
      description: "Integramos sistemas automáticos para que tus clientes puedan agendar citas, reservar servicios y pagarte en línea fácilmente.",
      features: ["Cobros en Línea Seguros", "Sistema de Agendamiento de Citas", "Gestión Automática de Reservas", "Confirmaciones por Correo / WhatsApp"],
      icon: "💳"
    }
  ];

  const steps = [
    { number: "01", title: "Consulta Inicial", desc: "Platicamos sobre las necesidades específicas de tu negocio." },
    { number: "02", title: "Diseño & Estrategia", desc: "Planificamos la solución, flujos y diseño del proyecto." },
    { number: "03", title: "Desarrollo e Integración", desc: "Construimos tu web, configuramos tus bots, IA o pasarelas." },
    { number: "04", title: "Entrega y Puesta en Marcha", desc: "Lanzamos el sistema y te enseñamos a utilizarlo." }
  ];

  return (
    <div className="bg-[#0B0F19] text-white min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header de la Página */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Soluciones Digitales</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-3 tracking-tight">
            Impulsa y automatiza <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">tu negocio</span>
          </h1>
          <p className="text-gray-400 text-lg mt-4">
            Te ayudamos a digitalizar tu empresa con tecnología moderna, inteligencia artificial y herramientas que venden por ti.
          </p>
        </div>

        {/* Grilla de Servicios Detallados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-28">
          {servicesList.map((service, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-300 gap-2">
                      <span className="text-cyan-400 font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                to="/contacto" 
                className="mt-4 text-cyan-400 hover:text-cyan-300 font-medium text-sm inline-flex items-center gap-1 group"
              >
                Solicitar cotización <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Sección de Proceso */}
        <div className="border-t border-slate-800/80 pt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Cómo trabajamos</h2>
            <p className="text-gray-400 mt-2">Un proceso sencillo para llevar tu negocio al siguiente nivel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 relative">
                <span className="text-4xl font-extrabold text-cyan-500/20 block mb-2">{step.number}</span>
                <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}