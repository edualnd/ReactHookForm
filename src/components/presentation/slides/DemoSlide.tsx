import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { SlideShell } from "../SlideShell";

type FormData = { name: string; email: string; password: string };

export function DemoSlide() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ mode: "onTouched" });
  const [submitted, setSubmitted] = useState<FormData | null>(null);

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(data);
  };

  const restart = () => {
    setSubmitted(null);
    reset();
  };

  return (
    <SlideShell
      kicker="Seção 08 · Ao vivo"
      title={
        <>
          Demonstração
        </>
      }
    >
      <div className="grid h-full gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur"
          >
            <Field
              label="Nome"
              error={errors.name?.message}
              {...register("name", { required: "Campo obrigatório" })}
            />
            <Field
              label="Email"
              type="email"
              error={errors.email?.message}
              {...register("email", {
                required: "Campo obrigatório",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Email inválido" },
              })}
            />
            <Field
              label="Senha"
              type="password"
              error={errors.password?.message}
              {...register("password", {
                required: "Campo obrigatório",
                minLength: { value: 8, message: "Mínimo de 8 caracteres" },
              })}
            />
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg bg-pink-gradient px-4 py-3 font-semibold text-white shadow-glow transition hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
              <button
                type="button"
                onClick={restart}
                className="rounded-lg border border-border/60 px-4 py-3 text-sm transition hover:bg-white/5"
              >
                <RotateCcw className="size-4" />
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="rounded-2xl border border-pink/40 bg-pink/10 p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <CheckCircle2 className="size-8 text-pink" />
                  <h3 className="text-2xl font-bold">Enviado com sucesso!</h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Dados recebidos:</p>
                <pre className="overflow-x-auto rounded-xl border border-border/60 bg-[var(--code-bg)] p-4 font-mono text-sm">
                  {JSON.stringify(submitted, null, 2)}
                </pre>
              </motion.div>
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-dashed border-border bg-card/30 p-8 text-center"
              >
                <p className="mb-2 text-lg font-semibold">Tente enviar o formulário</p>
                <p className="text-sm text-muted-foreground">
                  Os erros aparecem em tempo real e os dados serão exibidos aqui.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideShell>
  );
}

function Field({
  label,
  error,
  type = "text",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        {...rest}
        className={`w-full rounded-lg border bg-background/60 px-4 py-2.5 text-sm outline-none transition focus:border-pink focus:ring-2 focus:ring-pink/30 ${
          error ? "border-destructive" : "border-border"
        }`}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
