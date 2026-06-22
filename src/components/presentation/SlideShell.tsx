import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SlideShell({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex h-full w-full max-w-[88rem] flex-col justify-center px-4 py-8 md:px-6 lg:px-8"
    >
      {kicker && (
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-10 bg-pink" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-pink">
            {kicker}
          </span>
        </div>
      )}
      {title && (
        <h2 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h2>
      )}
      <div className="flex-1 min-h-0">{children}</div>
    </motion.section>
  );
}
