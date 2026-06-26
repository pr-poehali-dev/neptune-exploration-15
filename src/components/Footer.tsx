import Icon from "@/components/ui/icon"

const NeonESLogo = ({ size = 300 }: { size?: number }) => (
  <div
    className="flex items-center justify-center select-none animate-neon-pulse"
    style={{
      width: size,
      height: size * 0.7,
    }}
  >
    <span
      style={{
        fontFamily: "var(--font-montserrat)",
        fontWeight: 900,
        fontSize: size * 0.52,
        letterSpacing: "-0.04em",
        lineHeight: 1,
        color: "hsl(0 0% 8%)",
        textShadow: `
          0 1px 0 hsl(0 90% 70%),
          0 2px 0 hsl(0 90% 60%),
          0 3px 0 hsl(0 90% 50%),
          0 4px 0 hsl(0 90% 40%),
          0 5px 0 hsl(0 90% 30%),
          0 6px 0 hsl(0 90% 20%),
          0 0 20px hsl(0 100% 60%),
          0 0 40px hsl(0 100% 55%),
          0 0 80px hsl(0 100% 50%),
          0 0 120px hsl(0 100% 45%),
          inset 0 -2px 4px rgba(255,255,255,0.15)
        `,
        filter: "drop-shadow(0 0 30px hsl(0 100% 50%))",
        transform: "perspective(300px) rotateX(6deg)",
        background: "linear-gradient(180deg, hsl(0 90% 80%) 0%, hsl(0 90% 50%) 40%, hsl(0 90% 30%) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      ES
    </span>
  </div>
)

export default function Footer() {
  return (
    <footer className="w-full px-6 relative py-[0] mt-28 h-auto mb-0 bg-card">
      <div className="absolute top-8 right-6 text-accent text-2xl">+</div>
      <div className="absolute top-1/2 right-12 text-accent text-lg transform -translate-y-1/2">*</div>
      <div className="absolute bottom-12 right-20 text-accent text-xl">+</div>
      <div className="absolute top-16 right-32 text-accent text-sm">*</div>
      <div className="absolute bottom-8 right-8 text-accent text-lg">*</div>

      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1 max-w-lg mt-8">
            <h2
              className="text-foreground text-4xl md:text-5xl mb-8 leading-[3.5rem] md:leading-[4rem] font-semibold text-center md:text-left mt-0"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Мы — одна команда.
            </h2>

            <div className="space-y-4 text-foreground">
              <div className="flex items-start gap-3">
                <span className="text-accent mt-1">*</span>
                <p className="text-sm">ESCAPE-CS — это сообщество игроков Counter-Strike 1.6, объединённых одним сервером.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent mt-1">*</span>
                <p className="text-sm">Присоединяйся к нашим соцсетям, чтобы быть в курсе турниров и обновлений.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8 justify-center md:justify-start">
              <a
                href="#"
                aria-label="Telegram"
                className="flex items-center justify-center w-11 h-11 rounded-full border border-border bg-background/40 text-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300"
              >
                <Icon name="Send" size={20} />
              </a>
              <a
                href="#"
                aria-label="ВКонтакте"
                className="flex items-center justify-center w-11 h-11 rounded-full border border-border bg-background/40 text-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300"
              >
                <Icon name="Share2" size={20} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="flex items-center justify-center w-11 h-11 rounded-full border border-border bg-background/40 text-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300"
              >
                <Icon name="Youtube" size={20} />
              </a>
            </div>
          </div>

          <div className="hidden md:flex flex-1 justify-end items-center relative">
            <div className="relative flex items-center justify-center">
              <div
                className="absolute rounded-full"
                style={{
                  width: 280,
                  height: 280,
                  background: "radial-gradient(circle, hsl(0 90% 30% / 0.25) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              <NeonESLogo size={320} />
            </div>
          </div>
        </div>

        <div className="md:hidden flex justify-center mt-12">
          <div className="relative flex items-center justify-center">
            <div
              className="absolute rounded-full"
              style={{
                width: 220,
                height: 220,
                background: "radial-gradient(circle, hsl(0 90% 30% / 0.25) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <NeonESLogo size={260} />
          </div>
        </div>

        <div id="contact" className="w-full px-6 py-16 flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-0 border-t border-border mt-16">
          <div className="flex flex-col md:flex-row gap-2 text-center md:text-left">
            <h2 className="text-foreground font-mono text-xl font-bold">Готов в бой?</h2>
            <p className="text-foreground font-mono font-normal text-base">Регистрируйся и заходи на сервер</p>
          </div>

          <a href="#register">
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg whitespace-nowrap hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all duration-300 font-mono flex items-center gap-2">
              Зарегистрироваться
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10M7 17L17 7" />
              </svg>
            </button>
          </a>
        </div>

        <div className="w-full px-6 py-4 border-t border-border flex md:flex-row items-center justify-between gap-2 flex-row">
          <p className="text-muted-foreground text-sm font-mono">2025 ESCAPE-CS</p>
          <p className="text-muted-foreground text-sm font-mono">poehali.dev</p>
        </div>
      </div>
    </footer>
  )
}