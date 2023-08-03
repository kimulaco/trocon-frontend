export const createBase64DummySVG = (width: number = 100, height: number = 100): string => {
  return `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"></svg>`,
  )}`
}
