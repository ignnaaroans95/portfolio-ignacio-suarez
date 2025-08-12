document.addEventListener("DOMContentLoaded", () => {
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
});
