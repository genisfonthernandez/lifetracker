function showSection(id) {
  // Oculta todas las secciones
  document.querySelectorAll("main section").forEach(sec => sec.classList.add("oculto"));
  // Muestra solo la que tiene el ID correspondiente
  document.getElementById(id).classList.remove("oculto");
}

document.getElementById("daily-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const data = {
    alimentacion: parseInt(formData.get("alimentacion")),
    deporte: parseInt(formData.get("deporte")),
    estudio: parseInt(formData.get("estudio")),
    emocional: parseInt(formData.get("emocional"))
  };

  localStorage.setItem(`registro-${today}`, JSON.stringify(data));
  alert("¡Registro guardado!");
  e.target.reset();
});
