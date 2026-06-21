import { Code2, Gauge, Layers, Plug, ShieldCheck, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { SlideShell } from "../SlideShell";

const items = [
  { icon: Code2, title: "Menos código", desc: "Adeus boilerplate de useState para cada campo." },
  { icon: Gauge, title: "Melhor performance", desc: "Inputs uncontrolled — sem re-render por tecla." },
  { icon: Layers, title: "Menos re-renders", desc: "Componentes isolados via refs internas." },
  { icon: ShieldCheck, title: "Validação simplificada", desc: "Regras inline ou via Zod / Yup." },
  { icon: Plug, title: "Integra com qualquer UI", desc: "shadcn, MUI, Chakra, Headless UI..." },
  { icon: Wrench, title: "Fácil de manter", desc: "API declarativa e código mais legível." },
];

export function AdvantagesSlide() {
  return (
    <SlideShell
      kicker="Seção 09 · Por que"
      title={<>Por que <span className="text-gradient">usar</span>?</>}
    >
      <div className="grid h-full grid-cols-2 gap-4 md:grid-cols-3 md:grid-rows-2">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur transition hover:border-pink/50 hover:shadow-glow"
          >
            <div className="grid size-12 place-items-center rounded-xl bg-pink-gradient text-white shadow-glow">
              <it.icon className="size-6" />
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-bold">{it.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}
