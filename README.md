# Lucas Limeira - Portfolio

Portfolio pessoal com Next.js App Router + TypeScript + Tailwind CSS (v4), com i18n real sem rotas separadas (`/pt` e `/en`), tema claro/escuro, modal de projetos e SEO bilíngue.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4

## Instalação

```bash
npm install
```

## Rodar em desenvolvimento

```bash
npm run dev
```

Abra http://localhost:3000.

## Build de produção

```bash
npm run build
npm run start
```

## Deploy na Vercel (passo a passo)

1. Faça push do repositório para GitHub.
2. Acesse https://vercel.com/new e faça login.
3. Importe o repositório `portfolio`.
4. Framework Preset: `Next.js`.
5. Não é obrigatório adicionar variáveis de ambiente para o MVP.
6. Clique em `Deploy`.
7. Após o deploy, acesse a URL gerada e valide idioma, tema e links de contato.

## i18n sem rotas

- Troca PT/EN acontece no cliente por botão no header.
- Persistência em `localStorage` e cookie (`locale`).
- Primeiro acesso usa idioma do navegador com fallback para PT.

## Bônus GitHub API

- A seção de projetos tenta buscar repositórios públicos de `LucasLLimeira`.
- Filtra por nomes definidos em `featuredRepoNames`.
- Em caso de falha/rate limit, usa automaticamente os projetos locais.

Token opcional (não obrigatório):

- Você pode definir `NEXT_PUBLIC_GITHUB_TOKEN` para aumentar limite de requisições.
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
