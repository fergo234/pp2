// ============================================
// DATOS DEL FORMULARIO
// ============================================

const MATERIAS = {
  "COMPORTAMIENTO DE MATERIALES": [
    "Sesión 00: Seguridad, reglamento y uso de equipo.",
    "Sesión 01: Determinación de la resistencia a la compresión simple en cilindros de concreto.",
    "Sesión 02: Tensión en acero.",
    "Sesión 03: Determinación de la resistencia a la tensión en madera por el método de flexión. (Módulo de Ruptura), con carga al centro.",
    "Sesión 04: Determinación de la resistencia de concreto hidráulico por el método de tensión indirecta o compresión diametral. (Prueba Brasileña).",
    "Sesión 05: Compresión simple en suelo, qu.",
    "Sesión 06: Viscosidad Saybolt-Furol en cemento asfáltico.",
    "Sesión 07: Densidad de cementos hidráulicos."
  ],
  "COMPORTAMIENTO DE SUELOS": [
    "Sesión 00: Seguridad, reglamento y uso de equipo.",
    "Sesión 01: Exploración y muestreo en suelos con pozo a cielo abierto (PCA).",
    "Sesión 02: Contenido de agua.",
    "Sesión 03: Densidad de sólidos.",
    "Sesión 04: Límites de consistencia, con copa de Casagrande y Cono de penetración.",
    "Sesión 05: Consolidación unidimensional en suelos.",
    "Sesión 06: Prueba de permeabilidad con carga constante y carga variante.",
    "Sesión 07: Contracción lineal.",
    "Sesión 08: Prueba de expansibilidad (investigación).",
    "Sesión 09: Reporte técnico y visita de campo."
  ],
  "CONSTRUCCION DE ESTRUCTURAS": [
    "Sesión 00: Seguridad, reglamento y uso de equipo.",
    "Sesión 01: Contenido de agua y peso volumétrico en los agregados pétreos (grava y arena).",
    "Sesión 02: Análisis granulométrico de los agregados pétreos (grava y arena).",
    "Sesión 03: Absorción y densidad de los agregados pétreos (grava y arena).",
    "Sesión 04: Dosificación y fabricación, determinación del revenimiento y muestreo de concreto hidráulico de resistencia normal, fc<250Kg/cm².",
    "Sesión 05: Dosificación, fabricación determinación del revenimiento y muestreo de concreto hidráulico tipo ligero.",
    "Sesión 06: Dosificación y fabricación, determinación del revenimiento y muestreo de concreto hidráulico de alta resistencia, f'c>250 kg/cm².",
    "Sesión 07: Determinación de la resistencia a la compresión simple de cilindros de concreto normal, ligero y alta resistencia.",
    "Sesión 08: Determinación de la resistencia a la tensión de concreto hidráulico por el método de flexión (módulo de ruptura).",
    "Sesión 09: Determinación de la tensión de concreto hidráulico por el método de tensión indirecta o compresión diametral. (Prueba Brasileña).",
    "Sesión 10: Ensaye de tensión de acero (varilla), analizando propiedades de las corrugaciones."
  ],
  "ESTATICA": [
    "Sesión 00: Seguridad, reglamento y uso de equipo.",
    "Sesión 01: Equilibrio de un cuerpo rígido. (Prueba piloto).",
    "Sesión 02: Fuerzas de un triángulo. (Prueba piloto).",
    "Sesión 03: Reacciones de una viga simplemente apoyada. (Prueba piloto)."
  ],
  "ESTRUCTURAS DE PAVIMENTO": [
    "Sesión 00: Uso y manejo de equipo y herramienta.",
    "No. 1: Preparación de la muestra con cuarteador (disgregación y cuarteo).",
    "No. 2: Peso volumétrico seco máximo y humedad óptima (Porter).",
    "No. 3: Valor relativo de soporte y expansión.",
    "No. 4: Valor cementante.",
    "No. 5: Penetración en asfaltos.",
    "No. 6: Punto de inflamación.",
    "No. 7: Viscosidad Saybolt Furol.",
    "No. 8: Permeabilidad en carpetas asfálticas.",
    "No. 9: Prueba Marshall.",
    "No. 10: Prueba proctor."
  ],
  "HIDRAULICA BASICA": [
    "Sesión 00: Seguridad, reglamento y uso de equipo.",
    "Sesión 01: Propiedades físicas de los líquidos.",
    "Sesión 02: Velocidad longitudinal en un flujo de agua.",
    "Sesión 03: Régimen de la corriente.",
    "Sesión 04: Gradientes hidráulicos.",
    "Sesión 05: Pérdidas hidráulicas.",
    "Sesión 06: Dispositivos de aforo."
  ],
  "HIDRAULICA DE CANALES": [
    "Sesión 00: Seguridad, reglamento y uso de equipo.",
    "Sesión 01: Flujo a superficie libre.",
    "Sesión 02: Distribución de velocidades en un flujo de agua.",
    "Sesión 03: Energía específica.",
    "Sesión 04: Salto hidráulico.",
    "Sesión 05: Perfiles hidráulicos.",
    "Sesión 06: Arrastre de sedimentos."
  ],
  "HIDROMECANICA": [
    "Sesión 00: Seguridad, reglamento y uso de equipo.",
    "Sesión 01: Máquinas hidráulicas.",
    "Sesión 02: Mantenimiento a una bomba centrífuga horizontal.",
    "Sesión 03: Comportamiento de las bombas centrífuga y axial.",
    "Sesión 04: Comportamiento de una bomba multietapa.",
    "Sesión 05: Comportamiento de las turbina Francis.",
    "Sesión 06: Golpe de ariete."
  ],
  "MECANICA DE MATERIALES I": [
    "Sesión 00: Seguridad, reglamento y uso de equipo.",
    "Sesión 01: Tensión en acero (varillas).",
    "Sesión 02: Obtención de gráfica esfuerzo-deformación unitaria y modulo de elasticidad del acero de refuerzo.",
    "Sesión 03: Compresión en madera.",
    "Sesión 04: Compresión simple en concreto.",
    "Sesión 05: Esfuerzo cortante en acero de refuerzo.",
    "Sesión 06: Flexión de madera.",
    "Sesión 07: Pandeo lateral y deflexión de madera.",
    "Sesión 08: Dimensionamiento en madera, revisando por pandeo, flecha y giro.",
    "Sesión 09: Pruebas no destructivas a elementos de concreto reforzado."
  ],
  "MECANICA DE MATERIALES II": [
    "Sesión 00: Seguridad, reglamento y uso de equipo.",
    "Sesión 01: Elaboración de vigas de concreto, con las características, sobreforzada, sobreforzada y doblemente armada.",
    "Sesión 02: Ensaye a flexión de los elementos estructurales construidos.",
    "Sesión 03: Flexocompresión en elementos estructurales tipo columna.",
    "Sesión 04: Elaboración de losa de concreto reforzado, perimetralmente apoyada.",
    "Sesión 05: Pruebas No destructivas a elementos de concreto reforzado."
  ],
  "MECANICA DE ROCAS": [
    "Sesión 00: Seguridad, reglamento y uso de equipo.",
    "Sesión 01: Exploración y muestreo en rocas.",
    "Sesión 02: Determinación de las propiedades índice: peso específico, absorción del agua.",
    "Sesión 03: Compresión simple en rocas.",
    "Sesión 04: Tensión por flexión en rocas.",
    "Sesión 05: Tensión indirecta o compresión diametral (prueba Brasileña) en rocas.",
    "Sesión 06: Pruba de intemperismo acelerado.",
    "Sesión 07: Prueba triaxial en rocas (investigación).",
    "Sesión 08: Resistencia cortante en campo (investigación).",
    "Sesión 09: Ensaye de campo para determinar la deformabilidad de macizos rocosos (investigación)."
  ],
  "MECANICA DE SUELOS": [
    "Sesión 00: Seguridad, reglamento y uso de equipo.",
    "Sesión 01: Exploración y muestreo en suelos con pozo a cielo abierto (PCA).",
    "Sesión 02: Determinación de contenido de agua (W%).",
    "Sesión 03: Límites de consistencia con copa de Casagrande y/o cono de penetración.",
    "Sesión 04: Densidad de sólidos, Ss en suelos.",
    "Sesión 05: Compresión simple en suelos, qu.",
    "Sesión 06: Consolidación unidimensional.",
    "Sesión 07: Compresión Triaxial rápida UU (no consolidada no drenada).",
    "Sesión 08: Reporte Técnico."
  ],
  "MOVIMIENTO DE TIERRAS": [
    "Sesión 00: Seguridad, reglamento y uso de equipo.",
    "Sesión 01: Prueba de compactación en suelos finos, Proctor SCT.",
    "Sesión 02: Prueba de compactación en suelos gruesos, Porter.",
    "Sesión 03: Peso volumétrico de campo. Método de la arena de Ottawa.",
    "Sesión 04: Prueba de abrasión en agregados pétreos (grava).",
    "Sesión 05: Tipos propiedades y aplicaciones de los explosivos (investigación). Tipos de anclas (investigación)."
  ],
  "OBRAS HIDRAULICAS": [
    "Sesión 00: Seguridad, reglamento y uso de equipo.",
    "Sesión 01: Obras de desvío.",
    "Sesión 02: Presas de gravedad.",
    "Sesión 03: Presas de tierra.",
    "Sesión 04: Vertedor de descarga libre.",
    "Sesión 05: Sifón.",
    "Sesión 06: Medidor Parshall.",
    "Sesión 07: Tránsito de avenidas (opcional)."
  ],
  "RECURSOS DE LA CONSTRUCCION": [
    "Sesión 00: Seguridad, reglamento y uso de equipo.",
    "Sesión 01: Preparación de la muestra con cuarteador.",
    "Sesión 02: Contenido de agua, de grava y arena.",
    "Sesión 03: Análisis granulométrico de los agregados pétreos.",
    "Sesión 04: Peso volumétrico seco, suelto y compactado de los agregados pétreos.",
    "Sesión 05: Peso específico y absorción de los agregados pétreos.",
    "Sesión 06: Contenido de materia orgánica del agregado fino (ARENA).",
    "Sesión 07: Análisis químico macroscópico para aceros estructurales de refuerzos (varillas).",
    "Sesión 08: Resistencia a la compresión de ladrillos, bloques y adoquines de concreto.",
    "Sesión 09: Absorción de agua máxima inicial en los tabiques o ladrillos.",
    "Sesión 10: Módulo de ruptura en tabiques."
  ]
};

const PRACTICAS_TOPOGRAFIA = [
  "Sesión 01: Muestra de instrumentos topográficos.",
  "Sesión 02: Medición de longitud de una línea y trazo de ángulo con cinta.",
  "Sesión 03: Levantamiento topográfico de un predio con cinta por dos métodos.",
  "Sesión 04: Levantamiento topográfico de un predio con brújula y cinta.",
  "Sesión 05: Uso y manejo del tránsito, centrado, nivelado y la realización de punterías.",
  "Sesión 06: Levantamiento topográfico de un predio urbano con tránsito y cinta.",
  "Sesión 07: Cálculo de la tabla de deflexiones de una curva horizontal y su trazo en el terreno.",
  "Sesión 08: Nivelación diferencial de circuito y su verificación.",
  "Sesión 09: Trazo y nivelación de un eje y secciones transversales.",
  "Sesión 10: Levantamiento taquimétrico de un terreno accidentado con estadía o estación.",
  "Sesión 11: Dibujo de las curvas de nivel.",
  "Sesión 12: Trazo de una ruta de vuelo de un predio con DRON (Prueba piloto)."
];

MATERIAS["PRACTICAS DE TOPOGRAFIA"] = PRACTICAS_TOPOGRAFIA;
MATERIAS["PRACTICAS DE TOPOGRAFIA Y GEOMATICA"] = PRACTICAS_TOPOGRAFIA;

// ============================================
// ÁREAS POR MATERIA
// ============================================
const AREAS = {
  "COMPORTAMIENTO DE MATERIALES": "GEOTECNIA",
  "COMPORTAMIENTO DE SUELOS": "GEOTECNIA",
  "CONSTRUCCION DE ESTRUCTURAS": "CONSTRUCCION",
  "ESTATICA": "CIENCIAS BASICAS",
  "ESTRUCTURAS DE PAVIMENTO": "GEOTECNIA",
  "HIDRAULICA BASICA": "HIDRAULICA",
  "HIDRAULICA DE CANALES": "HIDRAULICA",
  "HIDROMECANICA": "HIDRAULICA",
  "MECANICA DE MATERIALES I": "MATERIALES",
  "MECANICA DE MATERIALES II": "MATERIALES",
  "MECANICA DE ROCAS": "GEOTECNIA",
  "MECANICA DE SUELOS": "GEOTECNIA",
  "MOVIMIENTO DE TIERRAS": "CONSTRUCCION",
  "OBRAS HIDRAULICAS": "HIDRAULICA",
  "RECURSOS DE LA CONSTRUCCION": "CONSTRUCCION",
  "PRACTICAS DE TOPOGRAFIA": "TOPOGRAFIA",
  "PRACTICAS DE TOPOGRAFIA Y GEOMATICA": "TOPOGRAFIA"
};

// ============================================
// CONFIGURACIÓN GLOBAL
// ============================================
const CONFIG = {
  FECHA_INICIO: "2027-02-02",
  FECHA_FIN: "2027-05-28",
  MAX_FECHAS_EXTRA: 6,
  // 👇 Pega aquí tu URL de Google Apps Script
  ENDPOINT: ""
};

const DIAS_SEMANA = {
  "Lunes": 1,
  "Martes": 2,
  "Miércoles": 3,
  "Jueves": 4,
  "Viernes": 5
};

const FECHAS_EXCLUIDAS = [
  "2027-03-15",
  "2027-03-22", "2027-03-23", "2027-03-24", "2027-03-25", "2027-03-26",
  "2027-05-10"
];