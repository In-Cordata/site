(function () {
  // menu mobile
  var sidebar = document.getElementById('sidebar');
  document.getElementById('menu-toggle').addEventListener('click', function () { sidebar.classList.toggle('show'); });
  document.querySelectorAll('.sidebar-link').forEach(function (l) {
    l.addEventListener('click', function () { sidebar.classList.remove('show'); });
  });

  // anteprima PDF (creata solo al primo clic, mai nella home)
  var pbox = null, pframe = null;
  function pclose() { pbox.classList.remove('open'); pframe.src = 'about:blank'; document.body.style.overflow = ''; }
  function pbuild() {
    pbox = document.createElement('div');
    pbox.id = 'pdf-preview';
    pbox.innerHTML = '<div class="pv-bar"><span class="pv-title"></span><a class="btn-dl pv-dl" download>Scarica</a><button type="button" class="pv-close" aria-label="Chiudi">×</button></div><iframe title="Anteprima documento"></iframe>';
    document.body.appendChild(pbox);
    pframe = pbox.querySelector('iframe');
    pbox.querySelector('.pv-close').onclick = pclose;
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && pbox.classList.contains('open')) pclose(); });
  }
  document.querySelectorAll('.btn-prev').forEach(function (b) {
    b.addEventListener('click', function () {
      if (!pbox) pbuild();
      pbox.querySelector('.pv-title').textContent = b.getAttribute('data-title');
      pbox.querySelector('.pv-dl').href = b.getAttribute('data-preview');
      pframe.src = b.getAttribute('data-preview');
      pbox.classList.add('open'); document.body.style.overflow = 'hidden';
    });
  });

  // lightbox per le gallerie
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  if (!thumbs.length) return;
  var box = document.createElement('div');
  box.id = 'lightbox';
  box.innerHTML = '<button id="lb-close" aria-label="Chiudi">×</button><button id="lb-prev" aria-label="Precedente">‹</button><img alt=""><button id="lb-next" aria-label="Successiva">›</button>';
  document.body.appendChild(box);
  var img = box.querySelector('img'), idx = 0;
  function show(i) { idx = (i + thumbs.length) % thumbs.length; img.src = thumbs[idx].href; box.classList.add('open'); }
  function hide() { box.classList.remove('open'); img.src = ''; }
  thumbs.forEach(function (t, i) { t.addEventListener('click', function (ev) { ev.preventDefault(); show(i); }); });
  box.addEventListener('click', function (ev) { if (ev.target === box) hide(); });
  document.getElementById('lb-close').onclick = hide;
  document.getElementById('lb-prev').onclick = function () { show(idx - 1); };
  document.getElementById('lb-next').onclick = function () { show(idx + 1); };
  document.addEventListener('keydown', function (ev) {
    if (!box.classList.contains('open')) return;
    if (ev.key === 'Escape') hide();
    if (ev.key === 'ArrowLeft') show(idx - 1);
    if (ev.key === 'ArrowRight') show(idx + 1);
  });
})();
