import { useState } from 'react';

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '¡Hola! 👋 Bienvenido a Nexora Studios. ¿En qué te podemos ayudar hoy?',
      options: [
        'Cotizar una Página Web',
        'Crear una IA o Chatbot',
        'Sistemas de Citas / Pagos',
        'Hablar con un Humano'
      ]
    }
  ]);

  const handleOptionClick = (option) => {
    // 1. Agregar la respuesta seleccionada por el usuario
    const updatedMessages = [
      ...messages,
      { sender: 'user', text: option }
    ];
    setMessages(updatedMessages);

    // 2. Generar respuesta automática según la opción elegida
    setTimeout(() => {
      let botReply = '';
      
      switch (option) {
        case 'Cotizar una Página Web':
          botReply = '¡Excelente! Diseñamos sitios web rápidos, modernos y optimizados para vender. Te invitamos a llenar el formulario en la sección de "Contacto" o dejarnos tus datos para comunicarnos.';
          break;
        case 'Crear una IA o Chatbot':
          botReply = '¡Genial! Desarrollamos asistentes con Inteligencia Artificial y Chatbots para atender a tus clientes 24/7 en tu web o WhatsApp.';
          break;
        case 'Sistemas de Citas / Pagos':
          botReply = 'Integramos pasarelas de pago seguras y calendarios de reservas automáticos para que tus clientes puedan agendar y pagar en línea sin complicaciones.';
          break;
        case 'Hablar con un Humano':
          botReply = '¡Claro que sí! Puedes escribirnos directamente por WhatsApp al +18093835504 o enviarnos un correo a javielitoignacio22@gmail.com';
          break;
        default:
          botReply = '¿En qué más te podemos colaborar?';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botReply,
          options: ['Cotizar una Página Web', 'Crear una IA o Chatbot', 'Sistemas de Citas / Pagos', 'Hablar con un Humano']
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón flotante para abrir/cerrar */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-4 rounded-full shadow-lg shadow-cyan-500/25 flex items-center justify-center transition transform hover:scale-105 text-xl"
        >
          💬
        </button>
      )}

      {/* Ventana flotante del Chatbot */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-[480px] overflow-hidden">
          {/* Header */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-bold text-sm text-white">Nexora Bot</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white text-lg font-bold px-2"
            >
              ✕
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
            {messages.map((msg, index) => (
              <div key={index} className="space-y-2">
                <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-cyan-500 text-slate-950 font-medium rounded-br-none'
                        : 'bg-slate-800 text-gray-200 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>

                {/* Botones de opciones predefinidas */}
                {msg.options && msg.sender === 'bot' && index === messages.length - 1 && (
                  <div className="flex flex-col gap-1.5 pl-2 pt-1">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(opt)}
                        className="text-left text-xs bg-slate-950 hover:bg-cyan-950 hover:border-cyan-500/50 text-cyan-400 border border-slate-800 rounded-xl px-3 py-2 transition"
                      >
                        🔹 {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer del Chat */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 text-center text-xs text-gray-500">
            Powered by Nexora Studios
          </div>
        </div>
      )}
    </div>
  );
}