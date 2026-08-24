/* ==================================================================
   HOSSANA MESOB ONE — Frontend Application Logic
   SPA routing · bilingual engine · hero carousel · counters ·
   reveal system · search palette · chatbot · API integration
   ================================================================== */
'use strict';

/* ── Helpers ─────────────────────────────────────────────────── */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[ch]));
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

/* ── Static content (mirrors backend seed; offline fallback) ── */
const HERO_SLIDES = [
  {
    title_en: 'Welcome to Hossana Mesob One Digital Service',
    title_am: 'እንኳን ወደ ሆሳዕና መሶብ አንድ ዲጂታል ማዕከል በደህና መጡ',
    desc_en: 'Twelve government offices united under a single digital roof to serve you faster and better.',
    desc_am: 'አሥራ ሁለት የመንግስት ቢሮዎች በአንድ ዲጂታል ጣራ ሥር ተዋህደው በፍጥነትና በጥራት ያገለግሏታል።',
  },
  {
    title_en: 'Grand Opening',
    title_am: 'ታላቅ የመክፈቻ ስነ ስርዓት',
    desc_en: 'The center officially opened its doors to citizens of Hossana and the wider Hadiya Zone.',
    desc_am: 'ማዕከሉ ለሆሳዕናና ለሀዲያ ዞን ዜጎች በይፋ ተከፍቷል።',
  },
  {
    title_en: '12 Institutions, In One Mesob One Digital Service',
    title_am: '12 ተቋማት፣ በአንድ የመሶብ አንድ ማዕከል',
    desc_en: 'Trade, ID, banking, telecom, and postal services delivered side by side in one visit.',
    desc_am: 'ንግድ፣ መታወቂያ፣ ባንክ፣ ቴሌኮምና ፖስታ አገልግሎቶች በአንድ ጉብኝት ይገኛሉ።',
  },
  {
    title_en: 'From Paper to Screen',
    title_am: 'ከወረቀት ወደ ስክሪን',
    desc_en: 'End-to-end digital workflows replace queues, files, and physical document transit.',
    desc_am: 'ወረፋዎችንና የወረቀት ዝውውርን ተክተን ሙሉ የዲጂታል አሰራሮች ተግባራዊ ሆነዋል።',
  },
  {
    title_en: '40+ Services, 24/7 Accessibility',
    title_am: 'ከ40 በላይ አገልግሎቶች፣ ሁልጊዜ ክፍት',
    desc_en: 'The online portal never closes — apply, pay, and verify any time, anywhere.',
    desc_am: 'የመስመር ላይ ፖርታሉ ሁልጊዜ ክፍት ነው — በማንኛውም ጊዜያት ያመልክቱ፣ ይክፈሉ፣ ያረጋግጡ።',
  },
  {
    title_en: 'Zero Paper Used',
    title_am: 'ዜሮ ወረቀት አጠቃቀም',
    desc_en: 'A fully paperless achievement: every service record lives in secure digital systems.',
    desc_am: 'ሙሉ ወረቀት አልባ ውጤት፦ እያንዳንዱ የአገልግሎት መዝገብ በደህንነቱ ተጠብቆ በዲጂታል ይኖራል።',
  },
  {
    title_en: 'Serving the People of Hossana',
    title_am: 'ለሆሳዕና ህዝብ አገልግሎት',
    desc_en: 'Thousands of citizens served every day with an average processing time of 45 minutes.',
    desc_am: 'በቀን ሺዎችን ዜጎች በአማካይ 45 ደቂቃ የማቀነባበሪያ ጊዜ እያገለገልን ነው።',
  },
  {
    title_en: 'One Center, Endless Services',
    title_am: 'አንድ ማዕከል፣ ያለመጨረሻ አገልግሎቶች',
    desc_en: 'From your first visit to final approval — everything happens in one place, on one platform.',
    desc_am: 'ከመጀመሪያው ጉብኝት እስከ መጨረሻው ፈቃድ — ሁሉም በአንድ ቦታ፣ በአንድ መድረክ ይከናወናል።',
  },
];

const SERVICES_CATALOG = [
  { cat: 'national-id', icon: '🆔', en: 'Fayda ID Registration', am: 'የፋይዳ መታወቂያ ምዝገባ', desc_en: 'First-time National Digital ID registration with biometric capture.', desc_am: 'በባዮሜትሪክ መመዝገብ ለመጀመሪያ ጊዜ የብሔራዊ ዲጂታል መታወቂያ ማግኘት።' },
  { cat: 'national-id', icon: '🖨️', am: 'የመታወቂያ ማስተካከያና ማተሚያ', en: 'ID Correction & Reprint', desc_en: 'Fix biometric errors, update details, print or reprint your digital ID.', desc_am: 'የባዮሜትሪክ ስህተቶችን ማስተካከል፣ መረጃ ማዘመንና መታወቂያ ማተም።' },
  { cat: 'national-id', icon: '📅', en: 'Appointment Scheduling', am: 'ቀጠሮ ማስያዝ', desc_en: 'Book service slots online and skip the queue entirely.', desc_am: 'የአገልግሎት ቀጠሮ በመስመር ላይ በማስያዝ ወረፋውን ይመልጡ።' },
  { cat: 'trade', icon: '💼', en: 'New Trade License', am: 'አዲስ የንግድ ፈቃድ', desc_en: 'Register new businesses end-to-end without visiting multiple offices.', desc_am: 'አዲስ ንግድ ያለብዙ ቢሮ ወደ አንድ ቦታ በቀላሉ ይመዝገቡ።' },
  { cat: 'trade', icon: '♻️', en: 'License Renewal', am: 'የፈቃድ እድሳት', desc_en: 'Renew annual trade licenses online in minutes.', desc_am: 'ዓመታዊ የንግድ ፈቃድዎን በደቂቃዎች ውስጥ ያድሱ።' },
  { cat: 'trade', icon: '🧾', en: 'License Modification & Cancellation', am: 'ፈቃድ ማሻሻልና መሰረዝ', desc_en: 'Update business credentials or process cancellations digitally.', desc_am: 'የንግድ ማረጋገጫዎችን በዲጂታል መንገድ ያሻሽሉ ወይም ይሰርዙ።' },
  { cat: 'postal', icon: '📮', en: 'Ethiopost PO Box Services', am: 'የፖስታ ᳹᳹ አገልግሎቶች', desc_en: 'Rent PO boxes and manage postal services at the center.', desc_am: 'የፖስታ ᳹᳹ በማዕከሉ ውስጥ ይከፍቱና ያስተዳድሩ።' },
  { cat: 'postal', icon: '📦', en: 'Parcel Tracking', am: 'የመጋዘን ክትትል', desc_en: 'Track postal parcels with instant status notifications.', desc_am: 'የፖስታ ጥቅሎችን በፍጥነት ይከታተሉ።' },
  { cat: 'telecom', icon: '📱', en: 'Telebirr Registration & Top-up', am: 'ቴሌብር ምዝገባና ጭነት', desc_en: 'Open Telebirr mobile money accounts and top up instantly.', desc_am: 'ቴሌብር ሒሳብ ይክፈቱና ወዲያውኑ ይሞሉ።' },
  { cat: 'telecom', icon: '🌐', en: 'Ethio Telecom Services', am: 'የኢትዮ ቴሌኮም አገልግሎቶች', desc_en: 'SIM registration, billing inquiries, and package management.', desc_am: 'SIM ምዝገባ፣ የክፍያ ጥያቄና ጥቅል አያያዝ።' },
  { cat: 'banking', icon: '🏦', en: 'CBE Account–Fayda Linkage', am: 'የCBE ሒሳብና ፋይዳ ትስስር', desc_en: 'Bind Commercial Bank accounts to your Fayda Digital ID.', desc_am: 'የንግድ ባንክ ሒሳብዎን ከፋይዳ መታወቂያዎ ጋር ያገናኙ።' },
  { cat: 'banking', icon: '✅', en: 'QR Document Verification', am: 'የሰነድ QR ማረጋገጫ', desc_en: 'Verify any issued document instantly via secure QR codes.', desc_am: 'በተገኘ ሰነድ ላይ በQR ኮድ ወዲያውኑ ማረጋገጫ ያድርጉ።' },
];

const CATEGORY_LABELS = {
  'national-id': { en: 'National ID (Fayda)', am: 'ብሔራዊ መታወቂያ' },
  trade: { en: 'Trade License', am: 'ንግድና ገበያ' },
  postal: { en: 'Postal Service', am: 'ፖስታ አገልግሎት' },
  telecom: { en: 'Telecom & Telebirr', am: 'ቴሌኮም/ቴሌብር' },
  banking: { en: 'CBE Banking', am: 'ንግድ ባንክ' },
};

const NEWS_CATEGORY_LABELS = {
  reform: { en: 'Reform', am: 'ሪፎርም' },
  service: { en: 'Service', am: 'አገልግሎት' },
  announcement: { en: 'Announcement', am: 'ማስታወቂያ' },
  update: { en: 'Update', am: 'ዝማኔ' },
};

const NEWS_FALLBACK = [
  { id: 1, title: 'Mesob One Digital Service Center Official Launch', title_am: 'የመሶብ አንድ ዲጂታል አገልግሎት ማዕከል ኦፊሴላዊ መክፈቻ', content: 'The Hossana Mesob One Digital Service Center has officially opened its doors, bringing 12 government institutions under one digital roof.', content_am: 'የሆሳዕና መሶብ አንድ ዲጂታል አገልግሎት ማዕከል በOfficial ሁኔታ ተከፍቷል።', category: 'reform', created_at: '2026-06-02T09:00:00Z' },
  { id: 2, title: 'Trade License Services Now Available Online', title_am: 'የንግድ ፈቃድ አገልግሎቶች አሁን በመስመር ላይ ይገኛሉ', content: 'Citizens can now apply for trade licenses entirely online through the Mesob One platform.', content_am: 'ዜጎች አሁን የንግድ ፈቃዶችን ሙሉ በሙሉ በመስመር ላይ ማመልከት ይችላሉ።', category: 'service', created_at: '2026-06-10T09:00:00Z' },
  { id: 3, title: 'Paperless Service Achievement: Zero Paper Used', title_am: 'ዜሮ ወረቀት አጠቃቀም: የተደረገ ለውጥ', content: 'Since launching, the center has achieved zero paper usage across all digital services.', content_am: 'ከመክፈት በኋላ ማዕከሉ በሁሉም ዲጂታል አገልግሎቶች ዜሮ ወረቀት አግኝቷል።', category: 'reform', created_at: '2026-06-18T09:00:00Z' },
  { id: 4, title: '12 Partner Institutions United Under Mesob One', title_am: '12 ጋራ ተቋማት በመሶብ አንድ ስር ተሰባስበዋል', content: 'All 12 government institutions are now fully integrated into the digital platform.', content_am: 'ከ12 የመንግስት ተቋማት ሁሉ በሙሉ ወደ ዲጂታል መድረክ ገብተዋል።', category: 'announcement', created_at: '2026-06-26T09:00:00Z' },
  { id: 5, title: 'Telebirr and CBE Birr Payment Integration Complete', title_am: 'Telebirr እና CBE Birr ክፍያ መቀላቀል ተጠናቋል', content: 'Digital payment via Telebirr and CBE Birr is now fully operational for all fee-based services.', content_am: 'በTelebirr እና CBE Birr የተደረገ ዲጂታል ክፍያ ለሁሉም ክፍያ ያለባቸው አገልግሎቶች ሙሉ ተግባራዊ ነው።', category: 'service', created_at: '2026-07-05T09:00:00Z' },
  { id: 6, title: 'Community Testimonials: Citizens Share Their Experience', title_am: 'የማህበረሰብ ዝግጅቶች: ዜጎች ተሞክሮዎቻቸውን ይጋራሉ', content: 'Citizens of Hossana share their positive experiences using the new digital service center.', content_am: 'የሆሳዕና ዜጎች አዲሱን ዲጂታል አገልግሎት ማዕከል በመጠቀም አዎንታዊ ተሞክሮዎቻቸውን ይጋራሉ።', category: 'update', created_at: '2026-07-14T09:00:00Z' },
];

const LEADERSHIP_FALLBACK = [
  { name: 'Temesgen Wolde Anose', name_am: 'ተመስገን ወልደ አኖሴ', position: 'General Manager', position_am: 'ስራ አስኪያጅ', photo_url: '/assets/temesgen-wolde.jpg', order_num: 0 },
  { name: 'Besufikad Adisse', name_am: 'ቤሱፍቃድ አዲሴ', position: 'Head of Digital Services', position_am: 'የዲጂታል አገልግሎት ኃላፊ', order_num: 1 },
  { name: 'Hana Bekele', name_am: 'ሃና በቀለ', position: 'Head of Operations', position_am: 'የኦፕሬሽን ኃላፊ', order_num: 2 },
  { name: 'Daniel Tesfaye', name_am: 'ዳኒኤል ተስፋዬ', position: 'Head of IT & Systems', position_am: 'የአይቲ ኃላፊ', order_num: 3 },
];

const DOWNLOADS_FALLBACK = [
  { id: 1, title: 'Trade License Application Form', title_am: 'የንግድ ፈቃድ ማመልከቻ ቅጽ', description: 'Standard form for new trade license applications', icon: '📝', category: 'forms', file_url: '#' },
  { id: 2, title: 'Construction Permit Guidelines', title_am: 'የግንባታ ፈቃድ መመሪያ', description: 'Step-by-step guide for construction permit applications', icon: '🏗️', category: 'guidelines', file_url: '#' },
  { id: 3, title: 'Annual Service Report 2026', title_am: 'ዓመታዊ የአገልግሎት ሪፖርት 2026', description: 'Comprehensive report of service delivery achievements', icon: '📊', category: 'regulations', file_url: '#' },
  { id: 4, title: 'Digital Payment Regulations', title_am: 'የዲጂታል ክፍያ ደንቦች', description: 'Official regulations governing digital payment services', icon: '💳', category: 'regulations', file_url: '#' },
  { id: 5, title: 'Document Verification Manual', title_am: 'የሰነድ ማረጋገጫ መመሪያ', description: 'How to verify documents using QR codes', icon: '✅', category: 'guidelines', file_url: '#' },
  { id: 6, title: 'Citizen Feedback Form', title_am: 'የዜጎች አስተያየት ቅጽ', description: 'Form for submitting service feedback and complaints', icon: '💬', category: 'forms', file_url: '#' },
];

const CHAT_RULES = [
  { keys: ['pay', 'payment', 'telebirr', 'cbe', 'ክፍያ'], page: 'services', en: 'We accept payments via Telebirr and CBE Birr. Pay fees, renewals, and taxes digitally from the Services page.', am: 'ክፍያዎችን በTelebirr እና CBE Birr በዲጂታል መንገድ መክፈል ይችላሉ። ዝርዝሩን በአገልግሎቶች ገጽ ይመልከቱ።' },
  { keys: ['track', 'status', 'ክትትል', 'ሁኔታ'], page: 'track', en: 'You can track your application in real-time on the Track page. Just enter your reference number (e.g., APP-1001).', am: 'የማመልከቻዎን ሁኔታ በክትትል ገጽ ማሳወቅ ይችላሉ። የማጣቀሻ ቁጥርዎን ብቻ ያስገቡ (ለምሳሌ APP-1001)።' },
  { keys: ['apply', 'register', 'license', 'id', 'fayda', 'ምዝገባ', 'ፈቃድ'], page: 'services', en: 'You can apply online for National ID (Fayda), trade licenses, banking linkages, and more from our Services page.', am: 'ብሔራዊ መታወቂያ (ፋይዳ)፣ የንግድ ፈቃድ፣ የባንክ ትስስር እና ሌሎችን ከአገልግሎቶች ገጽ ማመልከት ይችላሉ።' },
  { keys: ['complaint', 'feedback', 'problem', 'error', 'ቅሬታ', 'አስተያየት'], page: 'contact', en: 'We are sorry for the inconvenience. Please submit your complaint through the Contact page form and our team will respond quickly.', am: 'ለሚገጥምዎት ችግር እናዝናለን። በአግኙን ገጹ በኩል ቅሬታዎን ያስገቡ፣ ቡድናችን በፍጥነት ይመልስልዎታል።' },
  { keys: ['hour', 'open', 'time', '24', 'ሰዓት', 'ክፍት'], page: 'contact', en: 'Our offices are open Monday–Friday 8:30 AM – 5:30 PM, Saturday mornings. The online portal is available 24/7!', am: 'ቢሮዎቻችን ሰኞ–አርብ ከጠዋቱ 2:30 እስከ 11:30፣ ቅዳሜ ጠዋት ክፍት ናቸው። ድረገፁ ግን 24 ሰዓት ይሰራል!' },
  { keys: ['contact', 'phone', 'email', 'location', 'where', 'ስልክ', 'ኢሜይል', 'አድራሻ'], page: 'contact', en: 'Reach us at:\n📞 +251 90 324 6324\n✉️ hossanmesob@gmail.com\n📍 Hossana, Hadiya Zone, Central Ethiopia', am: 'ያግኙን፦\n📞 +251 90 324 6324\n✉️ hossanmesob@gmail.com\n📍 ሆሳዕና፣ ሀዲያ ዞን፣ ማዕከላዊ ኢትዮጵያ' },
  { keys: ['document', 'verify', 'qr', 'ሰነድ', 'ማረጋገጫ'], page: 'services', en: 'Document verification is available online via QR code. Check the authenticity of any issued document instantly.', am: 'የሰነድ ማረጋገጫ በQR ኮድ በመስመር ላይ ይገኛል። ማንኛውም የተሰጠ ሰነድ ወዲያውኑ ያረጋግጡ።' },
  { keys: ['hello', 'hi', 'hey', 'ሰላም', 'ጤና'], page: null, en: 'Hello! Welcome to Hossana Mesob One Digital Service Center. How can I assist you today?', am: 'ሰላም! እንኳን ወደ ሆሳዕና መሶብ አንድ ዲጂታል አገልግሎት ማዕከል በደህና መጡ። እንዴት ልረዳዎት?' },
  { keys: ['about', 'who', 'mission', 'ስለ', 'ተልዕኮ'], page: 'about', en: 'Mesob One is a government digital service center in Hossana, Ethiopia, consolidating 12 institutions and 40+ services under one digital roof.', am: 'መሶብ አንድ በሆሳዕና ከተማ የሚገኝ 12 ተቋማትንና ከ40 በላይ አገልግሎቶችን በአንድ ዲጂታል ጣራ ሥር ያካተተ የመንግስት ማዕከል ነው።' },
];

const CHAT_DEFAULT = {
  en: 'Thank you for your message! I can help with services, tracking applications, payments, contact details, and more. Try "services", "track", "payment", or "contact".',
  am: 'መልእክትዎን አመሰግናለሁ! ስለ አገልግሎቶች፣ የጉዳይ ክትትል፣ ክፍያዎችና የመገኛ መረጃ ልረዳዎት እችላለሁ። "አገልግሎት"፣ "ክትትል" ወይም "ክፍያ" ይሞክሩ።',
};

const QUICK_CHIPS = [
  { icon: '💳', label_en: 'Payment', label_am: 'ክፍያ', message: 'payment' },
  { icon: '📍', label_en: 'Track', label_am: 'ክትትል', message: 'track' },
  { icon: '📝', label_en: 'Apply', label_am: 'ምዝገባ', message: 'apply license' },
  { icon: '💬', label_en: 'Complaint', label_am: 'ቅሬታ', message: 'complaint' },
];

/* ── State ───────────────────────────────────────────────────── */
const state = {
  lang: localStorage.getItem('mesob-lang') || 'en',
  theme: localStorage.getItem('mesob-theme') || 'light',
  activePage: 'home',
  heroIndex: 0,
  heroTimer: null,
  newsFilter: 'all',
  newsVisible: 9,
  downloadsFilter: 'all',
  searchIndex: [],
  searchActive: -1,
  chatOpenedOnce: false,
};

/* ── Theme ───────────────────────────────────────────────────── */
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('mesob-theme', theme);
  const dark = theme === 'dark';
  const updates = [
    ['#themeToggleTop', dark ? '☀️ Light' : '🌙 Dark', dark ? '☀️ ብርሃናማ' : '🌙 ጨለማ'],
    ['#themeToggleText', dark ? '☀️ Light Mode' : '🌙 Dark Mode', dark ? '☀️ ብርሃናማ ገጽ' : '🌙 ጨለማ ገጽ'],
  ];
  updates.forEach(([selector, en, am]) => {
    const element = $(selector);
    if (!element) return;
    element.dataset.en = en;
    element.dataset.am = am;
    element.textContent = state.lang === 'am' ? am : en;
  });
}

function toggleTheme() {
  applyTheme(state.theme === 'dark' ? 'light' : 'dark');
}

/* ── Language engine ─────────────────────────────────────────── */
function applyLang() {
  const am = state.lang === 'am';
  document.documentElement.lang = am ? 'am' : 'en';
  localStorage.setItem('mesob-lang', state.lang);

  $$('[data-am]').forEach(el => {
    const target = am ? (el.dataset.am || '') : (el.dataset.en ?? '');
    if (el.dataset.html === 'true') el.innerHTML = target;
    else el.textContent = target;
  });

  $$('[data-am-placeholder]').forEach(el => {
    el.placeholder = am ? el.dataset.amPlaceholder : (el.dataset.enPlaceholder ?? el.placeholder);
  });

  $$('[data-lang-content]').forEach(el => {
    el.style.display = el.dataset.langContent === state.lang ? '' : 'none';
  });

  const langBtn = $('#langToggleText');
  if (langBtn) langBtn.textContent = am ? 'English' : 'አማርኛ';

  // Hero caption follows selected language
  renderHeroCaption(state.heroIndex, false);

  const statusValue = $('#val-statusText');
  if (statusValue && statusValue.dataset.en) {
    statusValue.textContent = am ? statusValue.dataset.am : statusValue.dataset.en;
  }
}

function toggleLanguage() {
  state.lang = state.lang === 'en' ? 'am' : 'en';
  applyLang();
  showToast(state.lang === 'am' ? 'ቋንቋ ወደ አማርኛ ተቀይሯል' : 'Language switched to English', 'success');
}

/* ── Toasts ──────────────────────────────────────────────────── */
function showToast(message, type = 'info') {
  const stack = $('#toastStack');
  if (!stack) return;
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon = document.createElement('span');
  icon.textContent = icons[type] || icons.info;
  const body = document.createElement('span');
  body.textContent = message;
  toast.append(icon, body);
  stack.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 320);
  }, 3200);
}

/* ── SPA routing ─────────────────────────────────────────────── */
const PAGES = ['home', 'about', 'services', 'track', 'news', 'contact'];

function showPage(id) {
  if (!PAGES.includes(id)) id = 'home';
  state.activePage = id;

  $$('.page').forEach(page => page.classList.remove('active'));
  $(`#page-${id}`)?.classList.add('active');

  $$('.nav-link').forEach(link => link.classList.remove('active'));
  $('#nav-' + id)?.classList.add('active');

  $$('.quick-dock a').forEach(link => link.classList.remove('active'));
  $('#dock-' + id)?.classList.add('active');

  history.replaceState(null, '', '#' + id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeMobileMenu();
  observeReveals(); // newly visible elements may need revealing

  // Deep links inside pages (e.g., #leadership)
  const anchorTarget = location.hash.split('/')[1];
  if (anchorTarget) {
    setTimeout(() => scrollToSection(anchorTarget), 60);
  }
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;
  const headerOffset = 86;
  const top = section.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: 'smooth' });
}

window.addEventListener('hashchange', () => {
  const page = location.hash.replace('#', '').split('/')[0];
  if (PAGES.includes(page)) showPage(page);
});

/* ── Mobile menu & more menu ─────────────────────────────────── */
function toggleMobileMenu() {
  $('#hamburgerBtn')?.classList.toggle('open');
  $('#mobileMenu')?.classList.toggle('open');
}
function closeMobileMenu() {
  $('#hamburgerBtn')?.classList.remove('open');
  $('#mobileMenu')?.classList.remove('open');
}
function toggleMoreMenu() { $('#moreDropdown')?.classList.toggle('open'); }
function closeMoreMenu() { $('#moreDropdown')?.classList.remove('open'); }

document.addEventListener('click', event => {
  if (!event.target.closest('.nav-item')) closeMoreMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeSearch();
    closeMobileMenu();
    closeMoreMenu();
  }
});

/* ── Hero carousel ───────────────────────────────────────────── */
function buildHeroDots() {
  const dotsWrap = $('#heroDots');
  if (!dotsWrap) return;
  dotsWrap.innerHTML = '';
  HERO_SLIDES.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' hd-active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
}

function renderHeroCaption(index, animate = true) {
  const slide = HERO_SLIDES[index];
  if (!slide) return;
  const am = state.lang === 'am';
  const titleEl = $('#heroSlideTitle');
  const descEl = $('#heroSlideDesc');
  if (titleEl) {
    titleEl.dataset.en = slide.title_en;
    titleEl.dataset.am = slide.title_am;
    titleEl.textContent = am ? slide.title_am : slide.title_en;
  }
  if (descEl) {
    descEl.dataset.en = slide.desc_en;
    descEl.dataset.am = slide.desc_am;
    descEl.textContent = am ? slide.desc_am : slide.desc_en;
  }
  if (animate) restartCaptionAnimation();
}

function restartCaptionAnimation() {
  $$('#heroText > *').forEach(el => {
    el.style.animation = 'none';
    void el.offsetWidth; // force reflow to restart CSS animation
    el.style.animation = '';
  });
}

function goToSlide(index) {
  const slides = $$('#heroCarousel .hero-slide');
  if (!slides.length) return;
  slides[state.heroIndex]?.classList.remove('hero-slide-active');
  $$('.hero-dot').forEach((dot, i) => dot.classList.toggle('hd-active', i === index));
  state.heroIndex = index % slides.length;
  slides[state.heroIndex].classList.add('hero-slide-active');
  renderHeroCaption(state.heroIndex);
}

function nextSlide() { goToSlide((state.heroIndex + 1) % HERO_SLIDES.length); }
function prevSlide() { goToSlide((state.heroIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length); }

function startHeroTimer() {
  clearInterval(state.heroTimer);
  state.heroTimer = setInterval(nextSlide, 6500);
}

/* ── Animated counters ───────────────────────────────────────── */
function animateCounter(numElement) {
  const target = parseInt(numElement.dataset.val, 10) || 0;
  const finalMarkup = numElement.innerHTML; // preserves <sup> suffixes
  if (target === 0) { numElement.innerHTML = finalMarkup; return; }
  const duration = 1600;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const value = Math.round(eased * target);
    numElement.textContent = value >= 1000 ? value.toLocaleString('en-US') : String(value);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      numElement.innerHTML = finalMarkup;
      numElement.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }],
        { duration: 450, easing: 'cubic-bezier(.22,1,.36,1)' }
      );
    }
  }
  requestAnimationFrame(step);
}

function setupCounters(scope) {
  const numbers = $$('[data-counter-scope] .num[data-val]', scope);
  if (!numbers.length) return;
  let animated = false;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        numbers.forEach(animateCounter);
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(scope);
}

/* ── Scroll reveal system ────────────────────────────────────── */
let revealObserver = null;

function observeReveals() {
  if (!('IntersectionObserver' in window)) {
    $$('[data-reveal], .rv, .rv-stagger').forEach(el => el.classList.add('in-view'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  }
  $$('[data-reveal]').forEach(el => {
    if (!el.classList.contains('in-view')) revealObserver.observe(el);
  });
}

/* ── Dynamic renders ─────────────────────────────────────────── */
function renderServices(filter = 'all') {
  const grid = $('#servicesGrid');
  if (!grid) return;
  const items = SERVICES_CATALOG.filter(item => filter === 'all' || item.cat === filter);
  grid.innerHTML = items.map(item => `
    <div class="scard">
      <div class="scard-icon">${item.icon}</div>
      <h3>${escapeHtml(state.lang === 'am' ? item.am : item.en)}</h3>
      <p>${escapeHtml(state.lang === 'am' ? item.desc_am : item.desc_en)}</p>
      <small style="color:var(--accent); font-weight:700;">${escapeHtml(
        (CATEGORY_LABELS[item.cat] || {})[state.lang] || item.cat)}</small>
    </div>`).join('');
  grid.classList.add('in-view');
}

function renderDownloads(items) {
  const grid = $('#downloadsGrid');
  if (!grid) return;
  const filtered = items.filter(item =>
    state.downloadsFilter === 'all' || item.category === state.downloadsFilter);
  grid.innerHTML = filtered.map(item => `
    <div class="dl-card">
      <div class="dl-icon">${escapeHtml(item.icon || '📄')}</div>
      <div class="dl-body">
        <h4>${escapeHtml(state.lang === 'am' && item.title_am ? item.title_am : item.title)}</h4>
        <p>${escapeHtml(item.description || '')}</p>
        <a class="dl-btn" href="${escapeHtml(item.file_url || '#')}" ${item.file_url && item.file_url !== '#' ? 'download' : ''}
           onclick="${!item.file_url || item.file_url === '#' ? `showToast('${state.lang === 'am' ? 'ናሙና ሰነድ ነው — ፋይል አልተገኘም' : 'Sample entry — file coming soon'}', 'info'); return false` : ``}">
          ⬇ ${state.lang === 'am' ? 'ያውርዱ' : 'Download'}
        </a>
      </div>
    </div>`).join('');
  grid.classList.add('in-view');
}

function renderNews(items) {
  const grid = $('#newsGrid');
  if (!grid) return;
  const filtered = items.filter(item =>
    state.newsFilter === 'all' || item.category === state.newsFilter);
  const visible = filtered.slice(0, state.newsVisible);
  const am = state.lang === 'am';

  grid.innerHTML = visible.map(item => {
    const title = am && item.title_am ? item.title_am : item.title;
    const content = am && item.content_am ? item.content_am : item.content;
    const catLabel = (NEWS_CATEGORY_LABELS[item.category] || {})[state.lang]
      || (NEWS_CATEGORY_LABELS[item.category] || {}).en || item.category;
    const date = (item.created_at || '').slice(0, 10);
    return `
      <article class="ncard">
        <div class="nimg"><span class="ntag">${escapeHtml(catLabel)}</span>📰</div>
        <div class="nbody">
          <div class="ndate">🗓 ${escapeHtml(date)}</div>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(content)}</p>
        </div>
      </article>`;
  }).join('');

  if (filtered.length > state.newsVisible) {
    grid.insertAdjacentHTML('beforeend', `
      <button class="btn btn-outline" id="loadMoreNews" style="grid-column:1/-1;">
        ${am ? 'ተጨማሪ ዜና ይጫኑ' : 'Load More News'}</button>`);
    $('#loadMoreNews')?.addEventListener('click', () => {
      state.newsVisible += 6;
      renderNews(items);
    });
  }
  grid.classList.add('in-view');
}

function renderLeadership(items) {
  const grid = $('#governanceGrid');
  if (!grid) return;
  const am = state.lang === 'am';
  grid.innerHTML = items.map(member => {
    const name = am && member.name_am ? member.name_am : member.name;
    const position = am && member.position_am ? member.position_am : member.position;
    const bio = am && member.bio_am ? member.bio_am : (member.bio_en || member.bio || '');
    const photo = member.photo_url
      ? `<img src="${escapeHtml(member.photo_url)}" alt="${escapeHtml(name)}" loading="lazy">`
      : `<div class="avatar-fallback" style="width:100%;height:100%;display:grid;place-items:center;background:linear-gradient(135deg,var(--primary),var(--accent));color:#fff;font-size:1.8rem;font-weight:800;border-radius:50%;">${escapeHtml(initials(member.name))}</div>`;
    return `
      <div class="gcard">
        <div class="gcard-photo">${photo}</div>
        <div class="gcard-body">
          <h4>${escapeHtml(name)}</h4>
          <p>${escapeHtml(position)}</p>
          <div class="divider"></div>
          <p>${escapeHtml(bio)}</p>
        </div>
      </div>`;
  }).join('');
  grid.classList.add('in-view');
}

function initials(fullName) {
  return fullName.split(/\s+/)
    .filter(word => /^[A-Z\u{1200}-\u{137F}]/u.test(word))
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';
}

async function loadApiData() {
  try {
    const [news, leadership, downloads] = await Promise.all([
      fetchJson('/api/news').catch(() => NEWS_FALLBACK),
      fetchJson('/api/leadership').catch(() => LEADERSHIP_FALLBACK),
      fetchJson('/api/downloads').catch(() => DOWNLOADS_FALLBACK),
    ]);
    renderNews(Array.isArray(news) && news.length ? news : NEWS_FALLBACK);
    renderLeadership(Array.isArray(leadership) && leadership.length ? leadership : LEADERSHIP_FALLBACK);
    renderDownloads(Array.isArray(downloads) && downloads.length ? downloads : DOWNLOADS_FALLBACK);
    buildSearchIndex(downloads, news);
  } catch {
    renderNews(NEWS_FALLBACK);
    renderLeadership(LEADERSHIP_FALLBACK);
    renderDownloads(DOWNLOADS_FALLBACK);
    buildSearchIndex(DOWNLOADS_FALLBACK, NEWS_FALLBACK);
  }
}

/* ── Filters ─────────────────────────────────────────────────── */
function setupFilters() {
  $$('#serviceFilter .filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      $$('#serviceFilter .filter-btn').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      renderServices(button.dataset.filter);
    });
  });
  $$('#downloadFilter .filter-btn').forEach(button => {
    button.addEventListener('click', async () => {
      $$('#downloadFilter .filter-btn').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      state.downloadsFilter = button.dataset.cat || 'all';
      let items;
      try { items = await fetchJson('/api/downloads'); } catch { items = DOWNLOADS_FALLBACK; }
      renderDownloads(items.length ? items : DOWNLOADS_FALLBACK);
    });
  });
}

/* ── Application tracking ────────────────────────────────────── */
const TRACK_STEPS = [
  { en: 'Submitted', am: 'ተልኳል' },
  { en: 'Verification', am: 'ማረጋገጫ' },
  { en: 'Processing', am: 'በሂደት ላይ' },
  { en: 'Ready', am: 'ተጠናቋል' },
];

function hashString(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function trackApplication() {
  const input = $('#trackInput');
  const resultPanel = $('#trackResult');
  if (!input || !resultPanel) return;
  const reference = input.value.trim().toUpperCase();

  if (!reference) {
    showToast(state.lang === 'am' ? 'እባክዎ የማጣቀሻ ቁጥር ያስገቡ።' : 'Please enter your reference number.', 'error');
    input.focus();
    return;
  }

  const seedValue = hashString(reference);
  const currentStage = (seedValue % 4) + 1;               // 1..4 completed/current step
  const serviceName = SERVICES_CATALOG[seedValue % SERVICES_CATALOG.length];
  const applicantNames = ['Ato Kebede Alemu', 'W/ro Almaz Bekele', 'Ato Solomon Girma', 'W/ro Hiwot Tadesse'];
  const applicantName = applicantNames[seedValue % applicantNames.length];
  const am = state.lang === 'am';

  // Reset step visuals
  for (let stepIndex = 1; stepIndex <= 4; stepIndex++) {
    const step = $('#step-' + stepIndex);
    step?.classList.remove('done', 'current');
    const dateEl = $('#date-step-' + stepIndex);
    if (dateEl) dateEl.textContent = '-';
  }

  // Mark completed steps with staggered timing for the animation
  for (let stepIndex = 1; stepIndex <= currentStage; stepIndex++) {
    setTimeout(() => {
      const step = $('#step-' + stepIndex);
      if (!step) return;
      step.classList.add(stepIndex === currentStage ? 'current' : 'done');
      const daysAgo = (currentStage - stepIndex) * 3 + 1;
      const date = new Date(Date.now() - daysAgo * 86400000);
      $('#date-step-' + stepIndex).textContent =
        `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    }, stepIndex * 220);
  }

  const progressPercent = ((currentStage - 1) / 3) * 84;
  setTimeout(() => {
    const bar = $('#trackProgress');
    if (bar) bar.style.width = progressPercent + '%';
  }, 150);

  const etaDays = (4 - currentStage) * 3;
  const etaDate = new Date(Date.now() + etaDays * 86400000);

  const statusValue = $('#val-statusText');
  const statusEn = TRACK_STEPS[currentStage - 1].en;
  const statusAm = TRACK_STEPS[currentStage - 1].am;
  statusValue.dataset.en = statusEn;
  statusValue.dataset.am = statusAm;
  statusValue.textContent = am ? statusAm : statusEn;

  $('#val-applicantName').textContent = applicantName;
  $('#val-serviceName').textContent = am ? serviceName.am : serviceName.en;
  $('#val-etaDate').textContent =
    `${String(etaDate.getDate()).padStart(2, '0')}/${String(etaDate.getMonth() + 1).padStart(2, '0')}/${etaDate.getFullYear()}`;

  resultPanel.classList.add('show');
  showToast(am ? 'ማመልከቻው ተገኝቷል — ሁኔታው ከታች ይመልከቱ።' : 'Application found — see live status below.', 'success');
}

/* ── Forms ───────────────────────────────────────────────────── */
async function postFeedback(payload) {
  const response = await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function handleContactSubmit(event) {
  event.preventDefault();
  const am = state.lang === 'am';
  const submitButton = event.target.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  try {
    await postFeedback({
      name: $('#c-name').value.trim(),
      email: $('#c-email').value.trim(),
      message: `[${$('#c-topic').value}] ${$('#c-message').value.trim()}`,
    });
    showToast(am ? 'መልዕክትዎ በተሳካ ሁኔታ ተልኳል!' : 'Message sent successfully!', 'success');
    event.target.reset();
  } catch {
    showToast(am ? 'መላክ አልተቻለም — እባክዎ እንደገና ይሞክሩ።' : 'Could not send message — please retry.', 'error');
  } finally {
    submitButton.disabled = false;
  }
}

async function handleSubscribe(event) {
  event.preventDefault();
  const emailInput = $('#newsletterEmail');
  const am = state.lang === 'am';
  if (!emailInput?.value.trim()) return;
  try {
    await postFeedback({
      name: 'Newsletter Subscriber',
      email: emailInput.value.trim(),
      message: 'Newsletter subscription request',
    });
    showToast(am ? 'ለደመና አመሰግናለሁ!' : 'Thank you for subscribing!', 'success');
    event.target.reset();
  } catch {
    showToast(am ? 'ምዝገባ አልተሳካም — እንደገና ይሞክሩ።' : 'Subscription failed — please retry.', 'error');
  }
}

/* ── Search palette ──────────────────────────────────────────── */
function baseSearchEntries() {
  const t = (en, am) => (state.lang === 'am' ? am : en);
  const entries = [
    { icon: '🏠', title: t('Home Page', 'ዋና ገጽ'), desc: t('Go to homepage', 'ወደ መነሻ ገጽ'), run: () => showPage('home') },
    { icon: 'ℹ️', title: t('About Us', 'ስለ እኛ'), desc: t('Identity, mission, reform', 'ማንነት፣ ተልዕኮ፣ ሪፎርም'), run: () => showPage('about') },
    { icon: '🧾', title: t('Digital Services', 'ዲጂታል አገልግሎቶች'), desc: t('All online services', 'ሁሉም አገልግሎቶች'), run: () => showPage('services') },
    { icon: '📍', title: t('Track Application', 'የጉዳይ ክትትል'), desc: t('Check your status', 'ሁኔታዎን ይመልከቱ'), run: () => showPage('track') },
    { icon: '📰', title: t('News & Updates', 'ዜናዎች'), desc: t('Latest announcements', 'የቅርብ ጊዜ ማስታወቂያዎች'), run: () => showPage('news') },
    { icon: '✉️', title: t('Contact Us', 'ያግኙን'), desc: t('Support & feedback', 'ድጋፍና አስተያየት'), run: () => showPage('contact') },
    { icon: '🌙', title: t('Toggle Dark Mode', 'ጨለማ ገጽ ቀይር'), desc: t('Switch theme', 'ገጽታ መቀየር'), run: toggleTheme },
    { icon: '🌐', title: t('Switch Language', 'ቋንቋ ቀይር'), desc: t('English / Amharic', 'እንግሊዝኛ / አማርኛ'), run: toggleLanguage },
  ];
  SERVICES_CATALOG.forEach(service => {
    entries.push({
      icon: service.icon,
      title: state.lang === 'am' ? service.am : service.en,
      desc: (CATEGORY_LABELS[service.cat] || {})[state.lang] || service.cat,
      run: () => showPage('services'),
    });
  });
  return entries;
}

function buildSearchIndex(downloads = [], news = []) {
  const entries = baseSearchEntries();
  const downloadList = Array.isArray(downloads) && downloads.length ? downloads : DOWNLOADS_FALLBACK;
  const newsList = Array.isArray(news) && news.length ? news : NEWS_FALLBACK;
  downloadList.forEach(item => entries.push({
    icon: item.icon || '📂',
    title: item.title,
    desc: item.description || '',
    run: () => showPage('services'),
  }));
  newsList.forEach(item => entries.push({
    icon: '📰',
    title: item.title,
    desc: (item.content || '').slice(0, 70) + '…',
    run: () => showPage('news'),
  }));
  state.searchIndex = entries;
}

function openSearch() {
  const overlay = $('#searchOverlay');
  const input = $('#searchInput');
  if (!overlay) return;
  overlay.classList.add('open');
  if (input) {
    input.value = '';
    renderSearchResults('');
    setTimeout(() => input.focus(), 60);
  }
}

function closeSearch() {
  $('#searchOverlay')?.classList.remove('open');
  state.searchActive = -1;
}

function renderSearchResults(query) {
  const wrap = $('#searchResults');
  if (!wrap) return;
  const q = query.trim().toLowerCase();
  const matches = q
    ? state.searchIndex.filter(item =>
        `${item.title} ${item.desc}`.toLowerCase().includes(q))
    : state.searchIndex.slice(0, 8);

  state.searchActive = matches.length ? 0 : -1;
  if (!matches.length) {
    wrap.innerHTML = `<div class="sres-empty">${
      state.lang === 'am' ? 'ውጤት አልተገኘም — "ክፍያ"፣ "ክትትል" ወይም "አገልግሎት" ይሞክሩ።'
        : 'No results found. Try "payment", "track", or "license".'}</div>`;
    return;
  }
  wrap.innerHTML = matches.slice(0, 12).map((item, i) => `
    <div class="sres-item ${i === 0 ? 'active' : ''}" data-index="${i}">
      <div class="sres-icon">${item.icon}</div>
      <div><h5>${escapeHtml(item.title)}</h5><p>${escapeHtml(item.desc || '')}</p></div>
    </div>`).join('');
  wrap._matches = matches;
}

function activateSearchResult(matches, index) {
  const item = matches[index];
  if (!item) return;
  closeSearch();
  item.run();
}

function setupSearchEvents() {
  const overlay = $('#searchOverlay');
  const input = $('#searchInput');
  const results = $('#searchResults');

  input?.addEventListener('input', () => renderSearchResults(input.value));
  input?.addEventListener('keydown', event => {
    const matches = results?._matches || [];
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      state.searchActive = Math.min(state.searchActive + 1, matches.length - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      state.searchActive = Math.max(state.searchActive - 1, 0);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      activateSearchResult(matches, state.searchActive);
      return;
    } else {
      return;
    }
    $$('.sres-item', results).forEach((el, i) => {
      el.classList.toggle('active', i === state.searchActive);
      if (i === state.searchActive) el.scrollIntoView({ block: 'nearest' });
    });
  });

  results?.addEventListener('click', event => {
    const row = event.target.closest('.sres-item');
    if (!row) return;
    activateSearchResult(results._matches || [], parseInt(row.dataset.index, 10));
  });

  overlay?.addEventListener('click', event => {
    if (event.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      overlay?.classList.contains('open') ? closeSearch() : openSearch();
    }
  });
}

/* ── Chat widget ─────────────────────────────────────────────── */
function appendChatMessage(role, text) {
  const body = $('#chatBody');
  if (!body) return;
  const bubble = document.createElement('div');
  bubble.className = `msg ${role}`;
  bubble.textContent = text; // textContent → XSS-safe
  body.appendChild(bubble);
  body.scrollTop = body.scrollHeight;
}

function showChatTyping() {
  const body = $('#chatBody');
  if (!body) return null;
  const typing = document.createElement('div');
  typing.className = 'chat-typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  body.appendChild(typing);
  body.scrollTop = body.scrollHeight;
  return typing;
}

function getChatResponse(message) {
  const lower = message.toLowerCase();
  for (const rule of CHAT_RULES) {
    if (rule.keys.some(key => lower.includes(key))) return rule;
  }
  return null;
}

function processChatMessage(message) {
  const rule = getChatResponse(message);
  const typing = showChatTyping();
  setTimeout(() => {
    typing?.remove();
    const reply = rule
      ? (state.lang === 'am' ? rule.am : rule.en)
      : (state.lang === 'am' ? CHAT_DEFAULT.am : CHAT_DEFAULT.en);
    appendChatMessage('bot', reply);
    if (rule?.page) {
      setTimeout(() => {
        appendChatMessage('bot', state.lang === 'am'
          ? `👉 ${rule.page === 'services' ? 'ወደ አገልግሎቶች ገጽ' : 'ወደ ገጹ'} እየላኩልዎት ነው…`
          : '👉 Taking you to the right page now…');
        showPage(rule.page);
      }, 900);
    }
  }, 850 + Math.random() * 500);
}

function sendChatMessage() {
  const input = $('#chatInput');
  const message = input?.value.trim();
  if (!message) return;
  appendChatMessage('user', message);
  input.value = '';
  processChatMessage(message);
}

function renderQuickChips() {
  const area = $('#chatQuickArea');
  if (!area) return;
  area.innerHTML = '';
  QUICK_CHIPS.forEach(chip => {
    const button = document.createElement('button');
    button.className = 'chip';
    button.textContent = `${chip.icon} ${state.lang === 'am' ? chip.label_am : chip.label_en}`;
    button.addEventListener('click', () => {
      appendChatMessage('user', button.textContent);
      processChatMessage(chip.message);
    });
    area.appendChild(button);
  });
}

function toggleChatWindow() {
  const win = $('#chatWindow');
  win?.classList.toggle('open');
  if (win?.classList.contains('open') && !state.chatOpenedOnce) {
    state.chatOpenedOnce = true;
    setTimeout(() => {
      appendChatMessage('bot', state.lang === 'am'
        ? 'ሰላም! እኔ የመሶብ አንድ የድጋፍ ረዳት ነኝ። እንዴት ልረዳዎት?'
        : 'Hello! I am the Mesob One Support Assistant. How can I help you today?');
      renderQuickChips();
    }, 350);
  } else if (win?.classList.contains('open')) {
    renderQuickChips();
  }
}

/* ── Scroll effects ──────────────────────────────────────────── */
function setupScrollEffects() {
  const header = $('header#header');
  const progressBar = $('#readProgress');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header?.classList.toggle('scrolled', window.scrollY > 40);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = docHeight > 0
        ? `${(window.scrollY / docHeight) * 100}%` : '0%';
      ticking = false;
    });
  }, { passive: true });
}

/* ── Boot ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Cache original English strings before any language swap
  $$('[data-am]').forEach(el => {
    if (el.dataset.html === 'true') el.dataset.en = el.innerHTML;
    else if (el.dataset.en === undefined) el.dataset.en = el.textContent;
  });
  $$('[data-am-placeholder]').forEach(el => {
    if (el.dataset.enPlaceholder === undefined) el.dataset.enPlaceholder = el.placeholder;
  });

  applyTheme(state.theme);
  buildHeroDots();
  startHeroTimer();
  applyLang();
  renderServices('all');
  renderDownloads(DOWNLOADS_FALLBACK);
  renderNews(NEWS_FALLBACK);
  renderLeadership(LEADERSHIP_FALLBACK);
  loadApiData();
  setupFilters();
  setupSearchEvents();
  setupScrollEffects();
  observeReveals();
  $$('[data-counter-scope]').forEach(setupCounters);

  const startHash = location.hash.replace('#', '').split('/')[0];
  if (startHash && PAGES.includes(startHash) && startHash !== 'home') {
    showPage(startHash);
  }

  $('#chatInput')?.addEventListener('keydown', event => {
    if (event.key === 'Enter') sendChatMessage();
  });
});

/* Public API for inline handlers */
Object.assign(window, {
  showPage, toggleLanguage, toggleTheme, toggleMobileMenu, toggleMoreMenu, closeMoreMenu,
  scrollToSection, prevSlide, nextSlide, goToSlide, trackApplication,
  handleContactSubmit, handleSubscribe, openSearch, closeSearch,
  sendChatMessage, toggleChatWindow, showToast,
});
