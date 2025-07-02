function showSection(id) {
  document.querySelectorAll("main section").forEach(sec => sec.classList.add("oculto"));
  document.getElementById(id).classList.remove("oculto");
}

// 👉 Establecer la fecha actual al abrir la página
const fechaInput = document.getElementById("fecha");
const today = new Date().toISOString().split("T")[0];
fechaInput.value = today;

const form = document.getElementById("daily-form");

// Cargar valores si existen para la fecha seleccionada
function cargarDatos(dia) {
  const datosGuardados = JSON.parse(localStorage.getItem(`registro-${dia}`));
  if (datosGuardados) {
    form.alimentacion.value = datosGuardados.alimentacion;
    form.deporte.value = datosGuardados.deporte;
    form.estudio.value = datosGuardados.estudio;
    form.emocional.value = datosGuardados.emocional;
  } else {
    form.reset();
  }
}

cargarDatos(today); // Carga inicial

// Cuando cambia la fecha → cargar datos si existen
fechaInput.addEventListener("change", () => {
  cargarDatos(fechaInput.value);
});

// Guardar datos al enviar
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const dia = fechaInput.value;
  const data = {
    alimentacion: parseInt(form.alimentacion.value),
    deporte: parseInt(form.deporte.value),
    estudio: parseInt(form.estudio.value),
    emocional: parseInt(form.emocional.value)
  };

  localStorage.setItem(`registro-${dia}`, JSON.stringify(data));
  alert(`¡Registro para el ${dia} guardado!`);
});

const capacidades = [
  {
    id: "salud",
    titulo: "Salud",
    descripcion: "Descanso, higiene, alimentación, consciencia corporal y bienestar físico."
  },
  {
    id: "deporte",
    titulo: "Deporte",
    descripcion: "Actividad física, esfuerzo corporal, movilidad, constancia en el ejercicio."
  },
  {
    id: "estudios",
    titulo: "Estudios",
    descripcion: "Comprensión, aprendizaje, práctica académica, deberes o dedicación personal."
  },
  {
    id: "trabajo",
    titulo: "Trabajo",
    descripcion: "Productividad, tareas profesionales, organización laboral o personal."
  },
  {
    id: "emocional",
    titulo: "Estado emocional",
    descripcion: "Ánimo, control emocional, estabilidad, reflexión interna y descanso mental."
  },
  {
    id: "social",
    titulo: "Relaciones sociales",
    descripcion: "Interacciones, comunicación, comprensión social, empatía o convivencia."
  }
];

// Opciones de mejora
const opciones = [
  { valor: 1, texto: "No he mejorado" },
  { valor: 2, texto: "He mejorado un poco" },
  { valor: 3, texto: "He mejorado bastante" }
];

// Mostrar capacidades con selectores
function renderCategoriasEvaluacion(fecha) {
  const contenedor = document.getElementById("categorias-contenedor");
  contenedor.innerHTML = ""; // Limpiar antes

  // Cargar si hay datos guardados
  const datos = JSON.parse(localStorage.getItem(`evaluacion-${fecha}`)) || {};

  capacidades.forEach(cap => {
    const wrapper = document.createElement("div");
    wrapper.className = "categoria";

    const titulo = document.createElement("h3");
    titulo.textContent = cap.titulo;

    const descripcion = document.createElement("p");
    descripcion.textContent = cap.descripcion;

    const select = document.createElement("select");
    opciones.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt.valor;
      option.textContent = opt.texto;
      if ((datos[cap.id] || 1) === opt.valor) option.selected = true;
      select.appendChild(option);
    });

    const boton = document.createElement("button");
    boton.textContent = "Confirmar";
    boton.onclick = () => {
      const nuevoValor = parseInt(select.value);
      const datosActuales = JSON.parse(localStorage.getItem(`evaluacion-${fecha}`)) || {};
      datosActuales[cap.id] = nuevoValor;
      localStorage.setItem(`evaluacion-${fecha}`, JSON.stringify(datosActuales));
      alert(`Guardado: ${cap.titulo} → ${opciones.find(o => o.valor === nuevoValor).texto}`);
    };

    wrapper.appendChild(titulo);
    wrapper.appendChild(descripcion);
    wrapper.appendChild(select);
    wrapper.appendChild(boton);
    contenedor.appendChild(wrapper);
  });
}

// Al cambiar fecha → actualizar evaluaciones
const inputFechaEval = document.getElementById("fecha-evaluacion");
inputFechaEval.value = today;
inputFechaEval.addEventListener("change", () => {
  renderCategoriasEvaluacion(inputFechaEval.value);
});

// Inicializar si se muestra la sección
if (document.getElementById("evaluacion")) {
  renderCategoriasEvaluacion(today);
}
