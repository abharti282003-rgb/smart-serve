// app.js — Smart Serve · Language-Fixed Edition

const EMOJI_MAP={
  flour:'🌾',refined_flour:'🌾',rice:'🍚',lentils:'🫘',kidney_beans:'🫘',chickpeas:'🫘',
  milk:'🥛',yogurt:'🥣',cottage_cheese:'🧀',clarified_butter:'🧈',butter:'🧈',
  potato:'🥔',onion:'🧅',tomato:'🍅',garlic:'🧄',ginger:'🫚',chili:'🌶️',
  carrot:'🥕',spinach:'🥬',cauliflower:'🥦',eggplant:'🍆',peas:'🫛',
  lemon:'🍋',apple:'🍎',banana:'🍌',mango:'🥭',cooking_oil:'🫙',
  salt:'🧂',sugar:'🍬',tea:'🍵',coffee:'☕',turmeric:'🟡',spices:'🌿',
  soap:'🧼',shampoo:'🧴',toothpaste:'🦷',detergent:'🧹',water:'💧',
  juice:'🧃',biscuit:'🍪',bread:'🍞',flatbread:'🫓',noodles:'🍜',
  egg:'🥚',chicken:'🍗',fish:'🐟',vegetables:'🥕',okra:'🫛',
  bottle_gourd:'🥒',bitter_gourd:'🥒',fenugreek_leaves:'🌿',leafy_greens:'🥬'
};
const PROFILE_AVATARS=['👨','👩','👴','👵','👦','👧','🧑','😊','🌟','🏠','👑','🦁','🧒','👶','🧔','👱','🧕','🙋'];
const UNITS=['pcs','kg','ltr','gm','pkt'];

function getEmoji(name){
  const key=name.toLowerCase().trim();
  if(EMOJI_MAP[key])return EMOJI_MAP[key];
  for(const k of Object.keys(EMOJI_MAP)){if(key.includes(k)||k.includes(key))return EMOJI_MAP[k];}
  return '📦';
}

const DEFAULT_ITEMS=[
  {name:'flour',qty:5,minQty:2,unit:'kg',emoji:'🌾'},
  {name:'milk',qty:2,minQty:1,unit:'ltr',emoji:'🥛'},
];

let inventory=[],shoppingList=[],expenses=[],expiryItems=[],profiles=[],currentProfile=null;
let sortMode='name',searchQuery='',editingId=null,activeTab='inventory',pendingScanName=null;

function profileKey(k){return currentProfile?`ss_${currentProfile.id}_${k}`:`ss_${k}`;}

function saveState(){
  if(!currentProfile)return;
  localStorage.setItem(profileKey('inventory'),JSON.stringify(inventory));
  localStorage.setItem(profileKey('shopping'),JSON.stringify(shoppingList));
  localStorage.setItem(profileKey('expenses'),JSON.stringify(expenses));
  localStorage.setItem(profileKey('expiry'),JSON.stringify(expiryItems));
}

function loadState(){
  const si=localStorage.getItem(profileKey('inventory'));
  inventory=si?JSON.parse(si):DEFAULT_ITEMS.map((item,i)=>({id:Date.now()+i,...item,addedOn:Date.now()}));
  inventory.forEach(item=>{if(!item.unit)item.unit='pcs';});
  shoppingList=JSON.parse(localStorage.getItem(profileKey('shopping'))||'[]');
  expenses=JSON.parse(localStorage.getItem(profileKey('expenses'))||'[]');
  expiryItems=JSON.parse(localStorage.getItem(profileKey('expiry'))||'[]');
}

function saveProfiles(){localStorage.setItem('ss_profiles',JSON.stringify(profiles));}
function loadProfiles(){profiles=JSON.parse(localStorage.getItem('ss_profiles')||'[]');}

let toastTimer;
function showToast(msg,type=''){
  let toast=document.getElementById('toast');
  if(!toast){toast=document.createElement('div');toast.id='toast';document.body.appendChild(toast);}
  toast.textContent=msg;
  toast.className='toast show'+(type?' toast-'+type:'');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>{toast.className='toast';},2800);
}

// ===== PROFILE SCREEN =====
function showProfileScreen(){
  document.getElementById('profileScreen').classList.remove('hidden');
  document.getElementById('mainApp').classList.add('hidden');
  renderProfiles();
}
function hideProfileScreen(){
  document.getElementById('profileScreen').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('hidden');
}

function renderProfiles(){
  const grid=document.getElementById('profileGrid');
  grid.innerHTML='';
  profiles.forEach(p=>{
    const card=document.createElement('div');
    card.className='ps-card';
    card.innerHTML=`<span class="ps-avatar">${p.avatar}</span>
      <div class="ps-name">${escapeHtml(p.name)}</div>
      <div class="ps-lock ${p.pin?'':'open'}">${p.pin?'🔒 PIN':'🔓 '+t('openLabel')||'Open'}</div>`;
    card.onclick=()=>selectProfile(p);
    grid.appendChild(card);
  });
  const addCard=document.createElement('div');
  addCard.className='ps-card ps-add';
  addCard.innerHTML=`<span class="ps-avatar">➕</span><div class="ps-name">${t('createProfile')}</div>`;
  addCard.onclick=openCreateProfile;
  grid.appendChild(addCard);

  // Update welcome text
  const title=document.getElementById('psTitle');
  const sub=document.getElementById('psSub');
  if(title)title.textContent=t('welcomeTitle');
  if(sub)sub.textContent=t('welcomeSub');
}

function selectProfile(profile){
  if(profile.pin){openPinModal(profile);}else{loginAs(profile);}
}

function loginAs(profile){
  currentProfile=profile;
  localStorage.setItem('ss_last_profile',profile.id);
  loadState();
  hideProfileScreen();
  const el=document.getElementById('profileIndicator');
  if(el)el.textContent=profile.avatar+' '+profile.name;
  renderAll();
  checkExpiryAlerts();
}

// ===== PIN MODAL =====
function openPinModal(profile){
  const modal=document.getElementById('pinModal');
  modal.classList.remove('hidden');
  document.getElementById('pinModalName').textContent=profile.avatar+' '+profile.name;
  document.getElementById('pinInput').value='';
  document.getElementById('pinError').textContent='';
  const sub=document.getElementById('pinModalSub');
  if(sub)sub.textContent=t('enterPin');
  setTimeout(()=>document.getElementById('pinInput').focus(),100);
  document.getElementById('pinConfirmBtn').textContent=t('confirm');
  document.getElementById('pinConfirmBtn').onclick=()=>{
    const entered=document.getElementById('pinInput').value.trim();
    if(entered===profile.pin){modal.classList.add('hidden');loginAs(profile);}
    else{document.getElementById('pinError').textContent=t('wrongPin');document.getElementById('pinInput').value='';}
  };
}

// ===== CREATE PROFILE =====
let selectedAvatar='😊';
function openCreateProfile(){
  selectedAvatar='😊';
  const modal=document.getElementById('createProfileModal');
  modal.classList.remove('hidden');
  renderAvatarGrid();
  document.getElementById('newProfileName').value='';
  document.getElementById('newProfilePin').value='';
  // Update labels
  const title=modal.querySelector('.modal-title');
  if(title)title.textContent=t('createProfile');
}

function renderAvatarGrid(){
  const grid=document.getElementById('avatarGrid');
  grid.innerHTML='';
  PROFILE_AVATARS.forEach(av=>{
    const btn=document.createElement('button');
    btn.className='avatar-btn'+(av===selectedAvatar?' active':'');
    btn.textContent=av;
    btn.onclick=()=>{
      selectedAvatar=av;
      document.querySelectorAll('.avatar-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
    };
    grid.appendChild(btn);
  });
}

function createProfile(){
  const name=document.getElementById('newProfileName').value.trim();
  const pin=document.getElementById('newProfilePin').value.trim();
  if(!name){showToast(t('nameRequired'));return;}
  if(pin&&!/^\d{4}$/.test(pin)){showToast(t('pinFourDigits'));return;}
  profiles.push({id:Date.now().toString(),name,avatar:selectedAvatar,pin:pin||null,createdAt:Date.now()});
  saveProfiles();
  document.getElementById('createProfileModal').classList.add('hidden');
  showToast(t('profileCreated'),'success');
  renderProfiles();
}

// ===== STATS =====
function renderStats(){
  document.getElementById('statTotal').textContent=inventory.length;
  document.getElementById('statLow').textContent=inventory.filter(i=>i.qty>0&&i.qty<=i.minQty).length;
  document.getElementById('statOut').textContent=shoppingList.length;
}

// ===== UNIT LABEL HELPER =====
function getUnitLabel(unit){
  const map={pcs:t('unitLabelPcs'),kg:t('unitLabelKg'),ltr:t('unitLabelLtr'),gm:t('unitLabelGm'),pkt:t('unitLabelPkt')};
  return map[unit]||'';
}

function formatQty(item){
  const q=item.qty;
  const u=item.unit||'pcs';
  const unitLabel={pcs:'',kg:' kg',ltr:' L',gm:' g',pkt:' pkt'};
  return q+(unitLabel[u]||'');
}

// ===== INVENTORY =====
function getFilteredInventory(){
  let items=[...inventory];
  if(searchQuery){const q=searchQuery.toLowerCase();items=items.filter(i=>i.name.toLowerCase().includes(q));}
  if(sortMode==='name')items.sort((a,b)=>a.name.localeCompare(b.name));
  else if(sortMode==='qty')items.sort((a,b)=>a.qty-b.qty);
  return items;
}

function renderInventory(){
  const list=document.getElementById('inventoryList');
  const empty=document.getElementById('emptyInventory');
  list.innerHTML='';
  const items=getFilteredInventory();
  if(items.length===0){
    empty.classList.remove('hidden');
    empty.querySelector('p').textContent=t('inventoryEmpty');
    return;
  }
  empty.classList.add('hidden');
  items.forEach((item,idx)=>{
    const isOut=item.qty===0;
    const isLow=item.qty>0&&item.qty<=(item.minQty||1);
    const sc=isOut?'out-of-stock':isLow?'low-stock':'in-stock';
    const sl=isOut?t('outOfStock'):isLow?t('lowStock'):t('inStock');
    const unit=item.unit||'pcs';
    const unitLabel=getUnitLabel(unit);
    const card=document.createElement('div');
    card.className=`item-card ${sc}`;
    card.style.animationDelay=`${idx*0.04}s`;
    card.dataset.id=item.id;
    if(editingId===item.id){
      const unitOpts=UNITS.map(u=>`<option value="${u}" ${u===unit?'selected':''}>${t('unit'+u.charAt(0).toUpperCase()+u.slice(1))}</option>`).join('');
      card.innerHTML=`<span class="item-emoji">${item.emoji}</span><div class="edit-form">
        <input class="edit-name-input" value="${escapeHtml(item.name)}" id="editName${item.id}"/>
        <div class="edit-row">
          <label>${t('qtyLabel')}</label>
          <input type="number" class="edit-qty-input" value="${item.qty}" min="0" step="0.5" id="editQty${item.id}"/>
          <label>${t('unitLabel')}</label>
          <select class="edit-qty-input" id="editUnit${item.id}" style="width:60px">${unitOpts}</select>
          <label>${t('minQtyLabel')}</label>
          <input type="number" class="edit-min-input" value="${item.minQty||1}" min="0.5" step="0.5" id="editMin${item.id}"/>
        </div>
        <div class="edit-actions">
          <button class="btn-save-edit" onclick="saveEdit(${item.id})">${t('saveEdit')}</button>
          <button class="btn-cancel-edit" onclick="cancelEdit()">${t('cancel')}</button>
        </div>
      </div>`;
    }else{
      const qDisplay=formatQty(item);
      card.innerHTML=`<span class="item-emoji">${item.emoji}</span>
        <div class="item-info">
          <div class="item-name">${escapeHtml(item.name)}</div>
          <div class="item-status status-${sc}">${sl} ${unitLabel?`<span class="unit-badge">${unitLabel}</span>`:''}</div>
        </div>
        <div class="item-controls">
          <button class="btn-qty minus" data-id="${item.id}">−</button>
          <span class="qty-display ${isOut?'zero':isLow?'low':''}">${qDisplay}</span>
          <button class="btn-qty plus" data-id="${item.id}">+</button>
        </div>
        <div class="item-actions">
          <button class="btn-edit" data-id="${item.id}">✏️</button>
          <button class="btn-delete" data-id="${item.id}">✕</button>
        </div>`;
    }
    list.appendChild(card);
  });
}

// ===== SHOPPING =====
function renderShoppingList(){
  const list=document.getElementById('shoppingList');
  const empty=document.getElementById('emptyShopping');
  const actions=document.getElementById('shoppingActions');
  const badge=document.getElementById('shoppingBadge');
  list.innerHTML='';
  const count=shoppingList.length;
  badge.textContent=count;badge.style.display=count>0?'inline-flex':'none';
  if(count===0){
    empty.classList.remove('hidden');
    empty.querySelector('p').textContent=t('shoppingEmpty');
    actions.classList.add('hidden');return;
  }
  empty.classList.add('hidden');actions.classList.remove('hidden');
  shoppingList.forEach(item=>{
    const card=document.createElement('div');
    card.className='shopping-card';
    card.innerHTML=`<div class="shopping-pulse"></div>
      <span class="item-emoji">${item.emoji}</span>
      <div class="shopping-info">
        <div class="shopping-name">${escapeHtml(item.name)}</div>
        <div class="shopping-sub">${t('needToBuy')}</div>
      </div>
      <button class="btn-restock" data-id="${item.id}">${t('restock')}</button>`;
    list.appendChild(card);
  });
  // Update button labels
  const waBtn=document.getElementById('whatsappBtn');
  if(waBtn)waBtn.querySelector('span').textContent=t('shareWhatsApp');
  const clearBtn=document.getElementById('clearShoppingBtn');
  if(clearBtn)clearBtn.querySelector('span').textContent=t('clearAll');
}

// ===== BUDGET =====
function renderBudget(){
  const now=new Date();
  const thisMonth=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  const me=expenses.filter(e=>e.date&&e.date.startsWith(thisMonth));
  const totalSpent=me.reduce((s,e)=>s+(e.amount||0),0);
  const budget=parseInt(localStorage.getItem(profileKey('budget'))||'0');
  const left=budget-totalSpent;
  const el=id=>document.getElementById(id);

  if(el('budgetTotalNum'))el('budgetTotalNum').textContent='₹'+budget.toLocaleString('en-IN');
  if(el('budgetSpentNum'))el('budgetSpentNum').textContent='₹'+totalSpent.toLocaleString('en-IN');
  if(el('budgetLeftNum')){
    el('budgetLeftNum').textContent=(left<0?'-':'')+'₹'+Math.abs(left).toLocaleString('en-IN');
    el('budgetLeftNum').style.color=left<0?'var(--rose)':'var(--sage)';
  }
  if(el('budgetSetInput'))el('budgetSetInput').placeholder=t('budgetSetPlaceholder');
  if(el('budgetProgress')&&budget>0){
    const pct=Math.min(100,(totalSpent/budget)*100);
    el('budgetProgress').style.width=pct+'%';
    el('budgetProgress').style.background=pct>90?'var(--rose)':pct>70?'var(--gold)':'var(--sage)';
  } else if(el('budgetProgress'))el('budgetProgress').style.width='0%';

  // Update section titles
  const breakTitle=document.querySelector('#budgetTab .section-title');
  // Update category labels in select
  const cat=el('expCategory');
  if(cat){
    cat.options[0].text='🛒 '+t('catGrocery');
    cat.options[1].text='🥕 '+t('catVeg');
    cat.options[2].text='🥛 '+t('catDairy');
    cat.options[3].text='🧹 '+t('catCleaning');
    cat.options[4].text='📦 '+t('catOther');
  }

  const cats={};
  me.forEach(e=>{cats[e.category||'other']=(cats[e.category||'other']||0)+e.amount;});
  if(el('catBreakdown'))el('catBreakdown').innerHTML=
    Object.entries(cats).length===0
      ?`<div class="no-data">${t('noCatData')}</div>`
      :Object.entries(cats).sort((a,b)=>b[1]-a[1]).map(([cat,amt])=>
        `<div class="cat-row"><span class="cat-name">${getCatEmoji(cat)} ${getCatLabel(cat)}</span><span class="cat-amt">₹${amt.toLocaleString('en-IN')}</span></div>`
      ).join('');

  const sorted=[...me].sort((a,b)=>new Date(b.date)-new Date(a.date));
  if(el('expenseList'))el('expenseList').innerHTML=
    sorted.length===0
      ?`<div class="no-data">${t('noBudgetData')}</div>`
      :sorted.map(e=>
        `<div class="expense-row"><span class="exp-emoji">${getCatEmoji(e.category)}</span>
        <div class="exp-info"><div class="exp-name">${escapeHtml(e.name)}</div>
        <div class="exp-date">${formatDate(e.date)}</div></div>
        <div class="exp-right"><span class="exp-amt">₹${e.amount}</span>
        <button class="btn-del-exp" onclick="deleteExpense('${e.id}')">✕</button></div></div>`
      ).join('');
}

function getCatLabel(cat){
  const map={grocery:t('catGrocery'),veg:t('catVeg'),dairy:t('catDairy'),cleaning:t('catCleaning'),other:t('catOther')};
  return map[cat]||t('catOther');
}
function getCatEmoji(cat){return{grocery:'🛒',veg:'🥕',dairy:'🥛',cleaning:'🧹',other:'📦'}[cat]||'📦';}

function addExpense(){
  const name=document.getElementById('expName').value.trim();
  const amount=parseFloat(document.getElementById('expAmount').value);
  const date=document.getElementById('expDate').value;
  const category=document.getElementById('expCategory').value;
  if(!name||!amount||!date){showToast(t('fillAllDetails')||'Fill all details!');return;}
  expenses.push({id:Date.now().toString(),name,amount,date,category,addedBy:currentProfile?.name});
  document.getElementById('expName').value='';
  document.getElementById('expAmount').value='';
  saveState();renderBudget();showToast('✓ '+t('addExpense'),'success');
}

function deleteExpense(id){expenses=expenses.filter(e=>e.id!==id);saveState();renderBudget();}

function setBudget(){
  const val=parseInt(document.getElementById('budgetSetInput').value);
  if(!val||val<=0){showToast(t('validBudget')||'Enter a valid budget!');return;}
  localStorage.setItem(profileKey('budget'),val);renderBudget();showToast('✓ '+t('setBudget'),'success');
}

// ===== EXPIRY =====
function renderExpiry(){
  const list=document.getElementById('expiryList');
  if(!list)return;
  const today=new Date();today.setHours(0,0,0,0);
  const sorted=[...expiryItems].sort((a,b)=>new Date(a.expiryDate)-new Date(b.expiryDate));
  list.innerHTML=sorted.length===0
    ?`<div class="no-data">📭 ${t('noExpiryItems')||'No expiry items. Add from above!'}</div>`
    :sorted.map(item=>{
      const exp=new Date(item.expiryDate);exp.setHours(0,0,0,0);
      const diff=Math.round((exp-today)/86400000);
      const isExpired=diff<0;const isSoon=diff>=0&&diff<=7;
      const cls=isExpired?'expiry-expired':isSoon?'expiry-soon':'expiry-ok';
      const label=isExpired?t('expired'):`${diff} ${t('daysLeft')}`;
      return `<div class="expiry-card ${cls}">
        <span class="item-emoji">${getEmoji(item.name)}</span>
        <div class="expiry-info">
          <div class="expiry-name">${escapeHtml(item.name)}</div>
          <div class="expiry-date">${formatDate(item.expiryDate)}</div>
        </div>
        <div class="expiry-badge ${cls}">${label}</div>
        <button class="btn-delete" onclick="deleteExpiryItem('${item.id}')">✕</button>
      </div>`;
    }).join('');
}

function addExpiryItem(){
  const name=document.getElementById('expiryNameInput').value.trim();
  const date=document.getElementById('expiryDateInput').value;
  if(!name||!date){showToast(t('enterNameAndDate')||'Enter name and date!');return;}
  expiryItems.push({id:Date.now().toString(),name,expiryDate:date});
  document.getElementById('expiryNameInput').value='';
  document.getElementById('expiryDateInput').value='';
  saveState();renderExpiry();showToast('✓ '+t('addExpiry'),'success');
}

function deleteExpiryItem(id){expiryItems=expiryItems.filter(e=>e.id!==id);saveState();renderExpiry();}

function checkExpiryAlerts(){
  const today=new Date();today.setHours(0,0,0,0);
  const soon=expiryItems.filter(item=>{
    const exp=new Date(item.expiryDate);exp.setHours(0,0,0,0);
    const diff=Math.round((exp-today)/86400000);return diff>=0&&diff<=3;
  });
  if(soon.length>0)setTimeout(()=>showToast(`⚠️ ${soon.length} item(s) expire in 3 days!`,'cart'),1500);
}

// ===== REPORTS =====
function renderReports(){
  const container=document.getElementById('reportsContainer');
  if(!container)return;
  const now=new Date();
  const today=new Date();today.setHours(0,0,0,0);
  const expiredCount=expiryItems.filter(item=>{
    const exp=new Date(item.expiryDate);exp.setHours(0,0,0,0);return exp<today;
  }).length;

  let html=`<div class="report-summary">
    <div class="report-stat-card purple"><div class="rs-num">${inventory.length}</div><div class="rs-label">${t('totalItems')}</div></div>
    <div class="report-stat-card orange"><div class="rs-num">${inventory.filter(i=>i.qty<=i.minQty).length}</div><div class="rs-label">${t('lowStockItems')}</div></div>
    <div class="report-stat-card red"><div class="rs-num">${expiredCount}</div><div class="rs-label">${t('expiredItems')}</div></div>
  </div>`;

  for(let i=0;i<3;i++){
    const d=new Date(now.getFullYear(),now.getMonth()-i,1);
    const month=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    const me=expenses.filter(e=>e.date&&e.date.startsWith(month));
    const total=me.reduce((s,e)=>s+(e.amount||0),0);
    const budgetAmt=parseInt(localStorage.getItem(profileKey('budget'))||'0');
    const mname=d.toLocaleString('default',{month:'long',year:'numeric'});
    const cats=me.reduce((acc,e)=>{acc[e.category||'other']=(acc[e.category||'other']||0)+e.amount;return acc;},{});
    html+=`<div class="report-month-card">
      <div class="report-month-title">📅 ${mname}</div>
      <div class="report-month-total">₹${total.toLocaleString('en-IN')} ${t('spent')}</div>
      ${budgetAmt>0?`<div class="report-month-budget">${total<=budgetAmt?'✅':'⚠️'} ${t('budget')}: ₹${budgetAmt.toLocaleString('en-IN')}</div>`:''}
      ${me.length===0?`<div class="no-data">${t('noExpenses')}</div>`:
        Object.entries(cats).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([cat,amt])=>
          `<div class="report-cat-row">${getCatEmoji(cat)} ${getCatLabel(cat)} <span>₹${amt}</span></div>`
        ).join('')}
    </div>`;
  }
  container.innerHTML=html;
}

// ===== FAMILY TAB =====
function renderFamily(){
  const container=document.getElementById('familyContainer');
  if(!container)return;
  const appUrl=window.location.href.split('?')[0];
  container.innerHTML=`
    <div class="family-hero">
      <div class="family-hero-icon">👨‍👩‍👧‍👦</div>
      <div class="family-hero-title">${t('familyTab')} Accounts</div>
      <div class="family-hero-sub">${t('familyShare')} — ${t('voiceHelpText')||'Everyone can manage together.'}</div>
    </div>

    <div class="section-card">
      <div class="section-title">📱 ${t('installApp')} — ${t('installGuide')}</div>
      <div class="install-steps">
        <div class="install-step"><div class="step-num">1</div><div class="step-text"><strong>Android:</strong> Chrome → Menu (⋮) → "Add to Home Screen"</div></div>
        <div class="install-step"><div class="step-num">2</div><div class="step-text"><strong>iPhone:</strong> Safari → Share (□↑) → "Add to Home Screen"</div></div>
        <div class="install-step"><div class="step-num">3</div><div class="step-text">${t('installFallback')}</div></div>
      </div>
      <button class="btn-install-big" onclick="triggerInstall()">📲 ${t('installApp')}</button>
    </div>

    <div class="section-card">
      <div class="section-title">🔗 ${t('shareLink')}</div>
      <div class="share-url-box">
        <span class="share-url-text">${appUrl}</span>
        <button class="btn-copy-url" onclick="copyAppUrl('${appUrl}')">📋</button>
      </div>
      <div class="share-btns">
        <button class="btn-wa-share" onclick="shareViaWhatsApp('${appUrl}')">📲 WhatsApp</button>
        <button class="btn-share-native" onclick="nativeShare('${appUrl}')">↗ ${t('shareLink')}</button>
      </div>
    </div>

    <div class="section-card">
      <div class="section-title">👥 ${t('familyTab')} Profiles</div>
      <div class="profiles-list">
        ${profiles.map(p=>`
          <div class="family-profile-row">
            <span class="fp-avatar">${p.avatar}</span>
            <span class="fp-name">${escapeHtml(p.name)}</span>
            <span class="fp-pin">${p.pin?'🔒 PIN':'🔓'}</span>
            ${p.id!==currentProfile?.id
              ?`<button class="btn-del-profile" onclick="deleteProfile('${p.id}')">🗑️</button>`
              :`<span class="fp-you">(${t('switchProfile')||'You'})</span>`}
          </div>`).join('')}
      </div>
      <button class="btn-add-family" onclick="openCreateProfile()">➕ ${t('createProfile')}</button>
    </div>

    <div class="section-card">
      <div class="section-title">💡 ${t('voiceHelp')}</div>
      <div class="tips-grid">
        <div class="tip-card"><div class="tip-icon">🎤</div><div class="tip-text"><strong>${t('voiceBtn')}:</strong> ${t('voiceHelpText')}</div></div>
        <div class="tip-card"><div class="tip-icon">📷</div><div class="tip-text"><strong>${t('photoCapture')}:</strong> Scan to add items</div></div>
        <div class="tip-card"><div class="tip-icon">⚖️</div><div class="tip-text"><strong>${t('unitLabel')}:</strong> kg, ltr, pcs, gm, pkt</div></div>
        <div class="tip-card"><div class="tip-icon">📲</div><div class="tip-text"><strong>WhatsApp:</strong> ${t('shareWhatsApp')}</div></div>
        <div class="tip-card"><div class="tip-icon">⏰</div><div class="tip-text"><strong>${t('expiryTab')}:</strong> ${t('expiresSoon')}</div></div>
        <div class="tip-card"><div class="tip-icon">💰</div><div class="tip-text"><strong>${t('budgetTab')}:</strong> ${t('setBudget')}</div></div>
      </div>
    </div>`;
}

function deleteProfile(id){
  if(profiles.length<=1){showToast(t('atLeastOneProfile'));return;}
  if(!confirm(t('deleteProfileConfirm')))return;
  profiles=profiles.filter(p=>p.id!==id);
  saveProfiles();
  renderFamily();
  showToast(t('profileDeleted'),'success');
}

function copyAppUrl(url){
  navigator.clipboard?.writeText(url)
    .then(()=>showToast(t('linkCopied'),'success'))
    .catch(()=>showToast(t('linkCopyFail'),'error'));
}
function shareViaWhatsApp(url){
  const msg=`🏠 *Smart Serve* — ${t('appSub')}!\n\n${url}\n\n👨‍👩‍👧‍👦`;
  window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank');
}
function nativeShare(url){
  if(navigator.share){navigator.share({title:'Smart Serve',text:t('appSub'),url}).catch(()=>{});}
  else{copyAppUrl(url);}
}

let deferredInstall=null;
function triggerInstall(){
  if(deferredInstall){
    deferredInstall.prompt();
    deferredInstall.userChoice.then(()=>{
      deferredInstall=null;
      document.getElementById('installBanner').style.display='none';
      showToast(t('installing'),'success');
    });
  }else{showToast(t('installFallback'));}
}

// ===== RENDER ALL =====
function renderAll(){
  renderInventory();
  renderShoppingList();
  renderStats();
  // Always re-render active tab
  if(activeTab==='budget')renderBudget();
  if(activeTab==='expiry')renderExpiry();
  if(activeTab==='reports')renderReports();
  if(activeTab==='family')renderFamily();
  applyTranslations();
  saveState();
}

// ===== ITEM ACTIONS =====
function addItemToInventory(name,qty,minQty,unit){
  name=name.trim();if(!name)return;
  qty=parseFloat(qty)||1;minQty=parseFloat(minQty)||1;
  unit=unit||'pcs';
  const ex=inventory.find(i=>i.name.toLowerCase()===name.toLowerCase());
  if(ex){
    const step=ex.unit==='kg'||ex.unit==='ltr'?0.5:1;
    ex.qty=Math.round((ex.qty+step)*10)/10;
    shoppingList=shoppingList.filter(s=>s.id!==ex.id);
  }else{
    inventory.unshift({id:Date.now(),name,qty,minQty,unit,emoji:getEmoji(name),addedOn:Date.now()});
  }
  renderAll();showToast(t('toastAdded'),'success');
}

function getStep(item){return(item.unit==='kg'||item.unit==='ltr')?0.5:1;}

function decreaseQty(id){
  const item=inventory.find(i=>i.id===id);if(!item||item.qty<=0)return;
  const step=getStep(item);
  item.qty=Math.max(0,Math.round((item.qty-step)*10)/10);
  if(item.qty===0&&!shoppingList.find(s=>s.id===id)){
    shoppingList.push({id:item.id,name:item.name,emoji:item.emoji});
    showToast(t('toastAutoCart'),'cart');
  }
  renderAll();
}

function increaseQty(id){
  const item=inventory.find(i=>i.id===id);if(!item)return;
  const step=getStep(item);
  item.qty=Math.round((item.qty+step)*10)/10;
  shoppingList=shoppingList.filter(s=>s.id!==id);
  renderAll();
}

function deleteItem(id){
  inventory=inventory.filter(i=>i.id!==id);
  shoppingList=shoppingList.filter(s=>s.id!==id);
  renderAll();showToast(t('toastRemoved'));
}

function restockItem(id){
  const inv=inventory.find(i=>i.id===id);
  if(inv){const def=inv.unit==='kg'||inv.unit==='ltr'?2:Math.max(inv.minQty||1,5);inv.qty=def;}
  shoppingList=shoppingList.filter(s=>s.id!==id);
  renderAll();showToast(t('toastRestocked'),'success');
}

function clearShopping(){shoppingList=[];renderAll();showToast(t('toastCleared'));}

function startEdit(id){editingId=id;renderInventory();setTimeout(()=>document.getElementById('editName'+id)?.focus(),50);}

function saveEdit(id){
  const item=inventory.find(i=>i.id===id);if(!item)return;
  const n=document.getElementById('editName'+id);
  const q=document.getElementById('editQty'+id);
  const m=document.getElementById('editMin'+id);
  const u=document.getElementById('editUnit'+id);
  if(n)item.name=n.value.trim()||item.name;
  if(q)item.qty=Math.max(0,parseFloat(q.value)||0);
  if(m)item.minQty=Math.max(0,parseFloat(m.value)||0.5);
  if(u)item.unit=u.value||'pcs';
  item.emoji=getEmoji(item.name);
  if(item.qty===0&&!shoppingList.find(s=>s.id===id))shoppingList.push({id:item.id,name:item.name,emoji:item.emoji});
  else if(item.qty>0)shoppingList=shoppingList.filter(s=>s.id!==id);
  editingId=null;renderAll();showToast(t('saveEdit')+' ✓','success');
}

function cancelEdit(){editingId=null;renderInventory();}

function shareOnWhatsApp(){
  if(shoppingList.length===0)return;
  const h=`🛒 *${t('shoppingList')} — Smart Serve*\n_${currentProfile?.name||''}_\n\n`;
  const items=shoppingList.map((item,i)=>`${i+1}. ${item.emoji} ${item.name}`).join('\n');
  window.open('https://wa.me/?text='+encodeURIComponent(h+items),'_blank');
}

// ===== TABS =====
function switchTab(tabName){
  activeTab=tabName;
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.add('hidden'));
  const te=document.getElementById('tab'+capitalize(tabName));
  const ce=document.getElementById(tabName+'Tab');
  if(te)te.classList.add('active');
  if(ce)ce.classList.remove('hidden');
  const isInv=tabName==='inventory';
  document.getElementById('addBar').style.display=isInv?'flex':'none';
  document.getElementById('toolBar').style.display=isInv?'flex':'none';
  if(tabName==='budget')renderBudget();
  if(tabName==='expiry')renderExpiry();
  if(tabName==='reports')renderReports();
  if(tabName==='family')renderFamily();
}

function setSortMode(mode){
  sortMode=mode;
  document.querySelectorAll('.sort-btn').forEach(b=>b.classList.toggle('active',b.dataset.sort===mode));
  renderInventory();
}

// ===== LANGUAGE MODAL =====
function openLangModal(){
  const modal=document.getElementById('langModal');
  const grid=document.getElementById('langGrid');
  grid.innerHTML='';
  // Update modal title
  const title=modal.querySelector('.modal-title');
  if(title)title.textContent=t('selectLanguage');
  LANGUAGES.forEach(lang=>{
    const btn=document.createElement('button');
    btn.className='lang-option'+(lang.code===currentLang?' active':'');
    btn.innerHTML=`<strong>${lang.nativeLabel}</strong><small>${lang.label}</small>`;
    btn.onclick=()=>{
      setLanguage(lang.code);   // setLanguage now calls renderAll internally
      closeLangModal();
    };
    grid.appendChild(btn);
  });
  modal.classList.remove('hidden');
}
function closeLangModal(){document.getElementById('langModal').classList.add('hidden');}

// ===== VOICE =====
function startVoice(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){showToast(t('voiceChromeOnly'));return;}
  const lang=LANGUAGES.find(l=>l.code===currentLang);
  const rec=new SR();
  rec.lang=lang?lang.voice:'en-IN';
  rec.interimResults=false;
  const btn=document.getElementById('voiceBtn');
  btn.classList.add('listening');btn.textContent='🔴';
  showToast(t('voicePrompt'),'cart');
  rec.start();
  rec.onresult=e=>{
    const s=e.results[0][0].transcript;
    btn.classList.remove('listening');btn.textContent='🎤';
    let detectedUnit='pcs';
    if(/kilo|kg|kilogram/i.test(s))detectedUnit='kg';
    else if(/liter|litre|ltr/i.test(s))detectedUnit='ltr';
    else if(/gram|gm/i.test(s))detectedUnit='gm';
    else if(/pkt|packet/i.test(s))detectedUnit='pkt';
    const cleanName=s.replace(/\d+\s*(kilo|kg|kilogram|liter|litre|ltr|gram|gm|pcs|piece|pkt|packet)/gi,'').trim()||s;
    addItemToInventory(cleanName,1,1,detectedUnit);
    showToast('🎤 "'+cleanName+'" '+t('toastAdded'),'success');
  };
  rec.onerror=rec.onend=()=>{btn.classList.remove('listening');btn.textContent='🎤';};
}

// ===== SCAN / CAMERA =====
let scanStream=null,scanInterval=null;

function openScan(){
  pendingScanName=null;
  document.getElementById('scanModal').classList.remove('hidden');
  // Update modal text
  const title=document.getElementById('scanModal').querySelector('.modal-title');
  if(title)title.textContent=t('scanTitle');
  const btn=document.getElementById('scanAddBtn');
  btn.disabled=true;btn.style.opacity='0.5';
  btn.textContent=t('addToInventory');
  document.getElementById('scanResult').textContent='';
  document.getElementById('scanStatus').textContent=t('scanDetecting');
  document.getElementById('scanManualInput').placeholder=t('scanManualPlaceholder');
  document.getElementById('scanManualInput').value='';
  document.getElementById('ocrStatus').textContent='';
  startCamera();
}

function closeScan(){
  stopCamera();pendingScanName=null;
  document.getElementById('scanModal').classList.add('hidden');
  document.getElementById('ocrStatus').textContent='';
  document.getElementById('scanResult').textContent='';
  const btn=document.getElementById('scanAddBtn');
  btn.disabled=true;btn.style.opacity='0.5';
}

async function startCamera(){
  const video=document.getElementById('scanVideo');
  try{
    scanStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment',width:{ideal:1280},height:{ideal:720}}});
    video.srcObject=scanStream;video.play();
    startFrameAnalysis(video);
    document.getElementById('scanStatus').textContent=t('cameraReady');
  }catch(e){
    document.getElementById('scanStatus').textContent=t('cameraError');
  }
}

function stopCamera(){
  if(scanStream){scanStream.getTracks().forEach(t=>t.stop());scanStream=null;}
  clearInterval(scanInterval);
}

function startFrameAnalysis(video){
  const canvas=document.createElement('canvas');
  const ctx=canvas.getContext('2d');
  let detected=false;
  scanInterval=setInterval(()=>{
    if(detected||!video.videoWidth)return;
    canvas.width=video.videoWidth;canvas.height=video.videoHeight;
    ctx.drawImage(video,0,0);
    if('BarcodeDetector' in window){
      new BarcodeDetector({formats:['ean_13','ean_8','qr_code','code_128','upc_a','upc_e']})
        .detect(canvas).then(barcodes=>{if(barcodes.length>0&&!detected){detected=true;lookupBarcode(barcodes[0].rawValue);}})
        .catch(()=>{});
    }
  },800);
}

async function lookupBarcode(code){
  document.getElementById('scanStatus').textContent=t('lookingUp');
  try{
    const res=await fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`);
    const data=await res.json();
    if(data.status===1&&data.product){
      setScanResult(data.product.product_name_hi||data.product.product_name||code,'✅ '+t('scanFound'));
      return;
    }
  }catch(e){}
  setScanResult('Item #'+code,t('unknownProduct'));
}

function setScanResult(name,statusMsg){
  pendingScanName=name;
  document.getElementById('scanResult').textContent=t('scanFound')+name;
  document.getElementById('scanStatus').textContent=statusMsg;
  document.getElementById('scanManualInput').value=name;
  const btn=document.getElementById('scanAddBtn');
  btn.disabled=false;btn.style.opacity='1';
  btn.textContent=t('addToInventory');
}

function addScannedItem(){
  const manual=document.getElementById('scanManualInput').value.trim();
  const name=manual||pendingScanName;
  const unit=document.getElementById('scanUnitSelect')?.value||'pcs';
  if(name){addItemToInventory(name,1,1,unit);closeScan();showToast('✓ '+name+' '+t('toastAdded'),'success');}
}

// ===== PHOTO CAPTURE =====
function takePhotoAndAdd(){
  const input=document.createElement('input');
  input.type='file';input.accept='image/*';input.capture='environment';
  input.onchange=(e)=>handleOCRImage(e);
  input.click();
}

// ===== OCR =====
async function handleOCRImage(e){
  const file=e.target.files[0];if(!file)return;
  const status=document.getElementById('ocrStatus');
  const ocrBtn=document.getElementById('ocrBtn');
  status.textContent='🔍 '+t('scanDetecting');
  if(ocrBtn)ocrBtn.disabled=true;
  try{
    const base64=await new Promise((res,rej)=>{
      const r=new FileReader();
      r.onload=()=>res(r.result.split(',')[1]);
      r.onerror=()=>rej(new Error('fail'));
      r.readAsDataURL(file);
    });
    const response=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:150,
        messages:[{role:'user',content:[
          {type:'image',source:{type:'base64',media_type:file.type||'image/jpeg',data:base64}},
          {type:'text',text:'Which grocery or household product is in this image? Respond in JSON: {"name":"product name","unit":"pcs/kg/ltr/gm/pkt"}. JSON only, no other text.'}
        ]}]
      })
    });
    const data=await response.json();
    if(data.content?.[0]?.text){
      try{
        const parsed=JSON.parse(data.content[0].text.replace(/```json|```/g,'').trim());
        setScanResult(parsed.name||data.content[0].text,'✅ '+t('scanFound'));
        if(parsed.unit&&document.getElementById('scanUnitSelect'))document.getElementById('scanUnitSelect').value=parsed.unit;
        status.textContent='✅ '+t('scanFound');
      }catch{
        const name=data.content[0].text.trim().replace(/["""*]/g,'').split('\n')[0];
        setScanResult(name,'✅');
        status.textContent='✅';
      }
    }else status.textContent='❌ '+t('cameraError');
  }catch(err){status.textContent='⚠️ '+t('cameraError');}
  if(ocrBtn)ocrBtn.disabled=false;
  if(e.target)e.target.value='';
}

// ===== PWA =====
window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();deferredInstall=e;
  const banner=document.getElementById('installBanner');
  if(banner){
    banner.style.display='flex';
    banner.querySelector('span').textContent=t('installPrompt');
  }
});

function installApp(){
  if(!deferredInstall)return;
  deferredInstall.prompt();
  deferredInstall.userChoice.then(()=>{
    deferredInstall=null;
    document.getElementById('installBanner').style.display='none';
  });
}

// ===== UTILS =====
function escapeHtml(str){return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1);}
function formatDate(dateStr){if(!dateStr)return '';const d=new Date(dateStr);return d.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});}

// ===== EVENTS =====
function initEvents(){
  document.getElementById('tabInventory').addEventListener('click',()=>switchTab('inventory'));
  document.getElementById('tabShopping').addEventListener('click',()=>switchTab('shopping'));
  document.getElementById('tabBudget').addEventListener('click',()=>switchTab('budget'));
  document.getElementById('tabExpiry').addEventListener('click',()=>switchTab('expiry'));
  document.getElementById('tabReports').addEventListener('click',()=>switchTab('reports'));
  document.getElementById('tabFamily').addEventListener('click',()=>switchTab('family'));

  document.getElementById('addItemBtn').addEventListener('click',()=>{
    const input=document.getElementById('newItemInput');
    const qty=document.getElementById('newItemQty');
    const min=document.getElementById('newItemMin');
    const unit=document.getElementById('newItemUnit');
    if(input.value.trim()){
      addItemToInventory(input.value,qty.value,min.value,unit.value);
      input.value='';qty.value=1;min.value=1;input.focus();
    }
  });

  document.getElementById('newItemInput').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('addItemBtn').click();});
  document.getElementById('searchInput').addEventListener('input',e=>{searchQuery=e.target.value;renderInventory();});
  document.querySelectorAll('.sort-btn').forEach(btn=>btn.addEventListener('click',()=>setSortMode(btn.dataset.sort)));

  document.getElementById('inventoryList').addEventListener('click',e=>{
    const id=parseInt(e.target.dataset.id||e.target.closest('[data-id]')?.dataset.id);
    if(!id)return;
    if(e.target.classList.contains('minus'))decreaseQty(id);
    else if(e.target.classList.contains('plus'))increaseQty(id);
    else if(e.target.classList.contains('btn-delete'))deleteItem(id);
    else if(e.target.classList.contains('btn-edit'))startEdit(id);
  });

  document.getElementById('shoppingList').addEventListener('click',e=>{
    const id=parseInt(e.target.dataset.id);
    if(id&&e.target.classList.contains('btn-restock'))restockItem(id);
  });

  document.getElementById('whatsappBtn').addEventListener('click',shareOnWhatsApp);
  document.getElementById('clearShoppingBtn').addEventListener('click',clearShopping);
  document.getElementById('langBtn').addEventListener('click',openLangModal);
  document.getElementById('closeLangModal').addEventListener('click',closeLangModal);
  document.getElementById('langModal').addEventListener('click',e=>{if(e.target===document.getElementById('langModal'))closeLangModal();});

  document.getElementById('scanBtn').addEventListener('click',openScan);
  document.getElementById('closeScanModal').addEventListener('click',closeScan);
  document.getElementById('scanAddBtn').addEventListener('click',addScannedItem);
  document.getElementById('scanManualInput').addEventListener('input',function(){
    if(this.value.trim()){
      pendingScanName=this.value.trim();
      const btn=document.getElementById('scanAddBtn');
      btn.disabled=false;btn.style.opacity='1';
      btn.textContent=t('addToInventory');
    }
  });
  document.getElementById('scanManualInput').addEventListener('keydown',e=>{if(e.key==='Enter')addScannedItem();});
  document.getElementById('ocrBtn').addEventListener('click',()=>document.getElementById('ocrFileInput').click());
  document.getElementById('ocrFileInput').addEventListener('change',handleOCRImage);
  document.getElementById('photoCaptureBtn').addEventListener('click',takePhotoAndAdd);

  document.getElementById('voiceBtn').addEventListener('click',startVoice);
  document.getElementById('installBtn').addEventListener('click',installApp);
  document.getElementById('logoutBtn').addEventListener('click',showProfileScreen);
  document.getElementById('pinInput').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('pinConfirmBtn').click();});
  document.getElementById('cancelPinBtn').addEventListener('click',()=>document.getElementById('pinModal').classList.add('hidden'));
  document.getElementById('cancelCreateBtn').addEventListener('click',()=>document.getElementById('createProfileModal').classList.add('hidden'));
  document.getElementById('confirmCreateBtn').addEventListener('click',createProfile);
  document.getElementById('addExpenseBtn').addEventListener('click',addExpense);
  document.getElementById('setBudgetBtn').addEventListener('click',setBudget);
  document.getElementById('addExpiryBtn').addEventListener('click',addExpiryItem);

  const today=new Date().toISOString().split('T')[0];
  const expDateEl=document.getElementById('expDate');
  if(expDateEl)expDateEl.value=today;
}

// ===== INIT =====
function init(){
  loadProfiles();
  applyTranslations();
  initEvents();
  const lastId=localStorage.getItem('ss_last_profile');
  const lastProfile=profiles.find(p=>p.id===lastId);
  if(profiles.length===0){showProfileScreen();}
  else if(lastProfile&&!lastProfile.pin){loginAs(lastProfile);}
  else{showProfileScreen();}
}
document.addEventListener('DOMContentLoaded',init);