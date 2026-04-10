# Project Previews

Place your manual project previews here.

## Recommended naming

Use the project slug as filename (same slug used by the cards).

- Video: /previews/<slug>.mp4
- Image: /previews/<slug>.jpg

Examples:
- /previews/portfolio.mp4
- /previews/ToDo-React-Avancado.jpg

## Optional custom paths

If needed, you can set custom paths in project content files:
- image: "/previews/custom-name.jpg"
- previewVideo: "/previews/custom-name.mp4"

Files:
- src/content/pt/projects.ts
- src/content/en/projects.ts

## Preview priority in modal

1. demoUrl (iframe)
2. Local video (/previews/<slug>.mp4 or previewVideo)
3. Local image (/previews/<slug>.jpg or image)
4. GitHub repository card preview (fallback)
