import React, { useMemo } from 'react';

const SeaweedCluster = ({ className, delay = "0s" }: { className?: string, delay?: string }) => {
  return (
    <svg className={className} viewBox="0 0 100 120" preserveAspectRatio="none">
      <style>
        {`
          .sway-leaf {
            transform-origin: bottom center;
            animation: sway 4s infinite ease-in-out;
          }
          .sway-leaf-fast {
            transform-origin: bottom center;
            animation: sway 3s infinite ease-in-out;
          }
          .sway-leaf-slow {
            transform-origin: bottom center;
            animation: sway 5s infinite ease-in-out;
          }
        `}
      </style>
      <g style={{ animationDelay: delay }}>
        {/* Back layer (dark green) */}
        <path className="sway-leaf-slow" d="M25 100 Q 15 70, 30 40 T 20 10 Q 30 25, 25 40 T 35 100 Z" fill="#3a5a40" />
        <path className="sway-leaf" d="M45 100 Q 35 60, 50 30 T 40 5 Q 50 20, 45 30 T 55 100 Z" fill="#3a5a40" />
        <path className="sway-leaf-fast" d="M65 100 Q 75 70, 60 40 T 70 10 Q 60 25, 65 40 T 55 100 Z" fill="#2d6a4f" />
        <path className="sway-leaf" d="M85 100 Q 95 75, 80 45 T 90 20 Q 80 35, 85 45 T 75 100 Z" fill="#2d6a4f" />
        <path className="sway-leaf-fast" d="M15 100 Q 5 80, 20 55 T 10 30 Q 20 40, 15 55 T 25 100 Z" fill="#3a5a40" />
        
        {/* Mid layer */}
        <path className="sway-leaf" d="M35 100 Q 25 65, 40 35 T 30 15 Q 40 25, 35 35 T 45 100 Z" fill="#52b788" />
        <path className="sway-leaf-slow" d="M55 100 Q 65 55, 50 25 T 60 5 Q 50 15, 55 25 T 45 100 Z" fill="#40916c" />
        <path className="sway-leaf" d="M75 100 Q 85 65, 70 35 T 80 15 Q 70 25, 75 35 T 65 100 Z" fill="#52b788" />
        
        {/* Front layer (light green) */}
        <path className="sway-leaf-fast" d="M30 100 Q 20 75, 35 50 T 25 25 Q 35 35, 30 50 T 40 100 Z" fill="#74c69d" />
        <path className="sway-leaf" d="M50 100 Q 40 65, 55 40 T 45 15 Q 55 30, 50 40 T 60 100 Z" fill="#95d5b2" />
        <path className="sway-leaf-slow" d="M70 100 Q 80 75, 65 50 T 75 25 Q 65 35, 70 50 T 60 100 Z" fill="#74c69d" />
        <path className="sway-leaf-fast" d="M40 100 Q 50 80, 35 55 T 45 30 Q 35 40, 40 55 T 50 100 Z" fill="#95d5b2" />
      </g>
      
      {/* Rocks */}
      <ellipse cx="35" cy="105" rx="25" ry="12" fill="#6c7a89" />
      <ellipse cx="65" cy="108" rx="20" ry="10" fill="#7f8c8d" />
      <ellipse cx="50" cy="112" rx="28" ry="8" fill="#5e6a75" />
    </svg>
  );
};

const Crab = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className}>
    {/* Legs */}
    <path d="M15 30 L 5 35 L 5 45" fill="none" stroke="#e74c3c" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M15 36 L 2 40 L 5 50" fill="none" stroke="#e74c3c" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M18 42 L 8 48 L 12 56" fill="none" stroke="#e74c3c" strokeWidth="3" strokeLinejoin="round"/>
    
    <path d="M49 30 L 59 35 L 59 45" fill="none" stroke="#e74c3c" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M49 36 L 62 40 L 59 50" fill="none" stroke="#e74c3c" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M46 42 L 56 48 L 52 56" fill="none" stroke="#e74c3c" strokeWidth="3" strokeLinejoin="round"/>
    
    {/* Claws */}
    <path d="M20 25 C 5 15, 5 5, 15 10 C 20 5, 25 15, 20 25" fill="#e74c3c"/>
    <path d="M44 25 C 59 15, 59 5, 49 10 C 44 5, 39 15, 44 25" fill="#e74c3c"/>
    
    {/* Eyes */}
    <line x1="26" y1="22" x2="24" y2="10" stroke="#e74c3c" strokeWidth="3"/>
    <circle cx="24" cy="8" r="3" fill="#fff"/>
    <circle cx="24" cy="8" r="1.5" fill="#000"/>
    
    <line x1="38" y1="22" x2="40" y2="10" stroke="#e74c3c" strokeWidth="3"/>
    <circle cx="40" cy="8" r="3" fill="#fff"/>
    <circle cx="40" cy="8" r="1.5" fill="#000"/>
    
    {/* Body */}
    <ellipse cx="32" cy="34" rx="20" ry="14" fill="#e74c3c" />
    <ellipse cx="32" cy="36" rx="14" ry="6" fill="#c0392b" />
  </svg>
);

const OceanBackground = () => {
  const bubbles = useMemo(() => {
    return [...Array(25)].map(() => ({
      left: `${Math.random() * 100}%`,
      size: `${10 + Math.random() * 20}px`,
      duration: `${6 + Math.random() * 8}s`,
      delay: `-${Math.random() * 10}s`
    }));
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(110vh) scale(0.5); opacity: 0; }
            50% { opacity: 0.6; }
            100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
          }
          @keyframes swimRight {
            0% { transform: translateX(-20vw) scaleX(1); }
            49% { transform: translateX(120vw) scaleX(1); }
            50% { transform: translateX(120vw) scaleX(-1); }
            100% { transform: translateX(-20vw) scaleX(-1); }
          }
          @keyframes swimLeft {
            0% { transform: translateX(120vw) scaleX(-1); }
            49% { transform: translateX(-20vw) scaleX(-1); }
            50% { transform: translateX(-20vw) scaleX(1); }
            100% { transform: translateX(120vw) scaleX(1); }
          }
          @keyframes sway {
            0%, 100% { transform: rotate(-8deg); }
            50% { transform: rotate(8deg); }
          }
          .ocean-bubble {
            animation: floatUp 8s infinite linear;
          }
          .ocean-fish-1 { animation: swimRight 28s infinite linear; }
          .ocean-fish-2 { animation: swimLeft 22s infinite linear; animation-delay: -7s; }
          .ocean-fish-3 { animation: swimRight 35s infinite linear; animation-delay: -15s; }
          .ocean-fish-4 { animation: swimLeft 25s infinite linear; animation-delay: -2s; }
          .ocean-seaweed {
            transform-origin: bottom center;
            animation: sway 4s infinite ease-in-out;
          }
          @keyframes walkAcrossRight {
            0% { transform: translateX(-20vw); }
            100% { transform: translateX(120vw); }
          }
          @keyframes walkAcrossLeft {
            0% { transform: translateX(120vw); }
            100% { transform: translateX(-20vw); }
          }
          @keyframes crabWobble {
            0%, 100% { transform: rotate(-8deg) translateY(0); }
            50% { transform: rotate(8deg) translateY(-4px); }
          }
          .crab-container-right {
            animation: walkAcrossRight 40s infinite linear;
          }
          .crab-container-left {
            animation: walkAcrossLeft 45s infinite linear;
            animation-delay: -10s;
          }
          .crab-wobble {
            animation: crabWobble 0.8s infinite ease-in-out;
          }
        `}
      </style>
      <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#5fbce8] via-[#3faebc] to-[#0c3547]">
        {/* Sun rays (light coming from above) */}
        <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-white/15 to-transparent opacity-30"></div>
        
        {/* Bubbles */}
        {bubbles.map((b, i) => (
          <div 
            key={i} 
            className="ocean-bubble absolute bottom-0 rounded-full border border-white/40 bg-white/10 backdrop-blur-[2px]"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              animationDuration: b.duration,
              animationDelay: b.delay
            }}
          />
        ))}

        {/* Fishes */}
        <div className="absolute top-[25%] w-max ocean-fish-1 opacity-70">
          <svg width="40" height="24" viewBox="0 0 24 24" fill="#ffb03a" className="drop-shadow-md">
            <path d="M22 12C22 12 18 18 12 18C8 18 4 15 2 15L2 19L0 12L2 5L2 9C4 9 8 6 12 6C18 6 22 12 22 12Z"/>
            <circle cx="17" cy="10" r="1.5" fill="#fff"/>
          </svg>
        </div>
        <div className="absolute top-[45%] w-max ocean-fish-2 opacity-60">
          <svg width="30" height="18" viewBox="0 0 24 24" fill="#ff7eb3" className="drop-shadow-md">
            <path d="M22 12C22 12 18 18 12 18C8 18 4 15 2 15L2 19L0 12L2 5L2 9C4 9 8 6 12 6C18 6 22 12 22 12Z"/>
            <circle cx="17" cy="10" r="1.5" fill="#fff"/>
          </svg>
        </div>
        <div className="absolute top-[65%] w-max ocean-fish-3 opacity-50">
          <svg width="50" height="30" viewBox="0 0 24 24" fill="#a0f0ed" className="drop-shadow-md">
            <path d="M22 12C22 12 18 18 12 18C8 18 4 15 2 15L2 19L0 12L2 5L2 9C4 9 8 6 12 6C18 6 22 12 22 12Z"/>
            <circle cx="17" cy="10" r="1.5" fill="#111"/>
          </svg>
        </div>
        <div className="absolute top-[15%] w-max ocean-fish-4 opacity-60">
          <svg width="35" height="20" viewBox="0 0 24 24" fill="#fbc531" className="drop-shadow-md">
            <path d="M22 12C22 12 18 18 12 18C8 18 4 15 2 15L2 19L0 12L2 5L2 9C4 9 8 6 12 6C18 6 22 12 22 12Z"/>
            <circle cx="17" cy="10" r="1.5" fill="#fff"/>
          </svg>
        </div>

        {/* Ocean Floor Sand */}
        <div className="absolute bottom-0 left-0 right-0 h-[20vh] min-h-[120px]" style={{
          background: 'linear-gradient(to bottom, #e3c9a3 0%, #c4a57d 100%)',
          clipPath: 'polygon(0 30%, 12% 15%, 25% 35%, 45% 10%, 65% 40%, 85% 20%, 100% 35%, 100% 100%, 0 100%)'
        }}></div>

        {/* Corals and Seaweed Container (Outside Clip Path) */}
        <div className="absolute bottom-0 left-0 right-0 h-[20vh] min-h-[120px] pointer-events-none">
          <div className="relative w-full h-full">
            {/* Seaweed Cluster 1 */}
            <SeaweedCluster className="absolute bottom-2 left-[5%] w-32 h-40 drop-shadow-xl" delay="0s" />
            
            {/* Seaweed Cluster 2 */}
            <SeaweedCluster className="absolute bottom-4 right-[15%] w-40 h-48 drop-shadow-xl transform -scale-x-100" delay="-2s" />

            {/* Additional details: Rocks & Starfish */}
            <div className="absolute bottom-1 left-[25%] w-12 h-6 bg-[#636e72] rounded-t-full blur-[0.5px] drop-shadow-md"></div>
            <div className="absolute bottom-2 left-[28%] w-8 h-5 bg-[#b2bec3] rounded-t-[40%] blur-[0.5px] drop-shadow-md"></div>
            
            {/* Small Starfish SVG */}
            <svg className="absolute bottom-2 left-[45%] w-6 h-6 rotate-12 drop-shadow-sm" viewBox="0 0 24 24" fill="#ff7675">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            
            {/* Small Starfish 2 */}
            <svg className="absolute bottom-4 right-[35%] w-5 h-5 -rotate-12 drop-shadow-sm" viewBox="0 0 24 24" fill="#fab1a0">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>

            {/* Tube Sponges / Corals */}
            <div className="absolute bottom-0 left-[55%] flex items-end gap-1">
              <div className="w-3 h-16 bg-[#fd79a8] rounded-t-full opacity-90 drop-shadow-md origin-bottom transform rotate-6"></div>
              <div className="w-4 h-20 bg-[#e84393] rounded-t-full opacity-90 drop-shadow-md"></div>
              <div className="w-3 h-14 bg-[#fd79a8] rounded-t-full opacity-90 drop-shadow-md origin-bottom transform -rotate-12"></div>
            </div>

            {/* Corals (static CSS shapes) */}
            <div className="absolute bottom-[-10px] left-[30%] w-20 h-24 bg-[#ff6b6b] rounded-t-full rounded-bl-full transform -rotate-12 blur-[1px] opacity-90 drop-shadow-xl"></div>
            <div className="absolute bottom-[-5px] left-[33%] w-14 h-16 bg-[#ff9f43] rounded-t-full rounded-br-full transform rotate-12 blur-[1px] opacity-90 drop-shadow-xl"></div>
            
            <div className="absolute bottom-[-20px] right-[40%] w-32 h-20 bg-[#f78fb3] rounded-t-[50%] blur-[1px] opacity-80 drop-shadow-xl"></div>
            <div className="absolute bottom-[-5px] right-[43%] w-12 h-24 bg-[#e77f67] rounded-t-full transform -rotate-6 blur-[1px] opacity-90 drop-shadow-xl"></div>

            {/* Crabs */}
            <div className="absolute bottom-2 left-0 w-full crab-container-right">
              <Crab className="w-12 h-12 crab-wobble drop-shadow-lg" />
            </div>
            
            <div className="absolute bottom-1 left-0 w-full crab-container-left z-20">
              <Crab className="w-10 h-10 crab-wobble drop-shadow-lg transform -scale-x-100" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OceanBackground;
