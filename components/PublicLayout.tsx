
import React, { useState, useEffect } from 'react';

interface PublicLayoutProps {
  children: React.ReactNode;
  onAdminLogin: () => void;
  onNavigate: (view: 'landing' | 'catalog-parts' | 'catalog-services') => void;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children, onAdminLogin, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', view: 'landing' },
    { label: 'Repuestos', view: 'catalog-parts' },
    { label: 'Taller', view: 'catalog-services' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] selection:bg-[#ff4d00] selection:text-white">
      {/* 1. TOP MARQUEE (A la cabecera del sitio) */}
      <div className="bg-[#ff4d00] py-2 z-[110] relative overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="mx-16 text-[9px] font-black text-black uppercase tracking-[0.4em]">
              🏁 MOTO FUSION SALTA • SERVICIOS GARANTIZADOS • REPUESTOS ORIGINALES • AV. SAN MARTÍN 1322 • LUN A VIE 09-21HS 🏁
            </span>
          ))}
        </div>
      </div>

      {/* 2. UNIFIED NAVBAR */}
      <nav className={`sticky top-0 z-[100] transition-all duration-500 ${scrolled ? 'glass py-3 border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('landing')}
          >
            <div className="bg-[#ff4d00] w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,77,0,0.3)] group-hover:rotate-12 transition-transform">
              <span className="font-moto text-white text-xl">MF</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-moto text-white text-lg leading-none italic">MOTO FUSION</h1>
              <p className="text-[7px] font-black text-orange-500 tracking-[0.6em] mt-1 uppercase">El Garaje de Salta</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-12">
            {navLinks.map(link => (
              <button 
                key={link.view} 
                onClick={() => onNavigate(link.view as any)}
                className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-[0.3em] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={onAdminLogin}
              className="px-8 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#ff4d00] hover:text-white transition-all shadow-xl active:scale-95"
            >
              Acceso Staff
            </button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2 text-2xl">
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Sidebar */}
        <div className={`fixed inset-0 bg-black/95 z-[150] transition-all duration-500 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="p-10 h-full flex flex-col justify-center gap-8 relative">
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-white text-4xl">✕</button>
              {navLinks.map(link => (
                <button 
                  key={link.view} 
                  onClick={() => { onNavigate(link.view as any); setIsMenuOpen(false); }} 
                  className="text-5xl font-moto text-white hover:text-orange-500 text-left italic"
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-12 pt-12 border-t border-white/5">
                <button onClick={() => { onAdminLogin(); setIsMenuOpen(false); }} className="w-full py-6 bg-[#ff4d00] text-black font-black uppercase tracking-widest rounded-2xl">PANEL INTERNO</button>
              </div>
           </div>
        </div>
      </nav>

      <main className="flex-1">
        {children}
      </main>

      {/* 3. UNIFIED FOOTER */}
      <footer id="ubicacion" className="bg-[#050505] border-t border-white/5 pt-32 pb-16 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
          <div className="md:col-span-2 space-y-8">
            <h3 className="font-moto text-white text-4xl italic">MOTO FUSION</h3>
            <p className="text-slate-500 font-bold text-lg leading-relaxed max-w-md">
              Especialistas en mecánica de alta performance y repuestos genuinos. Más de 10 años garantizando el rugido de Salta Capital.
            </p>
            <div className="flex gap-4">
              {['WhatsApp', 'Instagram', 'Facebook'].map(s => (
                <a key={s} href="#" className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-[#ff4d00] hover:text-white transition-all text-xs font-black uppercase tracking-tighter">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em]">El Box</h4>
            <div className="space-y-5 text-slate-400 font-bold text-sm uppercase tracking-widest">
              <p>📍 Av. San Martín 1322</p>
              <p>📞 387 546-9174</p>
              <p>⏰ L-V: 09:00 - 21:00</p>
              <p>🏁 Sáb: 09:00 - 13:30</p>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em]">Legales</h4>
            <div className="flex flex-col gap-4 text-slate-600 font-black text-[10px] uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Garantía de Servicio</a>
              <a href="#" className="hover:text-white transition-colors">Política de Devolución</a>
              <a href="#" className="hover:text-white transition-colors">Términos Web</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.8em]">© 2024 MOTO FUSION SALTA • INDUSTRIAL MANAGEMENT SYSTEM</p>
          <div className="flex gap-6 text-[9px] font-black text-slate-700 uppercase tracking-widest">
            <span>Powered by SALTA TECH</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
