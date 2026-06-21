import { createFileRoute } from "@tanstack/react-router";
import { Presentation } from "@/components/presentation/Presentation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "React Hook Form — Apresentação Interativa" },
      {
        name: "description",
        content:
          "Apresentação interativa sobre React Hook Form: conceitos, comparações e demo ao vivo.",
      },
      { property: "og:title", content: "React Hook Form — Apresentação Interativa" },
      {
        property: "og:description",
        content:
          "Slides web modernos para demonstrar React Hook Form em sala de aula.",
      },
    ],
  }),
  component: Presentation,
});
