export default function HeroTextOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
      <div
        className="mb-4 select-none animate-neon-pulse"
        style={{
          fontSize: "clamp(80px, 18vw, 200px)",
          fontFamily: "var(--font-montserrat)",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          background: "linear-gradient(180deg, hsl(0 90% 85%) 0%, hsl(0 90% 60%) 35%, hsl(0 90% 40%) 70%, hsl(0 90% 20%) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: `
            drop-shadow(0 0 12px hsl(0 100% 60%))
            drop-shadow(0 0 30px hsl(0 100% 55%))
            drop-shadow(0 0 60px hsl(0 100% 45%))
            drop-shadow(0 4px 8px rgba(0,0,0,0.8))
          `,
          transform: "perspective(500px) rotateX(10deg)",
        }}
      >
        ES
      </div>
      <h1
        className="text-2xl md:text-4xl font-bold tracking-[0.3em] mb-3"
        style={{
          fontFamily: "var(--font-montserrat)",
          color: "white",
          textShadow: "0 0 20px hsl(0 90% 50% / 0.8)",
        }}
      >
        ESCAPE-CS
      </h1>
      <p className="text-white/70 font-mono text-sm md:text-base tracking-widest">
        Игровой лагерь · Counter-Strike 1.6
      </p>
    </div>
  )
}