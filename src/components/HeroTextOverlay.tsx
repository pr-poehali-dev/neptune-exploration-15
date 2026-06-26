export default function HeroTextOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
      <div
        className="mb-4 select-none"
        style={{
          fontSize: "clamp(80px, 18vw, 200px)",
          fontFamily: "var(--font-montserrat)",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          color: "hsl(0 90% 50%)",
          textShadow: `
            2px 2px 0px hsl(0 90% 30%),
            4px 4px 0px hsl(0 90% 22%),
            6px 6px 0px hsl(0 90% 15%),
            8px 8px 0px rgba(0,0,0,0.4),
            0 0 40px hsl(0 90% 50% / 0.6),
            0 0 80px hsl(0 90% 40% / 0.3)
          `,
          transform: "perspective(400px) rotateX(8deg)",
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