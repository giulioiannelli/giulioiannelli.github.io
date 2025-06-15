document.addEventListener('DOMContentLoaded', function () {
  fetch('nav-content.html')
    .then(response => response.text())
    .then(html => {
      const container = document.getElementById('nav-container');
      container.innerHTML = html;
      const toggle = container.querySelector('#nav-toggle');
      const menu = container.querySelector('#nav-menu');
      toggle.addEventListener('click', function () {
        menu.classList.toggle('hidden');
      });
    });
});
