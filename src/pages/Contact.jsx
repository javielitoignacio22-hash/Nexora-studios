import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    // 🔴 REEMPLAZA ESTA URL CON LA QUE TE DIO FORMSPREE
    const FORMSPREE_URL = "https://formspree.io/f/xrenjvoa";

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('SUCCESS');
        form.reset();
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  return (
    <div className="bg-[#0B0F19] text-white min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Hablemos</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-3 tracking-tight">
            Inicia tu proyecto con <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Nexora Studios</span>
          </h1>
          <p className="text-gray-400 text-lg mt-4">
            Cuéntanos la idea o necesidad de tu negocio y te asesoraremos sin compromiso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Tarjetas de Información Directa */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-lg font-bold text-white">WhatsApp Directo</h3>
              <p className="text-sm text-gray-400 mt-1">¿Prefieres una respuesta más rápida? Escríbenos.</p>
              <a 
                href="https://wa.me/18093835504" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block mt-4 text-cyan-400 hover:text-cyan-300 font-semibold text-sm"
              >
                Enviar mensaje por WhatsApp →
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-3xl mb-3">✉️</div>
              <h3 className="text-lg font-bold text-white">Correo Electrónico</h3>
              <p className="text-sm text-gray-400 mt-1">Escríbenos directamente a nuestra bandeja.</p>
              <a 
                href="mailto:javielitoignacio22@gmail.com" 
                className="inline-block mt-4 text-cyan-400 hover:text-cyan-300 font-semibold text-sm"
              >
                javielitoignacio22@gmail.com
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-bold text-white">Atención Rápida</h3>
              <p className="text-sm text-gray-400 mt-1">
                Respondemos a todas las consultas en un plazo máximo de 24 horas hábiles.
              </p>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div className="lg:col-span-2 p-8 md:p-10 rounded-3xl bg-slate-900/80 border border-slate-800">
            
            {status === 'SUCCESS' && (
              <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-400 text-center text-sm font-semibold">
                ¡Gracias por tu mensaje! 🎉 Te contactaremos muy pronto.
              </div>
            )}

            {status === 'ERROR' && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 text-center text-sm font-semibold">
                Hubo un error al enviar el mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-400 mb-2">Nombre completo</label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    placeholder="Tu nombre"
                    className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-400 mb-2">Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="tu@email.com"
                    className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-400 mb-2">Teléfono / WhatsApp</label>
                  <input
                    type="tel"
                    name="telefono"
                    placeholder="+123 456 789"
                    className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-400 mb-2">Servicio de interés</label>
                  <select
                    name="servicio"
                    className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                  >
                    <option value="Diseño Web">Creación y Diseño Web</option>
                    <option value="IA">Creación de IA para Negocio</option>
                    <option value="Chatbots">Incorporación de Chatbots</option>
                    <option value="Pagos y Citas">Pasarelas de Pago, Reservas y Citas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-400 mb-2">Cuéntanos sobre tu proyecto</label>
                <textarea
                  name="mensaje"
                  required
                  rows="4"
                  placeholder="Detalla un poco lo que necesitas..."
                  className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition duration-200 shadow-lg shadow-cyan-500/20"
              >
                Enviar Solicitud
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}