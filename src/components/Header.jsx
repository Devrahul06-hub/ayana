import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

function Header({
  companyName,
  isDark,
  themeClasses,
  isMobileMenuOpen,
  onToggleTheme,
  onToggleMobileMenu,
  onCloseMobileMenu,
}) {
  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${themeClasses.line} ${isDark ? 'bg-slate-950/70' : 'bg-white/70'}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <motion.a
          href="#"
          whileHover={{ y: -1 }}
          className="text-lg font-semibold tracking-tight"
        >
          {companyName}
        </motion.a>
        <div className="hidden items-center gap-8 text-sm md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:opacity-70">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`inline-flex items-center rounded-full border p-2 ${themeClasses.line}`}
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            className={`inline-flex items-center rounded-full border p-2 md:hidden ${themeClasses.line}`}
            onClick={onToggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.25 }}
            className={`overflow-hidden border-t md:hidden ${themeClasses.line} ${isDark ? 'bg-slate-950/95' : 'bg-white/95'}`}
          >
            <div className="mx-auto flex max-w-6xl flex-col px-6 py-4 text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onCloseMobileMenu}
                  className={`rounded-lg px-3 py-2 transition ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
