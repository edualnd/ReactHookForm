import { motion } from "framer-motion";
import { SlideShell } from "../SlideShell";
import { CodeBlock } from "../CodeBlock";

const concepts = [
  {
    name: "useForm()",
    desc: "Hook principal que controla todo o formulário.",
    code: `const form = useForm({
  defaultValues: { email: "" }
});`,
    useCase: "Página de cadastro com vários campos e estados.",
    benefit: "Centraliza todo o estado do form sem useState manual.",
  },
  {
    name: "register()",
    desc: "Conecta cada input ao React Hook Form via refs.",
    code: `<input {...register("email", {
  required: true
})} />`,
    useCase: "Inputs, selects e textareas controlados sem boilerplate.",
    benefit: "Inputs uncontrolled — zero re-render por digitação.",
  },
  {
    name: "handleSubmit()",
    desc: "Valida e executa a função de envio.",
    code: `<form onSubmit={
  handleSubmit(onSubmit)
}>`,
    useCase: "Envio para uma API somente após validação completa.",
    benefit: "Valida tudo automaticamente antes do submit.",
  },
  {
    name: "errors",
    desc: "Objeto com os erros de validação por campo.",
    code: `{errors.email && (
  <span>Email inválido</span>
)}`,
    useCase: "Mensagens de erro contextuais junto a cada campo.",
    benefit: "API declarativa, sem lógica de erro espalhada.",
  },
];

export function ConceptsSlide() {
  return (
    <SlideShell
      kicker="Seção 06"
      title={<>Principais <span className="text-gradient">conceitos</span></>}
    >
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
        {concepts.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur transition-all duration-300 hover:border-pink/60 hover:shadow-glow"
          >
            {/* Front content */}
            <div className="transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">
              <h3 className="font-mono text-lg font-bold text-pink">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              <div className="mt-3">
                <CodeBlock code={c.code} language="jsx" showCopy={false} className="text-xs" />
              </div>
            </div>

            {/* Hover reveal */}
            <div className="pointer-events-none absolute inset-0 flex translate-y-3 flex-col gap-3 bg-card/95 p-5 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="font-mono text-lg font-bold text-pink">{c.name}</h3>
              <Row label="O que faz">{c.desc}</Row>
              <Row label="Quando usar">{c.useCase}</Row>
              <Row label="Benefício">{c.benefit}</Row>
              <div className="mt-auto">
                <CodeBlock code={c.code} language="jsx" showCopy={false} className="text-[11px]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Passe o mouse sobre cada conceito para ver detalhes
      </p>
    </SlideShell>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-pink">{label}</p>
      <p className="text-sm text-foreground">{children}</p>
    </div>
  );
}
