# Certificate Previews

Place your certificate media files here.

## Recommended naming

Use the education item slug as filename (same slug used in `src/content/*/education.ts`).

- Video: /certificates/<slug>.mp4
- Image: /certificates/<slug>.jpg
- PDF: /certificates/<slug>.pdf

## Current slugs (existing items)

- /certificates/certificado-ebac-backend.pdf
- /certificates/certificado-ebac-frontend.pdf
- /certificates/pos-graduacao-fullstack.pdf

You can also add media preview for these same slugs:

- /certificates/certificado-ebac-backend.mp4 or .jpg
- /certificates/certificado-ebac-frontend.mp4 or .jpg
- /certificates/pos-graduacao-fullstack.mp4 or .jpg

## Future items

For a new education item with slug `novo-certificado`, use:

- /certificates/novo-certificado.pdf
- Optional preview: /certificates/novo-certificado.mp4 or /certificates/novo-certificado.jpg

## Optional custom paths

If needed, set custom paths directly in education items:

- image: "/certificates/custom-name.jpg"
- previewVideo: "/certificates/custom-name.mp4"
- certificateUrl: "/certificates/custom-name.pdf" or "https://..."

Files:
- src/content/pt/education.ts
- src/content/en/education.ts

## Preview priority in modal

1. Local video (`/certificates/<slug>.mp4` or `previewVideo`)
2. Local image (`/certificates/<slug>.jpg` or `image`)
3. Certificate button (`certificateUrl`) if PDF exists
