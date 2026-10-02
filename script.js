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

// ============================================
// ÁREA VISUAL
// ============================================
function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

function aplicarArea() {
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

// ============================================
// CARGAR MATERIAS
// ============================================
function initMaterias() {
  Object.keys(MATERIAS).forEach((nombre) => {
    const opt = document.createElement("option");
    opt.value = nombre;
    opt.textContent = nombre;
    selMateria.appendChild(opt);
  });
}

// ============================================
// FLATPICKR CONFIG
// ============================================
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
    if (inp._flatpickr) return;
    flatpickr(inp, cfg);
  });
}

// ============================================
// PRIMERA FECHA DISPONIBLE
// ============================================
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

// ============================================
// HELPERS: leer/escribir fechas de un input flatpickr
// ============================================
function leerFechaDeInput(inp) {
  const fp = inp._flatpickr;
  if (!fp || fp.input !== inp || !fp.selectedDates[0]) return null;
  return fp.selectedDates[0].getTime();
}

function setFechaEnInput(inp, timestamp) {
  const fp = inp._flatpickr;
  if (!fp || fp.input !== inp) return;
  if (timestamp === null || timestamp === undefined) {
    fp.clear();
  } else {
    fp.setDate(new Date(timestamp), true);
  }
}

// ============================================
// SNAPSHOT: guardar y restaurar fechas
// ============================================
function tomarSnapshot() {
  const snap = [];
  $$(".practica").forEach((pDiv) => {
    const fechas = [];
    pDiv.querySelectorAll(".fecha-input").forEach((inp) => {
      fechas.push(leerFechaDeInput(inp));
    });
    snap.push({
      practica: pDiv.dataset.practica,
      fechas,
    });
  });
  return snap;
}

function restaurarSnapshot(snap) {
  $$(".practica").forEach((pDiv) => {
    const saved = snap.find((s) => s.practica === pDiv.dataset.practica);
    if (!saved) return;
    let i = 0;
    pDiv.querySelectorAll(".fecha-input").forEach((inp) => {
      if (i < saved.fechas.length) {
        setFechaEnInput(inp, saved.fechas[i]);
      }
      i++;
    });
  });
}

// ============================================
// RENDER PRÁCTICAS
// ============================================
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

  // ✨ Auto-rellenar la primera práctica
  const primeraFecha = getPrimeraFechaDisponible(dia);
  if (primeraFecha) {
    const primerInput = practicasLista.querySelector(".practica .fecha-input");
    if (primerInput && primerInput._flatpickr) {
      primerInput._flatpickr.setDate(primeraFecha, true);
    }
  }
}

// ============================================
// CHECKBOX "MÁS FECHAS" — con snapshot
// ============================================
function onCheckExtraChange(e) {
  const chk = e.target;
  const idx = chk.dataset.idx;
  const practicaDiv = chk.closest(".practica");
  const fechasDiv = practicaDiv.querySelector(`.fechas[data-idx="${idx}"]`);
  if (!fechasDiv) return;

  // 1. Guardar TODAS las fechas actuales
  const snapshot = tomarSnapshot();

  // 2. Modificar SOLO la práctica clickeada
  if (chk.checked) {
    practicaDiv.classList.add("practica-con-extra");
    const existentes = fechasDiv.querySelectorAll(".fecha-row").length;
    for (let i = existentes; i < CONFIG.MAX_FECHAS_EXTRA; i++) {
      const row = document.createElement("div");
      row.className = "fecha-row";
      row.innerHTML = `
        <label>Fecha ${i + 1} <span class="opcional">(opcional)</span></label>
        <input type="text" class="fecha-input" placeholder="Selecciona fecha...">
      `;
      fechasDiv.appendChild(row);
    }

    // Inicializar SOLO los inputs nuevos de esta práctica
    const cfg = getFlatpickrConfig();
    if (cfg) {
      fechasDiv.querySelectorAll(".fecha-input").forEach((inp) => {
        if (inp._flatpickr) return;
        flatpickr(inp, cfg);
      });
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

  // 3. Restaurar TODAS las fechas guardadas
  restaurarSnapshot(snapshot);
}

// ============================================
// FORMATEAR FECHA dd/mm/aaaa
// ============================================
function formatearFecha(d) {
  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const anio = d.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

// ============================================
// RECOLECTAR DATOS
// ============================================
function recolectarDatos() {
  const practicas = [];

  $$(".practica").forEach((div) => {
    const nombre = div.dataset.practica;
    const fechas = [];

    div.querySelectorAll(".fecha-input").forEach((inp) => {
      const fp = inp._flatpickr;
      if (!fp || fp.input !== inp) return; // solo input original
      if (!fp.selectedDates[0]) return;    // ignorar vacías
      fechas.push(formatearFecha(fp.selectedDates[0]));
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

// ============================================
// ENVIAR FORMULARIO
// ============================================
async function enviarFormulario(e) {
  e.preventDefault();

  if (!selMateria.value) return alert("⚠️ Selecciona una materia.");
  if (!inGrupo.value.trim()) return alert("⚠️ Escribe el grupo.");
  if (!selDia.value) return alert("⚠️ Selecciona el día de clase.");

  // ✅ Validación: al menos 1 fecha por sesión (máx 6, extras opcionales)
  const faltantes = [];
  $$(".practica").forEach((div) => {
    const fechasValidas = [];
    div.querySelectorAll(".fecha-input").forEach((inp) => {
      const fp = inp._flatpickr;
      if (!fp || fp.input !== inp) return;
      if (fp.selectedDates[0]) fechasValidas.push(fp.selectedDates[0]);
    });

    if (fechasValidas.length === 0) {
      faltantes.push(div.dataset.practica);
    } else if (fechasValidas.length > CONFIG.MAX_FECHAS_EXTRA) {
      faltantes.push(div.dataset.practica + " (máximo 6 fechas)");
    }
  });

  if (faltantes.length) {
    return alert(
      "⚠️ Debes asignar al menos UNA fecha a cada sesión.\n\n" +
      "Faltan fechas en:\n\n• " + faltantes.join("\n• ")
    );
  }

  const datos = recolectarDatos();
  console.log("📤 Datos a enviar:", datos);

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

// ============================================
// INIT
// ============================================
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
