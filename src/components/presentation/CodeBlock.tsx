import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "./../../lib/utils.ts";

type Token = { text: string; cls?: string };

const KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "import",
  "from",
  "export",
  "default",
  "async",
  "await",
  "new",
  "true",
  "false",
  "null",
  "undefined",
]);

function tokenize(line: string): Token[] {
  const tokens: Token[] = [];
  const regex =
    /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][A-Za-z0-9_$]*)|(\s+)|([^\s\w])/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(line))) {
    if (m[1])
      tokens.push({ text: m[1], cls: "text-muted-foreground/70 italic" });
    else if (m[2]) tokens.push({ text: m[2], cls: "text-emerald-300" });
    else if (m[3]) tokens.push({ text: m[3], cls: "text-amber-300" });
    else if (m[4]) {
      if (KEYWORDS.has(m[4]))
        tokens.push({ text: m[4], cls: "text-pink font-semibold" });
      else if (/^[A-Z]/.test(m[4]))
        tokens.push({ text: m[4], cls: "text-cyan-300" });
      else tokens.push({ text: m[4], cls: "text-foreground" });
    } else if (m[5]) tokens.push({ text: m[5] });
    else if (m[6]) tokens.push({ text: m[6], cls: "text-pink-glow" });
  }
  return tokens;
}

export function CodeBlock({
  code,
  language = "jsx",
  className,
  showCopy = true,
}: {
  code: string;
  language?: string;
  className?: string;
  showCopy?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const lines = code.replace(/\n$/, "").split("\n");

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/60 bg-[var(--code-bg)] font-mono text-[0.95em] shadow-glow",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs uppercase tracking-widest text-muted-foreground">
            {language}
          </span>
        </div>
        {showCopy && (
          <button
            onClick={copy}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
          >
            {copied ? (
              <Check className="size-3.5" />
            ) : (
              <Copy className="size-3.5" />
            )}
            {copied ? "Copiado" : "Copiar"}
          </button>
        )}
      </div>
      <pre className="max-h-[500px] overflow-auto p-5 leading-relaxed">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-4 inline-block w-6 select-none text-right text-muted-foreground/40">
                {i + 1}
              </span>
              <span className="flex-1 whitespace-pre">
                {tokenize(line).map((t, j) => (
                  <span key={j} className={t.cls}>
                    {t.text}
                  </span>
                ))}
                {line.length === 0 ? " " : ""}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
