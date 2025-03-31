import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "../../../infrastructure/context/themeProvider/themeProvider"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`${theme === 'dark' ? 'from-indigo-900 to-purple-900' : ''} relative h-10 w-20 rounded-full bg-gradient-to-r from-blue-200 to-blue-300 p-1 transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
        aria-label="Toggle theme"
      >
        <div className="flex h-full w-full items-center justify-between px-1.5">
          <Sun className="h-5 w-5 text-yellow-500" />
          <Moon className="h-5 w-5 text-slate-200" />
        </div>
        <div
          className={`absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-500 ${
            theme === "dark" ? "translate-x-10 bg-slate-800" : "translate-x-0"
          }`}
        >
          {theme === "dark" ? (
            <Moon className="h-5 w-5 text-yellow-300" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-500" />
          )}
        </div>
      </button>
    </div>
  )
}