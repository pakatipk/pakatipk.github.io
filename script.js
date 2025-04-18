document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
      }

      document.querySelector('.nav-links').classList.remove('show');
    });
  });

  // Filter logic
  const buttons = document.querySelectorAll('.filter-button');
  const items = document.querySelectorAll('.project-item');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;

      items.forEach(item => {
        item.style.display = (filter === 'all' || item.classList.contains(filter)) ? 'block' : 'none';
      });
    });
  });

  // Contact form
  const form = document.querySelector(".contact-form");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        document.getElementById("contact-wrapper").innerHTML = "<p class='thank-you'>Thanks for your message!</p>";
      } else {
        form.innerHTML = "<p class='error-message'>Oops! Something went wrong. Please try again later.</p>";
      }
    });
  }
  

// Dark Mode Toggle (with checkbox switch)
const darkToggle = document.getElementById('darkModeToggle');
const body = document.body;

// On load: apply dark mode if saved
if (localStorage.getItem('dark-mode') === 'enabled') {
  body.classList.add('dark-mode');
  darkToggle.checked = true;
}

if (darkToggle) {
  darkToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      localStorage.removeItem('dark-mode');
    }
  });
}

const collapseEl = document.getElementById('navbarContent');
const toggler   = document.querySelector('.navbar-toggler');
// initialize (but don’t auto‑toggle)
const bsCollapse = new bootstrap.Collapse(collapseEl, { toggle: false });

// 1) hide when you click a nav‑link
document.querySelectorAll('#navbarContent .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (collapseEl.classList.contains('show')) {
      bsCollapse.hide();
    }
  });
});

// 2) hide when you click outside the open menu
document.addEventListener('click', (e) => {
  if (
    collapseEl.classList.contains('show') &&
    !collapseEl.contains(e.target) &&
    !toggler.contains(e.target)
  ) {
    bsCollapse.hide();
  }
});

});
