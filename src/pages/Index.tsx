import { useState } from "react"
import SplineScene from "@/components/SplineScene"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HeroTextOverlay from "@/components/HeroTextOverlay"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const AUTH_URL = "https://functions.poehali.dev/50837d9f-a330-4e5f-9f9d-13a7c0ac3c09"

type Mode = "register" | "login"
type User = { id: number; nickname: string; age: number; rating: number; hours_played: number }

const Index = () => {
  const [mode, setMode] = useState<Mode>("register")
  const [nickname, setNickname] = useState("")
  const [age, setAge] = useState("")
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState<User | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const body = mode === "register"
      ? { nickname, login, password, age: Number(age) }
      : { login, password }

    try {
      const res = await fetch(`${AUTH_URL}?action=${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Произошла ошибка")
      } else {
        if (mode === "login") {
          setUser(data.user)
        } else {
          setMode("login")
          setError("")
          setNickname("")
          setAge("")
          setPassword("")
          setError("Регистрация прошла успешно! Войдите в аккаунт.")
        }
      }
    } catch {
      setError("Ошибка соединения с сервером")
    } finally {
      setLoading(false)
    }
  }

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
          <div className="absolute top-8 left-8 text-foreground opacity-50 text-5xl font-extralight font-sans leading-[0rem]">+</div>
          <div className="absolute top-8 right-8 text-foreground opacity-50 text-5xl font-sans leading-[0] font-extralight">+</div>
          <div className="absolute bottom-8 left-8 text-foreground opacity-50 text-5xl font-sans font-extralight">+</div>
          <div className="absolute bottom-8 right-8 text-foreground opacity-50 text-5xl font-sans font-extralight">+</div>

          <div className="px-6 md:px-40">
            {user ? (
              <div className="flex flex-col items-center text-center gap-6 py-10">
                <Icon name="Trophy" size={48} className="text-accent" />
                <h2 className="text-foreground text-3xl font-bold" style={{ fontFamily: "var(--font-montserrat)" }}>
                  Добро пожаловать, {user.nickname}!
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl w-full mt-4">
                  <div className="flex flex-col items-center gap-1 p-5 rounded-2xl border border-border bg-background/40">
                    <Icon name="Trophy" size={22} className="text-accent" />
                    <span className="text-muted-foreground font-mono text-xs">Рейтинг</span>
                    <span className="text-foreground font-mono text-xl font-bold">{user.rating}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-5 rounded-2xl border border-border bg-background/40">
                    <Icon name="Clock" size={22} className="text-accent" />
                    <span className="text-muted-foreground font-mono text-xs">Часов на сервере</span>
                    <span className="text-foreground font-mono text-xl font-bold">{user.hours_played}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-5 rounded-2xl border border-border bg-background/40">
                    <Icon name="User" size={22} className="text-accent" />
                    <span className="text-muted-foreground font-mono text-xs">Возраст</span>
                    <span className="text-foreground font-mono text-xl font-bold">{user.age}</span>
                  </div>
                </div>
                <button
                  onClick={() => { setUser(null); setLogin(""); setPassword("") }}
                  className="text-muted-foreground font-mono text-xs hover:text-accent transition-colors mt-2"
                >
                  Выйти из аккаунта
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center text-center mb-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="Crosshair" size={28} className="text-accent" />
                    <span className="text-accent font-mono text-sm tracking-widest uppercase">
                      {mode === "register" ? "Регистрация бойца" : "Вход в аккаунт"}
                    </span>
                  </div>
                  <h2 className="text-foreground text-3xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-montserrat)" }}>
                    {mode === "register" ? "Вступай в лагерь CS 1.6" : "С возвращением, боец"}
                  </h2>
                  <p className="text-muted-foreground font-mono text-sm mt-3 max-w-lg">
                    Создай аккаунт, отслеживай свой рейтинг и часы, проведённые на сервере.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-4">
                  {mode === "register" && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-accent font-mono text-xs">Никнейм</label>
                        <Input
                          placeholder="de_dust2_pro"
                          className="bg-background/50 border-border font-mono"
                          value={nickname}
                          onChange={e => setNickname(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-accent font-mono text-xs">Возраст</label>
                        <Input
                          type="number"
                          placeholder="16"
                          className="bg-background/50 border-border font-mono"
                          value={age}
                          onChange={e => setAge(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <label className="text-accent font-mono text-xs">Логин</label>
                    <Input
                      placeholder="Ваш логин"
                      className="bg-background/50 border-border font-mono"
                      value={login}
                      onChange={e => setLogin(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-accent font-mono text-xs">Пароль</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-background/50 border-border font-mono"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <p className={`font-mono text-xs text-center ${error.includes("успешно") ? "text-green-400" : "text-red-400"}`}>
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-primary-foreground rounded-full py-6 mt-2 font-semibold text-base hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all duration-300 disabled:opacity-60 disabled:scale-100"
                  >
                    <Icon name={loading ? "Loader" : "Zap"} size={18} className={`mr-2 ${loading ? "animate-spin" : ""}`} />
                    {loading ? "Загрузка..." : mode === "register" ? "Зарегистрироваться" : "Войти"}
                  </Button>

                  <p className="text-center text-muted-foreground font-mono text-xs mt-2">
                    {mode === "register" ? (
                      <>Уже в команде? <button type="button" onClick={() => { setMode("login"); setError("") }} className="text-accent hover:underline">Войти в аккаунт</button></>
                    ) : (
                      <>Нет аккаунта? <button type="button" onClick={() => { setMode("register"); setError("") }} className="text-accent hover:underline">Зарегистрироваться</button></>
                    )}
                  </p>
                </form>

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
              </>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default Index
