// i18n.js — Smart Serve · Fixed Edition
// Default language: English. All dynamic strings go through t().

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
    shoppingEmpty:'All stocked up! Nothing to buy. 🎉',
    selectLanguage:'Choose Language', shareWhatsApp:'Share via WhatsApp',
    clearAll:'Clear All', restock:'Restock',
    inStock:'In Stock', lowStock:'Running Low', outOfStock:'Out of Stock',
    needToBuy:'Need to buy',
    toastAdded:'✓ Item added', toastRemoved:'✓ Item removed',
    toastRestocked:'✓ Restocked!', toastCleared:'✓ List cleared',
    toastAutoCart:'🛒 Added to shopping list',
    scanBtn:'Scan', voiceBtn:'Voice',
    scanTitle:'Scan / Photo', scanSub:'Point camera or take photo',
    scanClose:'Close', scanDetecting:'Detecting...',
    scanFound:'Found: ', addToInventory:'Add to Inventory',
    scanManualPlaceholder:'Or type name here...',
    sortBy:'Sort', sortName:'Name', sortQty:'Quantity', sortStatus:'Status',
    searchPlaceholder:'Search items...',
    statsTotal:'Total Items', statsLow:'Low Stock', statsOut:'Need to Buy',
    minQtyLabel:'Min Qty', editItem:'Edit', saveEdit:'Save', cancel:'Cancel',
    unitPcs:'Pcs', unitKg:'Kg', unitLtr:'Ltr', unitGm:'Gm', unitPkt:'Pkt',
    unitLabel:'Unit',
    welcomeTitle:'Welcome to Smart Serve',
    welcomeSub:'Select your profile to continue',
    createProfile:'Create Profile',
    enterPin:'Enter PIN',
    pinLabel:'4-digit PIN',
    profileName:'Your Name',
    profileEmoji:'Choose Avatar',
    createBtn:'Create',
    logoutBtn:'Switch Profile',
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
    expiryTab:'Expiry',
    addExpiry:'Add Expiry Item',
    expiryName:'Item Name',
    expiryDate:'Expiry Date',
    daysLeft:'days left',
    expired:'EXPIRED',
    expiresSoon:'Expires Soon',
    reportsTab:'Reports',
    monthlyReport:'Monthly Report',
    totalItems:'Total Items',
    lowStockItems:'Low Stock',
    expiredItems:'Expired Items',
    topSpending:'Top Spending',
    familyTab:'Family',
    familyShare:'Share with Family',
    installApp:'Install App',
    voiceHelp:'Voice Commands',
    voiceHelpText:'Say item name to add it instantly',
    photoCapture:'📸 Take Photo',
    cameraCapture:'📷 Open Camera',
    shareLink:'Share App Link',
    installGuide:'Install Guide',
    // Budget page strings
    budgetSetPlaceholder:'₹ Monthly budget...',
    expenseNamePlaceholder:'Item name...',
    expenseAmtPlaceholder:'₹ Amount',
    catBreakdownTitle:'Category Breakdown',
    thisMonth:'This Month',
    noBudgetData:'No expenses this month',
    noCatData:'No expenses yet',
    // Expiry strings
    expiryNamePlaceholder:'Item name...',
    // Profile strings
    profileNamePlaceholder:'Enter your name...',
    profilePinPlaceholder:'•••• (Optional)',
    atLeastOneProfile:'At least one profile is needed!',
    deleteProfileConfirm:'Delete this profile?',
    profileDeleted:'Profile deleted',
    profileCreated:'✓ Profile created!',
    nameRequired:'Name is required!',
    pinFourDigits:'PIN must be 4 digits!',
    wrongPin:'❌ Wrong PIN!',
    // Voice
    voiceChromeOnly:'Voice works only in Chrome',
    voicePrompt:'🎤 Say the item name...',
    // Scan
    cameraReady:'📷 Camera ready — Show barcode or product',
    cameraError:'❌ Camera not available — upload a photo below',
    lookingUp:'🔍 Looking up product…',
    unknownProduct:'📦 Unknown — please edit the name',
    // Actions
    confirm:'Confirm',
    switchProfile:'Switch Profile',
    // Install
    installPrompt:'📱 Install Smart Serve!',
    installFallback:'Install via your browser — check the steps above',
    installing:'✓ App is installing!',
    // Sharing
    linkCopied:'✓ Link copied!',
    linkCopyFail:'Link not copied',
    // Reports
    noExpenses:'No expenses',
    spent:'spent',
    budget:'Budget',
    // Units
    unitLabelPcs:'pcs',
    unitLabelKg:'kg',
    unitLabelLtr:'L',
    unitLabelGm:'g',
    unitLabelPkt:'pkt',
  },

  hi: {
    appTitle:'स्मार्ट सर्व', appSub:'घर का सामान',
    inventory:'सामान', shoppingList:'खरीदारी',
    addItemPlaceholder:'सामान का नाम लिखें...', qtyLabel:'मात्रा',
    inventoryEmpty:'कोई सामान नहीं। ऊपर जोड़ें!',
    shoppingEmpty:'सब कुछ भरपूर है! 🎉',
    selectLanguage:'भाषा चुनें', shareWhatsApp:'WhatsApp पर भेजें',
    clearAll:'सब हटाएं', restock:'वापस लाएं',
    inStock:'उपलब्ध', lowStock:'कम है', outOfStock:'खत्म',
    needToBuy:'खरीदना है',
    toastAdded:'✓ जोड़ा गया', toastRemoved:'✓ हटाया गया',
    toastRestocked:'✓ वापस आया!', toastCleared:'✓ सूची साफ़',
    toastAutoCart:'🛒 खरीदारी सूची में जोड़ा',
    scanBtn:'स्कैन', voiceBtn:'आवाज़',
    scanTitle:'स्कैन / फोटो', scanSub:'कैमरा लगाएं या फोटो खींचें',
    scanClose:'बंद करें', scanDetecting:'पहचान रहा है...',
    scanFound:'मिला: ', addToInventory:'सामान में जोड़ें',
    scanManualPlaceholder:'या यहाँ नाम लिखें...',
    sortBy:'क्रम', sortName:'नाम', sortQty:'मात्रा', sortStatus:'स्थिति',
    searchPlaceholder:'खोजें...',
    statsTotal:'कुल सामान', statsLow:'कम स्टॉक', statsOut:'खरीदना है',
    minQtyLabel:'न्यूनतम', editItem:'बदलें', saveEdit:'सेव करें', cancel:'रद्द करें',
    unitPcs:'पीस', unitKg:'किलो', unitLtr:'लीटर', unitGm:'ग्राम', unitPkt:'पैकेट',
    unitLabel:'इकाई',
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
    familyTab:'परिवार',
    familyShare:'परिवार के साथ शेयर करें',
    installApp:'ऐप इंस्टॉल करें',
    voiceHelp:'आवाज़ से जोड़ें',
    voiceHelpText:'सामान का नाम बोलें, तुरंत जुड़ जाएगा',
    photoCapture:'📸 फोटो खींचें',
    cameraCapture:'📷 कैमरा खोलें',
    shareLink:'ऐप लिंक शेयर करें',
    installGuide:'इंस्टॉल करें',
    budgetSetPlaceholder:'₹ मासिक बजट...',
    expenseNamePlaceholder:'सामान का नाम...',
    expenseAmtPlaceholder:'₹ राशि',
    catBreakdownTitle:'श्रेणी विवरण',
    thisMonth:'इस महीने',
    noBudgetData:'इस महीने कोई खर्च नहीं',
    noCatData:'अभी कोई खर्च नहीं',
    expiryNamePlaceholder:'सामान का नाम...',
    profileNamePlaceholder:'नाम लिखें...',
    profilePinPlaceholder:'•••• (छोड़ सकते हैं)',
    atLeastOneProfile:'कम से कम एक प्रोफ़ाइल ज़रूरी है!',
    deleteProfileConfirm:'इस प्रोफ़ाइल को हटाएं?',
    profileDeleted:'प्रोफ़ाइल हटा दी',
    profileCreated:'✓ प्रोफ़ाइल बना दी!',
    nameRequired:'नाम लिखना ज़रूरी है!',
    pinFourDigits:'PIN 4 नंबर का होना चाहिए!',
    wrongPin:'❌ गलत PIN!',
    voiceChromeOnly:'आवाज़ सिर्फ Chrome में काम करती है',
    voicePrompt:'🎤 सामान का नाम बोलें...',
    cameraReady:'📷 कैमरा तैयार — बारकोड या प्रोडक्ट दिखाएं',
    cameraError:'❌ कैमरा नहीं मिला — नीचे फोटो अपलोड करें',
    lookingUp:'🔍 प्रोडक्ट खोज रहा है…',
    unknownProduct:'📦 अज्ञात — नाम बदलें',
    confirm:'पुष्टि करें',
    switchProfile:'प्रोफ़ाइल बदलें',
    installPrompt:'📱 Smart Serve इंस्टॉल करें!',
    installFallback:'ब्राउज़र से इंस्टॉल करें — ऊपर के स्टेप्स देखें',
    installing:'✓ ऐप इंस्टॉल हो रही है!',
    linkCopied:'✓ लिंक कॉपी हुआ!',
    linkCopyFail:'लिंक कॉपी नहीं हुआ',
    noExpenses:'कोई खर्च नहीं',
    spent:'खर्च हुआ',
    budget:'बजट',
    unitLabelPcs:'पीस',
    unitLabelKg:'किलो',
    unitLabelLtr:'लीटर',
    unitLabelGm:'ग्राम',
    unitLabelPkt:'पैकेट',
  },

  pa: {
    appTitle:'ਸਮਾਰਟ ਸਰਵ', appSub:'ਘਰ ਦਾ ਸਾਮਾਨ',
    inventory:'ਸਾਮਾਨ', shoppingList:'ਖਰੀਦਾਰੀ',
    addItemPlaceholder:'ਸਾਮਾਨ ਦਾ ਨਾਮ ਲਿਖੋ...', qtyLabel:'ਮਾਤਰਾ',
    inventoryEmpty:'ਕੋਈ ਸਾਮਾਨ ਨਹੀਂ। ਉੱਪਰ ਜੋੜੋ!',
    shoppingEmpty:'ਸਭ ਕੁਝ ਭਰਿਆ ਹੈ! 🎉',
    selectLanguage:'ਭਾਸ਼ਾ ਚੁਣੋ', shareWhatsApp:'WhatsApp ਤੇ ਭੇਜੋ',
    clearAll:'ਸਭ ਹਟਾਓ', restock:'ਵਾਪਸ ਲਿਆਓ',
    inStock:'ਉਪਲਬਧ', lowStock:'ਘੱਟ ਹੈ', outOfStock:'ਖਤਮ',
    needToBuy:'ਖਰੀਦਣਾ ਹੈ',
    toastAdded:'✓ ਜੋੜਿਆ', toastRemoved:'✓ ਹਟਾਇਆ',
    toastRestocked:'✓ ਵਾਪਸ ਆਇਆ!', toastCleared:'✓ ਸੂਚੀ ਸਾਫ਼',
    toastAutoCart:'🛒 ਖਰੀਦਾਰੀ ਸੂਚੀ ਵਿੱਚ ਜੋੜਿਆ',
    scanBtn:'ਸਕੈਨ', voiceBtn:'ਆਵਾਜ਼',
    scanTitle:'ਸਕੈਨ / ਫੋਟੋ', scanSub:'ਕੈਮਰਾ ਲਗਾਓ ਜਾਂ ਫੋਟੋ ਲਓ',
    scanClose:'ਬੰਦ', scanDetecting:'ਪਛਾਣ ਰਿਹਾ...',
    scanFound:'ਮਿਲਿਆ: ', addToInventory:'ਸਾਮਾਨ ਵਿੱਚ ਜੋੜੋ',
    scanManualPlaceholder:'ਜਾਂ ਇੱਥੇ ਨਾਮ ਲਿਖੋ...',
    sortBy:'ਕ੍ਰਮ', sortName:'ਨਾਮ', sortQty:'ਮਾਤਰਾ', sortStatus:'ਸਥਿਤੀ',
    searchPlaceholder:'ਖੋਜੋ...',
    statsTotal:'ਕੁੱਲ ਸਾਮਾਨ', statsLow:'ਘੱਟ ਸਟਾਕ', statsOut:'ਖਰੀਦਣਾ ਹੈ',
    minQtyLabel:'ਘੱਟੋ ਘੱਟ', editItem:'ਬਦਲੋ', saveEdit:'ਸੇਵ', cancel:'ਰੱਦ',
    unitPcs:'ਪੀਸ', unitKg:'ਕਿਲੋ', unitLtr:'ਲੀਟਰ', unitGm:'ਗ੍ਰਾਮ', unitPkt:'ਪੈਕੇਟ',
    unitLabel:'ਇਕਾਈ',
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
    familyTab:'ਪਰਿਵਾਰ', familyShare:'ਪਰਿਵਾਰ ਨਾਲ ਸਾਂਝਾ ਕਰੋ',
    installApp:'ਐਪ ਇੰਸਟਾਲ ਕਰੋ', voiceHelp:'ਆਵਾਜ਼ ਨਾਲ ਜੋੜੋ',
    voiceHelpText:'ਸਾਮਾਨ ਦਾ ਨਾਮ ਬੋਲੋ', photoCapture:'📸 ਫੋਟੋ ਲਓ',
    cameraCapture:'📷 ਕੈਮਰਾ ਖੋਲੋ', shareLink:'ਲਿੰਕ ਸਾਂਝਾ ਕਰੋ', installGuide:'ਇੰਸਟਾਲ ਕਰੋ',
    budgetSetPlaceholder:'₹ ਮਾਸਿਕ ਬਜਟ...', expenseNamePlaceholder:'ਸਾਮਾਨ ਦਾ ਨਾਮ...',
    expenseAmtPlaceholder:'₹ ਰਾਸ਼ੀ', catBreakdownTitle:'ਸ਼੍ਰੇਣੀ ਵੇਰਵਾ',
    thisMonth:'ਇਸ ਮਹੀਨੇ', noBudgetData:'ਇਸ ਮਹੀਨੇ ਕੋਈ ਖਰਚ ਨਹੀਂ', noCatData:'ਅਜੇ ਕੋਈ ਖਰਚ ਨਹੀਂ',
    expiryNamePlaceholder:'ਸਾਮਾਨ ਦਾ ਨਾਮ...', profileNamePlaceholder:'ਨਾਮ ਲਿਖੋ...',
    profilePinPlaceholder:'•••• (ਛੱਡ ਸਕਦੇ ਹੋ)',
    atLeastOneProfile:'ਘੱਟੋ ਘੱਟ ਇੱਕ ਪ੍ਰੋਫ਼ਾਈਲ ਚਾਹੀਦੀ ਹੈ!',
    deleteProfileConfirm:'ਇਹ ਪ੍ਰੋਫ਼ਾਈਲ ਮਿਟਾਓ?',
    profileDeleted:'ਪ੍ਰੋਫ਼ਾਈਲ ਮਿਟਾਈ', profileCreated:'✓ ਪ੍ਰੋਫ਼ਾਈਲ ਬਣਾਈ!',
    nameRequired:'ਨਾਮ ਲਿਖਣਾ ਜ਼ਰੂਰੀ ਹੈ!', pinFourDigits:'PIN 4 ਨੰਬਰ ਦਾ ਹੋਣਾ ਚਾਹੀਦਾ!',
    wrongPin:'❌ ਗਲਤ PIN!', voiceChromeOnly:'ਆਵਾਜ਼ ਸਿਰਫ਼ Chrome ਵਿੱਚ ਕੰਮ ਕਰਦੀ ਹੈ',
    voicePrompt:'🎤 ਸਾਮਾਨ ਦਾ ਨਾਮ ਬੋਲੋ...', cameraReady:'📷 ਕੈਮਰਾ ਤਿਆਰ — ਬਾਰਕੋਡ ਦਿਖਾਓ',
    cameraError:'❌ ਕੈਮਰਾ ਨਹੀਂ ਮਿਲਿਆ', lookingUp:'🔍 ਪ੍ਰੋਡਕਟ ਲੱਭ ਰਿਹਾ ਹੈ…',
    unknownProduct:'📦 ਅਣਜਾਣ — ਨਾਮ ਬਦਲੋ', confirm:'ਪੁਸ਼ਟੀ ਕਰੋ', switchProfile:'ਪ੍ਰੋਫ਼ਾਈਲ ਬਦਲੋ',
    installPrompt:'📱 Smart Serve ਇੰਸਟਾਲ ਕਰੋ!', installFallback:'ਬ੍ਰਾਊਜ਼ਰ ਤੋਂ ਇੰਸਟਾਲ ਕਰੋ',
    installing:'✓ ਐਪ ਇੰਸਟਾਲ ਹੋ ਰਹੀ ਹੈ!', linkCopied:'✓ ਲਿੰਕ ਕਾਪੀ ਹੋਇਆ!',
    linkCopyFail:'ਲਿੰਕ ਕਾਪੀ ਨਹੀਂ ਹੋਇਆ', noExpenses:'ਕੋਈ ਖਰਚ ਨਹੀਂ',
    spent:'ਖਰਚ ਹੋਇਆ', budget:'ਬਜਟ',
    unitLabelPcs:'ਪੀਸ', unitLabelKg:'ਕਿਲੋ', unitLabelLtr:'ਲੀਟਰ', unitLabelGm:'ਗ੍ਰਾਮ', unitLabelPkt:'ਪੈਕੇਟ',
  },
};

// Fill missing language codes with English as fallback
['ta','te','kn','ml','mr','gu','bn','or'].forEach(code => {
  TRANSLATIONS[code] = { ...TRANSLATIONS['en'] };
});

// DEFAULT IS ENGLISH — change to 'hi' for Hindi default
let currentLang = localStorage.getItem('ss_lang') || 'en';

function t(key) {
  const lang = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];
  return lang[key] || TRANSLATIONS['en'][key] || key;
}

function setLanguage(code) {
  currentLang = code;
  localStorage.setItem('ss_lang', code);
  document.documentElement.lang = code;
  applyTranslations();
  // Re-render everything after language change
  if (typeof renderAll === 'function') renderAll();
  // Also re-render active tab-specific content
  if (typeof activeTab !== 'undefined') {
    if (activeTab === 'budget' && typeof renderBudget === 'function') renderBudget();
    if (activeTab === 'expiry' && typeof renderExpiry === 'function') renderExpiry();
    if (activeTab === 'reports' && typeof renderReports === 'function') renderReports();
    if (activeTab === 'family' && typeof renderFamily === 'function') renderFamily();
  }
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (el.id === 'scanAddBtn') return; // skip — managed by JS
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

  // Update dynamic placeholders that aren't data-i18n-placeholder
  const budgetInput = document.getElementById('budgetSetInput');
  if (budgetInput) budgetInput.placeholder = t('budgetSetPlaceholder');
  const expName = document.getElementById('expName');
  if (expName) expName.placeholder = t('expenseNamePlaceholder');
  const expAmount = document.getElementById('expAmount');
  if (expAmount) expAmount.placeholder = t('expenseAmtPlaceholder');
  const expiryNameInput = document.getElementById('expiryNameInput');
  if (expiryNameInput) expiryNameInput.placeholder = t('expiryNamePlaceholder');
  const newProfileName = document.getElementById('newProfileName');
  if (newProfileName) newProfileName.placeholder = t('profileNamePlaceholder');
  const newProfilePin = document.getElementById('newProfilePin');
  if (newProfilePin) newProfilePin.placeholder = t('profilePinPlaceholder');
}