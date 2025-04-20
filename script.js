document.addEventListener("DOMContentLoaded", function () {

// ————————————————
  // 1) Define your full translation dictionaries
  // ————————————————
  const translations = {
    en: {
      // Title
      "title.heading":    "Pakatip Kasai's Portfolio",

      //Lang
      "lang.en" : "EN",
      "lang.jp" : "JP",

      // About Section
      "about.heading":   "Hi, I’m Bee 👋",
      "about.p1":        "I'm a data analyst and engineer, and a full‑stack web developer in the making.",
      "about.p2":        "Over the past few years, I’ve worked on data pipelines, dashboards, and risk systems – helping teams clean, structure, and make sense of their data. I’ve contributed to projects in areas like localization, security, and sustainability.",
      "about.p3":        "Recently, I’ve been diving deeper into web development, learning how to build both backend and frontend web applications, because I want to bring ideas to life from start to finish.",
      "about.p4":        "I'm still exploring and expanding my skills every day, and I love connecting with others who are on similar paths.",

      // Project Section
      "project.heading": "My Projects",
      "project.all": "All",
      "project.bi": "Business Intelligence",
      "project.de": "Data Engineer",
      "project.da": "Data Analysis",
      "project.wd": "Web Development",

      // Resume Section
      "resume.heading":  "My Resume",

      // Contact Section
      "contact.heading": "Contact",
      "contact.p1":       "Have a question or want to work together? Send me a message below.",

      // Form placeholders
      "contact.namePlaceholder":    "Your Name",
      "contact.emailPlaceholder":   "Your Email",
      "contact.messagePlaceholder": "Your Message",

      // Submit button
      "contact.submit":   "Send Message"
    },
    jp: {

      // Title
      "title.heading":    "パカティップ・カサイのポートフォリオ",

      //Lang
      "lang.en" : "英語",
      "lang.jp" : "日本語",

      // About Section
      "about.heading":   "こんにちは、ビーです 👋",
      "about.p1":        "私はデータアナリスト兼エンジニアで、フルスタックWeb開発者を目指しています。",
      "about.p2":        "ここ数年、データパイプライン、ダッシュボード、リスクシステムに取り組み、チームがデータをクリーンアップ、構造化し、分析しやすくするお手伝いをしてきました。ローカリゼーション、セキュリティ、サステナビリティなどのプロジェクトにも貢献しました。",
      "about.p3":        "最近はWeb開発にさらに深く取り組んでおり、バックエンドとフロントエンドの両方のWebアプリケーションを構築しています。",
      "about.p4":        "毎日スキルを探求し、拡張することを楽しんでおり、同じ道を歩む方々とつながることが大好きです。",

      // Project Section
      "project.heading": "私のプロジェクト",
      "project.all": "全て",
      "project.bi": "ビジネスインテリジェンス",
      "project.de": "データエンジニアリング",
      "project.da": "データ分析",
      "project.wd": "ウェブ開発",

      // Resume Section
      "resume.heading":  "履歴書",

      // Contact Section
      "contact.heading": "お問い合わせ",
      "contact.p1":       "ご質問やお仕事のご依頼がありましたら、以下からメッセージをお送りください。",

      // Form placeholders
      "contact.namePlaceholder":    "お名前",
      "contact.emailPlaceholder":   "メールアドレス",
      "contact.messagePlaceholder": "メッセージ",

      // Submit button
      "contact.submit":   "送信"
    }
  };

  // ————————————————
  // 2) Function to swap all data-i18n and data-i18n-placeholder
  // ————————————————
  function applyLanguage(lang) {
    // 2a) set <html lang="…">
    document.documentElement.lang = (lang === "jp" ? "ja" : "en");

    // 2b) swap textContent
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      const txt = translations[lang][key];
      if (txt) el.textContent = txt;
    });

    // 2c) swap placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const txt = translations[lang][key];
      if (txt) el.placeholder = txt;
    });

    // 2d) toggle active state on buttons
    document.getElementById("langEN").classList.toggle("active", lang === "en");
    document.getElementById("langJP").classList.toggle("active", lang === "jp");

    // 2e) persist choice
    localStorage.setItem("language", lang);
  }

  // ————————————————
  // 3) On load: apply saved or default to EN
  // ————————————————
  const savedLang = localStorage.getItem("language") || "en";
  applyLanguage(savedLang);

  // ————————————————
  // 4) Hook up your EN/JP toggles
  // ————————————————
  document.getElementById("langEN").addEventListener("click", e => {
    e.preventDefault();
    applyLanguage("en");
  });
  document.getElementById("langJP").addEventListener("click", e => {
    e.preventDefault();
    applyLanguage("jp");
  });

  // SCROLL‑HIDE NAVBAR
const navBar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  if (currentY > lastScrollY) {
    // scrolling down → hide
    navBar.classList.add('nav-hidden');
  } else {
    // scrolling up → show
    navBar.classList.remove('nav-hidden');
  }
  lastScrollY = currentY;
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
