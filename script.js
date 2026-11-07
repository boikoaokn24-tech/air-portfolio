
(() => {
  'use strict';

  /* ==================== Константи ==================== */
  const CATEGORIES = ['3D-дизайн', 'Фотографія', 'UI/UX', 'Ілюстрація'];

  const STORAGE_KEYS = {
    theme: 'Sync-theme',
    custom: 'Sync-custom-works',
    likes: 'Sync-liked-ids'
  };

  const PLACEHOLDER_IMG = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#6d28d9"/><stop offset="1" stop-color="#db2777"/></linearGradient></defs>' +
    '<rect width="800" height="600" fill="url(#g)"/>' +
    '<text x="400" y="310" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" fill="#ffffff">' +
    'Зображення недоступне</text></svg>'
  );

  const SAMPLE_WORKS = [
    { id: 'w01', title: 'Неонова абстракція', author: 'Гордійчук Максим', category: '3D-дизайн', likes: 42,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
      description: 'Абстрактна 3D-композиція з плавними градієнтами та м’яким неоновим світлінням. Робота створена в Blender, фінальне освітлення налаштовано вручну для глибокого контрасту кольорів.' },
    { id: 'w02', title: 'Кристалічні форми', author: 'Єремейчук Максим', category: '3D-дизайн', likes: 31,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80',
      description: 'Серія геометричних об’єктів зі склоподібними матеріалами. Головна ідея — показати, як світло заломлюється у складних гранях і створює живі кольорові відблиски.' },
    { id: 'w03', title: 'Градієнтні сфери', author: 'Романовська Олександра', category: '3D-дизайн', likes: 27,
      image: 'https://images.unsplash.com/photo-1614850523060-8da1d56ae167?auto=format&fit=crop&w=900&q=80',
      description: 'Мінімалістична сцена з об’ємними формами та м’якими тінями. Підійде як фон для лендингу або обкладинка презентації сучасного цифрового продукту.' },
    { id: 'w04', title: 'Цифровий простір', author: 'Василевич Дмитро', category: '3D-дизайн', likes: 19,
      image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=900&q=80',
      description: 'Футуристична візуалізація віртуального простору з хвилеподібними поверхнями. Автор експериментував із текстурами та глибиною різкості для кінематографічного ефекту.' },

    { id: 'w05', title: 'Ранкова долина', author: 'Олена Бойко', category: 'Фотографія', likes: 58,
      image: 'nature.jpg',
      description: 'Мальовничий гірський пейзаж із ґрунтовою стежкою серед золотистих пагорбів. Під час зйомки зі штатива застосовано поляризаційний фільтр для збалансованого контрасту та глибоких кольорів.' },
    { id: 'w06', title: 'Туманний ліс', author: 'Довмат Максим', category: 'Фотографія', likes: 46,
      image: 'fog.jpg',
      description: 'Загадковий ранковий ліс, огорнутий густим туманом. Фотографію зроблено після дощової ночі — саме тоді повітря найкраще підкреслює глибину кадру.' },
    { id: 'w07', title: 'Дзеркало озера', author: 'Поперечний Василь', category: 'Фотографія', likes: 39,
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
      description: 'Тиха гірська гладь, у якій ідеально віддзеркалюються скелі та небо. Кадр вимагав терпіння: потрібно було дочекатися моменту, коли вітер повністю стихне.' },
    { id: 'w08', title: 'Зоряна ніч', author: 'Рідченко Максим', category: 'Фотографія', likes: 64,
      image: 'starry night.jpg',
      description: 'Нічний пейзаж із яскравим зоряним небом над засніженим лісом. Зйомка на довгій витримці 25 секунд та світлосильний ширококутний об’єктив дозволили передати кожну зірку.' },

    { id: 'w09', title: 'Дашборд аналітики', author: 'Давидюк Вадим', category: 'UI/UX', likes: 35,
      image: 'analytics.png',
      description: 'Інтерфейс панелі керування для сервісу аналітики. Основний акцент — на читабельності даних, чіткій ієрархії блоків та зручному фільтруванні звітів.' },
    { id: 'w10', title: 'Редизайн мобільного застосунку', author: 'Добровольський Максим', category: 'UI/UX', likes: 48,
      image: 'ui-app.jpg',
      description: 'Комплексний редизайн мобільного банкінгу: зручний та стильний інтерфейс із балансом, детальною фінансовою аналітикою та можливістю швидкого сканування QR-кодів.' },
    { id: 'w11', title: 'Прототип інтерфейсу', author: 'Яремчук Денис', category: 'UI/UX', likes: 22,
      image: 'interface.png',
      description: 'Етапи розробки інтерфейсу мобільного застосунку: від чорнового wireframe-скетчу до готового кольорового прототипу.' },
    { id: 'w12', title: 'Дизайн-система', author: 'Котяш Тарас', category: 'UI/UX', likes: 29,
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=900&q=80',
      description: 'Бібліотека компонентів із типографікою, кольорами та відступами. Єдині правила дозволили команді з п’яти дизайнерів працювати в одному стилі.' },

    { id: 'w13', title: 'Палітра настрою', author: 'Казанівська Софія', category: 'Ілюстрація', likes: 33,
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=900&q=80',
      description: 'Експресивна абстрактна ілюстрація, де кожен колір передає окрему емоцію. Створена акрилом, згодом відсканована та доопрацьована в цифровому форматі.' },
    { id: 'w14', title: 'Кольорові мазки', author: 'Залужний Олег', category: 'Ілюстрація', likes: 26,
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80',
      description: 'Яскрава робота у техніці змішаних матеріалів. Динамічні мазки та контрастні відтінки створюють відчуття руху та енергії.' },
    { id: 'w15', title: 'Скетчбук', author: 'Савчук Артем', category: 'Ілюстрація', likes: 21,
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80',
      description: 'Сторінка з авторського скетчбука: швидкі начерки, експерименти з формою та кольором. Саме з таких нотаток починаються великі ілюстраційні проєкти.' },
    { id: 'w16', title: 'Акварельна фантазія', author: 'Олександр Темнов', category: 'Ілюстрація', likes: 37,
      image: 'witcher.jpg',
      description: 'Темна фентезі-ілюстрація з епічною атмосферою бою. Робота виконана на фактурному папері, що додає глибини вогняно-червоним кольорам та підкреслює драматизм сюжету.' }
  ];

  /* ==================== Допоміжні функції ==================== */
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); return true; } catch (e) { return false; } }
  };

  function loadJSON(key, fallback) {
    const raw = storage.get(key);
    if (!raw) return fallback;
    try { return JSON.parse(raw); } catch (e) { return fallback; }
  }

  function sizedImage(url, width) {
    try {
      const parsed = new URL(url);
      if (parsed.hostname === 'images.unsplash.com') {
        parsed.searchParams.set('w', String(width));
      }
      return parsed.toString();
    } catch (e) {
      return url;
    }
  }

  function setImage(img, url, width, alt) {
    img.alt = alt;
    img.onerror = () => { img.onerror = null; img.src = PLACEHOLDER_IMG; };
    img.src = sizedImage(url, width);
  }

  function isValidHttpUrl(value) {
    try {
      const parsed = new URL(value);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch (e) {
      return false;
    }
  }

  function isValidWork(item) {
    return item && typeof item === 'object'
      && typeof item.id === 'string'
      && typeof item.title === 'string'
      && typeof item.author === 'string'
      && CATEGORIES.includes(item.category)
      && typeof item.image === 'string' && isValidHttpUrl(item.image)
      && typeof item.description === 'string';
  }

  /* ==================== Стан ==================== */
  const loadedCustom = loadJSON(STORAGE_KEYS.custom, []);
  const loadedLikes = loadJSON(STORAGE_KEYS.likes, []);

  const state = {
    custom: Array.isArray(loadedCustom) ? loadedCustom.filter(isValidWork).map(w => ({ ...w, likes: Number(w.likes) || 0, custom: true })) : [],
    likedIds: new Set(Array.isArray(loadedLikes) ? loadedLikes.filter(id => typeof id === 'string') : []),
    filter: 'all',
    query: '',
    visible: [],
    currentId: null
  };

  const allWorks = () => state.custom.concat(SAMPLE_WORKS);
  const findWork = id => allWorks().find(work => work.id === id);
  const isLiked = id => state.likedIds.has(id);
  const likeCount = work => work.likes + (isLiked(work.id) ? 1 : 0);

  const saveCustom = () => storage.set(STORAGE_KEYS.custom, JSON.stringify(state.custom));
  const saveLikes = () => storage.set(STORAGE_KEYS.likes, JSON.stringify(Array.from(state.likedIds)));

  /* ==================== Елементи DOM ==================== */
  const els = {
    grid: $('#galleryGrid'),
    empty: $('#emptyState'),
    status: $('#galleryStatus'),
    filterBar: $('#filterBar'),
    search: $('#searchInput'),
    resetFilters: $('#resetFilters'),
    statWorks: $('#statWorks'),
    statAuthors: $('#statAuthors'),
    statLikes: $('#statLikes'),
    themeToggle: $('#themeToggle'),
    themeIcon: $('#themeIcon'),
    modal: $('#workModal'),
    modalImage: $('#modalImage'),
    modalTitle: $('#modalTitle'),
    modalAuthor: $('#modalAuthor'),
    modalCategory: $('#modalCategory'),
    modalDescription: $('#modalDescription'),
    modalLike: $('#modalLike'),
    modalDelete: $('#modalDelete'),
    modalPrev: $('#modalPrev'),
    modalNext: $('#modalNext'),
    modalCounter: $('#modalCounter'),
    form: $('#workForm'),
    descCounter: $('#descCounter'),
    previewBox: $('#previewBox'),
    previewImg: $('#previewImg'),
    previewText: $('#previewText'),
    fillExample: $('#fillExample'),
    toast: $('#appToast'),
    toastBody: $('#toastBody'),
    year: $('#year')
  };

  const modalInstance = bootstrap.Modal.getOrCreateInstance(els.modal);
  const toastInstance = bootstrap.Toast.getOrCreateInstance(els.toast, { delay: 3500 });

  /* ==================== Сповіщення ==================== */
  function showToast(message, variant = 'dark') {
    els.toast.className = 'toast align-items-center border-0 text-bg-' + variant;
    els.toastBody.textContent = message;
    toastInstance.show();
  }

  /* ==================== Тема (Dark / Light) ==================== */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    const dark = theme === 'dark';
    els.themeIcon.className = dark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    const label = dark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему';
    els.themeToggle.setAttribute('aria-label', label);
    els.themeToggle.setAttribute('title', label);
  }

  function toggleTheme() {
    const next = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    storage.set(STORAGE_KEYS.theme, next);
  }

  /* ==================== Лайки ==================== */
  function applyLikeState(button, work) {
    const liked = isLiked(work.id);
    button.classList.toggle('is-liked', liked);
    button.setAttribute('aria-pressed', String(liked));
    button.setAttribute('aria-label', (liked ? 'Прибрати лайк: ' : 'Поставити лайк: ') + work.title);
    const icon = $('i', button);
    icon.className = liked ? 'bi bi-heart-fill' : 'bi bi-heart';
    $('.like-count', button).textContent = likeCount(work);
  }

  function syncLikeUI(id, animate) {
    const work = findWork(id);
    if (!work) return;
    const buttons = $$('.gallery-card[data-id="' + CSS.escape(id) + '"] .btn-like');
    if (state.currentId === id) buttons.push(els.modalLike);
    buttons.forEach(button => {
      applyLikeState(button, work);
      if (animate) {
        button.classList.remove('pop');
        void button.offsetWidth;
        button.classList.add('pop');
      }
    });
  }

  function toggleLike(id) {
    if (state.likedIds.has(id)) {
      state.likedIds.delete(id);
    } else {
      state.likedIds.add(id);
    }
    saveLikes();
    syncLikeUI(id, true);
    updateStats();
  }

  /* ==================== Рендер галереї ==================== */
  function createCard(work, index) {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-4 col-xl-3 gallery-item';
    col.style.animationDelay = Math.min(index, 12) * 45 + 'ms';

    col.innerHTML =
      '<article class="gallery-card h-100 d-flex flex-column shadow-sm">' +
        '<button type="button" class="card-media" aria-label="Відкрити роботу">' +
          '<span class="card-badge"></span>' +
          '<img loading="lazy" alt="">' +
        '</button>' +
        '<div class="p-3 d-flex flex-column flex-grow-1">' +
          '<h3 class="h6 card-title mb-1"></h3>' +
          '<p class="small text-body-secondary mb-3 card-author"></p>' +
          '<div class="mt-auto d-flex justify-content-between align-items-center gap-2">' +
            '<span class="small text-body-secondary card-category"></span>' +
            '<button type="button" class="btn-like" aria-pressed="false">' +
              '<i class="bi bi-heart" aria-hidden="true"></i> <span>Лайк</span> <span class="like-count">0</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</article>';

    const card = $('.gallery-card', col);
    card.dataset.id = work.id;
    card.dataset.category = work.category;

    $('.card-media', col).setAttribute('aria-label', 'Відкрити роботу «' + work.title + '»');
    $('.card-badge', col).textContent = work.category;
    setImage($('img', col), work.image, 800, work.title + ' — ' + work.author);
    $('.card-title', col).textContent = work.title;
    $('.card-author', col).innerHTML = '<i class="bi bi-person me-1" aria-hidden="true"></i>';
    $('.card-author', col).append(document.createTextNode(work.author));
    $('.card-category', col).textContent = work.custom ? 'Нова робота' : work.category;

    if (work.custom) {
      const badge = document.createElement('span');
      badge.className = 'card-badge card-badge-new';
      badge.textContent = 'Нове';
      $('.card-media', col).appendChild(badge);
    }

    applyLikeState($('.btn-like', col), work);
    return col;
  }

  function updateFilterCounts() {
    const works = allWorks();
    $$('[data-count]').forEach(span => {
      const key = span.dataset.count;
      span.textContent = key === 'all' ? works.length : works.filter(w => w.category === key).length;
    });
  }

  function updateStats() {
    const works = allWorks();
    els.statWorks.textContent = works.length;
    els.statAuthors.textContent = new Set(works.map(w => w.author.trim().toLowerCase())).size;
    els.statLikes.textContent = works.reduce((sum, w) => sum + likeCount(w), 0);
  }

  function syncFilterButtons() {
    $$('.btn-filter', els.filterBar).forEach(button => {
      const active = button.dataset.filter === state.filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function renderGallery() {
    const query = state.query.trim().toLowerCase();
    const works = allWorks();

    state.visible = works.filter(work => {
      const matchesCategory = state.filter === 'all' || work.category === state.filter;
      const matchesQuery = !query || [work.title, work.author, work.description]
        .some(text => text.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });

    const fragment = document.createDocumentFragment();
    state.visible.forEach((work, index) => fragment.appendChild(createCard(work, index)));
    els.grid.replaceChildren(fragment);

    els.empty.classList.toggle('d-none', state.visible.length > 0);

    let status = 'Показано ' + state.visible.length + ' з ' + works.length + ' робіт';
    if (state.filter !== 'all') status += ' у категорії «' + state.filter + '»';
    if (query) status += ' за запитом «' + state.query.trim() + '»';
    els.status.textContent = status;

    syncFilterButtons();
    updateFilterCounts();
    updateStats();
  }

  function setFilter(filter) {
    state.filter = filter;
    renderGallery();
  }

  /* ==================== Модальне вікно (лайтбокс) ==================== */
  function fillModal(work) {
    state.currentId = work.id;
    setImage(els.modalImage, work.image, 1600, work.title + ' — ' + work.author);
    els.modalTitle.textContent = work.title;
    els.modalAuthor.textContent = work.author;
    els.modalCategory.textContent = work.category;
    els.modalDescription.textContent = work.description;
    els.modalDelete.classList.toggle('d-none', !work.custom);
    applyLikeState(els.modalLike, work);

    const index = state.visible.findIndex(item => item.id === work.id);
    const multiple = state.visible.length > 1;
    els.modalPrev.classList.toggle('d-none', !multiple);
    els.modalNext.classList.toggle('d-none', !multiple);
    els.modalCounter.textContent = index >= 0 ? (index + 1) + ' / ' + state.visible.length : '';
  }

  function openModal(id) {
    const work = findWork(id);
    if (!work) return;
    fillModal(work);
    modalInstance.show();
  }

  function showNeighbor(step) {
    if (state.visible.length < 2) return;
    const index = state.visible.findIndex(item => item.id === state.currentId);
    const nextIndex = (index + step + state.visible.length) % state.visible.length;
    fillModal(state.visible[nextIndex]);
  }

  function deleteCurrentWork() {
    const work = findWork(state.currentId);
    if (!work || !work.custom) return;
    if (!window.confirm('Видалити роботу «' + work.title + '» з галереї?')) return;
    state.custom = state.custom.filter(item => item.id !== work.id);
    state.likedIds.delete(work.id);
    saveCustom();
    saveLikes();
    modalInstance.hide();
    renderGallery();
    showToast('Роботу «' + work.title + '» видалено.', 'secondary');
  }

  /* ==================== Форма додавання ==================== */
  const validators = {
    workTitle(value) {
      if (!value) return 'Введіть назву роботи.';
      if (value.length < 3) return 'Назва має містити щонайменше 3 символи.';
      if (value.length > 60) return 'Назва не може перевищувати 60 символів.';
      return '';
    },
    workAuthor(value) {
      if (!value) return 'Вкажіть автора роботи.';
      if (value.length < 2) return 'Ім’я автора має містити щонайменше 2 символи.';
      if (value.length > 40) return 'Ім’я автора не може перевищувати 40 символів.';
      return '';
    },
    workCategory(value) {
      if (!value) return 'Оберіть категорію зі списку.';
      if (!CATEGORIES.includes(value)) return 'Оберіть коректну категорію.';
      return '';
    },
    workImage(value) {
      if (!value) return 'Вставте посилання на зображення.';
      if (!isValidHttpUrl(value)) return 'Введіть коректне посилання, що починається з http:// або https://';
      return '';
    },
    workDescription(value) {
      if (!value) return 'Додайте опис роботи.';
      if (value.length < 10) return 'Опис має містити щонайменше 10 символів.';
      if (value.length > 400) return 'Опис не може перевищувати 400 символів.';
      return '';
    }
  };

  const formFields = Object.keys(validators).map(id => document.getElementById(id));

  function validateField(field) {
    const message = validators[field.id](field.value.trim());
    field.setCustomValidity(message);
    field.classList.toggle('is-invalid', Boolean(message));
    field.classList.toggle('is-valid', !message);
    const feedback = document.getElementById(field.id + 'Feedback');
    if (feedback) feedback.textContent = message;
    return !message;
  }

  function resetFormUI() {
    formFields.forEach(field => {
      field.classList.remove('is-valid', 'is-invalid');
      field.setCustomValidity('');
    });
    updateDescriptionCounter();
    updatePreview();
  }

  function updateDescriptionCounter() {
    const field = document.getElementById('workDescription');
    els.descCounter.textContent = field.value.length + ' / 400';
  }

  let previewTimer = null;

  function updatePreview() {
    const value = document.getElementById('workImage').value.trim();
    els.previewBox.classList.remove('has-image');
    if (!value) {
      els.previewText.textContent = 'Вставте посилання на фото, щоб побачити перегляд';
      return;
    }
    if (!isValidHttpUrl(value)) {
      els.previewText.textContent = 'Посилання виглядає некоректно';
      return;
    }
    els.previewText.textContent = 'Завантаження зображення…';
    els.previewImg.onload = () => { els.previewBox.classList.add('has-image'); };
    els.previewImg.onerror = () => {
      els.previewBox.classList.remove('has-image');
      els.previewText.textContent = 'Не вдалося завантажити зображення за цим посиланням';
    };
    els.previewImg.src = sizedImage(value, 800);
  }

  function handleSubmit(event) {
    event.preventDefault();

    let firstInvalid = null;
    formFields.forEach(field => {
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      showToast('Перевірте правильність заповнення форми.', 'danger');
      return;
    }

    const work = {
      id: 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: document.getElementById('workTitle').value.trim(),
      author: document.getElementById('workAuthor').value.trim(),
      category: document.getElementById('workCategory').value,
      image: document.getElementById('workImage').value.trim(),
      description: document.getElementById('workDescription').value.trim(),
      likes: 0,
      custom: true
    };

    state.custom.unshift(work);
    const saved = saveCustom();

    els.form.reset();
    resetFormUI();

    state.filter = 'all';
    state.query = '';
    els.search.value = '';
    renderGallery();

    const card = $('.gallery-card[data-id="' + CSS.escape(work.id) + '"]');
    if (card) {
      card.classList.add('is-new');
      setTimeout(() => card.classList.remove('is-new'), 4000);
    }
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth', block: 'start' });

    showToast(saved
      ? 'Роботу «' + work.title + '» додано до галереї!'
      : 'Роботу додано, але браузер не дозволив зберегти її після перезавантаження.',
      saved ? 'success' : 'warning');
  }

  function fillExample() {
    document.getElementById('workTitle').value = 'Місто у променях заходу';
    document.getElementById('workAuthor').value = 'Ілля Дорошенко';
    document.getElementById('workCategory').value = 'Фотографія';
    document.getElementById('workImage').value = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80';
    document.getElementById('workDescription').value = 'Вечірній міський пейзаж, знятий у «золоту годину». Теплі промені підкреслюють архітектуру та створюють атмосферу спокою після робочого дня.';
    formFields.forEach(validateField);
    updateDescriptionCounter();
    updatePreview();
  }

  /* ==================== Обробники подій ==================== */
  els.themeToggle.addEventListener('click', toggleTheme);

  els.filterBar.addEventListener('click', event => {
    const button = event.target.closest('.btn-filter');
    if (button) setFilter(button.dataset.filter);
  });

  els.search.addEventListener('input', () => {
    state.query = els.search.value;
    renderGallery();
  });

  els.resetFilters.addEventListener('click', () => {
    state.filter = 'all';
    state.query = '';
    els.search.value = '';
    renderGallery();
  });

  els.grid.addEventListener('click', event => {
    const card = event.target.closest('.gallery-card');
    if (!card) return;
    const id = card.dataset.id;
    if (event.target.closest('.btn-like')) {
      toggleLike(id);
    } else {
      openModal(id);
    }
  });

  els.modalLike.addEventListener('click', () => { if (state.currentId) toggleLike(state.currentId); });
  els.modalPrev.addEventListener('click', () => showNeighbor(-1));
  els.modalNext.addEventListener('click', () => showNeighbor(1));
  els.modalDelete.addEventListener('click', deleteCurrentWork);

  document.addEventListener('keydown', event => {
    if (!els.modal.classList.contains('show')) return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); showNeighbor(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showNeighbor(1); }
  });

  els.modal.addEventListener('hidden.bs.modal', () => { state.currentId = null; });

  els.form.addEventListener('submit', handleSubmit);
  els.form.addEventListener('reset', () => setTimeout(resetFormUI, 0));
  els.fillExample.addEventListener('click', fillExample);

  formFields.forEach(field => {
    const eventName = field.tagName === 'SELECT' ? 'change' : 'input';
    field.addEventListener(eventName, () => {
      if (field.classList.contains('is-invalid') || field.classList.contains('is-valid')) validateField(field);
    });
    field.addEventListener('blur', () => {
      if (field.value.trim() !== '' || field.classList.contains('is-invalid')) validateField(field);
    });
  });

  document.getElementById('workDescription').addEventListener('input', updateDescriptionCounter);

  document.getElementById('workImage').addEventListener('input', () => {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(updatePreview, 450);
  });

  /* ==================== Ініціалізація ==================== */
  applyTheme(document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light');
  els.year.textContent = new Date().getFullYear();
  renderGallery();
  updateDescriptionCounter();
})();