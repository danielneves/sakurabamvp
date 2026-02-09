

# CMS com Supabase para Sakuraba Law

## Resumo

Integrar o site com Supabase para permitir que voce e sua equipe editem todo o conteudo do site (Hero, servicos, blog, equipe e depoimentos) atraves de um painel administrativo amigavel, sem precisar mexer em codigo.

## O que sera construido

### 1. Banco de dados no Supabase

Tabelas para armazenar todo o conteudo editavel:

- **site_content** - Textos gerais (Hero, titulos de secoes, CTAs) com versoes PT e EN
- **team_members** - Advogados (nome, cargo, especialidade, citacao, experiencia, foto)
- **blog_posts** - Artigos (titulo, resumo, categoria, tempo de leitura, imagem, conteudo completo)
- **testimonials** - Depoimentos (nome, localizacao, texto, servico)
- **services** - Areas de atuacao (titulo, descricao, icone, destaque)

Cada tabela tera campos separados para portugues e ingles.

### 2. Autenticacao e painel admin

- Login com email/senha via Supabase Auth
- Rota `/admin` protegida com login
- Painel com menu lateral para navegar entre as secoes editaveis
- Formularios amigaveis para editar cada tipo de conteudo
- Upload de imagens (fotos de advogados, imagens de blog) via Supabase Storage

### 3. Controle de acesso

- Tabela `user_roles` com papeis (admin, editor)
- Apenas usuarios autenticados com role adequado podem editar
- RLS (Row Level Security) em todas as tabelas: leitura publica, escrita restrita

### 4. Atualizacao do site publico

- Os componentes atuais (HeroSection, BlogPreview, AboutPreview, etc.) passarao a buscar dados do Supabase em vez de usar textos fixos no codigo
- Fallback para o conteudo atual caso o banco esteja vazio
- Cache com React Query para performance

## Experiencia do editor

1. Acessa `/admin` e faz login
2. Ve um painel com cards: "Hero", "Servicos", "Blog", "Equipe", "Depoimentos"
3. Clica em "Blog" por exemplo, ve a lista de artigos, pode criar novo ou editar existente
4. Preenche formulario com campos PT e EN lado a lado
5. Faz upload de imagem direto no formulario
6. Salva e o site atualiza automaticamente

---

## Detalhes tecnicos

### Estrutura de tabelas

```text
site_content
  - id (uuid)
  - section_key (text, unique) -- ex: "hero_title", "hero_subtitle"
  - content_pt (text)
  - content_en (text)
  - updated_at (timestamp)

team_members
  - id (uuid)
  - name (text)
  - role_pt / role_en (text)
  - specialty_pt / specialty_en (text)
  - quote_pt / quote_en (text)
  - experience (text)
  - image_url (text)
  - display_order (int)
  - is_active (boolean)

blog_posts
  - id (uuid)
  - title_pt / title_en (text)
  - excerpt_pt / excerpt_en (text)
  - content_pt / content_en (text)
  - category_pt / category_en (text)
  - read_time (int)
  - image_url (text)
  - slug (text, unique)
  - published (boolean)
  - created_at / updated_at (timestamp)

testimonials
  - id (uuid)
  - name (text)
  - location (text)
  - text_pt / text_en (text)
  - service_pt / service_en (text)
  - display_order (int)
  - is_active (boolean)

services
  - id (uuid)
  - title_pt / title_en (text)
  - description_pt / description_en (text)
  - icon_name (text)
  - href (text)
  - is_featured (boolean)
  - is_highlighted (boolean)
  - display_order (int)
  - is_active (boolean)
```

### Storage

- Bucket `images` (publico) para fotos de advogados e imagens de blog

### Seguranca (RLS)

- SELECT publico em todas as tabelas (conteudo do site)
- INSERT/UPDATE/DELETE restrito a usuarios com role `admin` ou `editor` via funcao `has_role()`

### Arquivos novos

- `src/integrations/supabase/` - Client e tipos
- `src/pages/Admin.tsx` - Layout do painel
- `src/pages/admin/` - Paginas de edicao (HeroEditor, BlogEditor, TeamEditor, TestimonialsEditor, ServicesEditor)
- `src/components/admin/` - Componentes reutilizaveis do admin (ImageUploader, BilingualInput)
- `src/hooks/` - Hooks para buscar dados do Supabase (useTeamMembers, useBlogPosts, etc.)

### Arquivos modificados

- Todos os componentes de secao (HeroSection, ServicesSection, BlogPreview, AboutPreview, TestimonialsSection, CTASection) para buscar dados do Supabase
- `App.tsx` - Novas rotas `/admin/*` e `/login`

### Etapas de implementacao

1. Conectar Supabase ao projeto (Lovable Cloud)
2. Criar migrations (tabelas, buckets, RLS, roles)
3. Seed com o conteudo atual hardcoded
4. Criar hooks de leitura e atualizar componentes publicos
5. Criar pagina de login
6. Criar painel admin com editores por secao
7. Testar fluxo completo

