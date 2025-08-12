document.addEventListener("DOMContentLoaded", () => {
  const cases = document.querySelectorAll(".case-study");

  cases.forEach(caseStudy => {
    caseStudy.querySelector(".case-study__banner").addEventListener("click", () => {
      caseStudy.classList.toggle("expanded");
    });
  });
});
