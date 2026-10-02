import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bengala Klearly",
    short_name: "Bengala AI",
    description: "Elimina el ruido de fondo y suaviza tu acento en inglés, en tiempo real.",
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
