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
