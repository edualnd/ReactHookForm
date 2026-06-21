import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Repeat, Zap, Activity } from "lucide-react";
import { SlideShell } from "../SlideShell";
import { CodeBlock } from "../CodeBlock";

const code = `const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();
  if (!name) return setError("Nome obrigatório");
  if (!email.includes("@")) return setError("Email inválido");
  if (password.length < 8) return setError("Senha curta");
  // enviar...
};`;

const issues = [
  { icon: Repeat, title: "Vários useState", desc: "Um hook por campo do formulário." },
  { icon: Zap, title: "Re-render a cada tecla", desc: "Todo o componente é re-renderizado." },
  { icon: AlertTriangle, title: "Validação manual", desc: "Lógica escrita à mão, propensa a falhas." },
];

export function ProblemSlide() {
  const renders = useRef(0);
  renders.current += 1;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [flash, setFlash] = useState(0);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return setError("Nome obrigatório");
    if (!email.includes("@")) return setError("Email inválido");
    if (password.length < 8) return setError("Senha precisa ter ao menos 8 caracteres");
    setError("");
  };

  const bump = (fn: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    fn(e.target.value);
    setFlash((n) => n + 1);
  };

  return (
    <SlideShell kicker="Seção 04" title={<>O <span className="text-gradient">problema</span> do React puro</>}>
      <div className="grid h-full gap-6 lg:grid-cols-2">
        {/* LEFT: code + issues */}
        <div className="flex flex-col gap-4">
          <CodeBlock code={code} language="jsx" className="text-xs" />
          <div className="grid gap-2">
            {issues.map((it) => (
              <div
                key={it.title}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/60 p-3 backdrop-blur"
              >
                <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-pink/15 text-pink">
                  <it.icon className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{it.title}</h3>
                  <p className="text-xs text-muted-foreground">{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: live form + render counter */}
        <div className="flex flex-col gap-4">
          <motion.div
            key={renders.current}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between rounded-2xl border border-pink/40 bg-pink/10 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-lg bg-pink-gradient text-white shadow-glow">
                <Activity className="size-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-pink">Renders do componente</p>
                <p className="text-xs text-muted-foreground">Aumenta a cada tecla pressionada</p>
              </div>
            </div>
            <motion.span
              key={renders.current + "-num"}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-mono text-4xl font-bold text-pink"
            >
              {renders.current}
            </motion.span>
          </motion.div>

          <form
            onSubmit={onSubmit}
            className="flex-1 space-y-3 rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur"
          >
            <Field label="Nome" value={name} onChange={bump(setName)} />
            <Field label="Email" value={email} onChange={bump(setEmail)} />
            <Field label="Senha" type="password" value={password} onChange={bump(setPassword)} />
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-muted-foreground">
                <span className="font-mono text-pink">{flash}</span> mudanças de estado
              </span>
              <button
                type="submit"
                className="rounded-lg bg-pink-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow"
              >
                Enviar
              </button>
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
          </form>
        </div>
      </div>
    </SlideShell>
  );
}

function Field({
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        {...rest}
        className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none transition focus:border-pink focus:ring-2 focus:ring-pink/30"
      />
    </div>
  );
}
