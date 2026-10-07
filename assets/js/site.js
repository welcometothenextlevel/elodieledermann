(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const WA = '41799356005';

  /* ---------- header + sticky CTAs ---------- */
  const hdr = $('[data-hdr]');
  const sbar = $('.sbar');
  const fab = $('.fab');
  const book = $('#rdv');
  let ticking = false;
  const onScroll = () => {
    const y = scrollY;
    hdr.classList.toggle('is-scrolled', y > 10);
    const past = y > innerHeight * 0.55;
    // hide the floating buttons while the booking block is on screen, it already shows them
    const r = book.getBoundingClientRect();
    const inBook = r.top < innerHeight * 0.6 && r.bottom > innerHeight * 0.4;
    sbar.classList.toggle('on', past && !inBook);
    fab.classList.toggle('on', past && !inBook);
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  const burger = $('.burger');
  const setNav = open => {
    root.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };
  burger.addEventListener('click', () => setNav(!root.classList.contains('nav-open')));
  $$('#nav a').forEach(a => a.addEventListener('click', () => setNav(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });

  /* ---------- need finder ---------- */
  const NEEDS = [
    { soin: 'Drainage lymphatique manuel', cta: 'Réserver un drainage',
      txt: "Des gestes lents, doux et rythmés qui relancent la circulation de la lymphe. Pour les jambes qui gonflent, qui pèsent en fin de journée, ou après une longue période debout.",
      proof: "« Consultée notamment pour des drainages lymphatiques (jambes), j'ai rapidement pu constater des effets sur la durée. »", who: 'Elodie M., avis Google' },
    { soin: 'Massage médical', cta: 'Réserver un massage',
      txt: "Un massage ciblé sur vos tensions et vos douleurs musculaires : dos, nuque, épaules. On fait le point ensemble, puis je traite là où ça bloque.",
      proof: "« Dès la fin de la séance, je n'avais plus aucune tension ni mal de dos, un vrai soulagement. »", who: 'Valerie P., avis Google' },
    { soin: 'Massage classique ou drainage de la tête', cta: 'Réserver un moment pour moi',
      txt: "Quand la tête ne s'arrête plus. Un massage enveloppant, ou un drainage de la tête pour apaiser le système nerveux. Vous repartez plus léger·ère, dedans comme dehors.",
      proof: "« Je me suis sentie tellement détendue que j'ai failli m'endormir, ce qui est rare. »", who: 'Erik K., avis Google' },
    { soin: 'Drainage lymphatique & massage', cta: 'Réserver une séance',
      txt: "Cycle, grossesse, ménopause : quand le corps retient l'eau et que les tensions s'installent. Le drainage aide à dégonfler, le massage à relâcher. Je vous conseille selon le moment.",
      proof: "« Elle suggère également des pistes pour améliorer la situation en-dehors des séances. »", who: 'Elodie M., avis Google' },
    { soin: 'Massage pré & post-natal', cta: 'Réserver un soin maman',
      txt: "Pendant la grossesse et après l'accouchement : soulager le dos, alléger les jambes et prendre soin d'un corps qui a tout donné. Tout en douceur, et en confiance.",
      proof: "« Merci à elle pour son efficacité, sa douceur et sa bienveillance. »", who: 'Emeline L., avis Google' },
    { soin: 'Drainage lymphatique pré & post-op', cta: 'Réserver un drainage',
      txt: "Le drainage peut accompagner la préparation à une opération et la récupération qui suit : réduire les œdèmes, retrouver du confort. Toujours en accord avec votre médecin.",
      proof: "« Le drainage lymphatique est un allié puissant pour réduire les œdèmes et retrouver du confort. »", who: 'Elodie' },
    { soin: 'Massage médical & sportif', cta: 'Réserver un massage',
      txt: "Préparation, récupération, suivi de blessures. Formée au massage sportif, j'adapte la pression et les techniques à votre discipline et à votre calendrier.",
      proof: "« Elle saura adapter les soins nécessaires, notamment au niveau sportif pour la préparation/récupération ainsi que pour le suivi des blessures. »", who: 'Pauline A., avis Google' }
  ];
  const panel = $('#need-panel');
  const npEls = k => $(`[data-np="${k}"]`, panel);
  $$('.chips button').forEach(b => b.addEventListener('click', () => {
    $$('.chips button').forEach(x => x.setAttribute('aria-selected', x === b));
    const n = NEEDS[+b.dataset.need];
    npEls('soin').textContent = n.soin;
    npEls('txt').textContent = n.txt;
    npEls('proof').innerHTML = `${n.proof} <span>${n.who}</span>`;
    npEls('cta').textContent = n.cta;
    panel.classList.remove('swap'); void panel.offsetWidth; panel.classList.add('swap');
  }));
  // arrow keys between chips
  $('.chips').addEventListener('keydown', e => {
    if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
    const list = $$('.chips button'); const i = list.indexOf(document.activeElement);
    if (i < 0) return;
    const nx = list[(i + (e.key === 'ArrowRight' ? 1 : -1) + list.length) % list.length];
    nx.focus(); nx.click(); e.preventDefault();
  });

  /* ---------- reviews ---------- */
  const REVIEWS = [
    ['Vanessa Dos Santos', 5, 'il y a 2 mois', "J'étais complètement bloqué, avec de fortes tensions qui me gênaient au quotidien. Dès la séance, j'ai ressenti un vrai soulagement, et les jours suivants les bienfaits se sont confirmés. Aujourd'hui, je retrouve beaucoup plus de mobilité et je me sens nettement mieux. Un grand merci pour votre professionnalisme et votre efficacité, je recommande sans hésiter !"],
    ['Pauline Augsburger', 5, 'il y a 6 mois', "Toujours un pur moment de détente suspendu dans le temps. Elodie est très professionnelle, bienveillante et à l'écoute de vos besoins. Elle saura adapter les soins nécessaires et ceci est très appréciable notamment au niveau sportif pour la préparation/récupération ainsi que pour le suivi des blessures. Je recommande !"],
    ['Emeline Lombardi', 5, 'il y a 11 mois', "Grâce au drainage d'Elodie mon allaitement a été sauvé suite à une mastite. Merci à elle pour son efficacité, sa douceur et sa bienveillance."],
    ['Firoza Masset', 5, 'il y a 5 mois', "Ce moment de détente m'a permis de relâcher toutes les tensions et de retrouver un véritable bien-être, tant physique que mental. Je recommande vivement cet établissement à toute personne à la recherche d'un massage de qualité et d'un service irréprochable. J'y retournerai avec grand plaisir !"],
    ['Elodie Matile', 5, 'il y a 1 an', "Sympathique, souriante, compétente et professionnelle. Consultée notamment pour des drainages lymphatiques (jambes), j'ai rapidement pu constater des effets sur la durée. Elle suggère également des pistes pour améliorer la situation en-dehors des séances. Merci pour tes précieux conseils, je reviendrai avec grand plaisir !"],
    ['Justine Debély', 5, 'il y a 1 an', "Elodie est une excellente masseuse, professionnelle, bienveillante et à l'écoute. Chaque séance est un vrai moment de détente, parfaitement adaptée à mes besoins. L'ambiance est apaisante et le massage est réalisé parfaitement. Je recommande sans hésiter."],
    ['Valerie Pellaton', 5, 'il y a 1 an', "Un excellent moment de détente ! Dès la fin de la séance, je n'avais plus aucune tension ni mal de dos, un vrai soulagement. La qualité du travail d'Elodie et son professionnalisme sont impeccables. Encore merci"],
    ['Erik Konnemann', 5, 'il y a 2 ans', "Élodie a un don pour les massages. Je me suis sentie tellement détendue que j'ai failli m'endormir, ce qui est rare. Après la séance, je me sentais vraiment bien et mes symptômes ont pratiquement disparu. Elle m'a même donné des exercices à faire à la maison."],
    ['Beltrando Luigi', 4, 'il y a 2 ans', "Un grand merci à Elodie pour son massage !! Elodie a su me mettre à l'aise grâce à sa gentillesse et à un excellent sens de l'accueil. Elle est très professionnelle et a un incroyable ressenti. Je suis sorti de son massage apaisé et vraiment détendu."],
    ['Deb Rabe', 5, 'il y a 2 ans', "Très professionnelle, à l'écoute de nos besoins et s'adapte à toute situation. Je recommande fortement."],
    ['Frederik Konnemann', 5, 'il y a 1 an', "Elodie aime ce qu'elle fait. Mains magiques."],
    ['Sylvie Calame', 5, 'il y a 2 ans', "Une dame très professionnelle et à l'écoute. Excellents massages thérapeutiques. Merci"],
    ['Odile Wuarchoz', 5, 'il y a 1 an', "Thérapeute et soin agréables et efficaces, je suis ressortie l'âme et le corps détendus."],
    ['Sieber Romain', 5, 'il y a 3 ans', "Massage parfait tant pour la détente que pour les douleurs dues à des tensions."],
    ['Corinne Ruffieux', 5, 'il y a 2 ans', "Accueil parfait. Soin parfait. Je recommande."],
    ['Famille Racheter', 4, 'il y a 2 ans', "J'ai passé un très bon moment de détente et de partage."]
  ];
  const COLORS = ['#2C8C84', '#B9862A', '#5E7FA8', '#A0566B', '#4F8A5B', '#7A6AA8', '#C2703D', '#1F6F69'];
  const star = '<svg><use href="#i-star"/></svg>';
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const card = ([n, s, w, t], i) => `
    <article class="rv">
      <div class="rv-top">
        <span class="av" style="background:${COLORS[i % COLORS.length]}" aria-hidden="true">${n.trim()[0].toUpperCase()}</span>
        <span class="rv-who"><strong>${esc(n)}</strong><span>${w}</span></span>
        <svg class="g" aria-label="Avis Google"><use href="#i-g"/></svg>
      </div>
      <span class="stars" aria-label="${s} étoiles sur 5">${star.repeat(s)}</span>
      <p>${esc(t)}</p>
    </article>`;
  const track = $('[data-track]');
  const rail = $('[data-rail]');
  const html = REVIEWS.map(card).join('');
  track.innerHTML = html + html.replace(/<article class="rv">/g, '<article class="rv" aria-hidden="true">');

  if (!reduce) {
    let x = 0, half = 0, speed = 0.45, paused = false, drag = null, last = performance.now();
    const measure = () => { half = track.scrollWidth / 2; };
    measure(); addEventListener('resize', measure);
    document.fonts && document.fonts.ready.then(measure);
    const loop = now => {
      const dt = Math.min(48, now - last); last = now;
      if (!paused && !drag) x -= speed * dt / 16.67;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.style.transform = `translate3d(${x}px,0,0)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    rail.addEventListener('mouseenter', () => paused = true);
    rail.addEventListener('mouseleave', () => paused = false);
    rail.addEventListener('focusin', () => paused = true);
    rail.addEventListener('focusout', () => paused = false);
    rail.addEventListener('pointerdown', e => {
      drag = { sx: e.clientX, sy: e.clientY, x0: x, moved: false, id: e.pointerId };
    });
    rail.addEventListener('pointermove', e => {
      if (!drag) return;
      const dx = e.clientX - drag.sx;
      if (!drag.moved && Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(e.clientY - drag.sy)) {
        drag.moved = true; rail.setPointerCapture(drag.id); rail.classList.add('is-drag');
      }
      if (drag.moved) x = drag.x0 + dx;
    });
    const end = () => { if (!drag) return; rail.classList.remove('is-drag'); drag = null; if (matchMedia('(hover: none)').matches) paused = false; };
    rail.addEventListener('pointerup', end); rail.addEventListener('pointercancel', end);
    rail.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') x -= 320; else if (e.key === 'ArrowLeft') x += 320;
    });
  }

  /* ---------- video modal ---------- */
  const vm = $('[data-vmodal]');
  const vid = $('video', vm);
  let lastFocus = null;
  const closeV = () => { vid.pause(); vid.removeAttribute('src'); vid.load(); vm.hidden = true; document.body.style.overflow = ''; lastFocus && lastFocus.focus(); };
  $$('[data-video]').forEach(b => b.addEventListener('click', () => {
    lastFocus = b;
    vid.src = b.dataset.video;
    vm.hidden = false; document.body.style.overflow = 'hidden';
    vid.play().catch(() => {});
    $('.vm-x', vm).focus();
  }));
  $$('[data-vclose]', vm).forEach(el => el.addEventListener('click', closeV));
  // Escape must work even when focus sits inside the native video controls
  document.addEventListener('keydown', e => { if (!vm.hidden && e.key === 'Escape') { e.preventDefault(); closeV(); } }, true);
  vm.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const f = [vid, $('.vm-x', vm)]; const i = f.indexOf(document.activeElement);
    e.preventDefault(); f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
  });

  /* ---------- tout-doux list ---------- */
  const todo = $$('.todo input');
  const done = $('[data-todo-done]');
  todo.forEach(i => i.addEventListener('change', () => done.classList.toggle('on', todo.every(t => t.checked))));

  /* ---------- form -> WhatsApp ---------- */
  const form = $('#form');
  const err = $('[data-form-err]');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const nom = (d.get('nom') || '').trim(), tel = (d.get('tel') || '').trim();
    $$('.f', form).forEach(f => f.classList.remove('err'));
    if (!nom || tel.replace(/\D/g, '').length < 9) {
      if (!nom) form.nom.closest('.f').classList.add('err');
      if (tel.replace(/\D/g, '').length < 9) form.tel.closest('.f').classList.add('err');
      err.hidden = false; return;
    }
    err.hidden = true;
    const dispo = d.getAll('dispo');
    const lines = [
      'Bonjour Elodie,',
      "J'aimerais prendre rendez-vous.",
      '',
      `Nom : ${nom}`,
      `Téléphone : ${tel}`,
      `Soin : ${d.get('soin')}`,
      dispo.length ? `Disponibilités : ${dispo.join(', ')}` : '',
      (d.get('msg') || '').trim() ? `Message : ${d.get('msg').trim()}` : ''
    ].filter((l, i) => l || i === 2);
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  });

  /* ---------- opening hours: today + open now (Europe/Zurich) ---------- */
  const HOURS = { 1: [[510, 1230]], 2: [[510, 690]], 3: [[510, 690]], 4: [[510, 900]], 5: [[510, 900]], 6: [], 0: [] };
  try {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Zurich', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    const g = t => parts.find(p => p.type === t).value;
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(g('weekday'));
    const min = (+g('hour') % 24) * 60 + +g('minute');
    const row = $(`.hours tr[data-day="${day}"]`); row && row.classList.add('today');
    const open = HOURS[day].some(([a, b]) => min >= a && min < b);
    const badge = $('[data-open]');
    badge.textContent = open ? 'Ouvert maintenant' : 'Fermé maintenant';
    badge.classList.toggle('is-open', open);
  } catch (e) {}

  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  /* ---------- scroll animations ---------- */
  const reveals = $$('[data-reveal]');
  const ready = () => root.classList.remove('pre');
  if (reduce || /noanim/.test(location.search) || !window.gsap || !window.ScrollTrigger) { ready(); return; }
  gsap.registerPlugin(ScrollTrigger);

  // anything already on screen when this runs late stays as it is (avoids a visible flash)
  const late = performance.now() > 2300;
  const targets = reveals.filter(el => !(late && el.getBoundingClientRect().top < innerHeight));
  gsap.set(targets, { autoAlpha: 0, y: 28 });
  ready();
  ScrollTrigger.batch(targets, {
    start: 'top 88%',
    once: true,
    onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .09, overwrite: true })
  });

  // lymph line draws itself as the section scrolls by
  const line = $('.flow-line');
  if (line) {
    gsap.fromTo(line, { strokeDashoffset: 1 }, {
      strokeDashoffset: 0, ease: 'none',
      scrollTrigger: { trigger: '.need', start: 'top 85%', end: 'bottom 60%', scrub: .6 }
    });
    gsap.from('.flow-node', { scale: 0, transformOrigin: '50% 50%', duration: .6, ease: 'back.out(2)', stagger: .2,
      scrollTrigger: { trigger: '.need', start: 'top 55%' } });
  }

  // gentle parallax on a few photos
  $$('.about-nb, .hero-badge').forEach(el => gsap.to(el, {
    yPercent: -12, ease: 'none',
    scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
  }));

  addEventListener('load', () => ScrollTrigger.refresh());
})();
