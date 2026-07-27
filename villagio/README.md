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
│   ├── Externas/                          (compartilhada por Francesco, Giovanni e Lorenzo)
│   ├── Ed. Francesco_/
│   │   └── Plantas Baixas - Francesco/
│   ├── Ed. Giovanni/
│   │   └── Plantas Baixas - Giovanni/
│   └── Ed. Lorenzo/
│       └── Plantas Baixas - Lorenzo/
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
| Ed. Francesco | Externas · Internas · Plantas |
| Ed. Giovanni | Externas · Internas · Plantas |
| Ed. Lorenzo | Externas · Internas · Plantas |
| Ed. Bellini | Externas · Fachada · Internas · Plantas |
| Ed. Castelli | Externas · Internas |
| Ed. Ferrara | Externas · Internas |
| Ed. Milani | Externas · Interna |
| Ed. Savoia | Externas · Internas |
| Ed. Vitalle | Externas · Internas |

### Modos via URL

Cada empreendimento (pastas iniciadas com `Ed. ...`) tem sua própria galeria, isolada das demais. O restante das imagens (Implantação, Aéreas e Percurso Toscano) fica no modo geral `imagens`.

| Modo | URL | O que exibe |
|------|-----|-------------|
| `all` (padrão) | `index.html` | Todas as categorias, com menu completo (uso avulso/teste) |
| `imagens` | `index.html?mode=imagens` | Implantação + Aéreas + Percurso Toscano |
| `ed-francesco` | `index.html?mode=ed-francesco` | Somente Ed. Francesco (Externas, Internas, Plantas) |
| `ed-giovanni` | `index.html?mode=ed-giovanni` | Somente Ed. Giovanni (Externas, Internas, Plantas) |
| `ed-lorenzo` | `index.html?mode=ed-lorenzo` | Somente Ed. Lorenzo (Externas, Internas, Plantas) |
| `ed-bellini` | `index.html?mode=ed-bellini` | Somente Ed. Bellini (Externas, Fachada, Internas, Plantas) |
| `ed-castelli` | `index.html?mode=ed-castelli` | Somente Ed. Castelli (Externas, Internas) |
| `ed-ferrara` | `index.html?mode=ed-ferrara` | Somente Ed. Ferrara (Externas, Internas) |
| `ed-milani` | `index.html?mode=ed-milani` | Somente Ed. Milani (Externas, Interna) |
| `ed-savoia` | `index.html?mode=ed-savoia` | Somente Ed. Savoia (Externas, Internas) |
| `ed-vitalle` | `index.html?mode=ed-vitalle` | Somente Ed. Vitalle (Externas, Internas) |

Nos modos de empreendimento (`ed-*`), o menu principal fica oculto (só existe uma categoria) e a galeria abre direto na primeira subcategoria (**Externas**).

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
// Abre galeria geral (Implantação + Aéreas + Percurso Toscano)
setTimeout(() => { GaleriaImagens(1); }, 300);
GaleriaImagens(0); // fecha

// Abre a galeria de um empreendimento específico
setTimeout(() => { GaleriaFrancesco(1); }, 300);
GaleriaFrancesco(0); // fecha

setTimeout(() => { GaleriaGiovanni(1); }, 300);
GaleriaGiovanni(0);

setTimeout(() => { GaleriaLorenzo(1); }, 300);
GaleriaLorenzo(0);

setTimeout(() => { GaleriaBellini(1); }, 300);
GaleriaBellini(0);

setTimeout(() => { GaleriaCastelli(1); }, 300);
GaleriaCastelli(0);

setTimeout(() => { GaleriaFerrara(1); }, 300);
GaleriaFerrara(0);

setTimeout(() => { GaleriaMilani(1); }, 300);
GaleriaMilani(0);

setTimeout(() => { GaleriaSavoia(1); }, 300);
GaleriaSavoia(0);

setTimeout(() => { GaleriaVitalle(1); }, 300);
GaleriaVitalle(0);
```

> O `setTimeout` garante que o script já foi carregado antes de chamar a função. Cada função abre/fecha o mesmo overlay — chamar qualquer uma delas com `(0)` fecha a galeria aberta no momento.

---

## Cores e tipografia

| Token | Valor |
|-------|-------|
| Background | `#E4E4E4` |
| Texto / Principal | `#0B2636` |
| Acento | `#2471A3` |
| Fonte títulos | Cormorant Garamond |
| Fonte UI | Inter |
