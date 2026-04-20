# Lucas Limeira - Portfolio

Portfolio pessoal com Next.js App Router + TypeScript + Tailwind CSS (v4), com i18n real sem rotas separadas (`/pt` e `/en`), modo escuro, modal de projetos e SEO bilíngue.

## Site Publicado

- Produção (Vercel): https://SEU-PROJETO.vercel.app

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Vitest
- GitHub Actions

## Instalação

```bash
npm install
```

## Rodar em desenvolvimento

```bash
npm run dev
```

Abra http://localhost:3000.

## Validação local (mesmas etapas do CI)

```bash
npm run lint
npm run test
npm run build
```

## CI/CD com GitHub Actions

Workflow único em `.github/workflows/main.yml`.

Gatilhos:
- Push para `main`
- Pull Request para `main`

Etapas de CI:
- `npm ci`
- `npm run lint`
- `npm run test`
- `npm run build`

Etapa de CD:
- Deploy automático na Vercel após CI aprovado em push para `main`.

## Passo a passo no GitHub

1. Faça push do projeto para o GitHub.
2. No repositório, acesse `Settings` > `Secrets and variables` > `Actions`.
3. Crie os secrets:
	- `VERCEL_TOKEN`
	- `VERCEL_ORG_ID`
	- `VERCEL_PROJECT_ID`
4. Abra um PR para `main` e confira a aba `Actions`:
	- job de CI precisa passar com lint, test e build.
5. Faça merge na `main`.
6. Confira novamente a aba `Actions`:
	- job de deploy para Vercel deve rodar automaticamente.

## Passo a passo no Vercel

1. Acesse https://vercel.com/new e importe este repositório.
2. Confirme `Framework Preset` como `Next.js`.
3. Confirme `Production Branch` como `main`.
4. Em `Account Settings`, gere um token de API (usar no secret `VERCEL_TOKEN`).
5. Em `Project Settings`, copie o `Project ID` (usar no `VERCEL_PROJECT_ID`).
6. Em `Team/Account Settings`, copie o `Org ID` (usar no `VERCEL_ORG_ID`).
7. Após merge na `main`, valide o deploy em `Deployments`.
8. Copie a URL de produção e substitua em `Site Publicado` neste README.

## Deploy manual na Vercel (opcional)

```bash
npm run build
vercel pull --yes --environment=production
vercel build --prod
vercel deploy --prebuilt --prod
```

## i18n sem rotas

- Troca PT/EN acontece no cliente por botão no header.
- Persistência em `localStorage` e cookie (`locale`).
- Primeiro acesso usa idioma do navegador com fallback para PT.

## Integração com GitHub API

- A seção de projetos tenta buscar repositórios públicos de `LucasLLimeira`.
- Filtra por nomes definidos em `featuredRepoNames`.
- Em caso de falha/rate limit, usa automaticamente os projetos locais.

Token opcional:

- Você pode definir `GITHUB_TOKEN` em `.env.local` para aumentar limite de requisições no backend.
- Não commite token no repositório.

## Arquivos para manutenção de conteúdo

### Trocar foto (avatar)

- `public/avatar.jpg`

### Trocar/atualizar CV PDF

- `public/cv-lucas-limeira.pdf`

### Atualizar projetos

- `src/content/pt/projects.ts`
- `src/content/en/projects.ts`

### Atualizar serviços

- `src/content/pt/services.ts`
- `src/content/en/services.ts`

### Atualizar formação/certificados

- `src/content/pt/education.ts`
- `src/content/en/education.ts`

## SEO

- Imagem OG/Twitter: `public/og-image.png`
- Configuração de metadata por idioma: `src/lib/seo.ts`
