// 👉 Función para mostrar secciones
function showSection(id) {
  document.querySelectorAll("main section").forEach(sec => sec.classList.add("oculto"));
  document.getElementById(id).classList.remove("oculto");

  // Si entramos en "evaluacion", recargar categorías
  if (id === "evaluacion") {
    const fecha = document.getElementById("fecha-evaluacion").value;
    renderCategoriasEvaluacion(fecha);
  }
}

// 👉 Fecha actual
const today = new Date().toISOString().split("T")[0];

// 👉 Lista de capacidades a evaluar
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

// Opciones de evaluación
const opciones = [
  { valor: 1, texto: "No he mejorado" },
  { valor: 2, texto: "He mejorado un poco" },
  { valor: 3, texto: "He mejorado bastante" }
];

// 👉 Renderizar categorías de evaluación
function renderCategoriasEvaluacion(fecha) {
  const contenedor = document.getElementById("categorias-contenedor");
  contenedor.innerHTML = "";

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

// 👉 Al cambiar la fecha en evaluación, volver a cargar datos
const inputFechaEval = document.getElementById("fecha-evaluacion");
if (inputFechaEval) {
  inputFechaEval.value = today;
  inputFechaEval.addEventListener("change", () => {
    renderCategoriasEvaluacion(inputFechaEval.value);
  });
}

// 👉 Al cargar la página, si estamos en evaluación, mostrar contenido
if (document.getElementById("evaluacion")) {
  renderCategoriasEvaluacion(today);
}
