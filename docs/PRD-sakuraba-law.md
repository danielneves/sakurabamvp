# PRD - Sakuraba Law Digital Ecosystem

**Versão:** 2.0  
**Data:** Janeiro 2025  
**Status:** Em Desenvolvimento

---

## 1. Visão Geral do Produto

### 1.1 Objetivo
Criar um ecossistema digital para o escritório **Sakuraba Law**, especializado em serviços jurídicos Brasil-Canadá, que atenda três personas distintas e converta visitantes em clientes através de uma experiência bilíngue e culturalmente sensível.

### 1.2 Proposta de Valor
- **PT-BR:** "Soluções jurídicas no Canadá para brasileiros" - foco em resolver problemas jurídicos canadenses para clientes no Brasil ou brasileiros no exterior.
- **EN:** "Legal Solutions That Understand You" - abordagem multicultural para clientes de diversas origens que buscam sensibilidade cultural em serviços jurídicos.

---

## 2. Personas e Jornadas

### 2.1 Lucas - O Técnico (Imigração)
- **Perfil:** Profissional buscando validação técnica para processos imigratórios
- **Comportamento:** Pesquisa extensiva, valoriza conteúdo longo e detalhado
- **Necessidade:** Informação técnica precisa sobre vistos e processos
- **Conteúdo:** Long-form articles com detalhes processuais

### 2.2 Mariana - A Emocional (Eventos de Vida)
- **Perfil:** Pessoa passando por evento de vida (divórcio, herança, compra de imóvel)
- **Comportamento:** Busca alívio emocional e segurança
- **Necessidade:** Orientação clara e acolhedora
- **Conteúdo:** Artigos escaneáveis com foco em soluções

### 2.3 Robert/Alejandro - O Corporativo (B2B/Internacional)
- **Perfil:** Empresário ou profissional internacional
- **Comportamento:** Valoriza eficiência e validação cultural
- **Necessidade:** Serviços corporativos com entendimento multicultural
- **Conteúdo:** Apresentação minimalista e direta

---

## 3. Arquitetura de Informação

### 3.1 Estrutura de Navegação

```
├── Home (/)
├── Áreas de Atuação
│   ├── Família & Divórcio (/familia)
│   ├── Imóveis (futuro: /imoveis)
│   ├── Empresas (/empresas)
│   └── Imigração (/imigracao) [Destaque visual especial]
├── Sobre Nós (/sobre)
├── Blog (/blog)
└── Contato (/contato)
```

### 3.2 Hierarquia de Serviços
**Decisão estratégica:** Imigração não é o serviço mais recorrente. Prioridade ajustada para:

1. **Família & Divórcio** (featured) - Alta demanda
2. **Imóveis/Real Estate** (featured) - Alta demanda
3. **Empresas** (featured) - Crescimento B2B
4. **Imigração** (highlighted com cor accent) - Serviço especial, visualmente distinto

---

## 4. Identidade Visual

### 4.1 Conceito
**"Canadian Solidity meets Brazilian Warmth"**

### 4.2 Paleta de Cores
| Token | Uso | Descrição |
|-------|-----|-----------|
| `primary` | CTAs principais, links | Navy Blue - Confiança corporativa |
| `accent` | Destaque Imigração | Dourado/Warm - Acolhimento brasileiro |
| `muted` | Backgrounds secundários | Tons neutros suaves |
| `foreground` | Texto principal | Alto contraste |

### 4.3 Tipografia
- **Headlines:** Playfair Display (Serif) - Autoridade e tradição
- **Body:** Lato (Sans-serif) - Legibilidade e modernidade
- **Line-height:** 1.5-1.6 para conforto de leitura

### 4.4 Fotografia
- Imagens ambientais de escritório de alta qualidade
- Fotos reais da equipe (não stock genérico)
- Ilustrações temáticas para blog (não fotos literais)

---

## 5. Componentes da Home Page

### 5.1 Header
**Elementos:**
- Logo Sakuraba Law (SVG)
- Navegação desktop (6 links)
- Toggle de idioma EN/PT (pill design moderno)
- CTA WhatsApp (botão verde característico)
- Menu mobile responsivo

**Comportamento:**
- Sticky no scroll
- Backdrop blur para transparência elegante
- Indicador visual de página ativa

### 5.2 Hero Section
**PT-BR:**
```
Título: "Soluções Jurídicas no Canadá"
Subtítulo: "Família, Divórcio, Imóveis e Empresas - Atendimento especializado 
           para brasileiros que precisam de orientação jurídica canadense."
CTA Primário: "Agende sua Consulta" → /contato
CTA Secundário: "Conheça Nossos Serviços" → scroll para serviços
```

**EN:**
```
Título: "Legal Solutions That Understand You"
Subtítulo: "Family, Real Estate & Business Law — Cross-cultural legal expertise 
           for clients who value understanding and cultural sensitivity."
CTA Primário: "Schedule a Consultation"
CTA Secundário: "Explore Our Services"
```

**Decisões importantes:**
- ❌ Não mencionar "consulta gratuita" (não existe)
- ✅ Foco em soluções, não em imigração
- ✅ EN com abordagem multicultural (não apenas Brasil-Canadá)

### 5.3 Services Section
**Cards de Serviço:**

| Serviço | Status | Estilo Visual |
|---------|--------|---------------|
| Família & Divórcio | featured | Border primary, bg primary/5 |
| Imóveis | featured | Border primary, bg primary/5 |
| Empresas | featured | Border primary, bg primary/5 |
| Imigração | highlighted | Border accent, bg accent/10, ring accent |

**Comportamento:**
- Hover com elevação (-translate-y-1) e shadow
- Ícones Lucide para cada área
- Link "Saiba mais" para página detalhada

### 5.4 About Preview (Carrossel de Advogados)
**Funcionalidade:**
- Carrossel horizontal com navegação por botões
- Autoplay opcional
- Indicadores de posição (dots)

**Conteúdo por advogado:**
- Foto profissional
- Nome e título
- Anos de experiência (badge)
- Citação pessoal
- Botão "Conheça a Equipe"

**Equipe atual:**
1. Dr. Celso Sakuraba - Fundador, 25+ anos
2. Dra. Mariana Santos - Família & Civil, 15+ anos
3. Dr. Robert Chen - Corporate, 12+ anos

**Expansão futura:**
- Giovana Dall'Acqua
- Frederico do Valle
- Manuela Dias
- Fernanda Noleto

### 5.5 Blog Preview
**Design dos Cards:**
- Imagem ilustrativa de alta qualidade (não literal)
- Badge de categoria com cor temática
- Título do artigo
- Tempo de leitura estimado (ícone Clock + "X min")
- ❌ Data removida (conteúdo evergreen)

**Categorias e cores:**
| Categoria | Cor Badge |
|-----------|-----------|
| Imigração | bg-accent text-accent-foreground |
| Família | bg-primary text-primary-foreground |
| Empresarial | bg-secondary text-secondary-foreground |

### 5.6 Testimonials Section
- Depoimentos de clientes reais
- Nome, origem, tipo de caso
- Sistema de rating (estrelas)

### 5.7 CTA Section
- Chamada final para ação
- Reforço do WhatsApp como canal principal
- Informações de contato direto

### 5.8 Footer
- Links de navegação
- Informações de contato
- Redes sociais
- Aviso legal/disclaimer

### 5.9 WhatsApp Button (Floating)
- Botão fixo no canto inferior direito
- Cor verde WhatsApp (#25D366)
- Link direto para conversa com mensagem pré-definida

---

## 6. Estratégia Multilíngue

### 6.1 Toggle de Idioma
**Implementação:** Pill toggle moderno (não dropdown)
- Posicionado no header, antes do CTA
- Estados visuais claros (ativo vs inativo)
- Transição suave entre idiomas

### 6.2 Diferenças de Conteúdo

| Aspecto | PT-BR | EN |
|---------|-------|-----|
| Foco | Brasileiros com problemas no Canadá | Clientes multiculturais |
| Tom | Acolhedor, próximo | Profissional, inclusivo |
| Headline Hero | "Soluções Jurídicas no Canadá" | "Legal Solutions That Understand You" |
| Proposta | Expertise Brasil-Canadá | Cultural sensitivity |

---

## 7. Silos de Conteúdo (Blog)

### 7.1 Silo Imigração Técnica (Persona: Lucas)
- Artigos long-form
- Detalhes processuais
- Checklists e timelines
- Autor principal: Lucas

### 7.2 Silo Eventos de Vida (Persona: Mariana)
- Artigos escaneáveis
- Foco em alívio emocional
- Guias passo-a-passo
- Autora principal: Mariana

### 7.3 Silo Corporativo (Persona: Robert)
- Conteúdo minimalista
- Foco em eficiência
- Cases e resultados
- Autor principal: Robert

---

## 8. Especificações Técnicas

### 8.1 Stack
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + Design Tokens
- **UI Components:** shadcn/ui
- **Routing:** React Router DOM
- **State:** React useState/useCallback
- **Icons:** Lucide React

### 8.2 Performance
- Imagens otimizadas (lazy loading)
- Componentes modulares
- Mobile-first responsive design

### 8.3 Acessibilidade
- Contraste adequado
- Labels semânticos
- Navegação por teclado
- Alt text em imagens

---

## 9. Assets Gerados

### 9.1 Imagens de Equipe
- `lawyer-celso.jpg` - Dr. Celso Sakuraba
- `lawyer-mariana.jpg` - Dra. Mariana Santos
- `lawyer-robert.jpg` - Dr. Robert Chen

### 9.2 Imagens de Blog
- `blog-immigration.jpg` - Ilustração tema imigração
- `blog-family.jpg` - Ilustração tema família
- `blog-divorce.jpg` - Ilustração tema divórcio

### 9.3 Branding
- `sakuraba-logo.svg` - Logo principal
- `hero-office.jpg` - Background hero

---

## 10. Métricas de Sucesso

### 10.1 KPIs Primários
- Taxa de conversão (visita → contato WhatsApp)
- Tempo médio na página
- Taxa de rejeição

### 10.2 KPIs Secundários
- Páginas por sessão
- Origem do tráfego (blog SEO)
- Distribuição por idioma

---

## 11. Roadmap Futuro

### Fase 1 (Atual)
- [x] Home page completa
- [x] Sistema multilíngue
- [x] Carrossel de advogados
- [x] Blog preview com imagens

### Fase 2 (Próximo)
- [ ] Página dedicada Imóveis/Real Estate
- [ ] Perfis individuais de advogados
- [ ] Blog com CMS
- [ ] Formulário de contato funcional

### Fase 3 (Futuro)
- [ ] Área do cliente
- [ ] Agendamento online
- [ ] Chat integrado
- [ ] Analytics avançado

---

## 12. Decisões de Design Documentadas

| Decisão | Racional |
|---------|----------|
| Imigração com cor accent | Destacar como serviço especial sem ser o foco principal |
| Sem "consulta gratuita" | Não oferecido pelo escritório |
| Toggle pill vs dropdown | UX mais moderna e direta |
| Datas removidas do blog | Conteúdo evergreen, foco no valor |
| Imagens ilustrativas no blog | Evitar fotos literais, mais atrativo |
| EN multicultural | Expandir além de brasileiros |

---

*Documento mantido pela equipe de produto. Última atualização: Janeiro 2025*
