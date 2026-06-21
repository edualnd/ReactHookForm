import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Presentation } from "./components/presentation/Presentation.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Presentation />
  </StrictMode>,
);
