document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tl-row').forEach(row => {
    const start = Math.min(Math.max(parseInt(row.dataset.start.split('-')[1],10),1),12);
    const end   = Math.min(Math.max(parseInt(row.dataset.end.split('-')[1],10),1),12);
    const span  = Math.max(1, end - start + 1);

    const bar = row.querySelector('.tl-bar');
    if (!bar) return;
    bar.style.setProperty('--start', start);
    bar.style.setProperty('--span', span);

    // Línea de hoy (si el año es 2025)
    const track = row.querySelector('.tl-track');
    const now = new Date();
    if (now.getFullYear() === 2025 && track && !track.querySelector('.tl-today')){
      const today = document.createElement('div');
      today.className = 'tl-today';
      today.style.setProperty('--today-col', now.getMonth()+1);
      track.appendChild(today);
    }
  });
});
