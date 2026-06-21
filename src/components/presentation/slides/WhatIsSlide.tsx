import { ArrowRight, FormInput, ShieldCheck, Send } from "lucide-react";
import { SlideShell } from "../SlideShell";

const steps = [
  { icon: FormInput, label: "Campos", desc: "Inputs do formulário" },
  { icon: () => <img src="./image.png" alt="" />, label: "React Hook Form", desc: "Gerencia estado e refs" },
  { icon: ShieldCheck, label: "Validação", desc: "Regras declarativas" },
  { icon: Send, label: "Dados enviados", desc: "handleSubmit dispara" },
];

export function WhatIsSlide() {
  return (
    <SlideShell
      kicker="Seção 02"
      title={<>O que é <span className="text-gradient">React Hook Form</span>?</>}
    >
      <div className="flex h-full flex-col justify-center gap-12">
        <p className="max-w-3xl text-xl text-muted-foreground md:text-2xl">
          Biblioteca para{" "}
          <span className="font-semibold text-foreground">gerenciamento e validação</span>{" "}
          de formulários em React, com foco em{" "}
          <span className="text-pink">performance</span> e{" "}
          <span className="text-pink">simplicidade</span>.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          {steps.map((s, i) => {
            const Icon = s.icon as any;
            return (
              <div key={s.label} className="flex flex-1 items-center gap-3">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="grid size-20 place-items-center rounded-2xl bg-pink-gradient shadow-glow">
                    <Icon className="size-8 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="mx-2 size-6 shrink-0 text-pink/60" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}
