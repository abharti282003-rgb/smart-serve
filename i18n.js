// i18n.js — Smart Serve · 11 Indian Languages + New Keys

const LANGUAGES = [
  { code: 'en', label: 'English',   nativeLabel: 'English',   voice: 'en-IN'  },
  { code: 'hi', label: 'Hindi',     nativeLabel: 'हिन्दी',    voice: 'hi-IN'  },
  { code: 'pa', label: 'Punjabi',   nativeLabel: 'ਪੰਜਾਬੀ',   voice: 'pa-IN'  },
  { code: 'ta', label: 'Tamil',     nativeLabel: 'தமிழ்',     voice: 'ta-IN'  },
  { code: 'te', label: 'Telugu',    nativeLabel: 'తెలుగు',    voice: 'te-IN'  },
  { code: 'kn', label: 'Kannada',   nativeLabel: 'ಕನ್ನಡ',    voice: 'kn-IN'  },
  { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം',   voice: 'ml-IN'  },
  { code: 'mr', label: 'Marathi',   nativeLabel: 'मराठी',     voice: 'mr-IN'  },
  { code: 'gu', label: 'Gujarati',  nativeLabel: 'ગુજરાતી',  voice: 'gu-IN'  },
  { code: 'bn', label: 'Bengali',   nativeLabel: 'বাংলা',     voice: 'bn-IN'  },
  { code: 'or', label: 'Odia',      nativeLabel: 'ଓଡ଼ିଆ',    voice: 'or-IN'  },
];

const TRANSLATIONS = {
  en: {
    appTitle:'Smart Serve', appSub:'Home Inventory',
    inventory:'Inventory', shoppingList:'Shopping',
    addItemPlaceholder:'Type item name...', qtyLabel:'Qty',
    inventoryEmpty:'No items yet. Add your first item above!',
    shoppingEmpty:'All stocked up! Nothing to buy.',
    selectLanguage:'Choose Language', shareWhatsApp:'Share via WhatsApp',
    clearAll:'Clear All', restock:'Restock',
    inStock:'In Stock', lowStock:'Running Low', outOfStock:'Out of Stock',
    needToBuy:'Need to buy',
    toastAdded:'✓ Item added', toastRemoved:'✓ Item removed',
    toastRestocked:'✓ Restocked!', toastCleared:'✓ List cleared',
    toastAutoCart:'🛒 Added to shopping list',
    scanBtn:'Scan', voiceBtn:'Voice',
    scanTitle:'Scan Product', scanSub:'Point camera at item or barcode',
    scanClose:'Close', scanDetecting:'Detecting...',
    scanFound:'Found: ', addToInventory:'Add',
    scanManualPlaceholder:'Or type name here...',
    sortBy:'Sort', sortName:'Name', sortQty:'Quantity', sortStatus:'Status',
    searchPlaceholder:'Search items...',
    statsTotal:'Total Items', statsLow:'Low Stock', statsOut:'Need to Buy',
    minQtyLabel:'Min Qty', editItem:'Edit', saveEdit:'Save', cancel:'Cancel',
    // Profile/Login
    welcomeTitle:'Welcome to Smart Serve',
    welcomeSub:'Select your profile to continue',
    createProfile:'Create Profile',
    enterPin:'Enter PIN',
    pinLabel:'4-digit PIN',
    profileName:'Your Name',
    profileEmoji:'Choose Avatar',
    createBtn:'Create',
    logoutBtn:'Switch Profile',
    // Budget
    budgetTab:'Budget',
    addExpense:'Add Expense',
    expenseItem:'Item Name',
    expenseAmt:'Amount (₹)',
    expenseDate:'Date',
    expenseCategory:'Category',
    totalSpent:'Total Spent',
    monthlyBudget:'Monthly Budget',
    setBudget:'Set Budget',
    budgetLeft:'Budget Left',
    catGrocery:'Grocery', catVeg:'Vegetables', catDairy:'Dairy',
    catCleaning:'Cleaning', catOther:'Other',
    // Expiry
    expiryTab:'Expiry',
    addExpiry:'Add Expiry Item',
    expiryName:'Item Name',
    expiryDate:'Expiry Date',
    daysLeft:'days left',
    expired:'EXPIRED',
    expiresSoon:'Expires Soon',
    // Reports
    reportsTab:'Reports',
    monthlyReport:'Monthly Report',
    totalItems:'Total Items',
    lowStockItems:'Low Stock',
    expiredItems:'Expired Items',
    topSpending:'Top Spending',
  },
  hi: {
    appTitle:'स्मार्ट सर्व', appSub:'घर का सामान',
    inventory:'सामान', shoppingList:'खरीदारी',
    addItemPlaceholder:'सामान का नाम लिखें...', qtyLabel:'मात्रा',
    inventoryEmpty:'कोई सामान नहीं। ऊपर जोड़ें!',
    shoppingEmpty:'सब कुछ भरपूर है!',
    selectLanguage:'भाषा चुनें', shareWhatsApp:'WhatsApp पर भेजें',
    clearAll:'सब हटाएं', restock:'वापस लाएं',
    inStock:'उपलब्ध', lowStock:'कम है', outOfStock:'खत्म',
    needToBuy:'खरीदना है',
    toastAdded:'✓ जोड़ा गया', toastRemoved:'✓ हटाया गया',
    toastRestocked:'✓ वापस आया!', toastCleared:'✓ सूची साफ़',
    toastAutoCart:'🛒 खरीदारी सूची में जोड़ा',
    scanBtn:'स्कैन', voiceBtn:'आवाज़',
    scanTitle:'सामान स्कैन करें', scanSub:'कैमरा सामान या बारकोड पर लगाएं',
    scanClose:'बंद करें', scanDetecting:'पहचान रहा है...',
    scanFound:'मिला: ', addToInventory:'जोड़ें',
    scanManualPlaceholder:'या यहाँ नाम लिखें...',
    sortBy:'क्रम', sortName:'नाम', sortQty:'मात्रा', sortStatus:'स्थिति',
    searchPlaceholder:'खोजें...',
    statsTotal:'कुल सामान', statsLow:'कम स्टॉक', statsOut:'खरीदना है',
    minQtyLabel:'न्यूनतम', editItem:'बदलें', saveEdit:'सेव करें', cancel:'रद्द करें',
    welcomeTitle:'Smart Serve में आपका स्वागत है',
    welcomeSub:'जारी रखने के लिए अपनी प्रोफ़ाइल चुनें',
    createProfile:'नई प्रोफ़ाइल बनाएं',
    enterPin:'PIN डालें',
    pinLabel:'4 अंकों का PIN',
    profileName:'आपका नाम',
    profileEmoji:'अवतार चुनें',
    createBtn:'बनाएं',
    logoutBtn:'प्रोफ़ाइल बदलें',
    budgetTab:'बजट',
    addExpense:'खर्च जोड़ें',
    expenseItem:'सामान का नाम',
    expenseAmt:'राशि (₹)',
    expenseDate:'तारीख',
    expenseCategory:'श्रेणी',
    totalSpent:'कुल खर्च',
    monthlyBudget:'मासिक बजट',
    setBudget:'बजट सेट करें',
    budgetLeft:'बचा हुआ',
    catGrocery:'किराना', catVeg:'सब्जी', catDairy:'दूध-दही',
    catCleaning:'सफाई', catOther:'अन्य',
    expiryTab:'एक्सपायरी',
    addExpiry:'एक्सपायरी आइटम जोड़ें',
    expiryName:'सामान का नाम',
    expiryDate:'एक्सपायरी तारीख',
    daysLeft:'दिन बचे',
    expired:'खत्म हो गया',
    expiresSoon:'जल्द खत्म होगा',
    reportsTab:'रिपोर्ट',
    monthlyReport:'मासिक रिपोर्ट',
    totalItems:'कुल सामान',
    lowStockItems:'कम स्टॉक',
    expiredItems:'खत्म हो गए',
    topSpending:'सबसे ज़्यादा खर्च',
  },
  pa: {
    appTitle:'ਸਮਾਰਟ ਸਰਵ', appSub:'ਘਰ ਦਾ ਸਾਮਾਨ',
    inventory:'ਸਾਮਾਨ', shoppingList:'ਖਰੀਦਾਰੀ',
    addItemPlaceholder:'ਸਾਮਾਨ ਦਾ ਨਾਮ ਲਿਖੋ...', qtyLabel:'ਮਾਤਰਾ',
    inventoryEmpty:'ਕੋਈ ਸਾਮਾਨ ਨਹੀਂ। ਉੱਪਰ ਜੋੜੋ!',
    shoppingEmpty:'ਸਭ ਕੁਝ ਭਰਿਆ ਹੈ!',
    selectLanguage:'ਭਾਸ਼ਾ ਚੁਣੋ', shareWhatsApp:'WhatsApp ਤੇ ਭੇਜੋ',
    clearAll:'ਸਭ ਹਟਾਓ', restock:'ਵਾਪਸ ਲਿਆਓ',
    inStock:'ਉਪਲਬਧ', lowStock:'ਘੱਟ ਹੈ', outOfStock:'ਖਤਮ',
    needToBuy:'ਖਰੀਦਣਾ ਹੈ',
    toastAdded:'✓ ਜੋੜਿਆ', toastRemoved:'✓ ਹਟਾਇਆ',
    toastRestocked:'✓ ਵਾਪਸ ਆਇਆ!', toastCleared:'✓ ਸੂਚੀ ਸਾਫ਼',
    toastAutoCart:'🛒 ਖਰੀਦਾਰੀ ਸੂਚੀ ਵਿੱਚ ਜੋੜਿਆ',
    scanBtn:'ਸਕੈਨ', voiceBtn:'ਆਵਾਜ਼',
    scanTitle:'ਸਾਮਾਨ ਸਕੈਨ', scanSub:'ਕੈਮਰਾ ਸਾਮਾਨ ਜਾਂ ਬਾਰਕੋਡ ਤੇ ਲਗਾਓ',
    scanClose:'ਬੰਦ', scanDetecting:'ਪਛਾਣ ਰਿਹਾ...',
    scanFound:'ਮਿਲਿਆ: ', addToInventory:'ਜੋੜੋ',
    scanManualPlaceholder:'ਜਾਂ ਇੱਥੇ ਨਾਮ ਲਿਖੋ...',
    sortBy:'ਕ੍ਰਮ', sortName:'ਨਾਮ', sortQty:'ਮਾਤਰਾ', sortStatus:'ਸਥਿਤੀ',
    searchPlaceholder:'ਖੋਜੋ...',
    statsTotal:'ਕੁੱਲ ਸਾਮਾਨ', statsLow:'ਘੱਟ ਸਟਾਕ', statsOut:'ਖਰੀਦਣਾ ਹੈ',
    minQtyLabel:'ਘੱਟੋ ਘੱਟ', editItem:'ਬਦਲੋ', saveEdit:'ਸੇਵ', cancel:'ਰੱਦ',
    welcomeTitle:'Smart Serve ਵਿੱਚ ਸੁਆਗਤ ਹੈ',
    welcomeSub:'ਜਾਰੀ ਰੱਖਣ ਲਈ ਪ੍ਰੋਫ਼ਾਈਲ ਚੁਣੋ',
    createProfile:'ਨਵੀਂ ਪ੍ਰੋਫ਼ਾਈਲ ਬਣਾਓ',
    enterPin:'PIN ਦਾਖਲ ਕਰੋ', pinLabel:'4 ਅੰਕ PIN',
    profileName:'ਤੁਹਾਡਾ ਨਾਮ', profileEmoji:'ਅਵਤਾਰ ਚੁਣੋ',
    createBtn:'ਬਣਾਓ', logoutBtn:'ਪ੍ਰੋਫ਼ਾਈਲ ਬਦਲੋ',
    budgetTab:'ਬਜਟ', addExpense:'ਖਰਚ ਜੋੜੋ',
    expenseItem:'ਸਾਮਾਨ ਦਾ ਨਾਮ', expenseAmt:'ਰਾਸ਼ੀ (₹)',
    expenseDate:'ਤਾਰੀਖ', expenseCategory:'ਸ਼੍ਰੇਣੀ',
    totalSpent:'ਕੁੱਲ ਖਰਚ', monthlyBudget:'ਮਾਸਿਕ ਬਜਟ',
    setBudget:'ਬਜਟ ਸੈੱਟ ਕਰੋ', budgetLeft:'ਬਚਿਆ ਹੋਇਆ',
    catGrocery:'ਕਿਰਾਨਾ', catVeg:'ਸਬਜ਼ੀ', catDairy:'ਦੁੱਧ',
    catCleaning:'ਸਫਾਈ', catOther:'ਹੋਰ',
    expiryTab:'ਮਿਆਦ', addExpiry:'ਮਿਆਦ ਆਈਟਮ ਜੋੜੋ',
    expiryName:'ਸਾਮਾਨ ਦਾ ਨਾਮ', expiryDate:'ਮਿਆਦ ਤਾਰੀਖ',
    daysLeft:'ਦਿਨ ਬਚੇ', expired:'ਖਤਮ ਹੋ ਗਿਆ', expiresSoon:'ਜਲਦੀ ਖਤਮ',
    reportsTab:'ਰਿਪੋਰਟ', monthlyReport:'ਮਾਸਿਕ ਰਿਪੋਰਟ',
    totalItems:'ਕੁੱਲ ਸਾਮਾਨ', lowStockItems:'ਘੱਟ ਸਟਾਕ',
    expiredItems:'ਖਤਮ ਹੋਏ', topSpending:'ਸਭ ਤੋਂ ਵੱਧ ਖਰਚ',
  },
};

// Fill missing langs with English fallback
['ta','te','kn','ml','mr','gu','bn','or'].forEach(code => {
  TRANSLATIONS[code] = { ...TRANSLATIONS['en'] };
});

let currentLang = localStorage.getItem('ss_lang') || 'hi';

function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key])
    || TRANSLATIONS['en'][key] || key;
}

function setLanguage(code) {
  currentLang = code;
  localStorage.setItem('ss_lang', code);
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (el.id === 'scanAddBtn') return;
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  const lang = LANGUAGES.find(l => l.code === currentLang);
  if (lang) {
    const lbl = document.getElementById('langLabel');
    if (lbl) lbl.textContent = lang.nativeLabel;
  }
  document.documentElement.lang = currentLang;
}