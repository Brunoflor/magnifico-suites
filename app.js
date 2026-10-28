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

  var state = {
    lang: "it",
    openId: null,
    triggerId: null,
  };

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
  };

  function isLang(code) {
    for (var i = 0; i < LANGS.length; i++) {
      if (LANGS[i].code === code) return true;
    }
    return false;
  }

  function langName(code) {
    for (var i = 0; i < LANGS.length; i++) {
      if (LANGS[i].code === code) return LANGS[i].name;
    }
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
    } catch (e) {
      /* private mode */
    }
    var list = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "it"];
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

  function t(key) {
    return text(content.ui[key]);
  }

  function isComingSoon(section) {
    if (section.type === "directions") return false;
    if (section.type === "places") return !section.items || section.items.length === 0;
    if (section.type === "notes") {
      var hasParagraphs = section.paragraphs && section.paragraphs.length;
      var hasLinks = section.links && section.links.length;
      return !hasParagraphs && !hasLinks;
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

  function tileGlyph(name) {
    var img = document.createElement("img");
    img.className = "tile-glyph";
    img.src = asset("icons/" + name + ".svg");
    img.alt = "";
    img.width = 80;
    img.height = 80;
    img.decoding = "async";
    img.draggable = false;
    return img;
  }

  function mapsLink(url, label, extra) {
    var a = document.createElement("a");
    a.className = "btn";
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    var visible = document.createElement("span");
    visible.textContent = label;
    a.appendChild(visible);
    if (extra) {
      var hint = document.createElement("span");
      hint.className = "visually-hidden";
      hint.textContent = ", " + extra;
      a.appendChild(hint);
    }
    a.appendChild(icon("external", "btn-icon"));
    return a;
  }

  function closeLangMenus(except) {
    var menus = document.querySelectorAll(".lang-menu");
    menus.forEach(function (menu) {
      if (menu === except) return;
      menu.hidden = true;
      var toggle = menu.parentElement.querySelector(".lang-toggle");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  }

  function updateLangSwitch(container) {
    if (!container.querySelector(".lang-toggle")) {
      buildLangSwitch(container);
    }
    var current = langName(state.lang);
    var toggle = container.querySelector(".lang-toggle");
    toggle.lang = state.lang;
    toggle.setAttribute("aria-label", t("languageLabel") + ", " + current);
    toggle.querySelector(".lang-code").textContent = state.lang.toUpperCase();
    toggle.querySelector(".lang-current").textContent = current;
    var options = container.querySelectorAll(".lang-option");
    options.forEach(function (option) {
      var on = option.getAttribute("data-set-lang") === state.lang;
      option.setAttribute("aria-selected", on ? "true" : "false");
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
    var code = document.createElement("span");
    code.className = "lang-code";
    code.setAttribute("aria-hidden", "true");
    var current = document.createElement("span");
    current.className = "lang-current";
    var caret = document.createElement("span");
    caret.className = "lang-caret";
    caret.setAttribute("aria-hidden", "true");
    caret.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
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
      var mark = document.createElement("span");
      mark.className = "lang-code";
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = item.code.toUpperCase();
      var name = document.createElement("span");
      name.textContent = item.name;
      option.appendChild(mark);
      option.appendChild(name);
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

  function renderGrid() {
    var root = document.getElementById("sections");
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
      var face = document.createElement("span");
      face.className = "tile-face";
      face.appendChild(tileGlyph(section.icon));
      if (isComingSoon(section)) {
        button.classList.add("is-soon");
        var dot = document.createElement("span");
        dot.className = "tile-dot";
        dot.setAttribute("aria-hidden", "true");
        face.appendChild(dot);
      }
      button.appendChild(face);
      var label = document.createElement("span");
      label.className = "tile-label";
      label.textContent = text(section.title);
      button.appendChild(label);
      if (isComingSoon(section)) {
        var soon = document.createElement("span");
        soon.className = "visually-hidden";
        soon.textContent = t("comingSoon");
        button.appendChild(soon);
      }
      button.addEventListener("click", function () {
        openSection(section.id);
      });
      item.appendChild(button);
      list.appendChild(item);
    });
    root.replaceChildren(list);
  }

  function renderSoon(section, quiet) {
    var wrap = document.createElement("div");
    wrap.className = quiet ? "soon soon-quiet" : "soon";
    if (!quiet) {
      var img = document.createElement("img");
      img.className = "soon-mark";
      img.src = asset("icons/" + section.icon + ".svg");
      img.alt = "";
      img.width = 88;
      img.height = 88;
      wrap.appendChild(img);
    }
    var title = document.createElement("p");
    title.className = "soon-title";
    title.textContent = t("comingSoon");
    var body = document.createElement("p");
    body.className = "soon-text";
    body.textContent = t("comingSoonBody");
    wrap.appendChild(title);
    wrap.appendChild(body);
    return wrap;
  }

  function renderNotice(value) {
    var aside = document.createElement("aside");
    aside.className = "notice";
    var note = document.createElement("p");
    note.textContent = text(value);
    aside.appendChild(note);
    return aside;
  }

  function renderCin() {
    var cin = document.createElement("p");
    cin.className = "cin cin-inline";
    var label = document.createElement("span");
    label.className = "cin-label";
    label.textContent = t("cinLabel");
    var value = document.createElement("span");
    value.dir = "ltr";
    value.textContent = content.property.cin;
    cin.appendChild(label);
    cin.appendChild(document.createTextNode(" "));
    cin.appendChild(value);
    return cin;
  }

  function renderDirections(section) {
    var fragment = document.createDocumentFragment();
    var addressBlock = document.createElement("section");
    addressBlock.className = "address-block";
    var addressLabel = document.createElement("h3");
    addressLabel.className = "block-title";
    addressLabel.textContent = t("addressLabel");
    var address = document.createElement("p");
    address.className = "address";
    address.dir = "ltr";
    content.property.addressLines.forEach(function (line, index) {
      if (index) address.appendChild(document.createElement("br"));
      address.appendChild(document.createTextNode(line));
    });
    addressBlock.appendChild(addressLabel);
    addressBlock.appendChild(address);
    if (section.note && text(section.note)) {
      var note = document.createElement("p");
      note.className = "note";
      note.textContent = text(section.note);
      addressBlock.appendChild(note);
    }
    addressBlock.appendChild(
      mapsLink(content.property.mapsUrl, t("openMaps"), t("newTab"))
    );
    fragment.appendChild(addressBlock);

    if (section.routes && section.routes.length) {
      var routesBlock = document.createElement("section");
      routesBlock.className = "routes-block";
      var routesLabel = document.createElement("h3");
      routesLabel.className = "block-title";
      routesLabel.id = "routes-title";
      routesLabel.textContent = t("routesLabel");
      var list = document.createElement("ul");
      list.className = "routes";
      list.setAttribute("aria-labelledby", "routes-title");
      section.routes.forEach(function (route) {
        var item = document.createElement("li");
        var link = document.createElement("a");
        link.className = "route";
        link.href = route.mapsUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.appendChild(icon(route.icon, "route-icon"));
        var copy = document.createElement("span");
        copy.className = "route-text";
        var title = document.createElement("span");
        title.className = "route-title";
        title.textContent = text(route.title);
        var desc = document.createElement("span");
        desc.className = "route-desc";
        desc.textContent = text(route.text);
        var hint = document.createElement("span");
        hint.className = "visually-hidden";
        hint.textContent = ". " + t("routeHint");
        copy.appendChild(title);
        copy.appendChild(desc);
        copy.appendChild(hint);
        link.appendChild(copy);
        link.appendChild(icon("chevron", "route-chevron"));
        item.appendChild(link);
        list.appendChild(item);
      });
      routesBlock.appendChild(routesLabel);
      routesBlock.appendChild(list);
      fragment.appendChild(routesBlock);
    }
    return fragment;
  }

  function renderGallery() {
    var scroller = document.createElement("div");
    scroller.className = "gallery";
    (content.photos || []).forEach(function (photo) {
      var img = document.createElement("img");
      img.src = asset(photo.src);
      img.alt = text(photo.alt);
      img.width = photo.width || 1600;
      img.height = photo.height || 1067;
      img.loading = "lazy";
      img.decoding = "async";
      scroller.appendChild(img);
    });
    return scroller;
  }

  function renderPlaces(section) {
    var fragment = document.createDocumentFragment();
    if (section.notice) fragment.appendChild(renderNotice(section.notice));
    var list = document.createElement("ul");
    list.className = "places";
    (section.items || []).forEach(function (place) {
      var item = document.createElement("li");
      item.className = "place";
      var name = document.createElement("h3");
      name.className = "place-name";
      name.textContent = text(place.name);
      item.appendChild(name);
      if (text(place.address)) {
        var address = document.createElement("p");
        address.className = "place-address";
        address.textContent = text(place.address);
        item.appendChild(address);
      }
      if (text(place.text)) {
        var description = document.createElement("p");
        description.className = "place-text";
        description.textContent = text(place.text);
        item.appendChild(description);
      }
      if (place.mapsUrl) {
        item.appendChild(
          mapsLink(place.mapsUrl, t("openMaps"), text(place.name) + ", " + t("newTab"))
        );
      }
      list.appendChild(item);
    });
    fragment.appendChild(list);
    return fragment;
  }

  function renderNotes(section) {
    var wrap = document.createElement("div");
    wrap.className = "notes";
    (section.paragraphs || []).forEach(function (paragraph) {
      var p = document.createElement("p");
      p.textContent = text(paragraph);
      wrap.appendChild(p);
    });
    if (section.links && section.links.length) {
      var list = document.createElement("ul");
      list.className = "contacts";
      section.links.forEach(function (item) {
        var li = document.createElement("li");
        var link = document.createElement("a");
        link.className = "contact";
        link.href = item.href;
        if (item.external) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
        var label = document.createElement("span");
        label.className = "contact-label";
        label.textContent = text(item.label);
        var value = document.createElement("span");
        value.className = "contact-value";
        if (item.ltr) value.dir = "ltr";
        value.textContent = text(item.value);
        link.appendChild(label);
        link.appendChild(value);
        if (item.external) {
          var hint = document.createElement("span");
          hint.className = "visually-hidden";
          hint.textContent = ", " + t("newTab");
          link.appendChild(hint);
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
    var fragment = document.createDocumentFragment();
    if (section.gallery) fragment.appendChild(renderGallery());
    if (section.type === "directions") {
      fragment.appendChild(renderDirections(section));
      return fragment;
    }
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

  function renderSheet() {
    document.getElementById("back-label").textContent = t("back");
    var title = document.getElementById("sheet-title");
    var body = document.getElementById("sheet-body");
    var section = null;
    content.sections.forEach(function (item) {
      if (item.id === state.openId) section = item;
    });
    if (!section) {
      title.textContent = "";
      body.replaceChildren();
      return;
    }
    title.textContent = text(section.title);
    body.replaceChildren(renderSectionBody(section));
  }

  function renderHomeAddress() {
    var node = document.getElementById("home-address");
    node.replaceChildren();
    node.appendChild(icon("pin", "home-pin"));
    var line = document.createElement("span");
    line.dir = "ltr";
    line.textContent = content.property.addressLine;
    node.appendChild(line);
  }

  function renderCinFooter() {
    var node = document.getElementById("cin");
    node.replaceChildren();
    var label = document.createElement("span");
    label.className = "cin-label";
    label.textContent = t("cinLabel");
    var value = document.createElement("span");
    value.dir = "ltr";
    value.textContent = content.property.cin;
    node.appendChild(label);
    node.appendChild(document.createTextNode(" "));
    node.appendChild(value);
  }

  function renderSiteLink() {
    var node = document.getElementById("site-link");
    node.replaceChildren();
    var link = document.createElement("a");
    link.href = content.property.website;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.dir = "ltr";
    link.textContent = content.property.websiteLabel;
    link.setAttribute("aria-label", t("websiteAria") + ", " + content.property.websiteLabel + ", " + t("newTab"));
    node.appendChild(link);
  }

  function renderHero() {
    var img = document.getElementById("hero");
    var photo = content.photos && content.photos[0];
    if (!img || !photo) return;
    img.alt = text(photo.alt);
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
    var tagline = document.getElementById("tagline");
    if (tagline) tagline.textContent = t("tagline");
    updateLangSwitch(document.getElementById("lang-switch"));
    updateLangSwitch(document.getElementById("sheet-lang"));
    renderHero();
    renderGrid();
    renderHomeAddress();
    renderCinFooter();
    renderSiteLink();
    renderSheet();
    if (options.announce) {
      document.getElementById("live").textContent = langName(state.lang);
    }
  }

  function setLang(lang) {
    if (!isLang(lang)) return;
    var changed = lang !== state.lang;
    state.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* ignore quota / private mode */
    }
    if (!changed) return;
    render({ announce: true });
  }

  function syncExpanded() {
    var buttons = document.querySelectorAll(".tile");
    buttons.forEach(function (button) {
      button.setAttribute(
        "aria-expanded",
        button.dataset.section === state.openId ? "true" : "false"
      );
    });
  }

  function openSection(id) {
    closeLangMenus(null);
    state.openId = id;
    state.triggerId = id;
    syncExpanded();
    renderSheet();
    var dialog = document.getElementById("sheet");
    if (!dialog.open) dialog.showModal();
    document.getElementById("sheet-back").focus();
  }

  function onClose() {
    var id = state.triggerId;
    state.openId = null;
    syncExpanded();
    renderSheet();
    window.setTimeout(function () {
      var button = document.querySelector('[data-section="' + id + '"]');
      if (button) button.focus();
    }, 0);
  }

  function setPageInert(on) {
    var wrap = document.querySelector(".wrap");
    if (!wrap) return;
    try {
      wrap.inert = on;
    } catch (e) {
      if (on) wrap.setAttribute("aria-hidden", "true");
      else wrap.removeAttribute("aria-hidden");
    }
  }

  function playIntro() {
    var overlay = document.getElementById("intro");
    var logo = document.getElementById("intro-logo");
    var title = document.getElementById("intro-title");
    var headerLogo = document.querySelector(".logo");
    if (!overlay || !logo || !title || !headerLogo) return;
    if (document.documentElement.classList.contains("intro-seen")) {
      overlay.remove();
      return;
    }

    var reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      reduce = false;
    }
    if (reduce) {
      document.documentElement.classList.add("intro-seen");
      overlay.remove();
      return;
    }

    var phrase = t("intro");
    if (!phrase) {
      document.documentElement.classList.add("intro-seen");
      overlay.remove();
      return;
    }

    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch (e) {
      /* private mode: the intro can play again next time */
    }

    setPageInert(true);
    var chars = state.lang === "zh" || state.lang === "ja" || phrase.indexOf(" ") === -1;
    title.classList.toggle("is-chars", chars);
    title.replaceChildren();
    var parts = chars ? Array.from(phrase) : phrase.split(/\s+/);
    parts.forEach(function (part) {
      var piece = document.createElement("span");
      piece.className = "intro-piece";
      piece.textContent = part;
      title.appendChild(piece);
    });

    var closed = false;
    var flying = false;
    var first = null;
    var flightTimer = 0;
    var safetyTimer = 0;

    function flightTransform() {
      var last = headerLogo.getBoundingClientRect();
      if (!first || last.width < 2) return "";
      var scale = last.width / first.width;
      var dx = last.left + last.width / 2 - (first.left + first.width / 2);
      var dy = last.top + last.height / 2 - (first.top + first.height / 2);
      return "translate(" + dx.toFixed(2) + "px, " + dy.toFixed(2) + "px) scale(" + scale.toFixed(4) + ")";
    }

    function onResize() {
      if (!flying || closed) return;
      var next = flightTransform();
      if (next) logo.style.transform = next;
    }

    function finish() {
      if (closed) return;
      closed = true;
      flying = false;
      window.clearTimeout(flightTimer);
      window.clearTimeout(safetyTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.add("intro-seen");
      setPageInert(false);
      if (overlay.isConnected) overlay.remove();
    }

    function onKey(event) {
      if (event.key === "Escape" || event.key === "Enter") finish();
    }

    function pin(el, rect, lockHeight) {
      el.style.position = "fixed";
      el.style.left = rect.left + "px";
      el.style.top = rect.top + "px";
      el.style.width = rect.width + "px";
      el.style.margin = "0";
      el.style.maxWidth = "none";
      el.style.transform = "none";
      el.style.animation = "none";
      if (lockHeight) el.style.height = rect.height + "px";
    }

    function startFlight() {
      if (closed || flying) return;
      logo.style.animation = "none";
      logo.style.transform = "none";
      logo.style.opacity = "1";
      title.style.animation = "none";
      title.style.opacity = "1";
      var logoRect = logo.getBoundingClientRect();
      var titleRect = title.getBoundingClientRect();
      if (logoRect.width < 2 || headerLogo.getBoundingClientRect().width < 2) {
        finish();
        return;
      }
      pin(logo, logoRect, true);
      pin(title, titleRect, false);
      title.style.opacity = "1";
      first = logoRect;
      flying = true;
      window.addEventListener("resize", onResize);
      window.addEventListener("scroll", onResize, true);
      logo.style.transformOrigin = "center center";
      logo.style.transition = "none";
      void logo.offsetWidth;
      overlay.classList.add("is-fly");
      title.style.removeProperty("animation");
      title.style.removeProperty("opacity");
      logo.style.transition = "transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)";
      logo.style.transform = flightTransform();
      logo.addEventListener("transitionend", function (event) {
        if (event.target !== logo || event.propertyName !== "transform") return;
        finish();
      });
    }

    overlay.addEventListener("pointerdown", function (event) {
      event.preventDefault();
      event.stopPropagation();
      finish();
    });
    document.addEventListener("keydown", onKey);

    function begin() {
      if (!overlay.isConnected || overlay.classList.contains("is-play") || closed) return;
      overlay.classList.add("is-play");
      flightTimer = window.setTimeout(startFlight, 1150);
      safetyTimer = window.setTimeout(finish, 2800);
    }
    begin();
  }

  function bind() {
    var dialog = document.getElementById("sheet");
    document.getElementById("sheet-back").addEventListener("click", function () {
      dialog.close();
    });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", onClose);
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".lang")) closeLangMenus(null);
    });
    document.addEventListener(
      "keydown",
      function (event) {
        if (event.key !== "Escape") return;
        var open = document.querySelector(".lang-menu:not([hidden])");
        if (!open) return;
        event.preventDefault();
        event.stopPropagation();
        var toggle = open.parentElement.querySelector(".lang-toggle");
        closeLangMenus(null);
        if (toggle) toggle.focus();
      },
      true
    );
  }

  state.lang = isLang(document.documentElement.dataset.lang)
    ? document.documentElement.dataset.lang
    : detectLang();
  bind();
  render();
  playIntro();
})();
