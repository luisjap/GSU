(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasIO = "IntersectionObserver" in window;

  // ---------- menú móvil ----------
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".site-header__toggle");
  if (header && toggle) {
    const cerrar = () => {
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    header.querySelectorAll(".site-header__nav a, .site-header__cta").forEach((a) => a.addEventListener("click", cerrar));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrar(); });
  }

  // ---------- aparición al hacer scroll ----------
  const reveal = document.querySelectorAll(".reveal-up");
  if (reducedMotion || !hasIO) {
    reveal.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    reveal.forEach((el) => io.observe(el));
  }

  // ---------- preguntas frecuentes ----------
  document.querySelectorAll(".faq-item__q").forEach((btn) => {
    const item = btn.closest(".faq-item");
    const answer = item.querySelector(".faq-item__a");
    answer.style.maxHeight = "0px";
    btn.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
      answer.style.maxHeight = open ? `${answer.scrollHeight}px` : "0px";
    });
  });

  // ---------- carruseles ----------
  document.querySelectorAll(".mini-carousel").forEach((carousel) => {
    const track = carousel.querySelector(".mini-carousel__track");
    const prev = carousel.querySelector('[data-dir="prev"]');
    const next = carousel.querySelector('[data-dir="next"]');
    if (!track || !prev || !next) return;
    const step = () => track.querySelector(".mini-carousel__item").getBoundingClientRect().width + 8;
    const update = () => {
      prev.disabled = track.scrollLeft < 8;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 8;
    };
    prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: reducedMotion ? "auto" : "smooth" }));
    next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: reducedMotion ? "auto" : "smooth" }));
    track.addEventListener("scroll", update, { passive: true });
    update();
  });
  document.querySelectorAll(".r26 .arrows button").forEach((b) => {
    b.addEventListener("click", () => {
      const sec = b.closest("section");
      const track = sec && sec.querySelector(".track");
      if (!track || !track.firstElementChild) return;
      const w = track.firstElementChild.getBoundingClientRect().width + 14;
      track.scrollBy({ left: w * Number(b.dataset.dir), behavior: reducedMotion ? "auto" : "smooth" });
    });
  });

  // climatización: el panel bajo el mouse (o con foco) se expande
  document.querySelectorAll(".r26 .acc").forEach((acc) => {
    const paneles = [...acc.querySelectorAll(".acc__p")];
    const abrir = (p) => paneles.forEach((x) => x.classList.toggle("is-open", x === p));
    paneles.forEach((p) => {
      p.addEventListener("mouseenter", () => abrir(p));
      p.addEventListener("focus", () => abrir(p));
    });
  });

  // las flechas solo se muestran si el carrusel tiene tarjetas fuera de la vista
  const revisarFlechas = () => {
    document.querySelectorAll(".r26 .arrows").forEach((arr) => {
      const track = arr.closest("section")?.querySelector(".track");
      arr.hidden = !track || track.scrollWidth <= track.clientWidth + 4;
    });
  };
  revisarFlechas();
  window.addEventListener("resize", revisarFlechas, { passive: true });

  // ---------- año del pie de página ----------
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  // ---------- banners: la foto de las letras gigantes se carga al acercarse ----------
  const words = document.querySelectorAll(".banner__word[data-bg]");
  const cargarPalabra = (el) => { el.style.backgroundImage = `url("${el.dataset.bg}")`; el.removeAttribute("data-bg"); };
  if (hasIO) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        cargarPalabra(e.target);
        if (!reducedMotion) e.target.closest(".banner")?.classList.add("play");
        io.unobserve(e.target);
      });
    }, { rootMargin: "300px 0px" });
    words.forEach((w) => io.observe(w));
  } else {
    words.forEach(cargarPalabra);
  }

  // las palabras gigantes se ajustan al ancho real del bloque (cada letra tiene un ancho distinto)
  const ajustarPalabras = () => {
    document.querySelectorAll(".r26 .banner__word").forEach((w) => {
      const caja = w.parentElement;
      const cs = getComputedStyle(caja);
      const libre = caja.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      w.style.fontSize = "";
      const base = parseFloat(getComputedStyle(w).fontSize);
      const ancho = w.scrollWidth;
      if (!ancho || !libre) return;
      const max = caja.clientWidth < 640 ? 130 : 150;
      w.style.fontSize = `${Math.min(max, Math.floor(base * (libre / ancho) * 0.97))}px`;
    });
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajustarPalabras);
  ajustarPalabras();
  let tAjuste;
  window.addEventListener("resize", () => { clearTimeout(tAjuste); tAjuste = setTimeout(ajustarPalabras, 150); }, { passive: true });

  // ---------- animaciones del inicio: se pausan fuera de pantalla ----------
  const anims = document.querySelectorAll(".r26 .anim");
  if (hasIO && !reducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        e.target.classList.toggle("off", !e.isIntersecting);
        if (e.isIntersecting) e.target.classList.add("play");
      });
    }, { rootMargin: "80px 0px" });
    anims.forEach((el) => { el.classList.add("off"); io.observe(el); });
  }

  if (!reducedMotion) {
    // lluvia sobre el banner de impermeabilización
    const imper = document.querySelector(".r26 .imper .banner__photo");
    if (imper) {
      const drops = document.createElement("div");
      drops.className = "drops";
      drops.setAttribute("aria-hidden", "true");
      for (let i = 0; i < 12; i++) {
        const d = document.createElement("i");
        d.style.left = `${4 + i * 8}%`;
        d.style.animationDelay = `${(Math.random() * 1.6).toFixed(2)}s`;
        d.style.animationDuration = `${(1.1 + Math.random() * 0.8).toFixed(2)}s`;
        drops.appendChild(d);
      }
      imper.appendChild(drops);
    }
    // chispas sobre la foto de soldadura
    const sparks = document.querySelector(".r26 [data-sparks]");
    if (sparks) {
      for (let j = 0; j < 10; j++) {
        const s = document.createElement("span");
        s.className = "spark";
        s.style.left = "50%";
        s.style.top = "58%";
        const a = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 70;
        s.style.setProperty("--dx", `${(Math.cos(a) * dist).toFixed(0)}px`);
        s.style.setProperty("--dy", `${(Math.sin(a) * dist - 20).toFixed(0)}px`);
        s.style.animationDelay = `${(Math.random() * 1.4).toFixed(2)}s`;
        sparks.appendChild(s);
      }
    }
    // rayo con parpadeo de tensión
    document.querySelectorAll("[data-bolt]").forEach((el) => el.classList.add("bolt"));
  }

  // hora en vivo en la cámara 1
  const reloj = document.querySelector("[data-clock]");
  if (reloj) {
    const dos = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const d = new Date();
      reloj.textContent = `${dos(d.getDate())}-${dos(d.getMonth() + 1)}-${d.getFullYear()} ${dos(d.getHours())}:${dos(d.getMinutes())}:${dos(d.getSeconds())}`;
    };
    tick();
    setInterval(tick, 1000);
  }

  // temperatura que baja de 30 a 22 °C (el valor final ya está escrito en la página)
  document.querySelectorAll("[data-count]").forEach((el) => {
    if (reducedMotion || !hasIO) return;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const fin = Number(el.dataset.count);
      const inicio = 30;
      const t0 = performance.now();
      const paso = (t) => {
        const k = Math.min(1, (t - t0) / 1200);
        el.textContent = String(Math.round(inicio + (fin - inicio) * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    }, { threshold: 0.6 });
    io.observe(el);
  });

  // ---------- menú de servicios del inicio: marca la sección visible ----------
  const snav = document.querySelector(".r26 .snav");
  if (snav && hasIO) {
    // la cinta tiene dos copias de los enlaces para el giro infinito
    const links = [...snav.querySelectorAll("a")];
    const prog = snav.querySelector(".prog");
    const ids = [...new Set(links.map((a) => a.getAttribute("href")))];
    const secs = ids.map((h) => document.querySelector(h)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = `#${e.target.id}`;
        links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === id));
        if (prog) {
          prog.style.width = `${((secs.indexOf(e.target) + 1) / secs.length) * 100}%`;
          prog.style.setProperty("--prog", e.target.dataset.c || "#0057B8");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    // en pantallas táctiles, tocar la cinta la detiene unos segundos para poder elegir
    let reanudar;
    snav.addEventListener("touchstart", () => {
      snav.classList.add("is-paused");
      clearTimeout(reanudar);
      reanudar = setTimeout(() => snav.classList.remove("is-paused"), 4000);
    }, { passive: true });
    secs.forEach((s) => io.observe(s));
  }

  // ---------- formulario de contacto ----------
  const form = document.querySelector("form[data-contact-form]");
  if (form) {
    const status = form.querySelector(".form-status");
    const boton = form.querySelector('button[type="submit"]');
    const textoBoton = boton.textContent;
    const params = new URLSearchParams(location.search);
    if (params.get("servicio") && form.servicio.querySelector(`option[value="${CSS.escape(params.get("servicio"))}"]`)) form.servicio.value = params.get("servicio");
    if (params.get("comuna")) form.comuna.value = params.get("comuna").slice(0, 120);

    const marcar = (nombre, error) => {
      const campo = form.querySelector(`[data-field="${nombre}"]`);
      if (!campo) return;
      campo.classList.toggle("form-field--error", error);
      const input = campo.querySelector("input, select, textarea");
      if (input) {
        input.setAttribute("aria-invalid", String(error));
        const msg = campo.querySelector(".form-error");
        if (msg && msg.id) input.setAttribute("aria-describedby", msg.id);
      }
    };
    const mostrar = (html, tipo) => {
      status.innerHTML = html;
      status.className = `form-status full is-visible form-status--${tipo}`;
    };
    const validar = () => {
      const err = {};
      if (!form.nombre.value.trim()) err.nombre = true;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim())) err.email = true;
      if (!form.telefono.value.trim()) err.telefono = true;
      if (!form.comuna.value.trim()) err.comuna = true;
      if (!form.servicio.value) err.servicio = true;
      if (!form.mensaje.value.trim()) err.mensaje = true;
      if (!form.consentimiento.checked) err.consentimiento = true;
      const fotos = [...form.fotos.files];
      if (fotos.length > 3 || fotos.some((f) => f.size > 5 * 1024 * 1024)) err.fotos = true;
      return err;
    };
    const aplicar = (err) => {
      ["nombre", "email", "telefono", "comuna", "servicio", "mensaje", "fotos", "consentimiento"].forEach((n) => marcar(n, Boolean(err[n])));
    };
    const whatsapp = '<a href="https://wa.me/56998501325" target="_blank" rel="noopener">WhatsApp al +56 9 9850 1325</a>';

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const err = validar();
      aplicar(err);
      const n = Object.keys(err).length;
      if (n) {
        mostrar(`Revisa ${n === 1 ? "el campo marcado" : `los ${n} campos marcados`} para poder enviar tu solicitud.`, "err");
        form.querySelector(".form-field--error input, .form-field--error select, .form-field--error textarea, .consent.form-field--error input")?.focus();
        return;
      }
      boton.disabled = true;
      boton.setAttribute("aria-busy", "true");
      boton.textContent = "Enviando…";
      mostrar("Enviando tu solicitud…", "ok");
      try {
        const r = await fetch(form.action, { method: "POST", body: new FormData(form) });
        const datos = await r.json().catch(() => ({}));
        if (r.ok && datos.ok) {
          form.reset();
          mostrar(`<strong>Recibimos tu solicitud.</strong> Te responderemos al correo que indicaste. Si es urgente, escríbenos por ${whatsapp}.`, "ok");
        } else if (r.status === 422 && datos.campos) {
          aplicar(datos.campos);
          mostrar("Revisa los campos marcados para poder enviar tu solicitud.", "err");
        } else {
          mostrar(`${datos.error || "No pudimos enviar tu solicitud."} Tus datos siguen en el formulario: inténtalo de nuevo o escríbenos por ${whatsapp}.`, "err");
        }
      } catch {
        mostrar(`No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo, o escríbenos por ${whatsapp}.`, "err");
      } finally {
        boton.disabled = false;
        boton.removeAttribute("aria-busy");
        boton.textContent = textoBoton;
      }
    });
    form.querySelectorAll("input, select, textarea").forEach((el) => {
      el.addEventListener("input", () => marcar(el.closest("[data-field]")?.dataset.field, false));
    });
  }
})();
