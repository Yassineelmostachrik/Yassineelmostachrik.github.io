/*
  Affiche le site à partir des données de js/data.js.
  Rien à modifier ici pour ajouter un projet : tout se passe dans data.js.
*/
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var PROJECTS = window.PROJECTS || [];
  var ATTACK = window.ATTACK || [];

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  /* ---------- Matrice MITRE ATT&CK ---------- */

  // Nombre de cases grisées par colonne : purement décoratif, il ne reflète pas
  // le nombre réel de techniques ATT&CK.
  var DEPTH = [4, 3, 4, 5, 7, 5, 12, 6, 10, 4, 6, 6, 4, 5];
  var LIT_AFTER = 2; // la case allumée apparaît après 2 cases grisées

  function renderMatrix() {
    var matrix = document.getElementById("matrix");
    if (!matrix) return;

    var litIndex = 0;
    ATTACK.forEach(function (tactic, i) {
      var col = el("div", "tactic");
      col.setAttribute("role", "listitem");
      col.appendChild(el("div", "t-name", tactic.name));

      var count = DEPTH[i % DEPTH.length];
      for (var n = 0; n < count; n++) {
        if (tactic.lit && n === LIT_AFTER) {
          col.classList.add("has-lit");
          var lit = el("div", "cell lit");
          lit.style.setProperty("--i", litIndex++);
          lit.appendChild(el("b", null, tactic.lit.id));
          lit.appendChild(el("span", null, tactic.lit.name));
          lit.appendChild(el("span", "sr", "Couvert par une règle de détection que j'ai écrite : " + tactic.lit.note));
          col.appendChild(lit);
        }
        var dim = el("div", "cell");
        dim.setAttribute("aria-hidden", "true");
        col.appendChild(dim);
      }
      matrix.appendChild(col);
    });

    fitMatrix(matrix);
    window.addEventListener("resize", function () { fitMatrix(matrix); });
  }

  // Sur petit écran la matrice défile : on la centre sur les cases allumées
  // et on la rend atteignable au clavier.
  function fitMatrix(matrix) {
    var scrollable = matrix.scrollWidth > matrix.clientWidth + 1;
    if (scrollable) matrix.setAttribute("tabindex", "0");
    else matrix.removeAttribute("tabindex");
    if (!scrollable || matrix.dataset.centered) return;

    var lits = matrix.querySelectorAll(".tactic.has-lit");
    if (!lits.length) return;
    var first = lits[0];
    var last = lits[lits.length - 1];
    var middle = (first.offsetLeft + last.offsetLeft + last.offsetWidth) / 2;
    matrix.scrollLeft = Math.max(0, middle - matrix.clientWidth / 2);
    matrix.dataset.centered = "1";
  }

  /* ---------- Projets ---------- */

  function buildProject(p) {
    var article = el("article", "project");

    var meta = el("div", "p-meta");
    meta.appendChild(el("span", "p-year", p.year));
    meta.appendChild(el("span", "p-cat", p.category));
    article.appendChild(meta);

    var body = el("div", "p-body");
    body.appendChild(el("h3", null, p.title));

    if (p.bullets && p.bullets.length) {
      var ul = el("ul", "p-bullets");
      p.bullets.forEach(function (b) { ul.appendChild(el("li", null, b)); });
      body.appendChild(ul);
    }

    if (p.stack && p.stack.length) {
      var stack = el("ul", "stack");
      stack.setAttribute("aria-label", "Technologies");
      p.stack.forEach(function (s) { stack.appendChild(el("li", null, s)); });
      body.appendChild(stack);
    }

    if (p.links && p.links.length) {
      var links = el("ul", "p-links");
      p.links.forEach(function (l) {
        var li = el("li");
        var a = el("a", null, l.label);
        a.href = l.url;
        li.appendChild(a);
        links.appendChild(li);
      });
      body.appendChild(links);
    }

    article.appendChild(body);
    return article;
  }

  function renderProjects() {
    var box = document.getElementById("projects");
    var filters = document.getElementById("filters");
    if (!box) return;

    var categories = [];
    var rows = PROJECTS.map(function (p) {
      if (categories.indexOf(p.category) === -1) categories.push(p.category);
      var node = buildProject(p);
      box.appendChild(node);
      return { node: node, category: p.category };
    });

    if (!filters || categories.length < 2) return;

    var buttons = [];
    function select(value) {
      buttons.forEach(function (b) {
        b.node.setAttribute("aria-pressed", String(b.value === value));
      });
      rows.forEach(function (r) { r.node.hidden = value !== "" && r.category !== value; });
    }

    [""].concat(categories).forEach(function (value) {
      var btn = el("button", null, value === "" ? "Tous" : value);
      btn.type = "button";
      btn.addEventListener("click", function () { select(value); });
      filters.appendChild(btn);
      buttons.push({ node: btn, value: value });
    });
    select("");
  }

  /* ---------- Contact ---------- */

  function renderContact() {
    var list = document.getElementById("contact-links");
    if (!list) return;

    var items = [];
    if (SITE.email) items.push({ label: "E-mail", text: SITE.email, href: "mailto:" + SITE.email });
    if (SITE.github) items.push({ label: "GitHub", text: SITE.github.replace(/^https?:\/\//, ""), href: SITE.github });
    if (SITE.linkedin) items.push({ label: "LinkedIn", text: SITE.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: SITE.linkedin });

    items.forEach(function (it) {
      var li = el("li");
      var a = el("a");
      a.href = it.href;
      a.appendChild(el("span", "l-label", it.label));
      a.appendChild(el("span", "l-val", it.text));
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  /* ---------- Thème ---------- */

  function initTheme() {
    var btn = document.getElementById("theme-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var root = document.documentElement;
      var current = root.dataset.theme ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  renderMatrix();
  renderProjects();
  renderContact();
  initTheme();
})();
