# Galeria — WR DUO

Galeria de imagens para injeção via script no 3DVista, hospedada no AWS S3.

## Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Galeria completa (auto-suficiente, vai dentro do iframe) |
| `inject.js`  | Script leve que cria o overlay no 3DVista |
| `assets/`    | Pasta com todas as imagens organizadas por categoria |

---

## Estrutura de pastas (`assets/`)

> A definir conforme organização do projeto WR DUO.

```
assets/
├── (categorias a definir)
└── ...
```

---

## Como funciona

### Dois modos de galeria

A galeria aceita um parâmetro `?mode=` na URL:

| Modo | URL | O que exibe |
|------|-----|-------------|
| `imagens` | `index.html?mode=imagens` | Categorias de imagens |
| `plantas` | `index.html?mode=plantas` | Plantas por tipologia |
| `all` | `index.html` | Tudo (uso local / testes) |

### Filtros

- **Modo imagens**: filtros principais = categorias de imagens. Categorias com sub-filtros por tipologia.
- **Modo plantas**: filtros principais = tipologias. Cada filtro mostra as plantas daquela tipologia.
- Sem botão "Todos" — galeria já abre filtrada na primeira categoria disponível.

### Card duplex (cobertura-plan)

Cards de plantas com dois pavimentos usam `type: 'cobertura-plan'`:
- Abas **Pavimento Inferior / Pavimento Superior** para alternar
- Label flutuante sobre a imagem indicando o pavimento
- Botão **"Ver ambos os pavimentos"** abre lightbox lado a lado

### Lightbox

- Navegação por setas (desktop) ou swipe horizontal (mobile/touch)
- Tecla `Esc` fecha; setas do teclado navegam
- Dual-view no mobile empilha verticalmente
- Zoom com scroll/pinch e pan com drag

### Responsividade

| Tela | Colunas na grade |
|------|-----------------|
| > 1100px | 4 colunas |
| 701–1100px | 3 colunas |
| 421–700px | 2 colunas |
| ≤ 420px | 1 coluna |

---

## Configurar as imagens

Abra `index.html` e edite o objeto `GALLERY_CONFIG`.

### Categorias

```js
categories: [
  { id: 'fachada', label: 'Fachada' },
  { id: 'areas-comuns', label: 'Áreas Comuns' },
  {
    id: 'apartamentos', label: 'Apartamentos',
    subs: [
      { id: 'ap-tipologia-1', label: 'Tipologia 1' },
    ]
  },
  {
    id: 'plantas', label: 'Plantas',
    subs: [
      { id: 'pl-tipologia-1', label: 'Tipologia 1' },
    ]
  },
],
```

### Itens — imagem simples

```js
{ id:1, type:'image', category:'fachada', title:'Fachada Principal',
  src: 'assets/fachada/NOME-DO-ARQUIVO.jpg' },
```

### Itens — planta com dois pavimentos

```js
{ id:30, type:'cobertura-plan', category:'plantas', subCategory:'pl-tipologia-1',
  title:'Tipologia 1', area:'', floors:[
    { label:'Pavimento Inferior', src:'assets/plantas/tipologia-1/1/PAVIMENTO INFERIOR.jpg' },
    { label:'Pavimento Superior', src:'assets/plantas/tipologia-1/1/PAVIMENTO SUPERIOR.jpg' },
]},
```

---

## Deploy na AWS S3

### URL do bucket

```
s3://skylineip/Tour Virtual/wr-construtora/ferramentas/galeria-wr-duo/
```

### Upload completo (primeira vez)

```bash
aws s3 sync . "s3://skylineip/Tour Virtual/wr-construtora/ferramentas/galeria-wr-duo/" \
  --exclude ".git/*" --exclude "*.md" \
  --content-type "text/html" --include "*.html"

aws s3 sync assets/ "s3://skylineip/Tour Virtual/wr-construtora/ferramentas/galeria-wr-duo/assets/"
```

### Atualizar só os arquivos principais

```bash
aws s3 cp index.html "s3://skylineip/Tour Virtual/wr-construtora/ferramentas/galeria-wr-duo/index.html" \
  --content-type "text/html"

aws s3 cp inject.js "s3://skylineip/Tour Virtual/wr-construtora/ferramentas/galeria-wr-duo/inject.js" \
  --content-type "application/javascript"
```

### URLs resultantes

```
https://skylineip.s3.amazonaws.com/Tour%20Virtual/wr-construtora/ferramentas/galeria-wr-duo/index.html
https://skylineip.s3.amazonaws.com/Tour%20Virtual/wr-construtora/ferramentas/galeria-wr-duo/inject.js
```

---

## Integração 3DVista

### Passo 1 — Carregar o script (Custom HTML no Skin Editor)

```html
<script>
(() => {
  const scriptUrl = 'https://skylineip.s3.amazonaws.com/Tour%20Virtual/wr-construtora/ferramentas/galeria-wr-duo/inject.js';
  if (document.querySelector(`script[src="${scriptUrl}"]`)) return;
  const s = document.createElement('script');
  s.src = scriptUrl;
  document.head.appendChild(s);
})();
</script>
```

### Passo 2 — Acionar a galeria nos hotspots

```js
// Abre galeria de imagens
setTimeout(() => { GaleriaImagens(1); }, 300);

// Fecha galeria de imagens
GaleriaImagens(0);

// Abre galeria de plantas
setTimeout(() => { GaleriaPlantas(1); }, 300);

// Fecha galeria de plantas
GaleriaPlantas(0);
```

> O `setTimeout` garante que o script já foi carregado antes de chamar a função.

---

## Cores e tipografia

| Token | Valor |
|-------|-------|
| Background / Secundária | `#E4E4E4` |
| Texto / Principal | `#0B2636` |
| Acento | `#2471A3` |
| Fonte títulos | Cormorant Garamond |
| Fonte UI | Inter |
