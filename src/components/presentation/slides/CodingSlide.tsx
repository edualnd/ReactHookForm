import { useState } from "react";
import { LiveProvider, LiveEditor, LivePreview, LiveError } from "react-live";
import { useForm } from "react-hook-form";
import { SlideShell } from "../SlideShell";
import { Code2, Eye } from "lucide-react";

const defaultCode = `function MeuForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    alert("Enviado: " + JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-white">Nome</label>
        <input
          {...register("nome", { required: "Nome é obrigatório" })}
          className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-pink"
          placeholder="Seu nome"
        />
        {errors.nome && <p className="text-pink text-xs mt-1">{errors.nome.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-white">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email é obrigatório",
            pattern: { value: /^\\S+@\\S+$/i, message: "Email inválido" }
          })}
          className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-pink"
          placeholder="voce@email.com"
        />
        {errors.email && <p className="text-pink text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-white">Senha</label>
        <input
          type="password"
          {...register("senha", {
            required: "Senha é obrigatória",
            minLength: { value: 6, message: "Mínimo 6 caracteres" }
          })}
          className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-pink"
          placeholder="••••••"
        />
        {errors.senha && <p className="text-pink text-xs mt-1">{errors.senha.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-pink-gradient py-2.5 font-semibold text-white shadow-glow hover:opacity-90"
      >
        Cadastrar
      </button>
    </form>
  );
}

render(<MeuForm />);
`;

export function CodingSlide() {
  const [code, setCode] = useState(defaultCode);

  return (
    <SlideShell>
      <div className="flex h-full flex-col px-8 py-6">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest text-pink">
            Playground
          </p>
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Editor ao vivo ·{" "}
            <span className="text-gradient">edite e veja o resultado</span>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Modifique o código à esquerda e veja o formulário renderizado em
            tempo real à direita.
          </p>
        </div>

        <LiveProvider
          code={code}
          scope={{ useForm }}
          noInline
          enableTypeScript={false}
        >
          <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-2">
            <div className="flex flex-col overflow-hidden rounded-xl border border-border/60 bg-[#0b1426]">
              <div className="flex items-center gap-2 border-b border-border/60 px-4 py-2 text-xs text-muted-foreground">
                <Code2 className="size-4 text-pink" />
                <span className="font-mono">MeuForm.jsx</span>
              </div>
              <div className="flex-1 overflow-auto font-mono text-sm">
                <LiveEditor
                  onChange={setCode}
                  style={{
                    background: "transparent",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize: 13,
                    minHeight: "100%",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card/40">
              <div className="flex items-center gap-2 border-b border-border/60 px-4 py-2 text-xs text-muted-foreground">
                <Eye className="size-4 text-pink" />
                <span>Resultado</span>
              </div>
              <div className="flex-1 overflow-auto p-6">
                <LivePreview />
                <LiveError className="mt-3 rounded-lg bg-red-500/10 p-3 font-mono text-xs text-red-400" />
              </div>
            </div>
          </div>
        </LiveProvider>
      </div>
    </SlideShell>
  );
}
