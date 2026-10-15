/**
 * Utilidades para procesamiento y optimización de imágenes en el cliente.
 * Convierte cualquier imagen (PNG, JPG, JPEG, etc.) a formato WebP comprimido
 * antes de subirlo a Supabase Storage para ahorrar hasta un 90% de espacio.
 */

export interface WebpConversionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0 a 1 (0.82 recomendado para óptimo balance peso/calidad)
}

/**
 * Convierte un File de imagen a WebP con redimensión proporcional opcional.
 */
export async function convertImageToWebP(
  file: File,
  options: WebpConversionOptions = {}
): Promise<File> {
  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.82
  } = options;

  // Si no estamos en un entorno de navegador con canvas, devolver el archivo original
  if (
    typeof window === "undefined" ||
    typeof document === "undefined" ||
    !window.Image ||
    !document.createElement
  ) {
    return file;
  }

  // Si ya es un SVG o archivo no convertible, devolverlo intacto
  if (file.type === "image/svg+xml") {
    return file;
  }

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;

      // Escalar proporcionalmente si excede las dimensiones máximas
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return resolve(file);
      }

      // Dibujar la imagen redimensionada con suavizado
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      // Convertir a blob WebP
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            return resolve(file);
          }

          // Reemplazar la extensión por .webp
          const originalName = file.name;
          const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf(".")) || originalName;
          const webpFileName = `${nameWithoutExt}.webp`;

          const webpFile = new File([blob], webpFileName, {
            type: "image/webp",
            lastModified: Date.now(),
          });

          resolve(webpFile);
        },
        "image/webp",
        quality
      );
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(objectUrl);
      console.warn("No se pudo procesar la imagen a WebP, usando archivo original:", err);
      resolve(file);
    };

    img.src = objectUrl;
  });
}
