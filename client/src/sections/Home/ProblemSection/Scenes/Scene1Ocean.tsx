import { motion, MotionValue, useTransform } from "motion/react";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function Scene1Ocean({ scrollYProgress }: Props) {
  // Perlebar fade out agar scene terlihat lebih lam
  const opacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  return (
    <motion.div style={{ opacity }} className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center overflow-hidden">
      
      {/* Sky-to-ocean gradient background — blends from HeroSection teal */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #1a7a8e 0%, #7DD3FC 20%, #38BDF8 45%, #0e6b80 70%, #0C3547 100%)",
        }}
      />
      {/* ── Light Rays from Sun ── */}
      <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] pointer-events-none">
        {[0, 30, 60, 90, 120, 150].map((angle, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 origin-left"
            style={{
              width: '280px',
              height: '2px',
              background: `linear-gradient(90deg, rgba(251,191,36,${0.3 - i * 0.03}), transparent)`,
              transform: `rotate(${angle + 160}deg)`,
              filter: 'blur(2px)',
            }}
          />
        ))}
      </div>

      {/* ── Sun (Vivid & Multi-layered) ── */}
      <div className="absolute top-[12%] right-[8%]">
        {/* Outermost glow */}
        <div className="absolute -inset-24 bg-amber-300/10 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '4s' }} />
        {/* Large glow */}
        <div className="absolute -inset-16 bg-amber-200/20 rounded-full blur-3xl" />
        {/* Medium glow */}
        <div className="absolute -inset-8 bg-amber-300/35 rounded-full blur-2xl" />
        {/* Inner glow */}
        <div className="absolute -inset-2 bg-amber-100/50 rounded-full blur-xl" />
        {/* Sun core */}
        <div className="w-20 h-20 bg-gradient-to-br from-amber-100 via-yellow-200 to-amber-300 rounded-full blur-[2px] shadow-[0_0_60px_rgba(251,191,36,0.5)]" />
      </div>

      {/* ── Clouds ── */}
      <div className="absolute top-[8%] left-[5%] opacity-60">
        <svg width="200" height="60" viewBox="0 0 200 60" fill="none">
          <ellipse cx="60" cy="40" rx="60" ry="20" fill="white" opacity="0.3" />
          <ellipse cx="90" cy="30" rx="50" ry="22" fill="white" opacity="0.35" />
          <ellipse cx="130" cy="38" rx="45" ry="18" fill="white" opacity="0.25" />
        </svg>
      </div>
      <div className="absolute top-[15%] left-[35%] opacity-40">
        <svg width="160" height="50" viewBox="0 0 160 50" fill="none">
          <ellipse cx="50" cy="30" rx="50" ry="18" fill="white" opacity="0.3" />
          <ellipse cx="80" cy="22" rx="40" ry="20" fill="white" opacity="0.35" />
          <ellipse cx="110" cy="30" rx="35" ry="15" fill="white" opacity="0.25" />
        </svg>
      </div>
      <div className="absolute top-[6%] right-[30%] opacity-30">
        <svg width="140" height="45" viewBox="0 0 140 45" fill="none">
          <ellipse cx="45" cy="28" rx="45" ry="16" fill="white" opacity="0.4" />
          <ellipse cx="75" cy="20" rx="38" ry="18" fill="white" opacity="0.35" />
          <ellipse cx="100" cy="28" rx="32" ry="14" fill="white" opacity="0.3" />
        </svg>
      </div>

      {/* ── Ocean Waves (Higher opacity, multiple layers) ── */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] opacity-70">
        {/* Deep water base */}
        <div className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-[#0C3547] to-transparent" />
        
        {/* Wave layer 1 - back */}
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full" style={{ height: '100%' }} preserveAspectRatio="none">
          <path fill="#38BDF8" fillOpacity="0.35" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,192C960,203,1056,181,1152,149.3C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            <animate attributeName="d" dur="6s" repeatCount="indefinite"
              values="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,192C960,203,1056,181,1152,149.3C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,128L48,154.7C96,181,192,235,288,240C384,245,480,203,576,186.7C672,171,768,181,864,170.7C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,192C960,203,1056,181,1152,149.3C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>
        </svg>
        
        {/* Wave layer 2 - middle */}
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full" style={{ height: '85%' }} preserveAspectRatio="none">
          <path fill="#0F4C81" fillOpacity="0.55" d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,224C840,245,960,267,1080,256C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
            <animate attributeName="d" dur="8s" repeatCount="indefinite"
              values="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,224C840,245,960,267,1080,256C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z;M0,192L60,208C120,224,240,256,360,261.3C480,267,600,245,720,213.3C840,181,960,139,1080,138.7C1200,139,1320,181,1380,202.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z;M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,224C840,245,960,267,1080,256C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </path>
        </svg>

        {/* Wave layer 3 - front (darkest) */}
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full" style={{ height: '65%' }} preserveAspectRatio="none">
          <path fill="#0A2540" fillOpacity="0.7" d="M0,256L60,245.3C120,235,240,213,360,208C480,203,600,213,720,229.3C840,245,960,267,1080,261.3C1200,256,1320,224,1380,208L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
          </path>
        </svg>
      </div>

      {/* ── Distant Boat (More detailed) ── */}
      <div className="absolute top-[50%] right-[22%] opacity-70">
        <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
          {/* Hull */}
          <path d="M 10 35 Q 15 48 40 48 Q 65 48 70 35 Z" fill="#1E293B" opacity="0.9" />
          <path d="M 12 35 Q 15 46 40 46 Q 65 46 68 35" stroke="#38BDF8" strokeWidth="0.8" fill="none" opacity="0.4" />
          {/* Mast */}
          <line x1="38" y1="35" x2="38" y2="8" stroke="#334155" strokeWidth="2" />
          {/* Sail 1 */}
          <path d="M 38 10 L 38 32 L 58 32 Z" fill="#E2E8F0" opacity="0.8" />
          <path d="M 38 10 L 38 32 L 58 32 Z" stroke="#94A3B8" strokeWidth="0.5" fill="none" />
          {/* Sail 2 */}
          <path d="M 38 12 L 38 30 L 22 30 Z" fill="#CBD5E1" opacity="0.6" />
          {/* Flag */}
          <path d="M 38 8 L 48 12 L 38 16" fill="#EF4444" opacity="0.7" />
          {/* Water reflection */}
          <ellipse cx="40" cy="52" rx="30" ry="4" fill="#38BDF8" opacity="0.15" />
        </svg>
      </div>

      {/* ── Second distant boat (smaller) ── */}
      <div className="absolute top-[55%] left-[15%] opacity-40 scale-75">
        <svg width="50" height="35" viewBox="0 0 50 35" fill="none">
          <path d="M 5 20 Q 8 28 25 28 Q 42 28 45 20 Z" fill="#1E293B" opacity="0.7" />
          <line x1="24" y1="20" x2="24" y2="6" stroke="#334155" strokeWidth="1.5" />
          <path d="M 24 7 L 24 19 L 36 19 Z" fill="#E2E8F0" opacity="0.5" />
        </svg>
      </div>

      {/* ── Sea Birds ── */}
      <div className="absolute top-[25%] left-[20%] opacity-50">
        <svg width="30" height="12" viewBox="0 0 30 12" fill="none">
          <path d="M 0 8 Q 7 2 15 6 Q 23 2 30 8" stroke="#475569" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute top-[22%] left-[28%] opacity-35 scale-75">
        <svg width="30" height="12" viewBox="0 0 30 12" fill="none">
          <path d="M 0 8 Q 7 2 15 6 Q 23 2 30 8" stroke="#475569" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute top-[28%] left-[24%] opacity-25 scale-50">
        <svg width="30" height="12" viewBox="0 0 30 12" fill="none">
          <path d="M 0 8 Q 7 2 15 6 Q 23 2 30 8" stroke="#475569" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* ── Bubbles (higher opacity, more varied) ── */}
      <div className="absolute bottom-[8%] left-[18%] w-3 h-3 rounded-full border-2 border-sky-300/70 animate-ping" style={{ animationDuration: "3s" }} />
      <div className="absolute bottom-[18%] left-[38%] w-4 h-4 rounded-full border-2 border-sky-200/50 animate-ping" style={{ animationDuration: "4s", animationDelay: "1s" }} />
      <div className="absolute bottom-[12%] left-[58%] w-2.5 h-2.5 rounded-full border border-sky-300/80 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
      <div className="absolute bottom-[22%] left-[50%] w-2 h-2 rounded-full border border-sky-200/40 animate-ping" style={{ animationDuration: "5s", animationDelay: "2s" }} />
      <div className="absolute bottom-[6%] left-[72%] w-3 h-3 rounded-full border border-sky-300/60 animate-ping" style={{ animationDuration: "3.5s", animationDelay: "1.5s" }} />

      {/* ── Underwater particles (subtle fish silhouettes) ── */}
      <div className="absolute bottom-[15%] left-[30%] opacity-25">
        <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
          <path d="M 0 5 Q 5 0 10 5 Q 5 10 0 5 Z" fill="#38BDF8" />
          <path d="M 10 5 L 16 2 L 16 8 Z" fill="#38BDF8" />
        </svg>
      </div>
      <div className="absolute bottom-[25%] left-[65%] opacity-20 scale-75">
        <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
          <path d="M 0 5 Q 5 0 10 5 Q 5 10 0 5 Z" fill="#38BDF8" />
          <path d="M 10 5 L 16 2 L 16 8 Z" fill="#38BDF8" />
        </svg>
      </div>
    </motion.div>
  );
}
