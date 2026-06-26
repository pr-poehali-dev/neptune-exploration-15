import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const ADMIN_URL = "https://functions.poehali.dev/d6dc0e77-4d5d-4713-9517-88a07104a328"

type User = {
  id: number
  nickname: string
  login: string
  age: number
  rating: number
  hours_played: number
  created_at: string
}

type Stats = { total: number; today: number }

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem("admin_token") || "")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [loginLoading, setLoginLoading] = useState(false)

  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [editRating, setEditRating] = useState("")
  const [editHours, setEditHours] = useState("")
  const [search, setSearch] = useState("")

  const api = (action: string, method = "GET", body?: object) =>
    fetch(`${ADMIN_URL}?action=${action}`, {
      method,
      headers: { "Content-Type": "application/json", "X-Admin-Token": token },
      body: body ? JSON.stringify(body) : undefined,
    }).then(r => r.json())

  const loadUsers = async () => {
    setLoading(true)
    const data = await api("users")
    if (data.ok) { setUsers(data.users); setStats(data.stats) }
    setLoading(false)
  }

  useEffect(() => { if (token) loadUsers() }, [token])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError("")
    const res = await fetch(`${ADMIN_URL}?action=login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
    const data = await res.json()
    if (data.ok) {
      sessionStorage.setItem("admin_token", data.token)
      setToken(data.token)
    } else {
      setLoginError(data.error || "Ошибка")
    }
    setLoginLoading(false)
  }

  const handleDelete = async (id: number, nickname: string) => {
    if (!confirm(`Удалить участника «${nickname}»?`)) return
    await api("delete", "POST", { id })
    setUsers(u => u.filter(x => x.id !== id))
    setStats(s => s ? { ...s, total: s.total - 1 } : s)
  }

  const handleEdit = (user: User) => {
    setEditId(user.id)
    setEditRating(String(user.rating))
    setEditHours(String(user.hours_played))
  }

  const handleSave = async (id: number) => {
    await api("update", "POST", { id, rating: Number(editRating), hours_played: Number(editHours) })
    setUsers(u => u.map(x => x.id === id ? { ...x, rating: Number(editRating), hours_played: Number(editHours) } : x))
    setEditId(null)
  }

  const filtered = users.filter(u =>
    u.nickname.toLowerCase().includes(search.toLowerCase()) ||
    u.login.toLowerCase().includes(search.toLowerCase())
  )

  // Экран входа
  if (!token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div
          className="w-full max-w-sm bg-card border border-border rounded-2xl p-8"
          style={{
            backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
              <Icon name="Shield" size={28} className="text-accent" />
            </div>
            <h1 className="text-foreground text-xl font-bold font-mono tracking-widest">ESCAPE-CS</h1>
            <p className="text-muted-foreground font-mono text-xs mt-1">Панель администратора</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-accent font-mono text-xs">Пароль администратора</label>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-background/50 border-border font-mono"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {loginError && <p className="text-red-400 font-mono text-xs text-center">{loginError}</p>}
            <Button
              type="submit"
              disabled={loginLoading}
              className="bg-primary text-primary-foreground rounded-full py-5 font-semibold hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all duration-300"
            >
              <Icon name={loginLoading ? "Loader" : "LogIn"} size={16} className={`mr-2 ${loginLoading ? "animate-spin" : ""}`} />
              {loginLoading ? "Вход..." : "Войти"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-muted-foreground font-mono text-xs hover:text-accent transition-colors">
              ← Вернуться на сайт
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Панель
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Шапка */}
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon name="Shield" size={22} className="text-accent" />
          <span className="font-mono font-bold text-lg tracking-widest" style={{ color: "hsl(0 90% 55%)" }}>ESCAPE-CS</span>
          <span className="text-muted-foreground font-mono text-sm">/ admin</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="text-muted-foreground font-mono text-xs hover:text-accent transition-colors">← На сайт</a>
          <Button
            onClick={() => { sessionStorage.removeItem("admin_token"); setToken("") }}
            variant="outline"
            className="font-mono text-xs border-border"
          >
            <Icon name="LogOut" size={14} className="mr-1" /> Выйти
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Статистика */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-1">
              <span className="text-muted-foreground font-mono text-xs">Всего участников</span>
              <span className="text-foreground font-mono text-3xl font-bold">{stats.total}</span>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-1">
              <span className="text-muted-foreground font-mono text-xs">Новых сегодня</span>
              <span className="text-accent font-mono text-3xl font-bold">{stats.today}</span>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-1">
              <span className="text-muted-foreground font-mono text-xs">Средний рейтинг</span>
              <span className="text-foreground font-mono text-3xl font-bold">
                {users.length ? Math.round(users.reduce((s, u) => s + u.rating, 0) / users.length) : 0}
              </span>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-1">
              <span className="text-muted-foreground font-mono text-xs">Ср. часов на сервере</span>
              <span className="text-foreground font-mono text-3xl font-bold">
                {users.length ? Math.round(users.reduce((s, u) => s + u.hours_played, 0) / users.length) : 0}
              </span>
            </div>
          </div>
        )}

        {/* Поиск и обновление */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по нику или логину..."
              className="pl-9 bg-card border-border font-mono text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Button onClick={loadUsers} variant="outline" className="border-border font-mono text-xs">
            <Icon name={loading ? "Loader" : "RefreshCw"} size={14} className={`mr-1 ${loading ? "animate-spin" : ""}`} />
            Обновить
          </Button>
        </div>

        {/* Таблица */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-muted-foreground font-mono text-xs">ID</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-mono text-xs">Никнейм</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-mono text-xs">Логин</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-mono text-xs">Возраст</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-mono text-xs">Рейтинг</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-mono text-xs">Часы</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-mono text-xs">Дата регистрации</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-mono text-xs">Действия</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={8} className="text-center py-12 text-muted-foreground font-mono text-sm">Загрузка...</td></tr>
                )}
                {!loading && filtered.length === 0 && (
                  <tr><td colSpan={8} className="text-center py-12 text-muted-foreground font-mono text-sm">Участники не найдены</td></tr>
                )}
                {filtered.map(user => (
                  <tr key={user.id} className="border-b border-border/50 hover:bg-background/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{user.id}</td>
                    <td className="px-4 py-3 font-mono text-sm font-bold text-foreground">{user.nickname}</td>
                    <td className="px-4 py-3 font-mono text-sm text-muted-foreground">{user.login}</td>
                    <td className="px-4 py-3 font-mono text-sm">{user.age}</td>
                    <td className="px-4 py-3">
                      {editId === user.id ? (
                        <Input
                          type="number"
                          value={editRating}
                          onChange={e => setEditRating(e.target.value)}
                          className="w-20 h-7 text-xs font-mono bg-background border-border"
                        />
                      ) : (
                        <span className="font-mono text-sm text-accent font-bold">{user.rating}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editId === user.id ? (
                        <Input
                          type="number"
                          value={editHours}
                          onChange={e => setEditHours(e.target.value)}
                          className="w-20 h-7 text-xs font-mono bg-background border-border"
                        />
                      ) : (
                        <span className="font-mono text-sm">{user.hours_played}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString("ru-RU")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {editId === user.id ? (
                          <>
                            <button
                              onClick={() => handleSave(user.id)}
                              className="text-green-400 hover:text-green-300 transition-colors"
                              title="Сохранить"
                            >
                              <Icon name="Check" size={16} />
                            </button>
                            <button
                              onClick={() => setEditId(null)}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              title="Отмена"
                            >
                              <Icon name="X" size={16} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(user)}
                              className="text-muted-foreground hover:text-accent transition-colors"
                              title="Редактировать"
                            >
                              <Icon name="Pencil" size={15} />
                            </button>
                            <button
                              onClick={() => handleDelete(user.id, user.nickname)}
                              className="text-muted-foreground hover:text-red-400 transition-colors"
                              title="Удалить"
                            >
                              <Icon name="Trash2" size={15} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
