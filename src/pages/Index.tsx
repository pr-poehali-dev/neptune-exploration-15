import SplineScene from "@/components/SplineScene"
import Header from "@/components/Header"
import RotatingTextAccent from "@/components/RotatingTextAccent"
import Footer from "@/components/Footer"
import HeroTextOverlay from "@/components/HeroTextOverlay"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const Index = () => {
  return (
    <div className="w-full min-h-screen py-0 bg-background">
      <div className="max-w-[1200px] mx-auto">
        <main className="w-full relative h-[600px]">
          <Header />
          <SplineScene />
          <HeroTextOverlay />
        </main>

        <section
          id="register"
          className="relative rounded-4xl py-7 mx-4 md:mx-0 w-[calc(100%-2rem)] md:w-full bg-card border border-solid border-border pb-20"
          style={{
            backgroundImage: `
              linear-gradient(var(--border) 1px, transparent 1px),
              linear-gradient(90deg, var(--border) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        >
          <div className="absolute top-8 left-8 text-foreground opacity-50 text-5xl font-extralight font-sans leading-[0rem]">
            +
          </div>
          <div className="absolute top-8 right-8 text-foreground opacity-50 text-5xl font-sans leading-[0] font-extralight">
            +
          </div>
          <div className="absolute bottom-8 left-8 text-foreground opacity-50 text-5xl font-sans font-extralight">
            +
          </div>
          <div className="absolute bottom-8 right-8 text-foreground opacity-50 text-5xl font-sans font-extralight">
            +
          </div>

          <div className="px-6 md:px-40">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Crosshair" size={28} className="text-accent" />
                <span className="text-accent font-mono text-sm tracking-widest uppercase">Регистрация бойца</span>
              </div>
              <h2 className="text-foreground text-3xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-montserrat)" }}>
                Вступай в лагерь CS 1.6
              </h2>
              <p className="text-muted-foreground font-mono text-sm mt-3 max-w-lg">
                Создай аккаунт, отслеживай свой рейтинг и часы, проведённые на сервере.
              </p>
            </div>

            <div className="max-w-xl mx-auto flex flex-col gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-accent font-mono text-xs">Никнейм</label>
                  <Input placeholder="de_dust2_pro" className="bg-background/50 border-border font-mono" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-accent font-mono text-xs">Возраст</label>
                  <Input type="number" placeholder="16" className="bg-background/50 border-border font-mono" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-accent font-mono text-xs">Логин</label>
                <Input placeholder="Ваш логин для входа" className="bg-background/50 border-border font-mono" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-accent font-mono text-xs">Пароль</label>
                <Input type="password" placeholder="••••••••" className="bg-background/50 border-border font-mono" />
              </div>

              <Button className="bg-primary text-primary-foreground rounded-full py-6 mt-2 font-semibold text-base hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all duration-300">
                <Icon name="Zap" size={18} className="mr-2" />
                Зарегистрироваться
              </Button>

              <p className="text-center text-muted-foreground font-mono text-xs mt-2">
                Уже в команде? <a href="#" className="text-accent hover:underline">Войти в аккаунт</a>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto">
              <div className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-border bg-background/40">
                <Icon name="Trophy" size={26} className="text-accent" />
                <span className="text-foreground font-mono text-sm font-bold">Рейтинг</span>
                <span className="text-muted-foreground font-mono text-xs text-center">Личная статистика и таблица лидеров</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-border bg-background/40">
                <Icon name="Clock" size={26} className="text-accent" />
                <span className="text-foreground font-mono text-sm font-bold">Часы на сервере</span>
                <span className="text-muted-foreground font-mono text-xs text-center">Учёт времени, проведённого в игре</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-border bg-background/40">
                <Icon name="Users" size={26} className="text-accent" />
                <span className="text-foreground font-mono text-sm font-bold">Сообщество</span>
                <span className="text-muted-foreground font-mono text-xs text-center">Соцсети и общение с командой</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default Index