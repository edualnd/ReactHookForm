import { Package } from "lucide-react";
import { SlideShell } from "../SlideShell";
import { CodeBlock } from "../CodeBlock";

export function InstallSlide() {
  return (
    <SlideShell kicker="Seção 03" title={<>Instalação</>}>
      <div className="mx-auto flex h-full max-w-3xl flex-col justify-center gap-6">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-pink/30 bg-pink/10 px-4 py-1.5 text-sm text-pink">
          <Package className="size-4" /> Adicione ao seu projeto
        </div>
        <CodeBlock language="bash" code={`npm install react-hook-form`} />
        <CodeBlock language="bash" code={`yarn add react-hook-form`} />
      </div>
    </SlideShell>
  );
}
