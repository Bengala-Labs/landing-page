import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bengala AI - Productos de inteligencia artificial",
    short_name: "Bengala AI",
    description: "Productos de inteligencia artificial que terminan el trabajo.",
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
