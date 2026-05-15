import { useEffect } from "react";

export function usePreloadAllImages() {
  useEffect(() => {
    const imagesToPreload = [];

    document.querySelectorAll("img").forEach((img) => {
      if (img.src) {
        imagesToPreload.push(img.src);
      }
    });

    document.querySelectorAll("use").forEach((use) => {
      const href = use.getAttribute("xlink:href") || use.getAttribute("href");
      if (href && href.startsWith("/")) {
        // Если это ссылка на файл спрайта
        imagesToPreload.push(href);
      }
    });

    const preloaded = [];
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      preloaded.push(img);
    });

    return () => {
      preloaded.forEach((img) => (img.src = ""));
    };
  }, []);
}
