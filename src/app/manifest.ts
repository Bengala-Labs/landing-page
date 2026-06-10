import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bengala AI - Automatización Inteligente de Procesos",
    short_name: "Bengala AI",
    description: "Automatización inteligente de procesos para finanzas, gobierno y negocios.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF9F6",
    theme_color: "#EF3333",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
