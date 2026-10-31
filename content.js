/**
 * Magnifico Suites — all guest-facing text.
 *
 * How to edit
 * - Each sentence has one field per language: it, en, es, fr, de, pt, zh, ja, ar.
 * - Italian is the default language of the page. A missing language falls back
 *   to English (en).
 * - Icons: pin, key, wifi, parking, bed, services, rules, train, plate, cup,
 *   compass, bag, cross, door, phone.
 * - `type: "notes"` — add sentences to `paragraphs` as language objects.
 *   Optional `links` (phone, WhatsApp, email, site): `href`, `label`, `value`,
 *   and `external: true` when the link should open in a new tab. `ltr: true`
 *   keeps phone numbers, email addresses and URLs left to right in Arabic.
 *   An empty section shows "In arrivo / Coming soon".
 * - `type: "places"` — add cards to `items`: `name`, `address`, `text`
 *   (a string or a language object) and `mapsUrl`. `mapsUrl` may be omitted
 *   (the rooms do this). An empty list shows "In arrivo / Coming soon".
 *   A `notice` is shown above the cards, or above "In arrivo" when the list
 *   is still empty (parking).
 * - `type: "directions"` — address, map button and optional `note`.
 *   Optional `routes`, same shape as a journey card: `id`, `icon`, `title`,
 *   `text`, `mapsUrl`. Leave `routes` empty until the details are checked.
 * - `photos` is the home gallery (WebP). Each item has `src`, `width`, `height`
 *   and `alt` (one field per language). Tapping a photo opens the lightbox.
 * - `property.checkin` and `property.checkout` are optional clock times.
 *   Add them only when they are confirmed. If either is missing, the
 *   check-in / check-out row under the address stays hidden.
 * - Only add details you have checked. Do not guess passwords, phone numbers,
 *   prices, distances or opening hours.
 * - After editing styles.css, app.js or content.js, bump the `?v=` version in
 *   index.html (see the README).
 */
window.MAGNIFICO_CONTENT = {
  "property": {
    "name": "Magnifico Suites",
    "addressLines": [
      "Via Lorenzo Il Magnifico",
      "148, A7",
      "00162 Roma, Italia"
    ],
    "addressLine": "Via Lorenzo Il Magnifico, 148, A7 — 00162 Roma, Italia",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Via+Lorenzo+Il+Magnifico+148%2C+00162+Roma",
    "phone": "+39 392 0923826",
    "phoneHref": "tel:+393920923826",
    "whatsappHref": "https://wa.me/393920923826",
    "email": "lucalau91@gmail.com",
    "emailHref": "mailto:lucalau91@gmail.com",
    "website": "https://www.magnificosuites.it",
    "websiteLabel": "magnificosuites.it",
    "cin": "IT058091B42H76N3N6"
  },
  "photos": [
    {
      "src": "images/room-window.webp",
      "width": 1600,
      "height": 1067,
      "alt": {
        "it": "Camera con letto, scrivania e finestra",
        "en": "Room with a bed, desk and window",
        "es": "Habitación con cama, escritorio y ventana",
        "fr": "Chambre avec lit, bureau et fenêtre",
        "de": "Zimmer mit Bett, Schreibtisch und Fenster",
        "pt": "Quarto com cama, secretária e janela",
        "zh": "带床、书桌和窗户的客房",
        "ja": "ベッド、デスク、窓のある客室",
        "ar": "غرفة فيها سرير ومكتب ونافذة"
      }
    },
    {
      "src": "images/room-desk.webp",
      "width": 1600,
      "height": 1067,
      "alt": {
        "it": "Camera con letto, scrivania e televisore",
        "en": "Room with a bed, desk and television",
        "es": "Habitación con cama, escritorio y televisor",
        "fr": "Chambre avec lit, bureau et téléviseur",
        "de": "Zimmer mit Bett, Schreibtisch und Fernseher",
        "pt": "Quarto com cama, secretária e televisor",
        "zh": "带床、书桌和电视的客房",
        "ja": "ベッド、デスク、テレビのある客室",
        "ar": "غرفة فيها سرير ومكتب وتلفاز"
      }
    },
    {
      "src": "images/room-wardrobe.webp",
      "width": 1600,
      "height": 1067,
      "alt": {
        "it": "Camera con letto, armadio e televisore",
        "en": "Room with a bed, wardrobe and television",
        "es": "Habitación con cama, armario y televisor",
        "fr": "Chambre avec lit, armoire et téléviseur",
        "de": "Zimmer mit Bett, Schrank und Fernseher",
        "pt": "Quarto com cama, roupeiro e televisor",
        "zh": "带床、衣柜和电视的客房",
        "ja": "ベッド、クローゼット、テレビのある客室",
        "ar": "غرفة فيها سرير وخزانة وتلفاز"
      }
    },
    {
      "src": "images/forum.webp",
      "width": 1600,
      "height": 900,
      "alt": {
        "it": "Foro Romano",
        "en": "Roman Forum",
        "es": "Foro Romano",
        "fr": "Forum romain",
        "de": "Forum Romanum",
        "pt": "Fórum Romano",
        "zh": "古罗马广场",
        "ja": "フォロ・ロマーノ",
        "ar": "المنتدى الروماني"
      }
    }
  ],
  "ui": {
    "pageTitle": {
      "it": "Magnifico Suites — Guida per gli ospiti",
      "en": "Magnifico Suites — Guest guide",
      "es": "Magnifico Suites — Guía para huéspedes",
      "fr": "Magnifico Suites — Guide des voyageurs",
      "de": "Magnifico Suites — Gästeratgeber",
      "pt": "Magnifico Suites — Guia para hóspedes",
      "zh": "Magnifico Suites — 住客指南",
      "ja": "Magnifico Suites — ゲストガイド",
      "ar": "Magnifico Suites — دليل الضيوف"
    },
    "metaDescription": {
      "it": "Libro di benvenuto digitale per gli ospiti di Magnifico Suites, a Roma.",
      "en": "Digital welcome book for guests of Magnifico Suites in Rome.",
      "es": "Guía digital de bienvenida para los huéspedes de Magnifico Suites, en Roma.",
      "fr": "Guide d'accueil numérique pour les voyageurs de Magnifico Suites, à Rome.",
      "de": "Digitales Willkommensbuch für Gäste von Magnifico Suites in Rom.",
      "pt": "Guia digital de boas-vindas para os hóspedes do Magnifico Suites, em Roma.",
      "zh": "罗马 Magnifico Suites 住客数字欢迎手册。",
      "ja": "ローマの Magnifico Suites のご宿泊者向けデジタルウェルカムブック。",
      "ar": "دليل ترحيب رقمي لضيوف Magnifico Suites في روما."
    },
    "tagline": {
      "it": "Camere moderne a Roma vicino alla Stazione Tiburtina",
      "en": "Modern rooms in Rome near Tiburtina station",
      "es": "Habitaciones modernas en Roma, cerca de la estación Tiburtina",
      "fr": "Chambres modernes à Rome, près de la gare Tiburtina",
      "de": "Moderne Zimmer in Rom, nahe dem Bahnhof Tiburtina",
      "pt": "Quartos modernos em Roma, perto da estação Tiburtina",
      "zh": "罗马现代客房，靠近 Tiburtina 车站",
      "ja": "ローマのモダンな客室、ティブルティーナ駅の近く",
      "ar": "غرف حديثة في روما، بالقرب من محطة تيبورتينا"
    },
    "intro": {
      "it": "Libro di benvenuto",
      "en": "Welcome book",
      "es": "Libro de bienvenida",
      "fr": "Livre d'accueil",
      "de": "Willkommensbuch",
      "pt": "Livro de boas-vindas",
      "zh": "欢迎手册",
      "ja": "ウェルカムブック",
      "ar": "كتاب الترحيب"
    },
    "photos": {
      "it": "Foto",
      "en": "Photos",
      "es": "Fotos",
      "fr": "Photos",
      "de": "Fotos",
      "pt": "Fotos",
      "zh": "照片",
      "ja": "写真",
      "ar": "الصور"
    },
    "guide": {
      "it": "Guida",
      "en": "Guide",
      "es": "Guía",
      "fr": "Guide",
      "de": "Guide",
      "pt": "Guia",
      "zh": "指南",
      "ja": "ガイド",
      "ar": "الدليل"
    },
    "tapHint": {
      "it": "Tocca un'icona",
      "en": "Tap an icon",
      "es": "Toca un icono",
      "fr": "Touchez une icône",
      "de": "Tippen Sie auf ein Symbol",
      "pt": "Toque num ícone",
      "zh": "点按图标",
      "ja": "アイコンをタップ",
      "ar": "انقر على أيقونة"
    },
    "toTop": {
      "it": "Torna su",
      "en": "Back to top",
      "es": "Volver arriba",
      "fr": "Haut de page",
      "de": "Nach oben",
      "pt": "Voltar ao topo",
      "zh": "回到顶部",
      "ja": "ページ上部へ",
      "ar": "العودة إلى الأعلى"
    },
    "close": {
      "it": "Chiudi",
      "en": "Close",
      "es": "Cerrar",
      "fr": "Fermer",
      "de": "Schließen",
      "pt": "Fechar",
      "zh": "关闭",
      "ja": "閉じる",
      "ar": "إغلاق"
    },
    "prev": {
      "it": "Precedente",
      "en": "Previous",
      "es": "Anterior",
      "fr": "Précédente",
      "de": "Zurück",
      "pt": "Anterior",
      "zh": "上一张",
      "ja": "前へ",
      "ar": "السابق"
    },
    "next": {
      "it": "Successiva",
      "en": "Next",
      "es": "Siguiente",
      "fr": "Suivante",
      "de": "Weiter",
      "pt": "Seguinte",
      "zh": "下一张",
      "ja": "次へ",
      "ar": "التالي"
    },
    "openPhoto": {
      "it": "Apri la foto",
      "en": "Open photo",
      "es": "Abrir la foto",
      "fr": "Ouvrir la photo",
      "de": "Foto öffnen",
      "pt": "Abrir a foto",
      "zh": "打开照片",
      "ja": "写真を開く",
      "ar": "فتح الصورة"
    },
    "copied": {
      "it": "Copiato",
      "en": "Copied",
      "es": "Copiado",
      "fr": "Copié",
      "de": "Kopiert",
      "pt": "Copiado",
      "zh": "已复制",
      "ja": "コピーしました",
      "ar": "تم النسخ"
    },
    "checkinLabel": {
      "it": "Check-in",
      "en": "Check-in",
      "es": "Check-in",
      "fr": "Check-in",
      "de": "Check-in",
      "pt": "Check-in",
      "zh": "入住",
      "ja": "チェックイン",
      "ar": "تسجيل الوصول"
    },
    "checkoutLabel": {
      "it": "Check-out",
      "en": "Check-out",
      "es": "Check-out",
      "fr": "Check-out",
      "de": "Check-out",
      "pt": "Check-out",
      "zh": "退房",
      "ja": "チェックアウト",
      "ar": "تسجيل المغادرة"
    },
    "languageLabel": {
      "it": "Lingua",
      "en": "Language",
      "es": "Idioma",
      "fr": "Langue",
      "de": "Sprache",
      "pt": "Idioma",
      "zh": "语言",
      "ja": "言語",
      "ar": "اللغة"
    },
    "skip": {
      "it": "Vai alle sezioni",
      "en": "Skip to sections",
      "es": "Ir a las secciones",
      "fr": "Aller aux sections",
      "de": "Zu den Abschnitten",
      "pt": "Ir para as secções",
      "zh": "跳到栏目",
      "ja": "セクションへ移動",
      "ar": "انتقل إلى الأقسام"
    },
    "sectionsLabel": {
      "it": "Sezioni della guida",
      "en": "Guide sections",
      "es": "Secciones de la guía",
      "fr": "Sections du guide",
      "de": "Abschnitte des Guides",
      "pt": "Secções do guia",
      "zh": "指南栏目",
      "ja": "ガイドのセクション",
      "ar": "أقسام الدليل"
    },
    "back": {
      "it": "Indietro",
      "en": "Back",
      "es": "Atrás",
      "fr": "Retour",
      "de": "Zurück",
      "pt": "Voltar",
      "zh": "返回",
      "ja": "戻る",
      "ar": "رجوع"
    },
    "openMaps": {
      "it": "Apri in Google Maps",
      "en": "Open in Google Maps",
      "es": "Abrir en Google Maps",
      "fr": "Ouvrir dans Google Maps",
      "de": "In Google Maps öffnen",
      "pt": "Abrir no Google Maps",
      "zh": "在 Google 地图中打开",
      "ja": "Google マップで開く",
      "ar": "فتح في خرائط Google"
    },
    "newTab": {
      "it": "si apre in una nuova scheda",
      "en": "opens in a new tab",
      "es": "se abre en una pestaña nueva",
      "fr": "s'ouvre dans un nouvel onglet",
      "de": "öffnet sich in einem neuen Tab",
      "pt": "abre num novo separador",
      "zh": "在新标签页中打开",
      "ja": "新しいタブで開きます",
      "ar": "يفتح في علامة تبويب جديدة"
    },
    "routeHint": {
      "it": "Indicazioni in Google Maps, si apre in una nuova scheda",
      "en": "Google Maps directions, opens in a new tab",
      "es": "Indicaciones en Google Maps, se abre en una pestaña nueva",
      "fr": "Itinéraire Google Maps, s'ouvre dans un nouvel onglet",
      "de": "Route in Google Maps, öffnet sich in einem neuen Tab",
      "pt": "Indicações no Google Maps, abre num novo separador",
      "zh": "Google 地图路线，在新标签页中打开",
      "ja": "Google マップの経路。新しいタブで開きます",
      "ar": "الاتجاهات في خرائط Google، يفتح في علامة تبويب جديدة"
    },
    "addressLabel": {
      "it": "Indirizzo",
      "en": "Address",
      "es": "Dirección",
      "fr": "Adresse",
      "de": "Adresse",
      "pt": "Morada",
      "zh": "地址",
      "ja": "住所",
      "ar": "العنوان"
    },
    "routesLabel": {
      "it": "Come arrivare",
      "en": "How to get here",
      "es": "Cómo llegar",
      "fr": "Comment venir",
      "de": "Anreise",
      "pt": "Como chegar",
      "zh": "如何到达",
      "ja": "アクセス",
      "ar": "كيفية الوصول"
    },
    "comingSoon": {
      "it": "In arrivo",
      "en": "Coming soon",
      "es": "Próximamente",
      "fr": "Bientôt",
      "de": "Demnächst",
      "pt": "Em breve",
      "zh": "即将补充",
      "ja": "近日追加",
      "ar": "قريبًا"
    },
    "comingSoonBody": {
      "it": "I dettagli di questa sezione saranno aggiunti a breve.",
      "en": "Details for this section will be added shortly.",
      "es": "Los detalles de esta sección se añadirán en breve.",
      "fr": "Les détails de cette section seront ajoutés prochainement.",
      "de": "Die Angaben zu diesem Abschnitt folgen in Kürze.",
      "pt": "Os detalhes desta secção serão acrescentados em breve.",
      "zh": "本栏目的详细信息即将补充。",
      "ja": "このセクションの詳細は間もなく追加されます。",
      "ar": "ستُضاف تفاصيل هذا القسم قريبًا."
    },
    "cinLabel": {
      "it": "CIN",
      "en": "CIN",
      "es": "CIN",
      "fr": "CIN",
      "de": "CIN",
      "pt": "CIN",
      "zh": "CIN",
      "ja": "CIN",
      "ar": "CIN"
    },
    "websiteAria": {
      "it": "Sito ufficiale",
      "en": "Official website",
      "es": "Sitio web oficial",
      "fr": "Site officiel",
      "de": "Offizielle Website",
      "pt": "Sítio oficial",
      "zh": "官方网站",
      "ja": "公式サイト",
      "ar": "الموقع الرسمي"
    }
  },
  "sections": [
    {
      "id": "location",
      "icon": "pin",
      "title": {
        "it": "Posizione",
        "en": "Location",
        "es": "Ubicación",
        "fr": "Emplacement",
        "de": "Lage",
        "pt": "Localização",
        "zh": "位置",
        "ja": "場所",
        "ar": "الموقع"
      },
      "type": "directions",
      "note": {
        "it": "Vicino alla stazione Roma Tiburtina.",
        "en": "Near Roma Tiburtina station.",
        "es": "Cerca de la estación Roma Tiburtina.",
        "fr": "Près de la gare Roma Tiburtina.",
        "de": "Nahe dem Bahnhof Roma Tiburtina.",
        "pt": "Perto da estação Roma Tiburtina.",
        "zh": "靠近罗马 Tiburtina 车站。",
        "ja": "ローマ・ティブルティーナ駅の近くです。",
        "ar": "بالقرب من محطة روما تيبورتينا."
      },
      "routes": []
    },
    {
      "id": "checkin",
      "icon": "key",
      "title": {
        "it": "Check-in",
        "en": "Check-in",
        "es": "Check-in",
        "fr": "Check-in",
        "de": "Check-in",
        "pt": "Check-in",
        "zh": "入住",
        "ja": "チェックイン",
        "ar": "تسجيل الوصول"
      },
      "type": "notes",
      "paragraphs": []
    },
    {
      "id": "wifi",
      "icon": "wifi",
      "title": {
        "it": "Wi-Fi",
        "en": "Wi-Fi",
        "es": "Wi-Fi",
        "fr": "Wi-Fi",
        "de": "Wi-Fi",
        "pt": "Wi-Fi",
        "zh": "Wi-Fi",
        "ja": "Wi-Fi",
        "ar": "Wi-Fi"
      },
      "type": "notes",
      "paragraphs": []
    },
    {
      "id": "parking",
      "icon": "parking",
      "title": {
        "it": "Parcheggio",
        "en": "Parking",
        "es": "Aparcamiento",
        "fr": "Parking",
        "de": "Parken",
        "pt": "Estacionamento",
        "zh": "停车",
        "ja": "駐車場",
        "ar": "موقف السيارات"
      },
      "type": "places",
      "notice": {
        "it": "Parcheggio disponibile.",
        "en": "Parking is available.",
        "es": "Hay aparcamiento disponible.",
        "fr": "Un parking est disponible.",
        "de": "Ein Parkplatz ist vorhanden.",
        "pt": "Estacionamento disponível.",
        "zh": "提供停车位。",
        "ja": "駐車場をご利用いただけます。",
        "ar": "يتوفر موقف سيارات."
      },
      "items": []
    },
    {
      "id": "rooms",
      "icon": "bed",
      "title": {
        "it": "Camere",
        "en": "Rooms",
        "es": "Habitaciones",
        "fr": "Chambres",
        "de": "Zimmer",
        "pt": "Quartos",
        "zh": "客房",
        "ja": "客室",
        "ar": "الغرف"
      },
      "type": "places",
      "items": [
        {
          "name": {
            "it": "Camera 1",
            "en": "Room 1",
            "es": "Habitación 1",
            "fr": "Chambre 1",
            "de": "Zimmer 1",
            "pt": "Quarto 1",
            "zh": "客房 1",
            "ja": "客室 1",
            "ar": "الغرفة 1"
          },
          "address": {
            "it": "1 letto matrimoniale, 2 persone",
            "en": "1 double bed, sleeps 2",
            "es": "1 cama doble, 2 personas",
            "fr": "1 lit double, 2 personnes",
            "de": "1 Doppelbett, 2 Personen",
            "pt": "1 cama de casal, 2 pessoas",
            "zh": "1 张双人床，可住 2 人",
            "ja": "ダブルベッド 1 台、定員 2 名",
            "ar": "سرير مزدوج واحد، لشخصين"
          },
          "text": {
            "it": "TV, Wi-Fi, minibar, aria condizionata, cassaforte, scrivania.",
            "en": "TV, Wi-Fi, minibar, air conditioning, safe, desk.",
            "es": "TV, Wi-Fi, minibar, aire acondicionado, caja fuerte, escritorio.",
            "fr": "TV, Wi-Fi, minibar, climatisation, coffre-fort, bureau.",
            "de": "TV, Wi-Fi, Minibar, Klimaanlage, Safe, Schreibtisch.",
            "pt": "TV, Wi-Fi, minibar, ar condicionado, cofre, secretária.",
            "zh": "电视、Wi-Fi、迷你吧、空调、保险箱、书桌。",
            "ja": "テレビ、Wi-Fi、ミニバー、エアコン、金庫、デスク。",
            "ar": "تلفاز، واي فاي، ميني بار، تكييف، خزنة، مكتب."
          }
        },
        {
          "name": {
            "it": "Camera 2",
            "en": "Room 2",
            "es": "Habitación 2",
            "fr": "Chambre 2",
            "de": "Zimmer 2",
            "pt": "Quarto 2",
            "zh": "客房 2",
            "ja": "客室 2",
            "ar": "الغرفة 2"
          },
          "address": {
            "it": "1 letto matrimoniale, 2 persone",
            "en": "1 double bed, sleeps 2",
            "es": "1 cama doble, 2 personas",
            "fr": "1 lit double, 2 personnes",
            "de": "1 Doppelbett, 2 Personen",
            "pt": "1 cama de casal, 2 pessoas",
            "zh": "1 张双人床，可住 2 人",
            "ja": "ダブルベッド 1 台、定員 2 名",
            "ar": "سرير مزدوج واحد، لشخصين"
          }
        },
        {
          "name": {
            "it": "Camera 3",
            "en": "Room 3",
            "es": "Habitación 3",
            "fr": "Chambre 3",
            "de": "Zimmer 3",
            "pt": "Quarto 3",
            "zh": "客房 3",
            "ja": "客室 3",
            "ar": "الغرفة 3"
          },
          "address": {
            "it": "4 persone, vista città",
            "en": "Sleeps 4, city view",
            "es": "4 personas, vista a la ciudad",
            "fr": "4 personnes, vue sur la ville",
            "de": "4 Personen, Stadtblick",
            "pt": "4 pessoas, vista para a cidade",
            "zh": "可住 4 人，城市景观",
            "ja": "定員 4 名、シティビュー",
            "ar": "لأربعة أشخاص، إطلالة على المدينة"
          },
          "text": {
            "it": "TV, Wi-Fi, aria condizionata, cassaforte, zona living, scrivania.",
            "en": "TV, Wi-Fi, air conditioning, safe, living area, desk.",
            "es": "TV, Wi-Fi, aire acondicionado, caja fuerte, zona de estar, escritorio.",
            "fr": "TV, Wi-Fi, climatisation, coffre-fort, coin séjour, bureau.",
            "de": "TV, Wi-Fi, Klimaanlage, Safe, Wohnbereich, Schreibtisch.",
            "pt": "TV, Wi-Fi, ar condicionado, cofre, sala de estar, secretária.",
            "zh": "电视、Wi-Fi、空调、保险箱、起居区、书桌。",
            "ja": "テレビ、Wi-Fi、エアコン、金庫、リビングエリア、デスク。",
            "ar": "تلفاز، واي فاي، تكييف، خزنة، منطقة معيشة، مكتب."
          }
        },
        {
          "name": {
            "it": "Camera 4",
            "en": "Room 4",
            "es": "Habitación 4",
            "fr": "Chambre 4",
            "de": "Zimmer 4",
            "pt": "Quarto 4",
            "zh": "客房 4",
            "ja": "客室 4",
            "ar": "الغرفة 4"
          },
          "address": {
            "it": "4 persone, vista città",
            "en": "Sleeps 4, city view",
            "es": "4 personas, vista a la ciudad",
            "fr": "4 personnes, vue sur la ville",
            "de": "4 Personen, Stadtblick",
            "pt": "4 pessoas, vista para a cidade",
            "zh": "可住 4 人，城市景观",
            "ja": "定員 4 名、シティビュー",
            "ar": "لأربعة أشخاص، إطلالة على المدينة"
          },
          "text": {
            "it": "TV, Wi-Fi, minibar, appendiabiti, aria condizionata, cassaforte.",
            "en": "TV, Wi-Fi, minibar, clothes hanger, air conditioning, safe.",
            "es": "TV, Wi-Fi, minibar, perchero, aire acondicionado, caja fuerte.",
            "fr": "TV, Wi-Fi, minibar, cintre, climatisation, coffre-fort.",
            "de": "TV, Wi-Fi, Minibar, Kleiderbügel, Klimaanlage, Safe.",
            "pt": "TV, Wi-Fi, minibar, cabide, ar condicionado, cofre.",
            "zh": "电视、Wi-Fi、迷你吧、衣架、空调、保险箱。",
            "ja": "テレビ、Wi-Fi、ミニバー、ハンガー、エアコン、金庫。",
            "ar": "تلفاز، واي فاي، ميني بار، علاقة ملابس، تكييف، خزنة."
          }
        }
      ]
    },
    {
      "id": "amenities",
      "icon": "services",
      "title": {
        "it": "Servizi",
        "en": "Amenities",
        "es": "Servicios",
        "fr": "Services",
        "de": "Ausstattung",
        "pt": "Serviços",
        "zh": "设施",
        "ja": "設備",
        "ar": "الخدمات"
      },
      "type": "notes",
      "paragraphs": [
        {
          "it": "Wi-Fi, aria condizionata, parcheggio e cucina in comune.",
          "en": "Wi-Fi, air conditioning, parking and a shared kitchen.",
          "es": "Wi-Fi, aire acondicionado, aparcamiento y cocina compartida.",
          "fr": "Wi-Fi, climatisation, parking et cuisine partagée.",
          "de": "Wi-Fi, Klimaanlage, Parkplatz und Gemeinschaftsküche.",
          "pt": "Wi-Fi, ar condicionado, estacionamento e cozinha partilhada.",
          "zh": "提供 Wi-Fi、空调、停车位和共用厨房。",
          "ja": "Wi-Fi、エアコン、駐車場、共用キッチンがあります。",
          "ar": "واي فاي، وتكييف، وموقف سيارات، ومطبخ مشترك."
        },
        {
          "it": "Ogni camera ha aria condizionata, Wi-Fi e accesso ai servizi condivisi.",
          "en": "Every room has air conditioning, Wi-Fi and access to shared services.",
          "es": "Cada habitación tiene aire acondicionado, Wi-Fi y acceso a los servicios compartidos.",
          "fr": "Chaque chambre a la climatisation, le Wi-Fi et l'accès aux services partagés.",
          "de": "Jedes Zimmer hat Klimaanlage, Wi-Fi und Zugang zu den gemeinsamen Einrichtungen.",
          "pt": "Cada quarto tem ar condicionado, Wi-Fi e acesso aos serviços partilhados.",
          "zh": "每间客房均有空调和 Wi-Fi，并可使用共用设施。",
          "ja": "すべての客室にエアコンと Wi-Fi があり、共用設備を利用できます。",
          "ar": "في كل غرفة تكييف وواي فاي، مع إمكانية استخدام الخدمات المشتركة."
        }
      ]
    },
    {
      "id": "rules",
      "icon": "rules",
      "title": {
        "it": "Regole della casa",
        "en": "House rules",
        "es": "Normas de la casa",
        "fr": "Règles de la maison",
        "de": "Hausregeln",
        "pt": "Regras da casa",
        "zh": "住宿须知",
        "ja": "ハウスルール",
        "ar": "قواعد المنزل"
      },
      "type": "notes",
      "paragraphs": []
    },
    {
      "id": "transport",
      "icon": "train",
      "title": {
        "it": "Trasporti",
        "en": "Transport",
        "es": "Transporte",
        "fr": "Transports",
        "de": "Verkehr",
        "pt": "Transportes",
        "zh": "交通",
        "ja": "交通",
        "ar": "المواصلات"
      },
      "type": "notes",
      "paragraphs": []
    },
    {
      "id": "restaurants",
      "icon": "plate",
      "title": {
        "it": "Ristoranti",
        "en": "Restaurants",
        "es": "Restaurantes",
        "fr": "Restaurants",
        "de": "Restaurants",
        "pt": "Restaurantes",
        "zh": "餐厅",
        "ja": "レストラン",
        "ar": "مطاعم"
      },
      "type": "places",
      "items": []
    },
    {
      "id": "bars",
      "icon": "cup",
      "title": {
        "it": "Bar",
        "en": "Bars",
        "es": "Bares",
        "fr": "Bars",
        "de": "Bars",
        "pt": "Bares",
        "zh": "酒吧",
        "ja": "バー",
        "ar": "بارات"
      },
      "type": "places",
      "items": []
    },
    {
      "id": "activities",
      "icon": "compass",
      "title": {
        "it": "Attività",
        "en": "Things to do",
        "es": "Qué hacer",
        "fr": "Activités",
        "de": "Aktivitäten",
        "pt": "O que fazer",
        "zh": "周边",
        "ja": "見どころ",
        "ar": "الأنشطة"
      },
      "type": "places",
      "items": [
        {
          "name": {
            "it": "Colosseo",
            "en": "Colosseum",
            "es": "Coliseo",
            "fr": "Colisée",
            "de": "Kolosseum",
            "pt": "Coliseu",
            "zh": "斗兽场",
            "ja": "コロッセオ",
            "ar": "الكولوسيوم"
          },
          "text": {
            "it": "Anfiteatro antico, simbolo dell'Impero romano; un tempo vi si svolgevano i combattimenti dei gladiatori.",
            "en": "Ancient amphitheatre, a symbol of the Roman Empire; it once hosted gladiator fights.",
            "es": "Anfiteatro antiguo, símbolo del Imperio romano; en otro tiempo acogió combates de gladiadores.",
            "fr": "Amphithéâtre antique, symbole de l'Empire romain ; il accueillait autrefois les combats de gladiateurs.",
            "de": "Antikes Amphitheater und Symbol des Römischen Reiches; hier fanden einst Gladiatorenkämpfe statt.",
            "pt": "Anfiteatro antigo, símbolo do Império Romano; outrora acolheu combates de gladiadores.",
            "zh": "古代圆形竞技场，罗马帝国的象征，昔日曾举行角斗士比赛。",
            "ja": "古代の円形闘技場。ローマ帝国の象徴で、かつて剣闘士の試合が行われました。",
            "ar": "مدرج قديم ورمز للإمبراطورية الرومانية، شهد في الماضي قتال المصارعين."
          },
          "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Colosseo+Roma"
        },
        {
          "name": {
            "it": "Foro Romano",
            "en": "Roman Forum",
            "es": "Foro Romano",
            "fr": "Forum romain",
            "de": "Forum Romanum",
            "pt": "Fórum Romano",
            "zh": "古罗马广场",
            "ja": "フォロ・ロマーノ",
            "ar": "المنتدى الروماني"
          },
          "text": {
            "it": "Cuore della vita politica, religiosa e sociale dell'antica Roma: templi e archi.",
            "en": "The heart of political, religious and social life in ancient Rome: temples and arches.",
            "es": "Corazón de la vida política, religiosa y social de la antigua Roma: templos y arcos.",
            "fr": "Cœur de la vie politique, religieuse et sociale de la Rome antique : temples et arcs.",
            "de": "Das Herz des politischen, religiösen und gesellschaftlichen Lebens im antiken Rom: Tempel und Bögen.",
            "pt": "O coração da vida política, religiosa e social da Roma antiga: templos e arcos.",
            "zh": "古罗马政治、宗教与社会生活的中心：神庙与拱门。",
            "ja": "古代ローマの政治・宗教・社会生活の中心。神殿とアーチがあります。",
            "ar": "قلب الحياة السياسية والدينية والاجتماعية في روما القديمة: معابد وأقواس."
          },
          "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Foro+Romano+Roma"
        },
        {
          "name": {
            "it": "Fontana di Trevi",
            "en": "Trevi Fountain",
            "es": "Fontana de Trevi",
            "fr": "Fontaine de Trevi",
            "de": "Trevi-Brunnen",
            "pt": "Fontana di Trevi",
            "zh": "特莱维喷泉",
            "ja": "トレヴィの泉",
            "ar": "نافورة تريفي"
          },
          "text": {
            "it": "Una delle fontane più iconiche di Roma. La tradizione vuole che si lanci una moneta per assicurarsi il ritorno.",
            "en": "One of Rome's most iconic fountains. Tradition has it that you throw a coin to ensure a return.",
            "es": "Una de las fuentes más icónicas de Roma. La tradición consiste en lanzar una moneda para asegurarse el regreso.",
            "fr": "L'une des fontaines les plus emblématiques de Rome. La tradition veut que l'on jette une pièce pour s'assurer d'y revenir.",
            "de": "Einer der bekanntesten Brunnen Roms. Der Tradition nach wirft man eine Münze, um die Rückkehr zu sichern.",
            "pt": "Uma das fontes mais icónicas de Roma. A tradição é lançar uma moeda para garantir o regresso.",
            "zh": "罗马最具代表性的喷泉之一。传统是投入一枚硬币，以求日后再来。",
            "ja": "ローマを代表する噴水のひとつ。コインを投げて、また戻ってこられるよう願う伝統があります。",
            "ar": "واحدة من أشهر نوافير روما. يقضي التقليد برمي قطعة نقدية لضمان العودة."
          },
          "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Fontana+di+Trevi+Roma"
        },
        {
          "name": {
            "it": "Piazza di Spagna",
            "en": "Piazza di Spagna",
            "es": "Plaza de España",
            "fr": "Place d'Espagne",
            "de": "Piazza di Spagna",
            "pt": "Piazza di Spagna",
            "zh": "西班牙广场",
            "ja": "スペイン広場",
            "ar": "ساحة إسبانيا"
          },
          "text": {
            "it": "Con la Scalinata di Trinità dei Monti. Zona elegante, con negozi e caffè.",
            "en": "With the Spanish Steps leading up to Trinità dei Monti. An elegant area with shops and cafés.",
            "es": "Con la Escalinata Española, que sube hasta Trinità dei Monti. Zona elegante, con tiendas y cafés.",
            "fr": "Avec l'escalier espagnol, qui monte vers Trinità dei Monti. Quartier élégant, avec boutiques et cafés.",
            "de": "Mit der Spanischen Treppe hinauf nach Trinità dei Monti. Eine elegante Gegend mit Geschäften und Cafés.",
            "pt": "Com a Escadaria Espanhola, que sobe até Trinità dei Monti. Zona elegante, com lojas e cafés.",
            "zh": "西班牙台阶通往 Trinità dei Monti。这是一处优雅的街区，有店铺和咖啡馆。",
            "ja": "スペイン階段を上るとトリニタ・デイ・モンティに着きます。ショップとカフェのある上品な一帯です。",
            "ar": "مع الدرج الإسباني الصاعد إلى Trinità dei Monti. منطقة أنيقة تضم متاجر ومقاهي."
          },
          "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Piazza+di+Spagna+Roma"
        }
      ]
    },
    {
      "id": "shopping",
      "icon": "bag",
      "title": {
        "it": "Shopping",
        "en": "Shopping",
        "es": "Compras",
        "fr": "Shopping",
        "de": "Shopping",
        "pt": "Compras",
        "zh": "购物",
        "ja": "ショッピング",
        "ar": "تسوق"
      },
      "type": "places",
      "items": []
    },
    {
      "id": "emergencies",
      "icon": "cross",
      "title": {
        "it": "Emergenze",
        "en": "Emergencies",
        "es": "Emergencias",
        "fr": "Urgences",
        "de": "Notfälle",
        "pt": "Emergências",
        "zh": "紧急情况",
        "ja": "緊急",
        "ar": "الطوارئ"
      },
      "type": "notes",
      "paragraphs": []
    },
    {
      "id": "checkout",
      "icon": "door",
      "title": {
        "it": "Check-out",
        "en": "Check-out",
        "es": "Check-out",
        "fr": "Check-out",
        "de": "Check-out",
        "pt": "Check-out",
        "zh": "退房",
        "ja": "チェックアウト",
        "ar": "تسجيل المغادرة"
      },
      "type": "notes",
      "paragraphs": []
    },
    {
      "id": "contacts",
      "icon": "phone",
      "title": {
        "it": "Contatti",
        "en": "Contacts",
        "es": "Contacto",
        "fr": "Contacts",
        "de": "Kontakt",
        "pt": "Contactos",
        "zh": "联系",
        "ja": "連絡先",
        "ar": "الاتصال"
      },
      "type": "notes",
      "paragraphs": [],
      "showCin": true,
      "links": [
        {
          "href": "tel:+393920923826",
          "ltr": true,
          "label": {
            "it": "Telefono",
            "en": "Phone",
            "es": "Teléfono",
            "fr": "Téléphone",
            "de": "Telefon",
            "pt": "Telefone",
            "zh": "电话",
            "ja": "電話",
            "ar": "الهاتف"
          },
          "value": "+39 392 0923826"
        },
        {
          "href": "https://wa.me/393920923826",
          "external": true,
          "label": {
            "it": "WhatsApp",
            "en": "WhatsApp",
            "es": "WhatsApp",
            "fr": "WhatsApp",
            "de": "WhatsApp",
            "pt": "WhatsApp",
            "zh": "WhatsApp",
            "ja": "WhatsApp",
            "ar": "WhatsApp"
          },
          "value": {
            "it": "Preferito. Rispondiamo a breve.",
            "en": "Preferred. We reply shortly.",
            "es": "Preferido. Respondemos en breve.",
            "fr": "Privilégié. Nous répondons rapidement.",
            "de": "Bevorzugt. Wir antworten in Kürze.",
            "pt": "Preferido. Respondemos em breve.",
            "zh": "建议优先使用。我们会尽快回复。",
            "ja": "こちらを優先しています。折り返しご連絡します。",
            "ar": "مفضّل. نرد خلال وقت قصير."
          }
        },
        {
          "href": "mailto:lucalau91@gmail.com",
          "ltr": true,
          "label": {
            "it": "Email",
            "en": "Email",
            "es": "Correo",
            "fr": "E-mail",
            "de": "E-Mail",
            "pt": "E-mail",
            "zh": "电子邮件",
            "ja": "メール",
            "ar": "البريد الإلكتروني"
          },
          "value": "lucalau91@gmail.com"
        },
        {
          "href": "https://www.magnificosuites.it",
          "external": true,
          "ltr": true,
          "label": {
            "it": "Sito",
            "en": "Website",
            "es": "Sitio web",
            "fr": "Site",
            "de": "Website",
            "pt": "Sítio",
            "zh": "网站",
            "ja": "ウェブサイト",
            "ar": "الموقع"
          },
          "value": "magnificosuites.it"
        }
      ]
    }
  ]
};
