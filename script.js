document.addEventListener("DOMContentLoaded", function () {
  // ————————————————
  // 1) Define your full translation dictionaries
  // ————————————————
  const translations = {
    en: {
      // Title
      "title.heading":             "Pakatip Kasai's Portfolio",

      // Language labels
      "lang.en":                   "EN",
      "lang.jp":                   "JP",

      // Home
      "nav-home-button":           "Home",

      // login
      "login":                     "Login",
      "login-header":              "Login",
      "login-username":            "Username",
      "login-password":            "Password",
      "login-button":              "Login",

      // About Section
      "about.heading": "Hi, I'm Bee 👋",
      "about.p1": `I started my journey working with <strong><span class="job-position">data analysis</span></strong> and <strong><span class="job-position">engineering</span></strong>, and along the way became curious about how systems, tools, and people come together to build products.`,
      "about.p2": "Over the past few years, I’ve worked on data pipelines, dashboards, and risk systems – helping teams clean, structure, and make sense of their data. I’ve contributed to projects in areas like localization and security.",
      "about.p3": "Today, my work leans more toward <strong>project management and delivery</strong>, but I still enjoy learning, experimenting, and staying close to the technical side.",
      "about.p4": "This space is a snapshot of where I am now - and where I’ve been.",


      // Project Section
      "project.heading":           "My Projects",
      "project.all":               "All",
      "project.bi":                "Business Intelligence",
      "project.de":                "Data Engineer",
      "project.da":                "Data Analysis",
      "project.wd":                "Web Development",

      // Resume Section
      "resume.heading":            "My Resume",

      // Contact Section
      "contact.heading":           "Contact",
      "contact.p1":                "Have a question or want to work together? Send me a message below.",

      // Form placeholders
      "contact.namePlaceholder":   "Your Name",
      "contact.emailPlaceholder":  "Your Email",
      "contact.messagePlaceholder":"Your Message",

      // Submit button
      "contact.submit":            "Send Message"
    },
    jp: {
      // Title
      "title.heading":             "パカティップ・カサイのポートフォリオ",

      // Language labels
      "lang.en":                   "英語",
      "lang.jp":                   "日本語",

      // Home
      "nav-home-button":           "ホーム",

      // login
      "login":                     "ログイン",
      "login-header":              "ログイン",
      "login-username":            "ユーザーネーム",
      "login-password":            "パスワード",
      "login-button":              "ログイン",

      // About Section
      "about.heading":             "こんにちは、ビーです 👋",
      "about.p1":                  `私は<strong><span class="job-position">データ分析</span></strong>や<strong><span class="job-position">エンジニアリング</span></strong>の仕事からキャリアをスタートしました。その過程で、システムやツール、そして人がどのように関わり合いながらプロダクトが作られていくのかに興味を持つようになりました。`,
      "about.p2":                  "これまでの数年間は、データパイプラインやダッシュボード、リスク関連の仕組みに携わり、チームがデータを整理し、構造化し、理解しやすくするサポートをしてきました。ローカリゼーションやセキュリティに関わるプロジェクトにも参加してきました。",
      "about.p3":                  "現在は<strong>プロジェクトマネジメントやデリバリー</strong>に軸足を置いた仕事が中心ですが、学び続けることや試行錯誤すること、そして技術に近いところで考えることは今も変わらず好きです。",
      "about.p4":                  "この場所は、今の私と、これまで歩んできた道のりを切り取ったスナップショットのようなものです。",

      // Project Section
      "project.heading":           "My Project",
      "project.all":               "全て",
      "project.bi":                "ビジネスインテリジェンス",
      "project.de":                "データエンジニアリング",
      "project.da":                "データ分析",
      "project.wd":                "ウェブ開発",

      // Resume Section
      "resume.heading":            "履歴書",

      // Contact Section
      "contact.heading":           "お問い合わせ",
      "contact.p1":                "ご質問やお仕事のご依頼がありましたら、以下からメッセージをお送りください。",

      // Form placeholders
      "contact.namePlaceholder":   "お名前",
      "contact.emailPlaceholder":  "メールアドレス",
      "contact.messagePlaceholder":"メッセージ",

      // Submit button
      "contact.submit":            "送信"
    }
  };

  // ————————————————
  // 2) Function to swap all data-i18n / data-i18n-placeholder
  // ————————————————
  function applyLanguage(lang) {
    // 2a) set <html lang="…">
    document.documentElement.lang = (lang === "jp" ? "ja" : "en");

    // 2b) swap all [data-i18n] innerHTML
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      const txt = translations[lang][key];
      if (txt) el.innerHTML = txt;
    });

    // 2c) swap placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const txt = translations[lang][key];
      if (txt) el.placeholder = txt;
    });

    // 2d) toggle active state on language links
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
// Swap Login for Home/Dashboard/Sign-out when logged in
// ————————————————
const loginDiv = document.getElementById('login-button');
if (loginDiv) {
  const token = localStorage.getItem('access_token');
  if (token) {
    // replace the Login link with Home, My Dashboard, and Sign out
    loginDiv.innerHTML = `
      <div>
        <a href="/mydashboard/" class="custom-navbar-login">My Dashboard</a>
      </div>
      <div>
        <button id="signout-btn" class="custom-navbar-login">Sign out</button>
      </div>
    `;
    // re-apply translations (so “Home” gets localized)
    const lang = localStorage.getItem('language') || 'en';
    applyLanguage(lang);

    // wire up Sign out
    document.getElementById('signout-btn')
      .addEventListener('click', () => {
        localStorage.removeItem('access_token');
        window.location.href = '/';
      });
  }
}

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

  // ————————————————
  // SCROLL‑HIDE NAVBAR
  // ————————————————
  const navBar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

function handleScroll() {
  const currentY = window.scrollY;
  const isMobile = window.innerWidth <= 768;

  // 1. Bounce hide/show navbar (keep your smart bounce)
  if (currentY <= 10) {
    navBar.classList.remove('nav-hidden');
  } else if (currentY > lastScrollY + 15) {
    navBar.classList.add('nav-hidden');
  } else if (currentY < lastScrollY - 5) {
    navBar.classList.remove('nav-hidden');
  }

  // 2. Background color control
  if (isMobile) {
    // Always show colored background on mobile
    navBar.classList.add('navbar-colored');
    navBar.classList.remove('bg-transparent');
  } else {
    // Always transparent on desktop
    navBar.classList.remove('navbar-colored');
    navBar.classList.add('bg-transparent');
  }

  lastScrollY = currentY <= 0 ? 0 : currentY;
}

// Attach scroll and resize
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);

  // ————————————————
  // Filter logic
  // ————————————————
  const buttons = document.querySelectorAll('.filter-button');
  const items   = document.querySelectorAll('.project-item');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      items.forEach(item => {
        item.style.display = (filter === 'all' || item.classList.contains(filter))
          ? 'block'
          : 'none';
      });
    });
  });

  // ————————————————
  // Contact form AJAX
  // ————————————————
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });
      if (response.ok) {
        document.getElementById("contact-wrapper")
          .innerHTML = "<p class='thank-you'>Thanks for your message!</p>";
      } else {
        form.innerHTML = "<p class='error-message'>Oops! Something went wrong. Please try again later.</p>";
      }
    });
  }

  // ————————————————
  // Dark Mode Toggle
  // ————————————————
  const darkToggle = document.getElementById('darkModeToggle');
const body = document.body;
// navBar is already declared earlier — no need to declare again

if (localStorage.getItem('dark-mode') === 'enabled') {
  body.classList.add('dark-mode');
  if (darkToggle) darkToggle.checked = true;
  navBar.classList.remove('navbar-light');
  navBar.classList.add('navbar-dark');
}

if (darkToggle) {
  darkToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled');
      navBar.classList.remove('navbar-light');
      navBar.classList.add('navbar-dark');
    } else {
      localStorage.removeItem('dark-mode');
      navBar.classList.remove('navbar-dark');
      navBar.classList.add('navbar-light');
    }
  });
}

  // ————————————————
  // Bootstrap mobile menu: auto‑close
  // ————————————————
  const collapseEl = document.getElementById('navbarContent');
  const toggler   = document.querySelector('.navbar-toggler');
  const bsCollapse= bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });

  // close on nav‑link click
  document.querySelectorAll('#navbarContent .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (collapseEl.classList.contains('show')) bsCollapse.hide();
    });
  });

  // close when clicking outside
  document.addEventListener('click', e => {
    if (
      collapseEl.classList.contains('show') &&
      !collapseEl.contains(e.target) &&
      !toggler.contains(e.target)
    ) {
      bsCollapse.hide();
    }
  });
  handleScroll(); 
});
