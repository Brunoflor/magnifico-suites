(function () {
  var STORAGE_KEY = "magnifico-suites-lang";
  var INTRO_KEY = "magnifico-suites-intro";
  var content = window.MAGNIFICO_CONTENT;

  if (!content || !content.sections || !content.ui) {
    var alert = document.createElement("p");
    alert.setAttribute("role", "alert");
    alert.textContent = "Content file missing.";
    document.body.appendChild(alert);
    return;
  }

  var property = content.property;
  var state = { lang: "it", openId: null, triggerId: null };
  var lbIndex = 0;
  var toastTimer = 0;

  var LANGS = [
    { code: "it", name: "Italiano" },
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "pt", name: "Português" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "ar", name: "العربية" },
  ];

  function svg(paths) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
      paths +
      "</svg>"
    );
  }

  var ICONS = {
    pin: svg('<path d="M12 21s-6.2-5.5-6.2-10a6.2 6.2 0 1 1 12.4 0C18.2 15.5 12 21 12 21z"/><circle cx="12" cy="11" r="1.7" fill="currentColor" stroke="none"/>'),
    chevron: svg('<path d="m9 6 6 6-6 6"/>'),
    external: svg('<path d="M14 5h5v5"/><path d="M19 5 10 14"/><path d="M16 13.5V19H5V8h5.5"/>'),
    phone: svg('<path d="M8 3.5h3.2l1.2 3-2 1.2a11 11 0 0 0 5 5l1.2-2 3 1.2V15a1.6 1.6 0 0 1-1.7 1.6A14 14 0 0 1 6.4 5.2 1.6 1.6 0 0 1 8 3.5z"/>'),
    mail: svg('<rect x="3.5" y="5.5" width="17" height="13" rx="1.5"/><path d="m4 7 8 6 8-6"/>'),
    globe: svg('<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2.2 2.4 3.3 5.1 3.3 8S14.2 17.6 12 20c-2.2-2.4-3.3-5.1-3.3-8S9.8 6.4 12 4z"/>'),
    chat: svg('<path d="M5 6.5h14v9H8l-3 2.5z"/>'),
  };

  function isLang(code) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === code) return true;
    return false;
  }
  function langName(code) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === code) return LANGS[i].name;
    return code;
  }
  function matchLang(tag) {
    var value = String(tag || "").toLowerCase().replace(/_/g, "-");
    if (value.indexOf("zh") === 0) return "zh";
    var base = value.split("-")[0];
    return isLang(base) ? base : "";
  }
  function detectLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (isLang(saved)) return saved;
    } catch (e) { /* private mode */ }
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "it"];
    for (var i = 0; i < list.length; i++) {
      var hit = matchLang(list[i]);
      if (hit) return hit;
    }
    return "it";
  }
  function text(value) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    return value[state.lang] || value.en || "";
  }
  function t(key) { return text(content.ui[key]); }
  function sectionById(id) {
    for (var i = 0; i < content.sections.length; i++) {
      if (content.sections[i].id === id) return content.sections[i];
    }
    return null;
  }
  function isComingSoon(section) {
    if (section.type === "directions") return false;
    if (section.type === "places") return !section.items || !section.items.length;
    if (section.type === "notes") {
      var hasP = section.paragraphs && section.paragraphs.length;
      var hasL = section.links && section.links.length;
      return !hasP && !hasL;
    }
    return true;
  }
  function icon(name, className) {
    var span = document.createElement("span");
    span.className = className || "icon";
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = ICONS[name] || ICONS.pin;
    return span;
  }
  function asset(path) {
    var version = window.MAGNIFICO_VERSION;
    if (!version) return path;
    return path + (path.indexOf("?") === -1 ? "?v=" : "&v=") + version;
  }
  function el(tag, className, textValue) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (textValue != null) node.textContent = textValue;
    return node;
  }
  function ext(anchor) {
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    return anchor;
  }

  function toast(message) {
    var node = document.getElementById("toast");
    if (!node) return;
    node.textContent = message;
    node.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { node.classList.remove("show"); }, 1800);
  }
  function copyText(value) {
    function done() { toast(t("copied")); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(done).catch(fallback);
    } else fallback();
    function fallback() {
      var area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
      area.remove();
    }
  }

  function closeLangMenus(except) {
    document.querySelectorAll(".lang-menu").forEach(function (menu) {
      if (menu === except) return;
      menu.hidden = true;
      var toggle = menu.parentElement.querySelector(".lang-toggle");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  }
  function updateLangSwitch(container) {
    if (!container) return;
    if (!container.querySelector(".lang-toggle")) buildLangSwitch(container);
    var current = langName(state.lang);
    var toggle = container.querySelector(".lang-toggle");
    toggle.lang = state.lang;
    toggle.setAttribute("aria-label", t("languageLabel") + ", " + current);
    toggle.querySelector(".lang-code").textContent = state.lang.toUpperCase();
    toggle.querySelector(".lang-current").textContent = current;
    container.querySelectorAll(".lang-option").forEach(function (option) {
      option.setAttribute("aria-selected", option.getAttribute("data-set-lang") === state.lang ? "true" : "false");
    });
    container.querySelector(".lang-menu").setAttribute("aria-label", t("languageLabel"));
  }
  function buildLangSwitch(container) {
    var menuId = container.id + "-menu";
    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "lang-toggle";
    toggle.setAttribute("aria-haspopup", "listbox");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", menuId);
    var code = el("span", "lang-code");
    code.setAttribute("aria-hidden", "true");
    var current = el("span", "lang-current");
    var caret = el("span", "lang-caret");
    caret.setAttribute("aria-hidden", "true");
    caret.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
    toggle.appendChild(code);
    toggle.appendChild(current);
    toggle.appendChild(caret);
    toggle.addEventListener("click", function () {
      var menu = container.querySelector(".lang-menu");
      var open = menu.hidden;
      closeLangMenus(open ? menu : null);
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        var selected = menu.querySelector('[aria-selected="true"]') || menu.querySelector(".lang-option");
        if (selected) selected.focus();
      }
    });
    toggle.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      toggle.click();
    });
    var menu = document.createElement("ul");
    menu.id = menuId;
    menu.className = "lang-menu";
    menu.setAttribute("role", "listbox");
    menu.hidden = true;
    LANGS.forEach(function (item) {
      var li = document.createElement("li");
      var option = document.createElement("button");
      option.type = "button";
      option.className = "lang-option";
      option.setAttribute("role", "option");
      option.lang = item.code;
      option.dataset.setLang = item.code;
      var mark = el("span", "lang-code", item.code.toUpperCase());
      mark.setAttribute("aria-hidden", "true");
      option.appendChild(mark);
      option.appendChild(el("span", "", item.name));
      option.addEventListener("click", function () {
        setLang(item.code);
        closeLangMenus(null);
        toggle.focus();
      });
      option.addEventListener("keydown", function (event) {
        var keys = ["ArrowDown", "ArrowUp", "Home", "End"];
        if (keys.indexOf(event.key) === -1) return;
        event.preventDefault();
        var all = Array.prototype.slice.call(menu.querySelectorAll(".lang-option"));
        var index = all.indexOf(option);
        if (event.key === "ArrowDown") index = (index + 1) % all.length;
        if (event.key === "ArrowUp") index = (index - 1 + all.length) % all.length;
        if (event.key === "Home") index = 0;
        if (event.key === "End") index = all.length - 1;
        all[index].focus();
      });
      li.appendChild(option);
      menu.appendChild(li);
    });
    container.appendChild(toggle);
    container.appendChild(menu);
  }

  function secHead(title, hint) {
    var head = el("div", "sec-head");
    head.appendChild(el("span", "sec-rule"));
    head.appendChild(el("h2", "", title));
    if (hint) head.appendChild(el("p", "", hint));
    return head;
  }

  function renderHero() {
    document.getElementById("hero-eyebrow").textContent = t("intro");
    document.getElementById("hero-name").textContent = property.name;
    var address = document.getElementById("hero-address");
    address.href = property.mapsUrl;
    ext(address);
    address.replaceChildren();
    address.appendChild(icon("pin"));
    var line = el("span", "");
    line.dir = "ltr";
    line.textContent = property.addressLine;
    address.appendChild(line);
    var times = document.getElementById("hero-times");
    var checkin = property.checkin && String(property.checkin).trim();
    var checkout = property.checkout && String(property.checkout).trim();
    times.replaceChildren();
    if (checkin && checkout) {
      times.hidden = false;
      [["checkinLabel", checkin], ["checkoutLabel", checkout]].forEach(function (pair, index) {
        if (index) times.appendChild(el("span", "ht-sep"));
        var block = el("div", "ht");
        block.appendChild(el("span", "", t(pair[0])));
        var strong = el("strong", "", pair[1]);
        strong.dir = "ltr";
        block.appendChild(strong);
        times.appendChild(block);
      });
    } else {
      times.hidden = true;
    }
  }

  function quickCard(opts) {
    var node = opts.href ? document.createElement("a") : document.createElement("button");
    node.className = "q";
    if (opts.href) {
      node.href = opts.href;
      if (opts.external) ext(node);
    } else node.type = "button";
    var img = document.createElement("img");
    img.className = "q-ico";
    img.alt = "";
    img.src = asset("icons/" + opts.icon + ".webp");
    img.width = 40;
    img.height = 40;
    node.appendChild(img);
    node.appendChild(el("span", "q-l", opts.label));
    var value = el("span", "q-v" + (opts.small ? " small" : ""), opts.value);
    if (opts.ltr) value.dir = "ltr";
    node.appendChild(value);
    if (opts.section) node.addEventListener("click", function () { openSection(opts.section); });
    return node;
  }

  function renderQuick() {
    var root = document.getElementById("quick");
    root.replaceChildren();
    root.setAttribute("aria-label", t("guide"));
    var grid = el("div", "quick-grid");
    var wifi = sectionById("wifi");
    var checkin = sectionById("checkin");
    var location = sectionById("location");
    grid.appendChild(quickCard({
      icon: "wifi",
      label: text(wifi.title),
      value: t("comingSoon"),
      section: "wifi",
    }));
    grid.appendChild(quickCard({
      icon: "key",
      label: text(checkin.title),
      value: t("comingSoon"),
      section: "checkin",
    }));
    grid.appendChild(quickCard({
      icon: "phone",
      label: text(sectionById("contacts").title),
      value: "WhatsApp",
      href: property.whatsappHref,
      external: true,
    }));
    grid.appendChild(quickCard({
      icon: "pin",
      label: text(location.title),
      value: property.addressLines[0],
      ltr: true,
      small: true,
      section: "location",
    }));
    root.appendChild(grid);
  }

  function renderGallery() {
    var root = document.getElementById("gallery");
    var photos = content.photos || [];
    root.replaceChildren();
    if (!photos.length) { root.hidden = true; return; }
    root.hidden = false;
    root.appendChild(secHead(t("photos")));
    var track = el("div", "g-track");
    photos.forEach(function (photo, index) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "g-item";
      button.setAttribute("aria-label", t("openPhoto") + ", " + text(photo.alt));
      var img = document.createElement("img");
      img.src = asset(photo.src);
      img.alt = "";
      img.width = photo.width || 1600;
      img.height = photo.height || 1067;
      img.decoding = "async";
      img.loading = index < 2 ? "eager" : "lazy";
      button.appendChild(img);
      button.addEventListener("click", function () { openLightbox(index); });
      track.appendChild(button);
    });
    root.appendChild(track);
  }

  function renderGrid() {
    var root = document.getElementById("sections");
    root.replaceChildren();
    root.appendChild(secHead(t("guide"), t("tapHint")));
    var list = document.createElement("ul");
    list.className = "grid";
    list.setAttribute("aria-label", t("sectionsLabel"));
    content.sections.forEach(function (section) {
      var item = document.createElement("li");
      var button = document.createElement("button");
      button.type = "button";
      button.className = "tile";
      button.dataset.section = section.id;
      button.setAttribute("aria-haspopup", "dialog");
      button.setAttribute("aria-controls", "sheet");
      button.setAttribute("aria-expanded", state.openId === section.id ? "true" : "false");
      var face = el("span", "tile-face");
      var img = document.createElement("img");
      img.className = "tile-glyph";
      img.src = asset("icons/" + section.icon + ".webp");
      img.alt = "";
      img.width = 80;
      img.height = 80;
      face.appendChild(img);
      if (isComingSoon(section)) {
        button.classList.add("is-soon");
        var dot = el("span", "tile-dot");
        dot.setAttribute("aria-hidden", "true");
        face.appendChild(dot);
      }
      button.appendChild(face);
      button.appendChild(el("span", "tile-label", text(section.title)));
      if (isComingSoon(section)) {
        var soon = el("span", "visually-hidden", t("comingSoon"));
        button.appendChild(soon);
      }
      button.addEventListener("click", function () { openSection(section.id); });
      item.appendChild(button);
      list.appendChild(item);
    });
    root.appendChild(list);
  }

  function mapsLink(url, label, extra) {
    var a = document.createElement("a");
    a.className = "btn";
    a.href = url;
    ext(a);
    a.appendChild(el("span", "", label));
    if (extra) a.appendChild(el("span", "visually-hidden", ", " + extra));
    a.appendChild(icon("external", "btn-icon"));
    return a;
  }
  function renderSoon(section, quiet) {
    var wrap = el("div", quiet ? "soon soon-quiet" : "soon");
    if (!quiet) {
      var img = document.createElement("img");
      img.className = "soon-mark";
      img.src = asset("icons/" + section.icon + ".webp");
      img.alt = "";
      img.width = 88;
      img.height = 88;
      wrap.appendChild(img);
    }
    wrap.appendChild(el("p", "soon-title", t("comingSoon")));
    wrap.appendChild(el("p", "soon-text", t("comingSoonBody")));
    return wrap;
  }
  function renderNotice(value) {
    var aside = el("aside", "notice");
    aside.appendChild(el("p", "", text(value)));
    return aside;
  }
  function renderCin() {
    var cin = el("p", "cin cin-inline");
    cin.appendChild(el("span", "cin-label", t("cinLabel")));
    cin.appendChild(document.createTextNode(" "));
    var value = el("span", "");
    value.dir = "ltr";
    value.textContent = property.cin;
    cin.appendChild(value);
    return cin;
  }
  function renderDirections(section) {
    var fragment = document.createDocumentFragment();
    var block = el("section", "address-block");
    block.appendChild(el("h3", "block-title", t("addressLabel")));
    var address = el("p", "address");
    address.dir = "ltr";
    property.addressLines.forEach(function (line, index) {
      if (index) address.appendChild(document.createElement("br"));
      address.appendChild(document.createTextNode(line));
    });
    block.appendChild(address);
    if (section.note && text(section.note)) block.appendChild(el("p", "note", text(section.note)));
    block.appendChild(mapsLink(property.mapsUrl, t("openMaps"), t("newTab")));
    fragment.appendChild(block);
    if (section.routes && section.routes.length) {
      var routes = el("section", "routes-block");
      var label = el("h3", "block-title", t("routesLabel"));
      label.id = "routes-title";
      var list = document.createElement("ul");
      list.className = "routes";
      list.setAttribute("aria-labelledby", "routes-title");
      section.routes.forEach(function (route) {
        var item = document.createElement("li");
        var link = document.createElement("a");
        link.className = "route";
        link.href = route.mapsUrl;
        ext(link);
        link.appendChild(icon(route.icon, "route-icon"));
        var copy = el("span", "route-text");
        copy.appendChild(el("span", "route-title", text(route.title)));
        copy.appendChild(el("span", "route-desc", text(route.text)));
        copy.appendChild(el("span", "visually-hidden", ". " + t("routeHint")));
        link.appendChild(copy);
        link.appendChild(icon("chevron", "route-chevron"));
        item.appendChild(link);
        list.appendChild(item);
      });
      routes.appendChild(label);
      routes.appendChild(list);
      fragment.appendChild(routes);
    }
    return fragment;
  }
  function renderPlaces(section) {
    var fragment = document.createDocumentFragment();
    if (section.notice) fragment.appendChild(renderNotice(section.notice));
    var list = document.createElement("ul");
    list.className = "places";
    (section.items || []).forEach(function (place) {
      var item = el("li", "place");
      item.appendChild(el("h3", "place-name", text(place.name)));
      if (text(place.address)) item.appendChild(el("p", "place-address", text(place.address)));
      if (text(place.text)) item.appendChild(el("p", "place-text", text(place.text)));
      if (place.mapsUrl) item.appendChild(mapsLink(place.mapsUrl, t("openMaps"), text(place.name) + ", " + t("newTab")));
      list.appendChild(item);
    });
    fragment.appendChild(list);
    return fragment;
  }
  function renderNotes(section) {
    var wrap = el("div", "notes");
    (section.paragraphs || []).forEach(function (paragraph) {
      wrap.appendChild(el("p", "", text(paragraph)));
    });
    if (section.links && section.links.length) {
      var list = document.createElement("ul");
      list.className = "contacts";
      section.links.forEach(function (item) {
        var li = document.createElement("li");
        var link = document.createElement("a");
        link.className = "contact";
        link.href = item.href;
        if (item.external) ext(link);
        link.appendChild(el("span", "contact-label", text(item.label)));
        var value = el("span", "contact-value", text(item.value));
        if (item.ltr) value.dir = "ltr";
        link.appendChild(value);
        if (item.external) {
          link.appendChild(el("span", "visually-hidden", ", " + t("newTab")));
          link.appendChild(icon("external", "btn-icon"));
        }
        li.appendChild(link);
        list.appendChild(li);
      });
      wrap.appendChild(list);
    }
    if (section.showCin) wrap.appendChild(renderCin());
    return wrap;
  }
  function renderSectionBody(section) {
    if (section.type === "directions") return renderDirections(section);
    var fragment = document.createDocumentFragment();
    if (isComingSoon(section)) {
      if (section.notice) fragment.appendChild(renderNotice(section.notice));
      fragment.appendChild(renderSoon(section, !!section.notice));
      return fragment;
    }
    if (section.type === "places") {
      fragment.appendChild(renderPlaces(section));
      return fragment;
    }
    if (section.type === "notes") {
      fragment.appendChild(renderNotes(section));
      return fragment;
    }
    fragment.appendChild(renderSoon(section));
    return fragment;
  }

  function renderFooter() {
    var root = document.getElementById("footer-body");
    root.replaceChildren();
    var links = el("div", "f-links");
    function round(name, href, label, external) {
      var a = document.createElement("a");
      a.href = href;
      a.setAttribute("aria-label", label);
      if (external) ext(a);
      a.appendChild(icon(name));
      return a;
    }
    links.appendChild(round("phone", property.phoneHref, property.phone));
    links.appendChild(round("chat", property.whatsappHref, "WhatsApp", true));
    links.appendChild(round("mail", property.emailHref, property.email));
    links.appendChild(round("globe", property.website, t("websiteAria") + ", " + property.websiteLabel, true));
    root.appendChild(links);
    var address = document.createElement("a");
    address.className = "f-addr";
    address.href = property.mapsUrl;
    ext(address);
    address.appendChild(icon("pin"));
    var line = el("span", "");
    line.dir = "ltr";
    line.textContent = property.addressLine;
    address.appendChild(line);
    root.appendChild(address);
    var cin = document.createElement("button");
    cin.type = "button";
    cin.className = "cin-btn";
    cin.appendChild(el("span", "", t("cinLabel") + " "));
    var code = el("span", "");
    code.dir = "ltr";
    code.textContent = property.cin;
    cin.appendChild(code);
    cin.addEventListener("click", function () { copyText(property.cin); });
    root.appendChild(cin);
  }

  function syncExpanded() {
    document.querySelectorAll(".tile").forEach(function (button) {
      button.setAttribute("aria-expanded", button.dataset.section === state.openId ? "true" : "false");
    });
  }
  function renderSheet() {
    document.getElementById("back-label").textContent = t("back");
    var title = document.getElementById("sheet-title");
    var body = document.getElementById("sheet-body");
    var section = sectionById(state.openId);
    if (!section) {
      title.textContent = "";
      body.replaceChildren();
      return;
    }
    title.textContent = text(section.title);
    body.replaceChildren(renderSectionBody(section));
  }
  function openSection(id) {
    if (!sectionById(id)) return;
    closeLangMenus(null);
    state.openId = id;
    state.triggerId = id;
    syncExpanded();
    renderSheet();
    var dialog = document.getElementById("sheet");
    var scroller = dialog.querySelector(".sheet-scroll");
    if (scroller) scroller.scrollTop = 0;
    if (!dialog.open) {
      dialog.showModal();
      document.body.classList.add("locked");
    }
    document.getElementById("sheet-back").focus();
  }
  function onSheetClose() {
    document.body.classList.remove("locked");
    var id = state.triggerId;
    state.openId = null;
    syncExpanded();
    window.setTimeout(function () {
      var button = document.querySelector('[data-section="' + id + '"]');
      if (button) button.focus();
    }, 0);
  }

  function showLightbox() {
    var photos = content.photos || [];
    var photo = photos[lbIndex];
    if (!photo) return;
    var img = document.getElementById("lb-img");
    img.src = asset(photo.src);
    img.alt = text(photo.alt);
    document.getElementById("lb-cap").textContent = text(photo.alt) + " · " + (lbIndex + 1) + " / " + photos.length;
  }
  function openLightbox(index) {
    lbIndex = index;
    showLightbox();
    var dialog = document.getElementById("lightbox");
    if (!dialog.open) {
      dialog.showModal();
      document.body.classList.add("locked");
    }
    document.getElementById("lb-close").focus();
  }
  function stepLightbox(delta) {
    var total = (content.photos || []).length;
    if (!total) return;
    lbIndex = (lbIndex + delta + total) % total;
    showLightbox();
  }

  function render(options) {
    options = options || {};
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.lang = state.lang;
    document.title = t("pageTitle");
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("metaDescription"));
    document.getElementById("skip").textContent = t("skip");
    document.getElementById("to-top").setAttribute("aria-label", t("toTop"));
    document.getElementById("lb-close").setAttribute("aria-label", t("close"));
    document.getElementById("lb-prev").setAttribute("aria-label", t("prev"));
    document.getElementById("lb-next").setAttribute("aria-label", t("next"));
    updateLangSwitch(document.getElementById("lang-home"));
    updateLangSwitch(document.getElementById("lang-sheet"));
    renderHero();
    renderQuick();
    renderGallery();
    renderGrid();
    renderFooter();
    renderSheet();
    if (document.getElementById("lightbox").open) showLightbox();
    if (options.announce) {
      document.getElementById("live").textContent = langName(state.lang);
      toast(langName(state.lang));
    }
  }
  function setLang(lang) {
    if (!isLang(lang) || lang === state.lang) return;
    state.lang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    render({ announce: true });
  }

  function setPageInert(on) {
    var nodes = [
      document.getElementById("skip"),
      document.querySelector(".hero"),
      document.querySelector(".main"),
      document.querySelector(".footer"),
      document.getElementById("to-top"),
    ];
    nodes.forEach(function (node) {
      if (!node) return;
      try { node.inert = on; } catch (e) {
        if (on) node.setAttribute("aria-hidden", "true");
        else node.removeAttribute("aria-hidden");
      }
    });
  }
  function playIntro() {
    var overlay = document.getElementById("intro");
    var logo = document.getElementById("intro-logo");
    var title = document.getElementById("intro-title");
    var name = document.getElementById("intro-name");
    var target = document.querySelector(".hero-logo");
    if (!overlay || !logo || !title || !name || !target) return;
    title.textContent = t("intro");
    name.textContent = property.name;
    if (document.documentElement.classList.contains("intro-seen")) {
      overlay.remove();
      return;
    }
    var reduce = false;
    try { reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { reduce = false; }
    if (reduce) {
      document.documentElement.classList.add("intro-seen");
      overlay.remove();
      return;
    }
    try { sessionStorage.setItem(INTRO_KEY, "1"); } catch (e) { /* private mode */ }
    setPageInert(true);
    var closed = false;
    function finish() {
      if (closed) return;
      closed = true;
      document.documentElement.classList.add("intro-seen");
      setPageInert(false);
      if (overlay.isConnected) overlay.remove();
    }
    overlay.addEventListener("pointerdown", function (event) {
      event.preventDefault();
      finish();
    });
    function onKey(event) {
      if (event.key === "Escape" || event.key === "Enter") finish();
    }
    document.addEventListener("keydown", onKey);
    overlay.classList.add("is-play");
    window.setTimeout(function () {
      if (closed) return;
      logo.style.animation = "none";
      logo.style.opacity = "1";
      logo.style.transform = "none";
      var from = logo.getBoundingClientRect();
      var to = target.getBoundingClientRect();
      if (from.width < 2 || to.width < 2) return finish();
      var scale = to.width / from.width;
      var dx = to.left + to.width / 2 - (from.left + from.width / 2);
      var dy = to.top + to.height / 2 - (from.top + from.height / 2);
      overlay.classList.add("is-fly");
      logo.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      logo.style.transform = "translate(" + dx.toFixed(2) + "px," + dy.toFixed(2) + "px) scale(" + scale.toFixed(4) + ")";
      window.setTimeout(finish, 820);
    }, 1250);
    window.setTimeout(function () {
      document.removeEventListener("keydown", onKey);
      finish();
    }, 2800);
  }

  function bind() {
    var sheet = document.getElementById("sheet");
    document.getElementById("sheet-back").addEventListener("click", function () { sheet.close(); });
    sheet.addEventListener("click", function (event) { if (event.target === sheet) sheet.close(); });
    sheet.addEventListener("close", onSheetClose);
    var lightbox = document.getElementById("lightbox");
    document.getElementById("lb-close").addEventListener("click", function () { lightbox.close(); });
    document.getElementById("lb-prev").addEventListener("click", function () { stepLightbox(state.lang === "ar" ? 1 : -1); });
    document.getElementById("lb-next").addEventListener("click", function () { stepLightbox(state.lang === "ar" ? -1 : 1); });
    lightbox.addEventListener("click", function (event) { if (event.target === lightbox) lightbox.close(); });
    lightbox.addEventListener("close", function () {
      if (!sheet.open) document.body.classList.remove("locked");
    });
    lightbox.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") { event.preventDefault(); stepLightbox(state.lang === "ar" ? 1 : -1); }
      if (event.key === "ArrowRight") { event.preventDefault(); stepLightbox(state.lang === "ar" ? -1 : 1); }
    });
    document.getElementById("to-top").addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", function () {
      document.getElementById("to-top").classList.toggle("show", window.scrollY > 420);
    }, { passive: true });
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".lang")) closeLangMenus(null);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      var open = document.querySelector(".lang-menu:not([hidden])");
      if (!open) return;
      event.preventDefault();
      event.stopPropagation();
      var toggle = open.parentElement.querySelector(".lang-toggle");
      closeLangMenus(null);
      if (toggle) toggle.focus();
    }, true);
  }

  state.lang = isLang(document.documentElement.dataset.lang)
    ? document.documentElement.dataset.lang
    : detectLang();
  bind();
  render();
  playIntro();
})();
