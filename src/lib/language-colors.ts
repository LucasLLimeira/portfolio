const fallbackPalette = ["#2563eb", "#22d3ee", "#facc15", "#9333ea", "#f97316"];

const languageColorMap: Record<string, string> = {
  typescript: "#2563eb",
  javascript: "#facc15",
  css: "#9333ea",
  html: "#f97316",
  python: "#3776ab",
  "jupyter notebook": "#da5b0b",
  go: "#00add8",
  shell: "#89e051",
  makefile: "#427819",
  dockerfile: "#384d54",
  "c++": "#f34b7d",
  c: "#555555",
  java: "#b07219",
};

export function getLanguageColor(language: string, fallbackIndex = 0): string {
  const normalized = language.trim().toLowerCase();
  return languageColorMap[normalized] ?? fallbackPalette[fallbackIndex % fallbackPalette.length];
}
