import { motion } from "framer-motion";
import { FormInput, Sparkles } from "lucide-react";
import { SlideShell } from "../SlideShell";

export function IntroSlide() {
  return (
    <SlideShell>
      <div className="grid h-full items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink/30 bg-pink/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pink"
          >
            <Sparkles className="size-3.5" />
            Apresentação · React
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-6xl font-extrabold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
          >
            React
            <br />
            <span className="text-gradient">Hook Form</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl"
          >
            Formulários performáticos, simples e validados — com o mínimo de re-renderizações e o
            máximo de produtividade.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground"
          >
            <span className="rounded-full border border-border/60 px-3 py-1">⚡ Performance</span>
            <span className="rounded-full border border-border/60 px-3 py-1">🪶 Leve</span>
            <span className="rounded-full border border-border/60 px-3 py-1">✅ Validação</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-pink-gradient opacity-30 blur-3xl" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-6 rounded-full border border-dashed border-pink/40"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute inset-16 rounded-full border border-dashed border-pink/20"
          />
          <div className="relative grid size-44 place-items-center rounded-4xl">
            <img src="./image.png" alt="" />
          </div>
        </motion.div>
      </div>
    </SlideShell>
  );
}
