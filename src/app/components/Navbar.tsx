import { BookOpenText, Moon, Search, Sparkles, Sun } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useTheme } from "../contexts/ThemeContext";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const Navbar = ({ searchQuery, onSearchChange }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-20 border-b border-white/30 bg-white/70 px-4 py-3 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/75 md:px-6">
      <div className="mx-auto flex max-w-7xl items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-400 to-orange-400 text-white shadow-lg shadow-sky-500/25">
            <BookOpenText className="size-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              DSA Visualizer Lab
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Step-by-step algorithm playback with animated boxes
            </p>
          </div>
        </div>

        <div className="relative ml-auto hidden max-w-xl flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search algorithms or categories"
            className="h-11 rounded-2xl border-white/60 bg-white/75 pl-10 shadow-sm dark:border-slate-700 dark:bg-slate-900/80"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300 lg:flex">
            <Sparkles className="size-3.5" />
            Ready for demos
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full border-white/60 bg-white/70 dark:border-slate-700 dark:bg-slate-900/80"
          >
            {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-3 max-w-7xl md:hidden">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search algorithms"
            className="h-11 rounded-2xl border-white/60 bg-white/75 pl-10 shadow-sm dark:border-slate-700 dark:bg-slate-900/80"
          />
        </div>
      </div>
    </nav>
  );
};
