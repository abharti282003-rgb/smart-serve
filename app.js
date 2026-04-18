// app.js — Smart Serve · Full Featured (Fixed)

// ===== EMOJI MAP =====
const EMOJI_MAP = {
  aata:'🌾',atta:'🌾',flour:'🌾',maida:'🌾',suji:'🌾',semolina:'🌾',
  chawal:'🍚',rice:'🍚',daal:'🫘',dal:'🫘',lentils:'🫘',rajma:'🫘',chana:'🫘',
  besan:'🟡',poha:'🍽️',oats:'🥣',cornflakes:'🥣',
  doodh:'🥛',milk:'🥛',dahi:'🥣',yogurt:'🥣',curd:'🥣',
  paneer:'🧀',ghee:'🧈',butter:'🧈',cheese:'🧀',cream:'🥛',mawa:'🧈',
  aloo:'🥔',potato:'🥔',potatoes:'🥔',
  pyaz:'🧅',onion:'🧅',onions:'🧅',
  tamatar:'🍅',tomato:'🍅',tomatoes:'🍅',
  lahsun:'🧄',garlic:'🧄',adrak:'🫚',ginger:'🫚',
  mirch:'🌶️',chilli:'🌶️',chili:'🌶️',pepper:'🌶️',
  carrot:'🥕',gajar:'🥕',spinach:'🥬',palak:'🥬',
  cabbage:'🥦',gobi:'🥦',cauliflower:'🥦',brinjal:'🍆',baingan:'🍆',
  peas:'🫛',matar:'🫛',corn:'🌽',bhutta:'🌽',lemon:'🍋',nimbu:'🍋',
  apple:'🍎',seb:'🍎',banana:'🍌',kela:'🍌',mango:'🥭',aam:'🥭',
  orange:'🍊',santra:'🍊',grapes:'🍇',angur:'🍇',watermelon:'🍉',
  oil:'🫙',tel:'🫙',namak:'🧂',salt:'🧂',
  sugar:'🍬',cheeni:'🍬',shakkar:'🍬',
  chai:'🍵',tea:'🍵',coffee:'☕',jeera:'🌿',cumin:'🌿',
  haldi:'🟡',turmeric:'🟡',masala:'🌿',dalchini:'🌿',elaichi:'🌿',
  sabun:'🧼',soap:'🧼',shampoo:'🧴',toothpaste:'🦷',
  detergent:'🧹',broom:'🧹',tissue:'🧻',toilet:'🧻',
  matchbox:'🔥',candle:'🕯️',
  water:'💧',paani:'💧',juice:'🧃',biscuit:'🍪',cookie:'🍪',
  chips:'🥔',namkeen:'🫙',bread:'🍞',roti:'🫓',chapati:'🫓',
  noodles:'🍜',pasta:'🍝',maggi:'🍜',
  egg:'🥚',anda:'🥚',eggs:'🥚',chicken:'🍗',murgh:'🍗',fish:'🐟',machli:'🐟',
  mutton:'🥩',meat:'🥩',
};

function getEmoji(name) {
  const key = name.toLowerCase().trim();
  if (EMOJI_MAP[key]) return EMOJI_MAP[key];
  for (const k of Object.keys(EMOJI_MAP)) {
    if (key.includes(k) || k.includes(key)) return EMOJI_MAP[k];
  }
  return '📦';
}

// ===== DEFAULT ITEMS =====
const DEFAULT_ITEMS = [
  { name:'Aata', qty:5, minQty:2, emoji:'🌾' },
  { name:'Doodh', qty:2, minQty:1, emoji:'🥛' },
  { name:'Chawal', qty:3, minQty:2, emoji:'🍚' },
  { name:'Dal', qty:2, minQty:1, emoji:'🫘' },
  { name:'Aloo', qty:8, minQty:3, emoji:'🥔' },
  { name:'Pyaz', qty:6, minQty:3, emoji:'🧅' },
  { name:'Tamatar', qty:4, minQty:2, emoji:'🍅' },
  { name:'Ghee', qty:1, minQty:1, emoji:'🧈' },
  { name:'Namak', qty:1, minQty:1, emoji:'🧂' },
  { name:'Chai', qty:1, minQty:1, emoji:'🍵' },
  { name:'Cheeni', qty:2, minQty:1, emoji:'🍬' },
  { name:'Sabun', qty:2, minQty:1, emoji:'🧼' },
];

// ===== STATE =====
let inventory = [];
let shoppingList = [];
let sortMode = 'name';
let searchQuery = '';
let editingId = null;

// ===== STORAGE =====
function saveState() {
  localStorage.setItem('ss_inventory', JSON.stringify(inventory));
  localStorage.setItem('ss_shopping', JSON.stringify(shoppingList));
}

function loadState() {
  const savedInv = localStorage.getItem('ss_inventory');
  const savedShop = localStorage.getItem('ss_shopping');
  inventory = savedInv ? JSON.parse(savedInv) : DEFAULT_ITEMS.map((item, i) => ({
    id: Date.now() + i,
    name: item.name,
    qty: item.qty,
    minQty: item.minQty || 1,
    emoji: item.emoji,
    addedOn: Date.now(),
  }));
  shoppingList = savedShop ? JSON.parse(savedShop) : [];
}

// ===== TOAST =====
let toastTimer;
function showToast(msg, type = '') {
  let toast = document.getElementById('toast');
  if (!toast) { toast = document.createElement('div'); toast.id = 'toast'; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.className = 'toast show' + (type ? ' toast-' + type : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.className = 'toast', 2200);
}

// ===== STATS =====
function renderStats() {
  const total = inventory.length;
  const low = inventory.filter(i => i.qty > 0 && i.qty <= i.minQty).length;
  const out = shoppingList.length;
  document.getElementById('statTotal').textContent = total;
  document.getElementById('statLow').textContent = low;
  document.getElementById('statOut').textContent = out;
}

// ===== FILTER + SORT =====
function getFilteredInventory() {
  let items = [...inventory];
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    items = items.filter(i => i.name.toLowerCase().includes(q));
  }
  if (sortMode === 'name') items.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortMode === 'qty') items.sort((a, b) => a.qty - b.qty);
  else if (sortMode === 'status') items.sort((a, b) => a.qty - b.qty);
  return items;
}

// ===== RENDER INVENTORY =====
function renderInventory() {
  const list = document.getElementById('inventoryList');
  const empty = document.getElementById('emptyInventory');
  list.innerHTML = '';

  const items = getFilteredInventory();
  if (items.length === 0) { empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');

  items.forEach(item => {
    const isOut = item.qty === 0;
    const isLow = item.qty > 0 && item.qty <= (item.minQty || 1);
    const statusClass = isOut ? 'out-of-stock' : isLow ? 'low-stock' : 'in-stock';
    const statusLabel = isOut ? t('outOfStock') : isLow ? t('lowStock') : t('inStock');

    const card = document.createElement('div');
    card.className = `item-card ${statusClass}`;
    card.dataset.id = item.id;

    if (editingId === item.id) {
      card.innerHTML = `
        <span class="item-emoji">${item.emoji}</span>
        <div class="edit-form">
          <input class="edit-name-input" value="${escapeHtml(item.name)}" id="editName${item.id}" />
          <div class="edit-row">
            <label>${t('qtyLabel')}</label>
            <input type="number" class="edit-qty-input" value="${item.qty}" min="0" id="editQty${item.id}" />
            <label>${t('minQtyLabel')}</label>
            <input type="number" class="edit-min-input" value="${item.minQty||1}" min="1" id="editMin${item.id}" />
          </div>
          <div class="edit-actions">
            <button class="btn-save-edit" onclick="saveEdit(${item.id})">${t('saveEdit')}</button>
            <button class="btn-cancel-edit" onclick="cancelEdit()">${t('cancel')}</button>
          </div>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="card-accent ${statusClass}-accent"></div>
        <span class="item-emoji">${item.emoji}</span>
        <div class="item-info">
          <div class="item-name">${escapeHtml(item.name)}</div>
          <div class="item-status status-${statusClass}">${statusLabel}</div>
        </div>
        <div class="item-controls">
          <button class="btn-qty minus" data-id="${item.id}">−</button>
          <span class="qty-display ${isOut ? 'zero' : isLow ? 'low' : ''}">${item.qty}</span>
          <button class="btn-qty plus" data-id="${item.id}">+</button>
        </div>
        <div class="item-actions">
          <button class="btn-edit" data-id="${item.id}" title="${t('editItem')}">✏️</button>
          <button class="btn-delete" data-id="${item.id}" title="Delete">✕</button>
        </div>
      `;
    }
    list.appendChild(card);
  });
}

// ===== RENDER SHOPPING =====
function renderShoppingList() {
  const list = document.getElementById('shoppingList');
  const empty = document.getElementById('emptyShopping');
  const actions = document.getElementById('shoppingActions');
  const badge = document.getElementById('shoppingBadge');
  list.innerHTML = '';

  const count = shoppingList.length;
  badge.textContent = count;
  badge.style.display = count > 0 ? 'inline-flex' : 'none';

  if (count === 0) {
    empty.classList.remove('hidden');
    actions.classList.add('hidden');
    return;
  }
  empty.classList.add('hidden');
  actions.classList.remove('hidden');

  shoppingList.forEach(item => {
    const card = document.createElement('div');
    card.className = 'shopping-card';
    card.innerHTML = `
      <div class="shopping-pulse"></div>
      <span class="item-emoji">${item.emoji}</span>
      <div class="shopping-info">
        <div class="shopping-name">${escapeHtml(item.name)}</div>
        <div class="shopping-sub">${t('needToBuy')}</div>
      </div>
      <button class="btn-restock" data-id="${item.id}">${t('restock')}</button>
    `;
    list.appendChild(card);
  });
}

// FIX: renderAll now calls applyTranslations so dynamic content is always translated
function renderAll() {
  renderInventory();
  renderShoppingList();
  renderStats();
  applyTranslations(); // ← KEY FIX: re-apply after every render
  saveState();
}

// ===== ITEM ACTIONS =====
function addItemToInventory(name, qty, minQty) {
  name = name.trim();
  if (!name) return;
  qty = parseInt(qty) || 1;
  minQty = parseInt(minQty) || 1;
  const existing = inventory.find(i => i.name.toLowerCase() === name.toLowerCase());
  if (existing) {
    existing.qty += qty;
    shoppingList = shoppingList.filter(s => s.id !== existing.id);
  } else {
    inventory.unshift({ id: Date.now(), name, qty, minQty, emoji: getEmoji(name), addedOn: Date.now() });
  }
  renderAll();
  showToast(t('toastAdded'), 'success');
}

function decreaseQty(id) {
  const item = inventory.find(i => i.id === id);
  if (!item || item.qty <= 0) return;
  item.qty--;
  if (item.qty === 0) {
    if (!shoppingList.find(s => s.id === id)) {
      shoppingList.push({ id: item.id, name: item.name, emoji: item.emoji });
      showToast(t('toastAutoCart'), 'cart');
    }
  }
  renderAll();
}

function increaseQty(id) {
  const item = inventory.find(i => i.id === id);
  if (!item) return;
  item.qty++;
  shoppingList = shoppingList.filter(s => s.id !== id);
  renderAll();
}

function deleteItem(id) {
  inventory = inventory.filter(i => i.id !== id);
  shoppingList = shoppingList.filter(s => s.id !== id);
  renderAll();
  showToast(t('toastRemoved'));
}

function restockItem(id) {
  const shopItem = shoppingList.find(s => s.id === id);
  if (!shopItem) return;
  const invItem = inventory.find(i => i.id === id);
  if (invItem) invItem.qty = Math.max(invItem.minQty || 1, 5);
  shoppingList = shoppingList.filter(s => s.id !== id);
  renderAll();
  showToast(t('toastRestocked'), 'success');
}

function clearShopping() {
  shoppingList = [];
  renderAll();
  showToast(t('toastCleared'));
}

// ===== EDIT =====
function startEdit(id) {
  editingId = id;
  renderInventory();
  const el = document.getElementById('editName' + id);
  if (el) el.focus();
}
function saveEdit(id) {
  const item = inventory.find(i => i.id === id);
  if (!item) return;
  const nameEl = document.getElementById('editName' + id);
  const qtyEl = document.getElementById('editQty' + id);
  const minEl = document.getElementById('editMin' + id);
  if (nameEl) item.name = nameEl.value.trim() || item.name;
  if (qtyEl) item.qty = Math.max(0, parseInt(qtyEl.value) || 0);
  if (minEl) item.minQty = Math.max(1, parseInt(minEl.value) || 1);
  item.emoji = getEmoji(item.name);
  if (item.qty === 0 && !shoppingList.find(s => s.id === id)) {
    shoppingList.push({ id: item.id, name: item.name, emoji: item.emoji });
  } else if (item.qty > 0) {
    shoppingList = shoppingList.filter(s => s.id !== id);
  }
  editingId = null;
  renderAll();
  showToast(t('toastAdded'), 'success');
}
function cancelEdit() {
  editingId = null;
  renderInventory();
}

// ===== WHATSAPP =====
function shareOnWhatsApp() {
  if (shoppingList.length === 0) return;
  const header = `🛒 *${t('shoppingList')} — Smart Serve*\n\n`;
  const items = shoppingList.map((item, i) => `${i+1}. ${item.emoji} ${item.name}`).join('\n');
  const footer = `\n\n_${t('appTitle')}_`;
  window.open('https://wa.me/?text=' + encodeURIComponent(header + items + footer), '_blank');
}

// ===== SORT =====
function setSortMode(mode) {
  sortMode = mode;
  document.querySelectorAll('.sort-btn').forEach(b => b.classList.toggle('active', b.dataset.sort === mode));
  renderInventory();
}

// ===== VOICE =====
function startVoice() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { showToast('Voice only works in Chrome'); return; }
  const lang = LANGUAGES.find(l => l.code === currentLang);
  const rec = new SR();
  rec.lang = lang ? lang.voice : 'hi-IN';
  rec.interimResults = false;
  const btn = document.getElementById('voiceBtn');
  btn.classList.add('listening');
  btn.textContent = '🔴';
  rec.start();
  rec.onresult = e => {
    const spoken = e.results[0][0].transcript;
    document.getElementById('newItemInput').value = spoken;
    btn.classList.remove('listening');
    btn.textContent = '🎤';
    addItemToInventory(spoken, 1, 1);
  };
  rec.onerror = () => { btn.classList.remove('listening'); btn.textContent = '🎤'; };
  rec.onend = () => { btn.classList.remove('listening'); btn.textContent = '🎤'; };
}

// ===== CAMERA SCAN =====
let scanStream = null;
let scanInterval = null;
let pendingScanName = null; // FIX: separate state for scanned name

function openScan() {
  pendingScanName = null;
  document.getElementById('scanModal').classList.remove('hidden');
  // Reset UI
  const addBtn = document.getElementById('scanAddBtn');
  addBtn.disabled = true;
  addBtn.style.opacity = '0.5';
  document.getElementById('scanResult').textContent = '';
  document.getElementById('scanStatus').textContent = t('scanDetecting');
  document.getElementById('scanManualInput').value = '';
  startCamera();
}

function closeScan() {
  stopCamera();
  pendingScanName = null;
  document.getElementById('scanModal').classList.add('hidden');
  document.getElementById('scanResult').textContent = '';
  document.getElementById('scanStatus').textContent = t('scanDetecting');
  const addBtn = document.getElementById('scanAddBtn');
  addBtn.disabled = true;
  addBtn.style.opacity = '0.5';
  document.getElementById('scanManualInput').value = '';
}

async function startCamera() {
  const video = document.getElementById('scanVideo');
  const status = document.getElementById('scanStatus');
  try {
    scanStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = scanStream;
    status.textContent = t('scanDetecting');
    startFrameAnalysis(video);
  } catch (e) {
    status.textContent = '❌ Camera not available. Type item name below.';
  }
}

function stopCamera() {
  if (scanStream) { scanStream.getTracks().forEach(t => t.stop()); scanStream = null; }
  clearInterval(scanInterval);
}

function startFrameAnalysis(video) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let detected = false;

  scanInterval = setInterval(() => {
    if (detected || !video.videoWidth) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    if ('BarcodeDetector' in window) {
      const bd = new BarcodeDetector({ formats: ['ean_13', 'ean_8', 'qr_code', 'code_128', 'upc_a', 'upc_e'] });
      bd.detect(canvas).then(barcodes => {
        if (barcodes.length > 0 && !detected) {
          detected = true;
          lookupBarcode(barcodes[0].rawValue);
        }
      }).catch(() => {});
    }
  }, 800);
}

async function lookupBarcode(code) {
  const status = document.getElementById('scanStatus');
  const result = document.getElementById('scanResult');
  status.textContent = '🔍 Looking up...';

  try {
    const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`);
    const data = await res.json();
    if (data.status === 1 && data.product) {
      const name = data.product.product_name_hi || data.product.product_name || data.product.generic_name || code;
      setScanResult(name, result, status, '✅ Product found!');
      return;
    }
  } catch (e) {}

  setScanResult('Item #' + code, result, status, '📦 Unknown product — edit name after adding');
}

// FIX: Centralized function to set scan result — uses pendingScanName, not data-name
function setScanResult(name, resultEl, statusEl, statusMsg) {
  pendingScanName = name;
  resultEl.textContent = t('scanFound') + name;
  statusEl.textContent = statusMsg;
  const addBtn = document.getElementById('scanAddBtn');
  addBtn.disabled = false;
  addBtn.style.opacity = '1';
}

// FIX: addScannedItem now reads from pendingScanName OR manual input — no data-name conflict
function addScannedItem() {
  const manualInput = document.getElementById('scanManualInput');
  const name = manualInput.value.trim() || pendingScanName;
  if (name) {
    addItemToInventory(name, 1, 1);
    closeScan();
  }
}

// ===== TABS =====
function switchTab(tabName) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
  document.getElementById('tab' + capitalize(tabName)).classList.add('active');
  document.getElementById(tabName + 'Tab').classList.remove('hidden');
  document.getElementById('addBar').style.display = tabName === 'inventory' ? 'flex' : 'none';
  document.getElementById('toolBar').style.display = tabName === 'inventory' ? 'flex' : 'none';
}

// ===== LANGUAGE MODAL =====
function openLangModal() {
  const modal = document.getElementById('langModal');
  const grid = document.getElementById('langGrid');
  grid.innerHTML = '';
  LANGUAGES.forEach(lang => {
    const btn = document.createElement('button');
    btn.className = 'lang-option' + (lang.code === currentLang ? ' active' : '');
    btn.innerHTML = `<strong>${lang.nativeLabel}</strong><small>${lang.label}</small>`;
    btn.onclick = () => {
      setLanguage(lang.code); // setLanguage calls applyTranslations internally
      closeLangModal();
      renderAll();           // re-render all dynamic content with new language
    };
    grid.appendChild(btn);
  });
  modal.classList.remove('hidden');
}
function closeLangModal() { document.getElementById('langModal').classList.add('hidden'); }

// ===== HELPERS =====
function escapeHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ===== PWA INSTALL =====
let deferredInstall = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredInstall = e;
  document.getElementById('installBanner').style.display = 'flex';
});
function installApp() {
  if (!deferredInstall) return;
  deferredInstall.prompt();
  deferredInstall.userChoice.then(() => {
    deferredInstall = null;
    document.getElementById('installBanner').style.display = 'none';
  });
}

// ===== EVENTS =====
function initEvents() {
  document.getElementById('tabInventory').addEventListener('click', () => switchTab('inventory'));
  document.getElementById('tabShopping').addEventListener('click', () => switchTab('shopping'));

  document.getElementById('addItemBtn').addEventListener('click', () => {
    const input = document.getElementById('newItemInput');
    const qty = document.getElementById('newItemQty');
    const min = document.getElementById('newItemMin');
    if (input.value.trim()) {
      addItemToInventory(input.value, qty.value, min.value);
      input.value = '';
      qty.value = 1;
      min.value = 1;
      input.focus();
    }
  });

  document.getElementById('newItemInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('addItemBtn').click();
  });

  document.getElementById('searchInput').addEventListener('input', e => {
    searchQuery = e.target.value;
    renderInventory();
  });

  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => setSortMode(btn.dataset.sort));
  });

  document.getElementById('inventoryList').addEventListener('click', e => {
    const id = parseInt(e.target.dataset.id || e.target.closest('[data-id]')?.dataset.id);
    if (!id) return;
    if (e.target.classList.contains('minus')) decreaseQty(id);
    else if (e.target.classList.contains('plus')) increaseQty(id);
    else if (e.target.classList.contains('btn-delete')) deleteItem(id);
    else if (e.target.classList.contains('btn-edit')) startEdit(id);
  });

  document.getElementById('shoppingList').addEventListener('click', e => {
    const id = parseInt(e.target.dataset.id);
    if (id && e.target.classList.contains('btn-restock')) restockItem(id);
  });

  document.getElementById('whatsappBtn').addEventListener('click', shareOnWhatsApp);
  document.getElementById('clearShoppingBtn').addEventListener('click', clearShopping);
  document.getElementById('langBtn').addEventListener('click', openLangModal);
  document.getElementById('closeLangModal').addEventListener('click', closeLangModal);
  document.getElementById('langModal').addEventListener('click', e => {
    if (e.target === document.getElementById('langModal')) closeLangModal();
  });
  document.getElementById('scanBtn').addEventListener('click', openScan);
  document.getElementById('closeScanModal').addEventListener('click', closeScan);

  // FIX: scanAddBtn — single clean listener, no data-name conflict
  document.getElementById('scanAddBtn').addEventListener('click', addScannedItem);

  // FIX: Manual scan input — updates pendingScanName, enables add button
  document.getElementById('scanManualInput').addEventListener('input', function() {
    const addBtn = document.getElementById('scanAddBtn');
    if (this.value.trim()) {
      pendingScanName = this.value.trim();
      addBtn.disabled = false;
      addBtn.style.opacity = '1';
    } else if (!pendingScanName) {
      addBtn.disabled = true;
      addBtn.style.opacity = '0.5';
    }
  });

  document.getElementById('scanManualInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && this.value.trim()) addScannedItem();
  });

  document.getElementById('voiceBtn').addEventListener('click', startVoice);
  document.getElementById('installBtn').addEventListener('click', installApp);
}

// ===== INIT =====
function init() {
  loadState();
  applyTranslations(); // Apply saved language on startup
  initEvents();
  renderAll();
}

document.addEventListener('DOMContentLoaded', init);