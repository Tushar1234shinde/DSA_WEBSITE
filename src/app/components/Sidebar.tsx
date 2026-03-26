import { ChevronDown, ChevronRight, Layers3, WandSparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { algorithmCategories } from "../data/algorithms";
import { ScrollArea } from "./ui/scroll-area";

interface SidebarProps {
  searchQuery: string;
  selectedAlgorithm: string;
  onSelectAlgorithm: (algorithm: string) => void;
}

export const Sidebar = ({
  searchQuery,
  selectedAlgorithm,
  onSelectAlgorithm,
}: SidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "Sorting Algorithms",
    "Searching Algorithms",
  ]);

  const filteredCategories = useMemo(
    () =>
      algorithmCategories
        .map((category) => ({
          ...category,
          items: category.items.filter((item) => {
            const query = searchQuery.trim().toLowerCase();
            if (!query) return true;
            return (
              item.toLowerCase().includes(query) ||
              category.name.toLowerCase().includes(query)
            );
          }),
        }))
        .filter((category) => category.items.length > 0),
    [searchQuery],
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories((previousValue) =>
      previousValue.includes(category)
        ? previousValue.filter((item) => item !== category)
        : [...previousValue, category],
    );
  };

  return (
    <aside className="border-b border-white/30 bg-white/55 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/45 lg:w-[320px] lg:border-b-0 lg:border-r">
      <div className="border-b border-white/30 p-4 dark:border-slate-800/80">
        <div className="rounded-3xl bg-slate-950 px-4 py-4 text-white shadow-xl shadow-slate-950/20 dark:bg-slate-900">
          <div className="mb-2 flex items-center gap-2 text-sky-300">
            <WandSparkles className="size-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em]">
              Live Studio
            </span>
          </div>
          <p className="text-sm leading-6 text-slate-200">
            Pick an algorithm, generate sample data, and walk through each state
            like you are presenting it on a whiteboard.
          </p>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)] lg:h-[calc(100vh-4rem)]">
        <div className="p-3">
          {filteredCategories.map((category) => {
            const isExpanded = expandedCategories.includes(category.name);

            return (
              <section key={category.name} className="mb-3 rounded-3xl border border-white/40 bg-white/70 p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                <button
                  type="button"
                  onClick={() => toggleCategory(category.name)}
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <div className="flex size-9 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                    <Layers3 className="size-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {category.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {category.items.length} topic{category.items.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="size-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="size-4 text-slate-400" />
                  )}
                </button>

                {isExpanded ? (
                  <div className="mt-2 space-y-2 px-2 pb-2">
                    {category.items.map((item, index) => {
                      const isActive = selectedAlgorithm === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => onSelectAlgorithm(item)}
                          className={`group relative w-full overflow-hidden rounded-2xl border px-4 py-3 text-left transition ${
                            isActive
                              ? "border-sky-300 bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/20"
                              : "border-transparent bg-slate-50 text-slate-700 hover:border-slate-200 hover:bg-white dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                          }`}
                        >
                          <div className="absolute inset-y-0 left-0 w-1 bg-orange-400 opacity-0 transition group-hover:opacity-100" />
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-medium">{item}</span>
                            <span
                              className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                                isActive
                                  ? "bg-white/20 text-white"
                                  : "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                              }`}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
};
