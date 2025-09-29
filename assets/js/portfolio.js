document.addEventListener("DOMContentLoaded", () => {
  /* ============================
     FILTRO DE PROYECTOS
  ============================ */
  const filterOptions = document.querySelectorAll(".portfolio__option");
  const projects = document.querySelectorAll(".gallery__item");

  filterOptions.forEach(option => {
    option.addEventListener("click", e => {
      e.preventDefault();

      // Cambiar activo
      filterOptions.forEach(o => o.classList.remove("portfolio__option--active"));
      option.classList.add("portfolio__option--active");

      const filter = option.getAttribute("data-filter").toLowerCase();

      projects.forEach(project => {
        const category = project.getAttribute("data-category").toLowerCase();

        if (filter === "all" || category === filter) {
          project.classList.remove("hidden");
        } else {
          project.classList.add("hidden");
        }
      });
    });
  });

  /* ============================
     MODALES DE CASOS DE ESTUDIO
  ============================ */
  const caseStudyButtons = document.querySelectorAll(".case-study-btn");
  
  caseStudyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal"); // ej: data-modal="librosModal"
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
      }
    });
  });

  // Cerrar modales
  const modals = document.querySelectorAll(".modal-overlay");
  
  modals.forEach(modal => {
    const closeBtn = modal.querySelector(".modal-close");
    
    // Cerrar con botón
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    });

    // Cerrar clic fuera
    modal.addEventListener("click", e => {
      if (e.target.classList.contains("modal-overlay")) {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  });
});
