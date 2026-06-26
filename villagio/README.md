# Galeria — Villagio Toscano

Galeria de imagens para injeção via script no 3DVista, hospedada no AWS S3.

## Repositório

```
https://github.com/LuizUltratour/villagio-toscano
```

## Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Galeria completa (auto-suficiente, roda dentro de um iframe) |
| `inject.js`  | Script leve que cria o overlay no 3DVista |
| `assets/`    | Imagens organizadas por edifício e subcategoria |

---

## Estrutura de pastas (`assets/`)

```
assets/
├── Implantação/
├── Aéreas/
│   ├── Imagens/
│   └── Vídeos_/
├── Percurso Toscano_/
│   ├── Externas/
│   ├── Internas/
│   └── Planta Baixa_/
├── Ed. Frente_/
│   ├── Externas/
│   ├── Internas/
│   │   ├── Ed. Francesco_/
│   │   ├── Ed. Giovanni/
│   │   └── Ed. Lorenzo/
│   └── Plantas Baixas/
├── Ed. Bellini_/
│   ├── Externas/
│   ├── Fachada/
│   ├── Internas_/
│   └── Plantas Baixas/
├── Ed. Castelli/
│   ├── Externas/
│   └── Internas_/
├── Ed. Ferrara/
│   ├── Externas/
│   └── Internas/
├── Ed. Milani_/
│   ├── Externas/
│   └── Interna/
├── Ed. Savoia/
│   ├── Externas/
│   └── Internas/
└── Ed. Vitalle/
    ├── Externas/
    └── Internas/
```

---

## Como funciona

### Menu e filtros

O menu principal exibe uma categoria por edifício/área. Ao clicar em uma categoria, a primeira subcategoria (**Externas**) é automaticamente selecionada e marcada como ativa.

| Categoria principal | Subcategorias |
|--------------------|---------------|
| Implantação | — |
| Aéreas | — |
| Percurso Toscano | Externas · Internas · Plantas |
| Ed. Frente | Externas · Ed. Francesco · Ed. Giovanni · Ed. Lorenzo · Plantas |
| Ed. Bellini | Externas · Fachada · Internas · Plantas |
| Ed. Castelli | Externas · Internas |
| Ed. Ferrara | Externas · Internas |
| Ed. Milani | Externas · Interna |
| Ed. Savoia | Externas · Internas |
| Ed. Vitalle | Externas · Internas |

### Modos via URL

| Modo | URL | O que exibe |
|------|-----|-------------|
| `all` (padrão) | `index.html` | Todas as categorias |
| `imagens` | `index.html?mode=imagens` | Edifícios + Aéreas |
| `plantas` | `index.html?mode=plantas` | Edifícios + Percurso Toscano |

### Lightbox

- Navegação por setas (desktop) ou swipe horizontal (mobile/touch)
- Tecla `Esc` fecha; setas do teclado navegam
- Zoom com scroll/pinch e pan com drag (100% a 500%)
- Plantas exibidas com fundo branco e `object-fit: contain`

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
  { id: 'implantacao', label: 'Implantação' },
  {
    id: 'ed-bellini', label: 'Ed. Bellini',
    subs: [
      { id: 'bellini-externas', label: 'Externas' },
      { id: 'bellini-internas', label: 'Internas' },
      { id: 'bellini-plantas',  label: 'Plantas' },
    ]
  },
],
```

### Itens — imagem simples

```js
{ id:1, type:'image', category:'implantacao', isPlant:true,
  title:'Implantação', src:'assets/Implantação/Implantação.png' },
```

### Itens — imagem com subcategoria

```js
{ id:300, type:'image', category:'ed-bellini', subCategory:'bellini-externas',
  title:'Fachada', src:'assets/Ed. Bellini_/Externas/VILLAGIOTOSCANO_EXTERNO_BELLINI.png' },
```

> `isPlant: true` aplica fundo branco e `object-fit: contain` — use para plantas baixas e mapas.

---

## Deploy na AWS S3

### URL do bucket

```
s3://skylineip/Tour Virtual/nova alternativa/galeria-villagio/
```

### Sincronizar tudo

```bash
aws s3 sync villagio/ "s3://skylineip/Tour Virtual/nova alternativa/galeria-villagio/" \
  --exclude ".git/*" --exclude "*.md" --exclude ".gitattributes"
```

### Atualizar só o HTML

```bash
aws s3 cp villagio/index.html \
  "s3://skylineip/Tour Virtual/nova alternativa/galeria-villagio/index.html"
```

### URLs resultantes

```
https://skylineip.s3.amazonaws.com/Tour%20Virtual/nova%20alternativa/galeria-villagio/index.html
https://skylineip.s3.amazonaws.com/Tour%20Virtual/nova%20alternativa/galeria-villagio/inject.js
```

---

## Integração 3DVista

### Passo 1 — Carregar o script (Custom HTML no Skin Editor)

```html
<script>
(() => {
  const scriptUrl = 'https://skylineip.s3.amazonaws.com/Tour%20Virtual/nova%20alternativa/galeria-villagio/inject.js';
  if (document.querySelector(`script[src="${scriptUrl}"]`)) return;
  const s = document.createElement('script');
  s.src = scriptUrl;
  document.head.appendChild(s);
})();
</script>
```

### Passo 2 — Acionar nos hotspots

```js
// Abre galeria de imagens (edifícios + aéreas)
setTimeout(() => { GaleriaImagens(1); }, 300);

// Fecha
GaleriaImagens(0);

// Abre galeria de plantas (edifícios + percurso toscano)
setTimeout(() => { GaleriaPlantas(1); }, 300);

// Fecha
GaleriaPlantas(0);
```

> O `setTimeout` garante que o script já foi carregado antes de chamar a função.

---

## Cores e tipografia

| Token | Valor |
|-------|-------|
| Background | `#E4E4E4` |
| Texto / Principal | `#0B2636` |
| Acento | `#2471A3` |
| Fonte títulos | Cormorant Garamond |
| Fonte UI | Inter |
