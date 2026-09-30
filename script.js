// ============================================
// LÓGICA DEL FORMULARIO
// ============================================
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const form = $("#formulario");
const selMateria = $("#materia");
const inGrupo = $("#grupo");
const selDia = $("#dia");
const preguntaExtra = $("#pregunta-extra");
const practicasSection = $("#practicas-container");
const practicasLista = $("#practicas-lista");
const hintExtra = $("#hint-extra");
const btnEnviar = $("#btn-enviar");
const mensajeExito = $("#mensaje-exito");
const areaTag = $("#area-tag");

// ---------- Área visual ----------
function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

function aplicarArea() {
  // Limpia clases previas
  [...document.body.classList].forEach((c) => {
    if (c.startsWith("area-")) document.body.classList.remove(c);
  });

  const materia = selMateria.value;
  const area = AREAS[materia];

  if (!area) {
    areaTag.hidden = true;
    areaTag.textContent = "";
    return;
  }

  document.body.classList.add("area-" + slugify(area));
  areaTag.hidden = false;
  areaTag.textContent = "Área: " + area;
}

// ---------- Cargar materias ----------
function initMaterias() {
  Object.keys(MATERIAS).forEach((nombre) => {
    const opt = document.createElement("option");
    opt.value = nombre;
    opt.textContent = nombre;
    selMateria.appendChild(opt);
  });
}

// ---------- Flatpickr config ----------
function getFlatpickrConfig() {
  const dia = selDia.value;
  if (!dia) return null;
  const dayNum = DIAS_SEMANA[dia];

  return {
    locale: "es",
    minDate: CONFIG.FECHA_INICIO,
    maxDate: CONFIG.FECHA_FIN,
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "l, j F Y",
    disableMobile: true,
    disable: [
      function (date) {
        if (date.getDay() !== dayNum) return true;
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        if (FECHAS_EXCLUIDAS.includes(`${y}-${m}-${d}`)) return true;
        return false;
      },
    ],
  };
}

function destroyFlatpickrs() {
  $$(".fecha-input").forEach((inp) => {
    if (inp._flatpickr) inp._flatpickr.destroy();
  });
}

function initFlatpickrs() {
  const cfg = getFlatpickrConfig();
  if (!cfg) return;
  $$(".fecha-input").forEach((inp) => {
    flatpickr(inp, cfg);
  });
}
// ---------- Obtener la primera fecha disponible del día elegido ----------
function getPrimeraFechaDisponible(dia) {
  if (!dia) return null;
  const dayNum = DIAS_SEMANA[dia];
  const inicio = new Date(CONFIG.FECHA_INICIO + "T12:00:00");
  const fin = new Date(CONFIG.FECHA_FIN + "T12:00:00");
  const cursor = new Date(inicio);

  while (cursor <= fin) {
    if (cursor.getDay() === dayNum) {
      const y = cursor.getFullYear();
      const m = String(cursor.getMonth() + 1).padStart(2, "0");
      const d = String(cursor.getDate()).padStart(2, "0");
      const iso = `${y}-${m}-${d}`;
      if (!FECHAS_EXCLUIDAS.includes(iso)) return iso;
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return null;
}
// ---------- Render prácticas ----------
function renderPracticas() {
  const materia = selMateria.value;
  const dia = selDia.value;

  if (!materia || !dia) {
    practicasSection.hidden = true;
    practicasLista.innerHTML = "";
    return;
  }

  const practicas = MATERIAS[materia] || [];
  const modoExtra = document.querySelector('input[name="extra"]:checked')?.value === "si";

  destroyFlatpickrs();
  practicasLista.innerHTML = "";
  hintExtra.hidden = !modoExtra;

  practicas.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "practica";
    div.dataset.practica = p;

    if (modoExtra) {
      div.innerHTML = `
        <label class="practica-header">
          <input type="checkbox" class="check-extra" data-idx="${i}">
          <span class="practica-nombre">${p}</span>
        </label>
        <div class="fechas" data-idx="${i}">
          <div class="fecha-row">
            <label>Fecha 1</label>
            <input type="text" class="fecha-input" placeholder="Selecciona fecha...">
          </div>
        </div>
      `;
    } else {
      div.innerHTML = `
        <div class="practica-nombre-static">${p}</div>
        <div class="fechas" data-idx="${i}">
          <div class="fecha-row">
            <label>Fecha</label>
            <input type="text" class="fecha-input" placeholder="Selecciona fecha...">
          </div>
        </div>
      `;
    }

    practicasLista.appendChild(div);
  });

 practicasSection.hidden = false;

  if (modoExtra) {
    $$(".check-extra").forEach((chk) => {
      chk.addEventListener("change", onCheckExtraChange);
    });
  }

  initFlatpickrs();

  // ✨ Auto-rellenar la primera práctica con la primera fecha disponible
  const primeraFecha = getPrimeraFechaDisponible(dia);
  if (primeraFecha) {
    const primerInput = practicasLista.querySelector(".practica .fecha-input");
    if (primerInput && primerInput._flatpickr) {
      primerInput._flatpickr.setDate(primeraFecha, true);
    }
  }
}

function onCheckExtraChange(e) {
  const chk = e.target;
  const idx = chk.dataset.idx;
  const fechasDiv = document.querySelector(`.fechas[data-idx="${idx}"]`);
  if (!fechasDiv) return;
  const practicaDiv = chk.closest(".practica");

  if (chk.checked) {
    practicaDiv.classList.add("practica-con-extra");
    const existentes = fechasDiv.querySelectorAll(".fecha-row").length;
    for (let i = existentes; i < CONFIG.MAX_FECHAS_EXTRA; i++) {
      const row = document.createElement("div");
      row.className = "fecha-row";
      row.innerHTML = `
        <label>Fecha ${i + 1}</label>
        <input type="text" class="fecha-input" placeholder="Selecciona fecha...">
      `;
      fechasDiv.appendChild(row);
    }
  } else {
    practicaDiv.classList.remove("practica-con-extra");
    const rows = fechasDiv.querySelectorAll(".fecha-row");
    rows.forEach((row, i) => {
      if (i > 0) {
        const inp = row.querySelector(".fecha-input");
        if (inp && inp._flatpickr) inp._flatpickr.destroy();
        row.remove();
      }
    });
  }

  initFlatpickrs();
}

// ---------- Recolectar ----------
function recolectarDatos() {
  const practicas = [];
  $$(".practica").forEach((div) => {
    const nombre = div.dataset.practica;
    const fechas = [];
    div.querySelectorAll(".fecha-input").forEach((inp) => {
      if (inp.value) fechas.push(inp.value);
    });
    practicas.push({ nombre, fechas });
  });

  return {
    fecha_envio: new Date().toISOString(),
    materia: selMateria.value,
    area: AREAS[selMateria.value] || "",
    grupo: inGrupo.value.trim(),
    dia_clase: selDia.value,
    necesita_mas_fechas:
      document.querySelector('input[name="extra"]:checked')?.value === "si" ? "Sí" : "No",
    practicas,
  };
}

// ---------- Enviar ----------
async function enviarFormulario(e) {
  e.preventDefault();

  if (!selMateria.value) return alert("⚠️ Selecciona una materia.");
  if (!inGrupo.value.trim()) return alert("⚠️ Escribe el grupo.");
  if (!selDia.value) return alert("⚠️ Selecciona el día de clase.");

  const faltantes = [];
  $$(".practica").forEach((div) => {
    const first = div.querySelector(".fecha-input")?.value;
    if (!first) faltantes.push(div.dataset.practica);
  });
  if (faltantes.length) {
    return alert("⚠️ Faltan fechas en:\n\n• " + faltantes.join("\n• "));
  }

  const datos = recolectarDatos();

  btnEnviar.disabled = true;
  btnEnviar.textContent = "Enviando...";

  try {
    if (CONFIG.ENDPOINT) {
      const params = new URLSearchParams();
      params.append("payload", JSON.stringify(datos));
      await fetch(CONFIG.ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
    } else {
      console.log("📤 Datos a enviar:", datos);
      await new Promise((r) => setTimeout(r, 500));
    }

    form.hidden = true;
    mensajeExito.hidden = false;
    mensajeExito.scrollIntoView({ behavior: "smooth" });
  } catch (err) {
    console.error(err);
    alert("❌ Hubo un error al enviar. Intenta de nuevo.");
    btnEnviar.disabled = false;
    btnEnviar.textContent = "Enviar calendarización";
  }
}

// ---------- Init ----------
function init() {
  initMaterias();

  selMateria.addEventListener("change", () => {
    aplicarArea();
    if (!selMateria.value) {
      preguntaExtra.hidden = true;
      practicasSection.hidden = true;
      practicasLista.innerHTML = "";
      hintExtra.hidden = true;
      return;
    }
    if (selDia.value) {
      preguntaExtra.hidden = false;
      renderPracticas();
    }
  });

  selDia.addEventListener("change", () => {
    if (!selDia.value) {
      practicasSection.hidden = true;
      return;
    }
    if (selMateria.value) {
      preguntaExtra.hidden = false;
      renderPracticas();
    }
  });

  $$('input[name="extra"]').forEach((r) => {
    r.addEventListener("change", () => {
      if (selMateria.value && selDia.value) renderPracticas();
    });
  });

  form.addEventListener("submit", enviarFormulario);
}

document.addEventListener("DOMContentLoaded", init);
