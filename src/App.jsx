import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import ChatBotWidget from "./components/ui/ChatBotWidget.jsx";

import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#0B0F19] relative">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/portafolio" element={<Portfolio />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </main>

        <Footer />

        {/* Chatbot flotante en todas las páginas */}
        <ChatBotWidget />
      </div>
    </BrowserRouter>
  );
}

export default App;