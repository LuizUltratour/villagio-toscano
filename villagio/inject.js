(function (w, d) {
  'use strict';

  var VILLAGIO_URL = 'https://skylineip.s3.amazonaws.com/Tour%20Virtual/nova%20alternativa/galeria-villagio/index.html';

  var overlay    = null;
  var msgHandler = null;

  function _injectStyles() {
    if (d.getElementById('_gc_styles')) return;
    var s = d.createElement('style');
    s.id = '_gc_styles';
    s.textContent =
      '@keyframes _gcIn{from{opacity:0}to{opacity:1}}' +
      '@keyframes _gcOut{to{opacity:0}}';
    d.head.appendChild(s);
  }

  function _open(mode) {
    if (overlay) _close();
    _injectStyles();

    overlay = d.createElement('div');
    overlay.id = '_gc_overlay';
    overlay.style.cssText =
      'position:fixed;inset:0;z-index:2147483646;' +
      'animation:_gcIn 0.3s ease both;';

    var iframe = d.createElement('iframe');
    iframe.src  = VILLAGIO_URL + '?mode=' + encodeURIComponent(mode || 'imagens');
    iframe.style.cssText = 'width:100%;height:100%;border:none;display:block;background:#E4E4E4;';
    iframe.setAttribute('allow', 'fullscreen');

    overlay.appendChild(iframe);
    d.body.appendChild(overlay);

    msgHandler = function (e) {
      if (e.data && e.data.action === 'closeGallery') _close();
    };
    w.addEventListener('message', msgHandler);
  }

  function _close() {
    if (!overlay) return;
    overlay.style.animation = '_gcOut 0.25s ease forwards';
    var ref = overlay;
    setTimeout(function () {
      if (ref.parentNode) ref.parentNode.removeChild(ref);
    }, 260);
    overlay = null;
    if (msgHandler) {
      w.removeEventListener('message', msgHandler);
      msgHandler = null;
    }
  }

  // ── API pública ──────────────────────────────────────────────
  // GaleriaImagens(1) → abre galeria geral (Implantação, Aéreas, Percurso Toscano)
  // GaleriaImagens(0) → fecha
  w.GaleriaImagens = function (show) {
    if (show === 1) _open('imagens'); else _close();
  };

  // Galerias individuais por empreendimento (Ed. ...)
  // GaleriaFrancesco(1) / GaleriaGiovanni(1) / GaleriaLorenzo(1) / GaleriaBellini(1) /
  // GaleriaCastelli(1) / GaleriaFerrara(1) / GaleriaMilani(1) / GaleriaSavoia(1) / GaleriaVitalle(1)
  // → abrem a galeria do respectivo empreendimento. Chame com (0) para fechar
  function _buildingToggle(mode) {
    return function (show) {
      if (show === 1) _open(mode); else _close();
    };
  }

  w.GaleriaFrancesco = _buildingToggle('ed-francesco');
  w.GaleriaGiovanni  = _buildingToggle('ed-giovanni');
  w.GaleriaLorenzo   = _buildingToggle('ed-lorenzo');
  w.GaleriaBellini  = _buildingToggle('ed-bellini');
  w.GaleriaCastelli = _buildingToggle('ed-castelli');
  w.GaleriaFerrara  = _buildingToggle('ed-ferrara');
  w.GaleriaMilani   = _buildingToggle('ed-milani');
  w.GaleriaSavoia   = _buildingToggle('ed-savoia');
  w.GaleriaVitalle  = _buildingToggle('ed-vitalle');

}(window, document));
