import React, { useEffect, useState } from "react";
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Trash2, 
  PlusCircle, 
  ShoppingBag, 
  Clock, 
  CreditCard, 
  Users,
  Zap,
  Lock,
  ChefHat,
  Heart,
  ChevronLeft,
  ChevronRight,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentDate, setCurrentDate] = useState("");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const [notification, setNotification] = useState<{ name: string; time: number | "agora"; isRealTime: boolean } | null>(null);

  const names = ["Juliana", "Ana", "Fernanda", "Patrícia", "Camila", "Carlos", "Marcos", "Rafael", "João", "Lucas"];

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNext = (delay: number) => {
      timeoutId = setTimeout(() => {
        const randomName = names[Math.floor(Math.random() * names.length)];
        const isRealTime = Math.random() > 0.5;
        const randomTime = isRealTime ? "agora" : Math.floor(Math.random() * 58) + 2;
        
        setNotification({ name: randomName, time: randomTime, isRealTime });

        // Hide after 5 seconds
        setTimeout(() => {
          setNotification(null);
          // Wait 10-13 seconds before next one
          const nextDelay = Math.floor(Math.random() * 3001) + 10000;
          scheduleNext(nextDelay);
        }, 5000);
      }, delay);
    };

    // Show first one after 3 seconds
    scheduleNext(3000);

    return () => clearTimeout(timeoutId);
  }, []);

  const testimonials = [
    {
      name: "Carlos Lima",
      photo: "https://i.imgur.com/0OSsX3f.jpg",
      text: "testei o pudim hoje\nficou bom demais, nem parece zero açúcar 😳"
    },
    {
      name: "Juliana Rocha",
      photo: "https://i.imgur.com/i1vxhUC.jpg",
      text: "comecei a testar ontem\njá fiz 2 receitas e gostei muito\nbem fácil de fazer mesmo"
    },
    {
      name: "Ana Souza",
      photo: "https://i.imgur.com/HwMVEwz.jpg",
      text: "olha, vou te falar… fazia tempo que eu não comia doce tranquila assim\nsou diabética e sempre ficava com medo\ntestei algumas receitas e deu super certo, fiquei até feliz de verdade 😭"
    },
    {
      name: "Marcos Silva",
      photo: "https://i.imgur.com/q1FVXM6.jpg",
      text: "tava quase desistindo da dieta por causa de doce kkk\nagora faço essas receitas e não fico mais com culpa"
    },
    {
      name: "Fernanda Costa",
      photo: "https://i.imgur.com/FvBnzm4.jpg",
      text: "fiz aqui em casa\ntodo mundo gostou e ninguém percebeu que era zero açúcar 😂"
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setVisibleItems(3);
      else if (window.innerWidth >= 640) setVisibleItems(2);
      else setVisibleItems(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextTestimonial = () => {
    const maxIndex = testimonials.length - visibleItems;
    setTestimonialIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    const maxIndex = testimonials.length - visibleItems;
    setTestimonialIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const meses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const dataObj = new Date();
    const dia = dataObj.getDate();
    const mes = meses[dataObj.getMonth()];
    setCurrentDate(`${dia} de ${mes}`);
  }, []);

  const CTAButton = ({ text }: { text: string }) => (
    <div className="flex flex-col items-center gap-3 mx-auto">
      <a 
        href="https://pay.kirvano.com/0ed3e810-1fe2-49fb-81ee-daecf4520680" 
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center justify-center gap-[10px] bg-[#22C55E] text-white px-[40px] py-[20px] rounded-[18px] font-bold text-[22px] shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300 transform hover:scale-[1.03] active:scale-95 text-center leading-none"
      >
        <span>{text}</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </a>
      <p className="text-[10px] md:text-xs font-bold text-[#A6998E] flex items-center gap-2 uppercase tracking-widest">
        <ShieldCheck size={14} className="text-green-600" /> Acesso imediato • 100% Seguro
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-[#332D2D] font-sans selection:bg-[#FF4F00]/20">
      
      {/* 0. URGENCY BAR */}
      <div className="fixed top-0 w-full bg-[#FF1E1E] text-white py-3 px-4 z-[100] text-center shadow-lg border-b border-white/20">
        <p className="text-xs md:text-sm lg:text-base font-black uppercase tracking-tight">
          <Zap size={16} className="inline-block mr-2 animate-pulse fill-white" />
          ATENÇÃO: Promoção especial de 70% de desconto válida somente hoje ({currentDate})
        </p>
      </div>

      {/* 1. HERO SECTION */}
      <header className="pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-[#E8E1D9]">
            <Star size={14} className="text-[#FF4F00] fill-[#FF4F00]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B5E3C]">Compilação Exclusiva 2026</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#3E2723] leading-[1.1] mb-8 text-center max-w-5xl mx-auto">
            <span className="text-[#FF4D6D]">+200</span> receitas <span className="text-[#FF4D6D]">zero açúcar</span> pensadas para <span className="text-[#FF4D6D]">diabéticos</span> e para quem quer <span className="text-[#FF4D6D]">emagrecer</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-[#332D2D] mb-12 max-w-4xl mx-auto font-medium text-center opacity-80">
            Acesso imediato a +200 receitas zero açúcar para você cuidar da glicose e voltar a aproveitar sobremesas no dia a dia
          </p>

          <CTAButton text="Quero acesso imediato" />
        </div>
      </header>
      {/* NEW: AUTOMATIC CAROUSEL */}
      <section className="py-16 overflow-hidden bg-white border-b border-[#E8E1D9]">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[#3E2723] tracking-tight">
            Conheça um pouco das nossas delícias
          </h2>
          <div className="w-24 h-1 bg-[#FF4F00] mx-auto mt-4 rounded-full opacity-30"></div>
        </div>
        <div className="carrossel-track animate-scroll gap-6 px-4">
          {[
            { src: "https://i.imgur.com/a3DBh5h.jpg", alt: "Cookies zero açúcar" },
            { src: "https://i.imgur.com/l0BwY50.jpg", alt: "Brigadeiro zero açúcar" },
            { src: "https://i.imgur.com/pPY9aXy.jpg", alt: "Cheesecake zero açúcar" },
            { src: "https://i.imgur.com/maeEIaf.jpg", alt: "Pudim zero açúcar" },
            { src: "https://i.imgur.com/wBH3qnJ.jpg", alt: "Mousse de chocolate zero açúcar" },
            // Duplicate for infinite loop
            { src: "https://i.imgur.com/a3DBh5h.jpg", alt: "Cookies zero açúcar" },
            { src: "https://i.imgur.com/l0BwY50.jpg", alt: "Brigadeiro zero açúcar" },
            { src: "https://i.imgur.com/pPY9aXy.jpg", alt: "Cheesecake zero açúcar" },
            { src: "https://i.imgur.com/maeEIaf.jpg", alt: "Pudim zero açúcar" },
            { src: "https://i.imgur.com/wBH3qnJ.jpg", alt: "Mousse de chocolate zero açúcar" },
          ].map((img, index) => (
            <div key={index} className="shrink-0">
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-[280px] h-[200px] md:w-[350px] md:h-[250px] object-cover rounded-3xl shadow-xl border-4 border-white"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 2. O PROBLEMA */}
      <section className="py-24 bg-white px-4 border-y border-[#E8E1D9]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#3E2723] mb-6 underline decoration-[#FF4F00]/20 decoration-8 underline-offset-8">
              Você vive em uma "prisão" alimentar?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { t: "Vontade de comer doce", d: "Aquela fissura incontrolável que surge sempre após as refeições e destrói sua disciplina." },
              { t: "Dificuldade em manter a dieta", d: "A sensação de que comer saudável é sinônimo de comer comida sem graça e sem prazer." },
              { t: "Medo da glicose subir", d: "O pavor constante de ver os números subindo no monitor de glicemia a cada garfada de sobremesa." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-[#E8E1D9] hover:border-[#FF4F00]/30 transition-all flex gap-4">
                <Trash2 className="text-red-500 shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-[#3E2723] text-lg mb-2">{item.t}</h3>
                  <p className="text-[#7D6E63] text-sm leading-relaxed">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DEPOIMENTOS REAIS (Carousel) */}
      <section className="py-24 px-4 bg-[#F9F7F5] border-b border-[#E8E1D9] overflow-hidden">
        <div className="max-w-6xl mx-auto relative px-4">
          <div className="text-center mb-16 px-4">
            <h2 className="text-2xl md:text-4xl font-black text-[#3E2723] mb-4">O que estão falando sobre as receitas</h2>
            <div className="w-24 h-1 bg-[#FF4F00] mx-auto rounded-full opacity-30"></div>
          </div>
          
          <div className="relative group">
            {/* Carousel Container */}
            <div className="overflow-hidden mx-[-12px]">
              <div 
                className="testimonial-track"
                style={{ 
                  '--index': testimonialIndex, 
                  '--visible': visibleItems,
                  '--total': testimonials.length 
                } as React.CSSProperties}
              >
                {testimonials.map((d, i) => (
                  <div 
                    key={i} 
                    className="testimonial-card-wrapper transition-opacity duration-300"
                  >
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-md border border-[#E8E1D9] hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col gap-4 h-full">
                      <div className="flex items-center gap-4">
                        <img src={d.photo} alt={d.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="font-bold text-[#3E2723] leading-tight">{d.name}</h4>
                          <div className="flex gap-0.5 mt-1">
                            {[...Array(5)].map((_, starIndex) => <Star key={starIndex} size={14} fill="#FFD700" className="text-[#FFD700]" />)}
                          </div>
                        </div>
                      </div>
                      <p className="text-[#5D4037] text-sm md:text-base leading-relaxed whitespace-pre-line font-medium italic">
                        "{d.text}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div 
              onClick={prevTestimonial}
              className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 nav-button flex items-center justify-center shadow-2xl z-20 active:scale-90 cursor-pointer"
              role="button"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={32} />
            </div>
            <div 
              onClick={nextTestimonial}
              className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 nav-button flex items-center justify-center shadow-2xl z-20 active:scale-90 cursor-pointer"
              role="button"
              aria-label="Next testimonial"
            >
              <ChevronRight size={32} />
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.slice(0, testimonials.length - visibleItems + 1).map((_, i) => (
                <div
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${testimonialIndex === i ? 'w-6 bg-[#FF4D6D]' : 'bg-[#D1C7C0]'}`}
                  role="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>










      {/* 8. OFERTA / PREÇO */}
      <section id="preco" className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F3E5AB] rounded-full blur-[140px] opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B5E3C] rounded-full blur-[140px] opacity-10 -z-10"></div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[60px] border-4 border-[#FF4F00]/20 p-8 md:p-12 shadow-3xl text-center flex flex-col items-center">
            
            <div className="mb-8">
              <div className="text-gray-400 font-bold text-xl line-through mb-1">De R$ 97,00</div>
              <div className="text-[#3E2723] font-bold text-lg mb-1">Apenas hoje por:</div>
              <div className="text-red-600 tracking-tighter mb-1 leading-none flex items-baseline justify-center">
                <span className="text-2xl md:text-4xl font-black mr-2">R$</span>
                <span className="text-7xl md:text-8xl font-black">9,90</span>
              </div>
            </div>
            
            <div className="max-w-md w-full bg-[#FDFCFB] p-6 md:p-8 rounded-3xl border border-[#E8E1D9] mb-8 text-left">
              <h4 className="font-extrabold text-[#3E2723] mb-6 text-center uppercase text-lg md:text-xl tracking-widest text-[#8B5E3C]">O que você vai receber:</h4>
              {[
                { t: "+200 receitas zero açúcar", b: false },
                { t: "+10 receitas rápidas (15 min)", b: true },
                { t: "Calendário Semanal de Refeições Fit", b: true },
                { t: "Acesso imediato após a compra", b: false }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 font-bold text-[#5D4037] text-sm md:text-base mb-5 last:mb-0">
                  <CheckCircle2 className={`shrink-0 mt-0.5 ${item.b ? 'text-[#FF4D6D]' : 'text-green-600'}`} size={20} /> 
                  <div className="flex flex-col">
                    {item.b && (
                      <span className="bg-[#FF4D6D] text-white text-[9px] font-black px-1.5 py-0 rounded-md mb-0.5 w-fit">BÔNUS</span>
                    )}
                    <span className={item.b ? "text-[#FF4D6D]" : ""}>{item.t}</span>
                  </div>
                </div>
              ))}
            </div>

            <CTAButton text="Quero acesso imediato" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 bg-white px-4 border-t border-[#E8E1D9] text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-[#A6998E] font-medium leading-relaxed max-w-2xl mx-auto mb-8">
            © 2026 Vida Doce Zero. Todos os direitos reservados. Este produto não substitui o aconselhamento médico profissional. Sempre consulte seu médico antes de fazer alterações significativas na sua dieta.
          </p>
        </div>
      </footer>

      {/* PURCHASE NOTIFICATION POPUP */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed bottom-[15px] left-[15px] z-[200] w-[280px] md:w-[320px]"
          >
            <div className="bg-[#28a745] text-white px-3 py-2.5 rounded-xl shadow-lg flex items-center gap-3 border border-white/10 backdrop-blur-sm">
              <div className="bg-white/20 p-1 rounded-full shrink-0">
                <Check size={12} className="text-white" strokeWidth={4} />
              </div>
              <div className="flex flex-col">
                <p className="text-[11px] md:text-xs font-bold leading-tight">
                  {notification.name} {notification.isRealTime ? "acabou de comprar" : "comprou"} +200 receitas zero açúcar
                </p>
                <p className="text-[9px] md:text-[10px] opacity-80 mt-0.5">
                  • {notification.isRealTime ? "agora" : `há ${notification.time} minutos`}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
