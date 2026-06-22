import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Grid3x3, Maximize2 } from "lucide-react";
import { IntroSlide } from "./slides/IntroSlide";
import { WhatIsSlide } from "./slides/WhatIsSlide";
import { InstallSlide } from "./slides/InstallSlide";
import { ProblemSlide } from "./slides/ProblemSlide";
import { ComparisonSlide } from "./slides/ComparisonSlide";
import { ConceptsSlide } from "./slides/ConceptsSlide";
import { ExampleSlide } from "./slides/ExampleSlide";
import { DemoSlide } from "./slides/DemoSlide";
import { AdvantagesSlide } from "./slides/AdvantagesSlide";
import { CodingSlide } from "./slides/CodingSlide";

const slides = [
  { id: "intro", title: "Introdução", Comp: IntroSlide },
  { id: "what", title: "O que é?", Comp: WhatIsSlide },
  { id: "install", title: "Instalação", Comp: InstallSlide },
  { id: "problem", title: "O Problema", Comp: ProblemSlide },
  { id: "comparison", title: "Comparação", Comp: ComparisonSlide },
  { id: "concepts", title: "Conceitos", Comp: ConceptsSlide },
  { id: "example", title: "Exemplo", Comp: ExampleSlide },
  { id: "demo", title: "Demo", Comp: DemoSlide },
  { id: "codando", title: "Codando", Comp: CodingSlide },
  { id: "advantages", title: "Vantagens", Comp: AdvantagesSlide },
];

export function Presentation() {
  const [index, setIndex] = useState(0);
  const [overview, setOverview] = useState(false);

  const next = useCallback(
    () => setIndex((i) => Math.min(i + 1, slides.length - 1)),
    [],
  );
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key.toLowerCase() === "g") setOverview((v) => !v);
      else if (e.key.toLowerCase() === "f")
        document.documentElement.requestFullscreen?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const Current = slides[index].Comp;
  
  return (
    <div className="bg-hero relative flex h-screen w-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute -top-32 right-0 size-[40rem] rounded-full bg-pink/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-0 size-[35rem] rounded-full bg-pink/5 blur-3xl" />

      <header className="relative z-20 flex items-center justify-between border-b border-border/40 bg-background/30 px-6 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="grid size-8 place-items-center rounded-lg bg-pink-gradient">
            <img src="./image.png" alt="" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">React Hook Form</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Apresentação
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-8 bg-pink"
                  : "w-3 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={s.title}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => setOverview((v) => !v)}
            className="rounded-md border border-border/60 p-1.5 text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
            title="Grade (G)"
          >
            <Grid3x3 className="size-4" />
          </button>
          <button
            onClick={() => document.documentElement.requestFullscreen?.()}
            className="rounded-md border border-border/60 p-1.5 text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
            title="Tela cheia (F)"
          >
            <Maximize2 className="size-4" />
          </button>
        </div>
      </header>

      <main className="relative z-10 flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <div key={slides[index].id} className="h-full">
            <Current />
          </div>
        </AnimatePresence>
      </main>

      <footer className="relative z-20 flex items-center justify-between border-t border-border/40 bg-background/30 px-6 py-3 backdrop-blur">
        <button
          onClick={prev}
          disabled={index === 0}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-sm transition hover:bg-white/5 disabled:opacity-30"
        >
          <ChevronLeft className="size-4" /> Anterior
        </button>
        <p className="text-sm text-muted-foreground">{slides[index].title}</p>
        <button
          onClick={next}
          disabled={index === slides.length - 1}
          className="inline-flex items-center gap-1.5 rounded-lg bg-pink-gradient px-4 py-1.5 text-sm font-semibold text-white shadow-glow transition hover:opacity-90 disabled:opacity-30"
        >
          Próximo <ChevronRight className="size-4" />
        </button>
      </footer>

      <AnimatePresence>
        {overview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 overflow-auto bg-background/95 p-8 backdrop-blur-lg"
            onClick={() => setOverview(false)}
          >
            <h2 className="mb-6 text-2xl font-bold">Todas as seções</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex(i);
                    setOverview(false);
                  }}
                  className={`aspect-video rounded-xl border p-4 text-left transition hover:border-pink ${
                    i === index
                      ? "border-pink bg-pink/10"
                      : "border-border/60 bg-card/40"
                  }`}
                >
                  <p className="text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 font-semibold">{s.title}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
