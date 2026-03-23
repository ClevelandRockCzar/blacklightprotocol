import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lock, Cpu, ArrowRight, Menu, X, ExternalLink, Activity, Terminal } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      ref={navRef}
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-out flex items-center gap-8 py-3 px-6 rounded-full border border-transparent self-center",
        isScrolled 
          ? "bg-graphite/60 backdrop-blur-xl border-ghost/10 shadow-lg px-8 py-4" 
          : "bg-transparent text-ghost"
      )}
    >
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-plasma" />
        <span className="font-bold tracking-tight uppercase text-lg text-ghost">Blacklight</span>
      </div>
      
      <div className="hidden md:flex items-center gap-6 text-sm font-medium uppercase tracking-widest text-ghost/60">
        <a href="#features" className="hover:text-plasma transition-colors">Research</a>
        <a href="#philosophy" className="hover:text-plasma transition-colors">Philosophy</a>
        <a href="#protocol" className="hover:text-plasma transition-colors">Protocol</a>
      </div>

      <button className="magnetic-btn bg-ghost text-void px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest overflow-hidden group">
        <span className="btn-layer bg-plasma"></span>
        <span className="relative z-10 flex items-center gap-2">
          Secure <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </span>
      </button>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
      
      tl.from(headlineRef.current, { y: 60, opacity: 0, delay: 0.5 })
        .from(subheadlineRef.current, { y: 30, opacity: 0 }, "-=0.7")
        .from(ctaRef.current, { y: 20, opacity: 0 }, "-=0.7");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-[100dvh] w-full bg-void flex items-end overflow-hidden p-8 md:p-20"
    >
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[2s] hover:scale-105"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent opacity-90 z-10"></div>

      <div className="relative z-20 w-full max-w-4xl">
        <div ref={headlineRef} className="space-y-4">
          <h2 className="text-ghost font-bold uppercase tracking-tighter text-4xl md:text-6xl max-w-2xl leading-[0.9]">
            CYBER INTELLIGENCE BEYOND
          </h2>
          <h1 className="text-plasma font-serif italic text-7xl md:text-[12rem] leading-[0.8] tracking-tight">
            BOUNDARIES.
          </h1>
        </div>
        
        <p ref={subheadlineRef} className="text-ghost/60 font-mono text-sm md:text-base mt-8 max-w-lg leading-relaxed uppercase tracking-widest">
          // High-fidelity shadow infrastructure for the next generation of cybersecurity agents.
        </p>

        <div ref={ctaRef} className="mt-12 flex flex-wrap gap-4">
          <button className="magnetic-btn bg-plasma text-void px-8 py-4 rounded-full text-sm font-bold uppercase tracking-[0.2em] group">
            <span className="btn-layer bg-ghost"></span>
            <span className="relative z-10 flex items-center gap-3">
              Establish Uplink <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

const DiagnosticShuffler = () => {
  const [items, setItems] = useState([
    { id: 1, label: "ZERO-DAY DISCOVERY", value: "98.4%", status: "CRITICAL" },
    { id: 2, label: "KERNEL-LEVEL AUDIT", value: "STABLE", status: "NOMINAL" },
    { id: 3, label: "SIGNAL PERSISTENCE", value: "ACTIVE", status: "PENDING" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const next = [...prev];
        next.unshift(next.pop());
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[250px] w-full flex flex-col items-center justify-center perspective-1000">
      {items.map((item, index) => (
        <div 
          key={item.id}
          className={cn(
            "absolute w-full max-w-[280px] p-6 rounded-2xl-plus glass transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            index === 0 ? "z-30 opacity-100 scale-100 translate-y-0 shadow-2xl bg-graphite border-ghost/20" : 
            index === 1 ? "z-20 opacity-60 scale-90 translate-y-12 blur-[1px] bg-graphite/40 border-ghost/10" : 
            "z-10 opacity-20 scale-75 translate-y-24 blur-[2px] bg-graphite/20 border-ghost/5"
          )}
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono text-plasma uppercase tracking-widest">{item.status}</span>
            <Activity className="w-4 h-4 text-plasma/40" />
          </div>
          <h4 className="font-bold text-ghost text-sm tracking-widest mb-1">{item.label}</h4>
          <div className="text-3xl font-mono text-ghost/80 tabular-nums">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

const TelemetryTypewriter = () => {
  const [text, setText] = useState('');
  const fullText = "> SCANNING SUBNET [10.0.8.24]... \n> VULNERABILITY DETECTED: CVE-2024-8192 \n> INJECTING PAYLOAD... \n> SHELL ESTABLISHED. \n> PERSISTENCE: 100%";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index = (index + 1) % (fullText.length + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-graphite/40 p-6 rounded-2xl-plus border border-ghost/10 h-[250px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-plasma animate-pulse" />
        <span className="text-[10px] font-mono text-ghost/40 uppercase tracking-widest">Live Telemtry Feed</span>
      </div>
      <p className="font-mono text-[11px] text-ghost/70 whitespace-pre-wrap leading-relaxed overflow-hidden">
        {text}<span className="inline-block w-1.5 h-3 bg-plasma ml-1 animate-pulse" />
      </p>
    </div>
  );
};

const CursorScheduler = () => {
  const [activeDays, setActiveDays] = useState([1, 3, 5]);
  const cursorRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(cursorRef.current, {
        keyframes: [
          { x: 0, y: 0, opacity: 1, duration: 0 },
          { x: 120, y: 40, duration: 1, ease: "power2.inOut" },
          { scale: 0.9, duration: 0.1 },
          { scale: 1, duration: 0.1 },
          { x: 40, y: 80, duration: 0.8, ease: "power2.inOut" },
          { scale: 0.9, duration: 0.1 },
          { scale: 1, duration: 0.1 },
          { opacity: 0, duration: 0.5, delay: 0.5 }
        ],
        repeat: -1,
        repeatDelay: 1
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative bg-graphite/40 p-6 rounded-2xl-plus border border-ghost/10 h-[250px] overflow-hidden">
      <div className="grid grid-cols-7 gap-2 mb-8 relative">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div 
            key={i} 
            className={cn(
              "aspect-square flex items-center justify-center rounded-lg text-[10px] font-mono transition-colors border",
              activeDays.includes(i) ? "bg-plasma text-void border-plasma" : "bg-void text-ghost/40 border-ghost/5"
            )}
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="space-y-3">
        <div className="h-2 w-full bg-void rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-plasma rounded-full" />
        </div>
        <div className="h-2 w-full bg-void rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-ghost/10 rounded-full" />
        </div>
      </div>

      <div ref={cursorRef} className="absolute pointer-events-none z-50">
        <div className="w-5 h-5 flex items-center justify-center">
            <div className="w-full h-full text-plasma opacity-80 rotate-[-15deg]">
                 <Terminal className="w-full h-full" />
            </div>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-32 px-8 overflow-hidden bg-void">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-8 group">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold tracking-tighter uppercase leading-none text-ghost">
                Offensive <br /><span className="text-plasma font-serif italic text-4xl">Research.</span>
              </h3>
              <p className="text-sm font-mono text-ghost/60 leading-relaxed max-w-xs">
                Deep dives into zero-days and vulnerabilities hidden within the architecture.
              </p>
            </div>
            <DiagnosticShuffler />
          </div>

          <div className="space-y-8 group">
             <div className="space-y-4">
              <h3 className="text-3xl font-bold tracking-tighter uppercase leading-none text-ghost">
                Defensive <br /><span className="text-plasma font-serif italic text-4xl">Architecture.</span>
              </h3>
              <p className="text-sm font-mono text-ghost/60 leading-relaxed max-w-xs">
                 Hardening decentralized infrastructure against the edge-case threats of tomorrow.
              </p>
            </div>
            <TelemetryTypewriter />
          </div>

          <div className="space-y-8 group">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold tracking-tighter uppercase leading-none text-ghost">
                Signal <br /><span className="text-plasma font-serif italic text-4xl">Laboratory.</span>
              </h3>
              <p className="text-sm font-mono text-ghost/60 leading-relaxed max-w-xs">
                Interactive playground for cryptographic learning and biometric signal validation.
              </p>
            </div>
            <CursorScheduler />
          </div>
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(textRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="py-40 px-8 bg-graphite relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 grayscale pointer-events-none bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072')] bg-cover bg-center"></div>
      
      <div className="max-w-5xl mx-auto relative z-10" ref={textRef}>
        <div className="mb-8">
           <span className="text-plasma font-mono text-xs uppercase tracking-[0.3em] font-bold">THE MANIFESTO</span>
        </div>
        
        <p className="text-ghost/40 text-xl md:text-3xl leading-tight uppercase font-medium tracking-tighter mb-12">
          Most cybersecurity focuses on: <br />
          <span className="text-ghost/20">Legacy patching and perimeter defenses.</span>
        </p>
        
        <h2 className="text-ghost text-4xl md:text-7xl leading-[0.9] font-bold uppercase tracking-tighter">
          We focus on: <br />
          <span className="text-plasma font-serif italic text-6xl md:text-9xl">Decentralized</span> <br />
          <span className="text-ghost">Resilience.</span>
        </h2>
      </div>
    </section>
  );
};

const ProtocolSection = () => {
  const containerRef = useRef(null);
  const cards = [
    { 
      step: "01", 
      title: "VULNERABILITY EXTRACTION", 
      desc: "Identifying structural weaknesses in shadow infrastructure using advanced automated probes.",
      icon: <Cpu className="w-12 h-12 text-plasma" />
    },
    { 
      step: "02", 
      title: "PAYLOAD PERSISTENCE", 
      desc: "Establishing non-volatile command and control hooks within kernel-space environments.",
      icon: <Lock className="w-12 h-12 text-plasma" />
    },
    { 
      step: "03", 
      title: "RESILIENT BROADCAST", 
      desc: "Distributing cryptographic payloads across decentralized nodes with zero-knowledge verification.",
      icon: <Activity className="w-12 h-12 text-plasma" />
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
        const sections = gsap.utils.toArray('.protocol-card');
        sections.forEach((section, i) => {
            if (i === sections.length - 1) return;
            
            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                pin: true,
                pinSpacing: false,
                scrub: true
            });

            gsap.to(section, {
                scrollTrigger: {
                    trigger: sections[i+1],
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                },
                scale: 0.9,
                opacity: 0.5,
                filter: "blur(20px)"
            });
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={containerRef} className="bg-void">
      {cards.map((card, i) => (
        <div key={i} className="protocol-card h-screen w-full flex items-center justify-center sticky top-0 bg-void border-t border-ghost/10 p-8 md:p-20 overflow-hidden">
             
           <div className="absolute inset-0 z-0 opacity-[0.03] flex items-center justify-center p-40 pointer-events-none">
                {i === 0 && <div className="w-full h-full border-[20px] border-ghost rounded-full animate-[spin_20s_linear_infinite]" />}
                {i === 1 && <div className="w-full h-[2px] bg-plasma animate-[pulse_2s_infinite]" />}
                {i === 2 && <div className="w-full h-full flex items-center justify-center"><Terminal className="w-1/2 h-1/2 text-ghost" /></div>}
           </div>

           <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                    <div className="font-mono text-plasma text-lg font-bold">[{card.step}]</div>
                    <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-none text-ghost">
                        {card.title}
                    </h2>
                    <p className="text-ghost/60 text-lg md:text-xl font-mono leading-relaxed max-w-md">
                        {card.desc}
                    </p>
                    <button className="magnetic-btn bg-ghost text-void px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest overflow-hidden group">
                        <span className="btn-layer bg-plasma"></span>
                        <span className="relative z-10 flex items-center gap-2">Read Technical Specs <ExternalLink className="w-4 h-4" /></span>
                    </button>
                </div>
                <div className="hidden md:flex justify-center">
                    <div className="w-80 h-80 rounded-3xl-plus bg-graphite/40 border border-ghost/10 shadow-2xl flex items-center justify-center backdrop-blur-sm">
                        {card.icon}
                    </div>
                </div>
           </div>
        </div>
      ))}
    </section>
  );
};

const Pricing = () => {
    return (
        <section className="py-40 px-8 bg-void">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24 space-y-4">
                    <div className="text-plasma font-mono text-xs uppercase tracking-widest font-bold">ACCESS PROTOCOLS</div>
                    <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter text-ghost">SELECT YOUR TIER</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {/* Essential */}
                    <div className="p-10 rounded-3xl-plus bg-graphite/30 border border-ghost/10 flex flex-col items-start gap-8">
                        <div className="space-y-2">
                             <div className="font-mono text-[10px] text-ghost/40 uppercase tracking-widest">Protocol One</div>
                             <h3 className="text-2xl font-bold uppercase tracking-tight text-ghost">Essential</h3>
                        </div>
                        <div className="text-5xl font-mono font-bold tracking-tighter text-ghost">
                            $0<span className="text-lg font-normal text-ghost/40">/mo</span>
                        </div>
                        <ul className="space-y-4 text-sm font-mono text-ghost/60 flex-grow">
                            <li className="flex items-center gap-2"> <Shield className="w-4 h-4 text-plasma" /> Public Research Archive</li>
                            <li className="flex items-center gap-2"> <Shield className="w-4 h-4 text-plasma" /> Common Vulnerability Feeds</li>
                            <li className="flex items-center gap-2"> <Shield className="w-4 h-4 text-plasma" /> Basic Lab Access</li>
                        </ul>
                        <button className="w-full py-4 border border-ghost/20 rounded-full text-xs font-bold uppercase tracking-widest text-ghost hover:bg-ghost hover:text-void transition-all">Initialize Access</button>
                    </div>

                    {/* Performance */}
                    <div className="p-10 rounded-3xl-plus bg-graphite text-ghost border border-plasma/50 ring-8 ring-plasma/10 flex flex-col items-start gap-8 scale-105 z-10 shadow-3xl">
                        <div className="space-y-2">
                             <div className="font-mono text-[10px] text-plasma uppercase tracking-widest">Protocol Alpha</div>
                             <h3 className="text-2xl font-bold uppercase tracking-tight">Performance</h3>
                        </div>
                        <div className="text-5xl font-mono font-bold tracking-tighter">
                            $49<span className="text-lg font-normal text-ghost/40">/mo</span>
                        </div>
                        <ul className="space-y-4 text-sm font-mono text-ghost/60 flex-grow">
                             <li className="flex items-center gap-2"> <Shield className="w-4 h-4 text-plasma" /> Full Research Suite</li>
                             <li className="flex items-center gap-2"> <Shield className="w-4 h-4 text-plasma" /> Real-time Telemetry Data</li>
                             <li className="flex items-center gap-2"> <Shield className="w-4 h-4 text-plasma" /> Priority Lab Scheduling</li>
                             <li className="flex items-center gap-2"> <Shield className="w-4 h-4 text-plasma" /> Biometric Key Auth</li>
                        </ul>
                        <button className="magnetic-btn w-full py-4 bg-plasma text-void rounded-full text-xs font-bold uppercase tracking-widest overflow-hidden">
                            <span className="btn-layer bg-ghost"></span>
                            <span className="relative z-10">Deploy Protocol</span>
                        </button>
                    </div>

                    {/* Enterprise */}
                    <div className="p-10 rounded-3xl-plus bg-graphite/30 border border-ghost/10 flex flex-col items-start gap-8">
                        <div className="space-y-2">
                             <div className="font-mono text-[10px] text-ghost/40 uppercase tracking-widest">Protocol Omega</div>
                             <h3 className="text-2xl font-bold uppercase tracking-tight text-ghost">Enterprise</h3>
                        </div>
                        <div className="text-5xl font-mono font-bold tracking-tighter text-ghost">
                            $299<span className="text-lg font-normal text-ghost/40">/mo</span>
                        </div>
                        <ul className="space-y-4 text-sm font-mono text-ghost/60 flex-grow">
                            <li className="flex items-center gap-2"> <Shield className="w-4 h-4 text-plasma" /> Dedicated Infrastructure</li>
                            <li className="flex items-center gap-2"> <Shield className="w-4 h-4 text-plasma" /> White-Label Training</li>
                            <li className="flex items-center gap-2"> <Shield className="w-4 h-4 text-plasma" /> 24x7 Direct Research Link</li>
                        </ul>
                         <button className="w-full py-4 border border-ghost/20 rounded-full text-xs font-bold uppercase tracking-widest text-ghost hover:bg-ghost hover:text-void transition-all">Request Uplink</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-graphite text-ghost pt-32 pb-12 px-8 rounded-t-[4rem]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
                    <div className="col-span-2 space-y-8">
                        <div className="flex items-center gap-3">
                            <Shield className="w-8 h-8 text-plasma" />
                            <span className="text-4xl font-bold uppercase tracking-tighter">Blacklight</span>
                        </div>
                        <p className="max-w-xs text-ghost/40 font-mono text-sm leading-relaxed uppercase">
                            Securing shadow infrastructure for the next generation of decentralized networks. 
                            <br /> Built with raw precision for Cybersecurity News & Learning.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div className="font-bold text-xs uppercase tracking-widest">Navigation</div>
                        <ul className="space-y-4 text-sm text-ghost/40 font-medium">
                            <li><a href="#" className="hover:text-plasma transition-colors">Labs</a></li>
                            <li><a href="#" className="hover:text-plasma transition-colors">Research</a></li>
                            <li><a href="#" className="hover:text-plasma transition-colors">Academy</a></li>
                            <li><a href="#" className="hover:text-plasma transition-colors">Nodes</a></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <div className="font-bold text-xs uppercase tracking-widest">Legal</div>
                        <ul className="space-y-4 text-sm text-ghost/40 font-medium">
                            <li><a href="#" className="hover:text-plasma transition-colors">Privacy Protocol</a></li>
                            <li><a href="#" className="hover:text-plasma transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-plasma transition-colors">Security Audit</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-ghost/10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest">
                        <div className="w-2 h-2 rounded-full bg-[#34D399] shadow-[0_0_8px_#34D399] animate-pulse" />
                        System Operational // 21:05
                    </div>
                    <div className="text-[10px] font-mono text-ghost/20 uppercase tracking-widest">
                        © 2026 Blacklight Protocol. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}

// --- Main App ---

export default function App() {
  return (
    <main className="bg-void selection:bg-plasma selection:text-void">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <ProtocolSection />
      <Pricing />
      <Footer />
    </main>
  );
}
