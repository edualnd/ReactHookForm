import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Activity, Check, X } from "lucide-react";
import { SlideShell } from "../SlideShell";
import { CodeBlock } from "../CodeBlock";

const traditionalCode = `const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [pass, setPass]   = useState("");

// 3 useState · re-render a cada tecla
<input value={name}
  onChange={e => setName(e.target.value)} />`;

const rhfCode = `const { register, handleSubmit } = useForm();

// 0 useState · sem re-render por tecla
<input {...register("name")} />
<input {...register("email")} />
<input {...register("password")} />`;

export function ComparisonSlide() {
  return (
    <SlideShell kicker="Seção 05" title={<>Tradicional <span className="text-pink">vs</span> React Hook Form</>}>
      <div className="grid h-full gap-5 lg:grid-cols-2">
        <TraditionalColumn />
        <RhfColumn />
      </div>
    </SlideShell>
  );
}

function MetricBadge({ label, value, tone = "pink" }: { label: string; value: string | number; tone?: "pink" | "muted" }) {
  return (
    <div className={`rounded-lg border px-2.5 py-1.5 text-center ${tone === "pink" ? "border-pink/40 bg-pink/10" : "border-border/60 bg-card/40"}`}>
      <p className={`font-mono text-base font-bold ${tone === "pink" ? "text-pink" : "text-foreground"}`}>{value}</p>
      <p className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}

function TraditionalColumn() {
  const renders = useRef(0);
  renders.current += 1;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-destructive/40 bg-card/60 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">React Tradicional</h3>
        <motion.div
          key={renders.current}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-1.5 rounded-full border border-destructive/50 bg-destructive/15 px-2.5 py-1 text-xs font-semibold text-destructive"
        >
          <Activity className="size-3" /> {renders.current} renders
        </motion.div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <MetricBadge label="Linhas" value="12+" tone="muted" />
        <MetricBadge label="useState" value={3} tone="muted" />
        <MetricBadge label="Validação" value="Manual" tone="muted" />
        <MetricBadge label="Re-render" value="Alto" tone="muted" />
      </div>

      <CodeBlock code={traditionalCode} language="jsx" className="text-[11px]" showCopy={false} />

      <form className="space-y-2 rounded-xl border border-border/60 bg-background/40 p-3">
        <MiniField label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <MiniField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <MiniField label="Senha" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
      </form>

      <ul className="space-y-1 text-xs">
        <Bad>Re-render a cada tecla</Bad>
        <Bad>Mais código boilerplate</Bad>
        <Bad>Difícil de manter</Bad>
      </ul>
    </div>
  );
}

function RhfColumn() {
  const renders = useRef(0);
  renders.current += 1;
  const { register } = useForm();

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-pink/50 bg-card/60 p-4 shadow-glow">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">React Hook Form</h3>
        <motion.div
          key={renders.current}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-1.5 rounded-full border border-pink/50 bg-pink/15 px-2.5 py-1 text-xs font-semibold text-pink"
        >
          <Activity className="size-3" /> {renders.current} renders
        </motion.div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <MetricBadge label="Linhas" value="6" />
        <MetricBadge label="useState" value={0} />
        <MetricBadge label="Validação" value="Decl." />
        <MetricBadge label="Re-render" value="Mín." />
      </div>

      <CodeBlock code={rhfCode} language="jsx" className="text-[11px]" showCopy={false} />

      <form className="space-y-2 rounded-xl border border-border/60 bg-background/40 p-3">
        <MiniField label="Nome" {...register("name")} />
        <MiniField label="Email" {...register("email")} />
        <MiniField label="Senha" type="password" {...register("password")} />
      </form>

      <ul className="space-y-1 text-xs">
        <Good>Mantém o contador estável</Good>
        <Good>Menos código, mais legível</Good>
        <Good>Validação integrada</Good>
      </ul>
    </div>
  );
}

function MiniField({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <label className="w-14 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        {...rest}
        className="flex-1 rounded-md border border-border bg-background/60 px-2.5 py-1.5 text-xs outline-none transition focus:border-pink focus:ring-1 focus:ring-pink/40"
      />
    </div>
  );
}

function Good({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-foreground">
      <Check className="size-3.5 text-pink" /> {children}
    </li>
  );
}
function Bad({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-muted-foreground">
      <X className="size-3.5 text-destructive" /> {children}
    </li>
  );
}
