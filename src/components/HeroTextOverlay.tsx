export default function HeroTextOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
      <div className="mb-4 select-none animate-neon-pulse w-full" style={{ maxWidth: "min(90vw, 700px)" }}>
        <svg
          viewBox="0 0 400 200"
          width="100%"
          overflow="visible"
        >
          <defs>
            <linearGradient id="hero-es-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(0,90%,88%)" />
              <stop offset="35%" stopColor="hsl(0,90%,62%)" />
              <stop offset="70%" stopColor="hsl(0,90%,42%)" />
              <stop offset="100%" stopColor="hsl(0,90%,18%)" />
            </linearGradient>
            <linearGradient id="hero-stroke-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(0,100%,98%)" />
              <stop offset="50%" stopColor="hsl(0,100%,70%)" />
              <stop offset="100%" stopColor="hsl(0,100%,45%)" />
            </linearGradient>
          </defs>
          <text
            x="50%"
            y="78%"
            textAnchor="middle"
            dominantBaseline="auto"
            fill="url(#hero-es-grad)"
            stroke="url(#hero-stroke-grad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 900,
              fontSize: 160,
              letterSpacing: "-4px",
            }}
          >
            ES
          </text>
        </svg>
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
