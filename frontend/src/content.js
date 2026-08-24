/* ================================================================
   HOSSANA MESOB ONE — Content (character-for-character from the
   fahom.pythonanywhere.com template; EN/አማ pairs where provided)
   ================================================================ */

export const BRAND = {
  en: 'HOSSANA MESOB ONE DIGITAL SERVICE CENTER',
  am: 'የሆሳዕና መሶብ አንድ ማዕከል ዲጂታል አገልግሎት',
  logo: '/assets/logo.jpg',
  phone: '+251 90 324 6324',
  email: 'hossanmesob@gamil.com',
  website: 'mesobone.gov.et',
  locationTopbar: '📍 Central Ethiopia Regional State, Hadiya Zone, Hossana',
};

export const NAV = [
  { id: 'home', icon: '🏠', en: 'Home', am: 'ዋና ገጽ' },
  {
    id: 'about', icon: '🏛️', en: 'About', am: 'ስለ እኛ',
    children: [
      { anchor: 'identity', en: 'Institutional Identity', am: 'የተቋም ማንነት' },
      { anchor: 'mission', en: 'Mission & Vision', am: 'ተልዕኮና ራዕይ' },
      { anchor: 'testimonials', en: 'Testimonials', am: 'ምስክርነቶች' },
      { anchor: 'mandate', en: 'Mandate', am: 'ተልዕኮ' },
      { anchor: 'reform', en: 'National Reform Strategy', am: 'የለውጥ ስትራቴጂ' },
      { anchor: 'criteria', en: 'Selection Criteria', am: 'የመርጫ መስፈርቶች' },
      { anchor: 'leadership', en: 'Leadership Structure', am: 'የአመራር መዋቅር' },
    ],
  },
  {
    id: 'services', icon: '🧾', en: 'Services', am: 'አገልግሎቶች',
    children: [
      { anchor: 'core', en: 'Core Services', am: 'ዋና አገልግሎቶች' },
      { anchor: 'categories', en: 'Service Categories', am: 'የአገልግሎት ምድቦች' },
      { anchor: 'library', en: 'Resource Library', am: 'ሰነዶች ማውረጃ' },
    ],
  },
  { id: 'track', icon: '📍', en: 'Track', am: 'ክትትል' },
  { id: 'news', icon: '📰', en: 'News', am: 'ዜና' },
  { id: 'contact', icon: '✉️', en: 'Contact Us', am: 'ያግኙን' },
];

export const HERO_SLIDES = [
  { img: '/assets/office.jpg' },
  { img: '/assets/hero-1.jpg' },
  { img: '/assets/hero-2.jpg' },
  { img: '/assets/hero-3.jpg' },
  { img: '/assets/hero-4.jpg' },
  { img: '/assets/hero-5.jpg' },
  { img: '/assets/hero-6.jpg' },
  { img: '/assets/hero-7.jpg' },
  { img: '/assets/hero-8.jpg' },
];

export const HERO_TEXT = {
  badge: '🇪🇹 Official Government Digital Platform · 2026',
  title: { en: 'Welcome to Mesob One', am: 'እንኳን ወደ መሶብ አንድ በደህና መጡ' },
  subtitle: {
    en: 'One roof, every government service — built around the people of Hossana.',
    am: 'በአንድ ጣራ ሥር፣ ሁሉም የመንግሥት አገልግሎቶች — ለሆሳዕና ህዝብ ተኮር።',
  },
  cta1: { en: 'Explore Our Services', am: 'አገልግሎቶችን ይመልከቱ' },
  cta2: { en: 'Track Your Application', am: 'ያመለከቱትን ይከታተሉ' },
};

export const ABOUT_HOME = {
  kicker: { en: 'About the Center', am: 'ስለ ማዕከሉ' },
  title: { en: 'Welcome to Hossana Mesob One — Every Government Service, In One Roof', am: 'እንኳን ወደ ሆሳዕና መሶብ አንድ በደህና መጡ — ሁሉም አገልግሎት በአንድ ጣራ' },
  p1: {
    en: 'Citizens completing trade license registration, Fayda Digital ID, Ethiopost, and telebirr payments — all in a single visit. The glowing Mesob basket at the center symbolizes our role as Hossana\u2019s convergence point for government services.',
    am: 'ዜጎች የንግድ ፈቃድ ምዝገባ፣ ፋይዳ ዲጂታል መታወቂያ፣ ኢትዮጵያ ፖስታ እና ቴሌብር ክፍያዎችን — ሁሉንም በአንድ ጉብኝት ይጠናቀቃሉ።',
  },
  p2: {
    en: 'Mesob One is more than an office — it\u2019s a promise. A promise that government service in Hossana can be fast, transparent, and genuinely citizen-first. Born from Ethiopia\u2019s national digital transformation agenda, we\u2019ve brought services once scattered across a dozen desks together under one welcoming roof, closing the distance between our citizens and the services they deserve.',
    am: 'መሶብ አንድ ቢሮ ብቻ ሳይሆን ተስፋ ነው። በሆሳዕና የመንግሥት አገልግሎት ፈጣን፣ ግልጽ እና በእውነተኛ ሁኔታ የዜጎች መጀመሪያ መሆን የሚችል ተስፋ።',
  },
  p3: {
    en: 'Every queue we remove, every form we digitize, and every minute we save is a step toward a Hossana where trust in public service is earned daily — not assumed. From real-time application tracking to instant digital payments, we\u2019ve replaced uncertainty with visibility, and long waits with same-day answers.',
    am: 'እያንዳንዱን ወረፋ በማስወገድ፣ እያንዳንዱን ቅጽ በዲጂታል መቀየር እና እያንዳንዱን ደቂቃ በመቆጠብ ወደ ፍጥነት እና ግልጽነት እንሸጋገራለን።',
  },
  badges: ['🏛 Governmental Institution', '📄 Paperless Services', '🤝 Contactless'],
  more: { en: 'Learn More About Us', am: 'ተጨማሪ ይመልከቱ' },
};

export const BENEFITS = {
  kicker: { en: 'Our Benefits', am: 'ጥቅሞቻችን' },
  title: { en: 'Impact of the Digital Service', am: 'የዲጂታል አገልግሎት ተጽዕኖ' },
  desc: {
    en: 'The benefits that the shift "from paper to screen" brings to citizens and government institutions alike.',
    am: '"ከወረቀት ወደ ስክሪን" የሚባለው ለውጥ ለዜጎችና ለመንግስት ተቋማት የሚገነባው ጥቅም።',
  },
  stats: [
    { num: '24/7', label: { en: 'Accessibility', am: 'ተደራሽነት' } },
    { num: '0', label: { en: 'Paper Used', am: 'የተጠቀምንበት ወረቀት' } },
    { num: '0', label: { en: 'Direct Contact', am: 'ቀጥታ ንክኪ' } },
    { num: '12', label: { en: 'Institutions', am: 'ተቋማት' } },
    { num: '40+', prefixAm: 'ከ', label: { en: 'Governmental Services', am: 'የመንግስት አገልግሎቶች' } },
  ],
};

export const CORE_SERVICES = [
  { icon: '📝', en: 'Online Application & Registration', am: 'በመስመር ላይ ማመልከቻና ምዝገባ', den: 'Filling out and submitting forms online for trade licenses, construction permits, residency ID, and document verifications.', dam: 'የንግድ ፈቃድ፣ የግንባታ ፈቃድ፣ የነዋሪ መታወቂያ እና የሰነድ ማረጋገጫ ቅጾችን በመስመር ላይ መሙላትና ማስገባት።' },
  { icon: '💳', en: 'E-Payment', am: 'ኤሌክትሮኒክ ክፍያ', den: 'Paying fees, license renewals, and taxes directly via telebirr, CBE Birr, and other banking apps.', dam: 'ክፍያዎችን፣ የፈቃድ እድሳትና ግብርን በቀጥታ በቴሌብር፣ CBE Birr እና ሌሎች የባንክ መተግበሪያዎች መክፈል።' },
  { icon: '📍', en: 'Application Tracking', am: 'የማመልከቻ ክትትል', den: 'Easily tracking the status of submitted applications via SMS or directly on the website.', dam: 'የቀረቡ ማመልከቻዎችን ሁኔታ በSMS ወይም በቀጥታ በድረ-ገጹ በቀላሉ መከታተል።' },
  { icon: '✅', en: 'Document Verification', am: 'የሰነድ ማረጋገጫ', den: 'Quickly verifying the authenticity of issued trade licenses or IDs using a QR code.', dam: 'የተሰጡ የንግድ ፈቃድ ወይም መታወቂያዎችን በQR ኮድ በፍጥነት ማረጋገጥ።' },
  { icon: '💬', en: 'Complaints & Feedback', am: 'ቅሬታና አስተያየት', den: 'Submitting service-related questions and complaints directly through the digital system and receiving a response.', dam: 'ከአገልግሎት ጋር የተያያዙ ጥያቄዎችንና ቅሬታዎችን በዲጂታል ስርዓቱ አማካኝነት አስገብተው ምላሽ መቀበል።' },
  { icon: '🚦', en: 'Queue Management System', am: 'የወረፋ አስተዳደር ስርዓት', den: 'Technology-supported queue control tools that fully eliminate back-and-forth visits and long wait times.', dam: 'ተደጋጋሚ ጉብኝቶችንና ረጅም የመጠበቅ ጊዜን ሙሉ በሙሉ የሚያስወግዱ የቴክኖሎጂ የወረፋ ቁጥጥር መሣሪያዎች።' },
];

export const ORBIT = {
  kicker: { en: 'MESOB in Action', am: 'መሶብ በስራ ላይ' },
  title: { en: 'Our Services — All in Mesob', am: 'አገልግሎቶቻችን — ሁሉም በመሶብ' },
  desc: {
    en: 'Watch how Hossana\u2019s unified digital government platform brings 12 institutions and 40+ services under one roof.',
    am: '12 ተቋማትን እና ከ40+ አገልግሎቶችን በአንድ ጣራ ሥር የሚያካትተውን የሆሳዕና የተቀናጀ ዲጂታል መድረክ ይመልከቱ።',
  },
  chips: ['📍 Hossana', '🇪🇹 Hadiya Zone', '⚡ 24/7 Digital'],
  caption: 'PARTNER INSTITUTIONS',
  logos: [
    { src: '/assets/partner-fayda.jpg', name: 'Fayda Digital ID' },
    { src: '/assets/partner-cbe.jpg', name: 'Commercial Bank of Ethiopia' },
    { src: '/assets/partner-telecom.jpg', name: 'Ethio Telecom' },
    { src: '/assets/partner-post.jpg', name: 'Ethiopost' },
    { src: '/assets/partner-docauth.jpg', name: 'Document Authentication & Registration Service' },
    { src: '/assets/partner-revenue.jpg', name: 'Revenue Bureau' },
    { src: '/assets/partner-trade.jpg', name: "Trade & Market Development Bureau" },
  ],
};

export const INSTITUTION_SERVICES = [
  {
    key: 'verify', cat: 'Verification', catAm: 'ማረጋገጫ', icon: '✅', timing: '⏱ Instant', timingAm: '⏱ ከተወሰነ',
    en: 'Document Verification', am: 'የሰነድ ማረጋገጫ',
    den: 'Working across all services to verify the authenticity of official documents using QR Code — streamlining document verification and enabling quick authentication or service access via QR code.',
    dam: 'በሁሉም አገልግሎቶች ላይ የኦፊሴላዊ ሰነዶችን ትክክለኛነት በQR ኮድ ማረጋገጥ — የሰነድ ማረጋገጫን ቀላል አድርጎ በQR ኮድ አማካኝነት ፈጣን ማረጋገጫ ወይም የአገልግሎት መዳረሻ መፍጠር።',
    status: 'online', statusEn: '● Available Online', statusAm: '● በመስመር ላይ ይገኛል',
  },
  {
    key: 'fayda', cat: 'National ID', catAm: 'ብሔራዊ መታወቂያ', icon: '🆔', timing: '⏱ By Appointment', timingAm: '⏱ በቀጠሮ',
    en: 'Fayda Digital ID / National ID', am: 'ፋይዳ ዲጂታል መታወቂያ',
    den: 'New Fayda registration (regular & urgent appointments) • Correction of name, address, phone, photo or identity errors • Reprinting lost Fayda Digital IDs',
    dam: 'አዲስ የፋይዳ ምዝገባ (መደበኛ እና አስቸኳይ ቀጠሮዎች) • የስም፣ አድራሻ፣ ስልክ፣ ፎቶ ወይም የማንነት ስህተቶች ማስተካከል • የጠፋ ፋይዳ ዲጂታል መታወቂያ እንደገና ማተም',
    status: 'online', statusEn: '● Available', statusAm: '● ይገኛል',
  },
  {
    key: 'post', cat: 'Postal', catAm: 'ፖስታ', icon: '📮', timing: '⏱ Same / Next Day', timingAm: '⏱ በተመሳሳይ / በሚቀጥለው ቀን',
    en: 'Ethiopost', am: 'ኢትዮጵያ ፖስታ',
    den: 'Print order intake for new Fayda Digital ID registrants • Delivering printed IDs to clients on appointment date • Receiving & delivering domestic and international packages • Full postal service for individuals',
    dam: 'ለአዲስ የፋይዳ ተመዛጋቢዎች የህትመት ትዕዛዝ መቀበል • የታተሙ መታወቂያዎችን በቀጠሮ ቀን ለደንበኞች ማድረስ • የአገር ውስጥና ዓለም አቀፍ ጥቅሎችን መቀበልና ማድረስ • ለግል ዜጎች ሙሉ የፖስታ አገልግሎት',
    status: 'online', statusEn: '● Available', statusAm: '● ይገኛል',
  },
  {
    key: 'telecom', cat: 'Telecom', catAm: 'ቴሌኮም', icon: '📱', timing: '⏱ Instant – 1 Day', timingAm: '⏱ ከተወሰነ – 1 ቀን',
    en: 'Ethio Telecom', am: 'ኢትዮ ቴሌኮም',
    den: 'Correction of personal document errors (passport, digital ID — name, address, phone, photo) • Enabling citizens to pay for Mesob services via Telebirr • Opening new Telebirr accounts for first-time users',
    dam: 'የግል ሰነድ ስህተቶች ማስተካከል (ፓስፖርት፣ ዲጂታል መታወቂያ — ስም፣ አድራሻ፣ ስልክ፣ ፎቶ) • ዜጎች የመሶብ አገልግሎቶችን በቴሌብር ክፍልነት መክፈል • ለአዲስ ተጠቃሚዎች አዲስ የቴሌብር ሒሳብ መክፈት',
    status: 'online', statusEn: '● Available', statusAm: '● ይገኛል',
  },
  {
    key: 'trade', cat: 'Trade', catAm: 'ንግድ', icon: '💼', timing: '⏱ ~3–5 working days', timingAm: '⏱ ~3–5 የስራ ቀናት',
    en: "Trade & Market Development Bureau", am: 'የንግድና ገበያ ልማት ቢሮ',
    den: 'New trade license registration • Delivering license to client • Annual renewal • Amendment • Cancellation • Replacement license — and up to 8 additional sub-services.',
    dam: 'አዲስ የንግድ ፈቃድ ምዝገባ • ፈቃዱን ለደንበኛ መስጠት • ዓመታዊ እድሳት • ማሻሻያ • መሰረዝ • ምትክ ፈቃድ — እና እስከ 8 ተጨማሪ ንዑስ አገልግሎቶች።',
    status: 'online', statusEn: '● Available', statusAm: '● ይገኛል',
  },
  {
    key: 'banking', cat: 'Banking', catAm: 'ባንኪንግ', icon: '🏦', timing: '⏱ Instant', timingAm: '⏱ ከተወሰነ',
    en: 'Commercial Bank of Ethiopia', am: 'የኢትዮጵያ ንግድ ባንክ',
    den: '• New CBE account opening • Cashless payment (Internet Banking, Mobile Banking, Merchants, Agents) • All-in-One fast-access banking service • Harmonization — linking bank account with Digital ID',
    dam: '• አዲስ የCBE ሒሳብ መክፈት • ያለጥሬ እንጦብ ክፍያ (ኢንተርኔት ባንኪንግ፣ ሞባይል ባንኪንግ፣ ነጋዴዎች፣ ኤጀንቶች) • All-in-One ፈጣን የባንኪንግ አገልግሎት • Harmonization — የባንክ ሒሳብን ከዲጂታል መታወቂያ ጋር ማገናኘት',
    status: 'online', statusEn: '● Available', statusAm: '● ይገኛል',
  },
  {
    key: 'revenue', cat: 'Revenue Bureau', catAm: 'የግብር ቢሮ', icon: '🧾', timing: '⏱ 1–3 working days', timingAm: '⏱ 1–3 የስራ ቀናት',
    en: 'Revenue Bureau', am: 'የግብር ቢሮ',
    den: '• Issuing Tax number / TIN number for individual traders and registered associations • Performing tax assessment • Issuing tax clearance for traders and students (cost sharing) • Conducting tax analysis • Performing auditing • Handling complaints',
    dam: '• ለግል ነጋዴዎች እና ለተመዘገቡ ማኅበራት የግብር ቁጥር / TIN ቁጥር መስጠት • የግብር ግምገማ ማካሄድ • ለነጋዴዎች እና ለተማሪዎች (የወጪ መጋራት) የግብር ማጽዳት ማስገባት • የግብር ትንተና ማካሄድ • ኦዲት ማካሄድ • ቅሬታዎችን መቋቋም',
    status: 'online', statusEn: '● Available Online', statusAm: '● በመስመር ላይ ይገኛል',
  },
];

export const SERVICE_CATEGORIES_EXTRA = [
  { cat: 'Cadastre', catAm: 'ካዳስተር', icon: '🗺️', timing: '⏱ TBD', en: 'Cadastre / Municipal Service', am: 'ካዳስተር / ማዘጋጃ አገልግሎት', den: 'Land cadastre and municipal administrative services.', dam: 'የመሬት ካዳስተር እና ማዘጋጃ አስተዳደር አገልግሎቶች።', status: 'soon', statusEn: '● Coming Soon', statusAm: '● በቅርቡ' },
  { cat: 'Immigration', catAm: 'ኢሚግሬሽን', icon: '🛂', timing: '⏱ TBD', en: 'Immigration & Citizenship Service', am: 'ኢሚግሬሽን እና ዜግነት አገልግሎት', den: 'Passport, visa, and citizenship services for residents and foreign nationals.', dam: 'ለነዋሪዎች እና ለውጭ ዜጎች ፓስፖርት፣ ቪዛ እና ዜግነት አገልግሎቶች።', status: 'soon', statusEn: '● Coming Soon', statusAm: '● በቅርቡ' },
  { cat: "Land Dev't", catAm: 'የመሬት ልማት', icon: '🏗️', timing: '⏱ TBD', en: 'Land Development', am: 'የመሬት ልማት', den: 'Land use planning and development services.', dam: 'የመሬት አጠቃቀም ዕቅድ እና ልማት አገልግሎቶች።', status: 'soon', statusEn: '● Coming Soon', statusAm: '● በቅርቡ' },
];

export const CATEGORY_TABS = [
  { id: 'all', en: 'All Services', am: 'ሁሉም አገልግሎቶች' },
  { id: 'Verification', en: 'Verification', am: 'ማረጋገጫ' },
  { id: 'National ID', en: 'National ID', am: 'ብሔራዊ መታወቂያ' },
  { id: 'Postal', en: 'Postal', am: 'ፖስታ' },
  { id: 'Telecom', en: 'Telecom', am: 'ቴሌኮም' },
  { id: 'Trade', en: 'Trade', am: 'ንግድ' },
  { id: 'Banking', en: 'Banking', am: 'ባንኪንግ' },
  { id: 'Revenue Bureau', en: 'Revenue Bureau', am: 'የግብር ቢሮ' },
  { id: 'Cadastre', en: 'Cadastre / Municipal Service', am: 'ካዳስተር' },
  { id: 'Immigration', en: 'Immigration & Citizenship Service', am: 'ኢሚግሬሽን' },
  { id: "Land Dev't", en: 'Land Development', am: 'የመሬት ልማት' },
];

export const DOWNLOAD_CATS = [
  { id: 'all', en: 'All Documents', am: 'ሁሉም ሰነዶች' },
  { id: 'forms', en: 'Forms', am: 'ቅጾች' },
  { id: 'guidelines', en: 'Guidelines', am: 'መመሪያዎች' },
  { id: 'reports', en: 'Reports', am: 'ሪፖርቶች' },
  { id: 'regulations', en: 'Regulations', am: 'ደንቦች' },
];

export const NEWS_FILTERS = [
  { id: 'all', en: 'All', am: 'ሁሉም' },
  { id: 'service', en: 'Service', am: 'አገልግሎት' },
  { id: 'reform', en: 'Reform', am: 'ሪፎርም' },
  { id: 'announcement', en: 'Announcements', am: 'ማስታወቂያዎች' },
  { id: 'update', en: 'Updates', am: 'ዝማኔዎች' },
];

export const NEWS_FALLBACK = [
  { id: 1, title: 'Mesob One Digital Service Center Official Launch', title_am: 'የመሶብ አንድ ዲጂታል አገልግሎት ማዕከል ኦፊሴላዊ መክፈቻ', content: 'The Hossana Mesob One Digital Service Center has officially opened its doors, bringing 12 government institutions under one digital roof.', content_am: 'የሆሳዕና መሶብ አንድ ዲጂታል አገልግሎት ማዕከል በOfficial ሁኔታ ተከፍቷል።', category: 'reform', created_at: '2026-06-02T09:00:00Z' },
  { id: 2, title: 'Trade License Services Now Available Online', title_am: 'የንግድ ፈቃድ አገልግሎቶች አሁን በመስመር ላይ ይገኛሉ', content: 'Citizens can now apply for trade licenses entirely online through the Mesob One platform.', content_am: 'ዜጎች አሁን የንግድ ፈቃዶችን ሙሉ በሙሉ በመስመር ላይ ማመልከት ይችላሉ።', category: 'service', created_at: '2026-06-10T09:00:00Z' },
  { id: 3, title: 'Paperless Service Achievement: Zero Paper Used', title_am: 'ዜሮ ወረቀት አጠቃቀም: የተደረገ ለውጥ', content: 'Since launching, the center has achieved zero paper usage across all digital services.', content_am: 'ከመክፈት በኋላ ማዕከሉ በሁሉም ዲጂታል አገልግሎቶች ዜሮ ወረቀት አግኝቷል።', category: 'reform', created_at: '2026-06-18T09:00:00Z' },
  { id: 4, title: '12 Partner Institutions United Under Mesob One', title_am: '12 ጋራ ተቋማት በመሶብ አንድ ስር ተሰባስበዋል', content: 'All 12 government institutions are now fully integrated into the digital platform.', content_am: 'ከ12 የመንግስት ተቋማት ሁሉ በሙሉ ወደ ዲጂታል መድረክ ገብተዋል።', category: 'announcement', created_at: '2026-06-26T09:00:00Z' },
  { id: 5, title: 'Telebirr and CBE Birr Payment Integration Complete', title_am: 'Telebirr እና CBE Birr ክፍያ መቀላቀል ተጠናቋል', content: 'Digital payment via Telebirr and CBE Birr is now fully operational for all fee-based services.', content_am: 'በTelebirr እና CBE Birr የተደረገ ዲጂታል ክፍያ ለሁሉም ክፍያ ያለባቸው አገልግሎቶች ሙሉ ተግባራዊ ነው።', category: 'service', created_at: '2026-07-05T09:00:00Z' },
  { id: 6, title: 'Community Testimonials: Citizens Share Their Experience', title_am: 'የማህበረሰብ ዝግጅቶች: ዜጎች ተሞክሮዎቻቸውን ይጋራሉ', content: 'Citizens of Hossana share their positive experiences using the new digital service center.', content_am: 'የሆሳዕና ዜጎች አዲሱን ዲጂታል አገልግሎት ማዕከል በመጠቀም አዎንታዊ ተሞክሮዎቻቸውን ይጋራሉ።', category: 'update', created_at: '2026-07-14T09:00:00Z' },
];

export const LEADERSHIP_FALLBACK = [
  { name: 'Temesgen Wolde Anose', name_am: 'ተመስገን ወልደ አኖሴ', position: 'General Manager', position_am: 'ስራ አስኪያጅ', photo_url: '/assets/temesgen-wolde.jpg', order_num: 0 },
  { name: 'Besufikad Adisse', name_am: 'ቤሱፍቃድ አዲሴ', position: 'Head of Digital Services', position_am: 'የዲጂታል አገልግሎት ኃላፊ', order_num: 1 },
  { name: 'Hana Bekele', name_am: 'ሃና በቀለ', position: 'Head of Operations', position_am: 'የኦፕሬሽን ኃላፊ', order_num: 2 },
  { name: 'Daniel Tesfaye', name_am: 'ዳኒኤል ተስፋዬ', position: 'Head of IT & Systems', position_am: 'የአይቲ ኃላፊ', order_num: 3 },
];

export const DOWNLOADS_FALLBACK = [
  { id: 1, title: 'Trade License Application Form', title_am: 'የንግድ ፈቃድ ማመልከቻ ቅጽ', description: 'Standard form for new trade license applications', icon: '📝', category: 'forms', file_url: '#' },
  { id: 2, title: 'Construction Permit Guidelines', title_am: 'የግንባታ ፈቃድ መመሪያ', description: 'Step-by-step guide for construction permit applications', icon: '🏗️', category: 'guidelines', file_url: '#' },
  { id: 3, title: 'Annual Service Report 2026', title_am: 'ዓመታዊ የአገልግሎት ሪፖርት 2026', description: 'Comprehensive report of service delivery achievements', icon: '📊', category: 'reports', file_url: '#' },
  { id: 4, title: 'Digital Payment Regulations', title_am: 'የዲጂታል ክፍያ ደንቦች', description: 'Official regulations governing digital payment services', icon: '💳', category: 'regulations', file_url: '#' },
  { id: 5, title: 'Document Verification Manual', title_am: 'የሰነድ ማረጋገጫ መመሪያ', description: 'How to verify documents using QR codes', icon: '✅', category: 'guidelines', file_url: '#' },
  { id: 6, title: 'Citizen Feedback Form', title_am: 'የዜጎች አስተያየት ቅጽ', description: 'Form for submitting service feedback and complaints', icon: '💬', category: 'forms', file_url: '#' },
];

export const IDENTITY_ROWS = [
  { label: 'Full Name (Amharic)', value: 'መሶብ አንድ ማዕከል ዲጂታል አገልግሎት' },
  { label: 'Institution Type', value: 'Government Digital Service Center' },
  { label: 'Purpose', value: 'Fast, paperless & contactless service' },
  { label: 'Availability', value: '24/7' },
  { label: 'Phone', value: '+251 90 324 6324' },
  { label: 'Email', value: 'hossanmesob@gamil.com' },
  { label: 'Location', value: 'Hossana, Ethiopia' },
  { label: 'Payment Channels', value: 'telebirr, CBE Birr' },
];

export const TESTIMONIAL_MAIN = {
  name: 'Mr. Temesgen Wolde Anose',
  role: 'Hossana Mesob Digital Service Center General Manager',
  tag: '🇪🇹 Official Statement · 2026',
  paragraphs: [
    'በኢትዮጵያ የመንግሥት ተቋማትን አሠራር ለማዘመን እና የአገልግሎት አሰጣጥን ቀልጣፋ ለማድረግ በርካታ ርምጃዎች እየተወሰዱ ሲሆን እነዚህ ሥራዎች በዋናነት ዲጂታላይዜሽን፣ የሰው ኃይል ብቃት እና የአሠራር ሥርዓት ማሻሻያ ላይ ያተኮሩ ናቸው። ይህም የመንግሥት አገልግሎቶችን በቴክኖሎጂ በመደገፍ እና የሰውን ግንኙነት በመቀነስ ለሙስና ያለውን ዕድል ከማጥበብ ባለፈ ፍጥነትን ለመጨመር ያለመ ሲሆን ተቋማትን ከወረቀት ንክኪ ነፃ ወደሆነ እና በውጤት ወደ ሚለካ አሠራር ለማሸጋገር እየተተገበሩ ካሉ የለውጥ ሥራዎች መካከል የመሶብ አንድ ማዕከ አገልግሎት ተጠቃሽ ነው።',
    'ይህ በመሆኑ የባለጉዳዮችን ምልልስ እና የቆይታ ጊዜን ሙሉ በሙሉ ያስቀረ፣ በቴክኖሎጂ የተደገፈ የሰልፍ መቆጣጠሪያ እና የዲጂታል ግብረ-መልስ መስጫ መሣሪያዎችን ተግባራዊ ማድረጉ የአገልግሎት ሰጪዎችን ብቃት ለመመዘን እና በተጨባጭ መረጃ ላይ የተመሠረተ ማሻሻያ የተደረገ ስለመሆኑ አመላካች ነው።',
    'መሶብ የአንድ ማዕከል አገልግሎት ከፍተኛ የአገልግሎት አሰጣጥ ችግር ያለባቸው፣ ተገልጋይ የሚበዛባቸው፣ ለሙስናና ብልሹ አሠራር የተጋለጡ እንዲሁም ቅሬታ በሚበዛባቸው ተቋማት ተለይተው ወደ ማዕከሉ እንዲገቡ እየተደረገ ይገኛል። \nየመሶብ የአንድ ማዕከል አገልግሎት "ነገ ኑ" ቀጠሮን ያስቀረ፣ አገልግሎት ፈላጊውም የፈለገውን አገልግሎት አግኝቶ አመስግኖ የሚወጣበት ተቋም ሲሆን የዲጂታል ኢትዮጵያ ጉዞን የሚያፋጥን አዲሱ የአገልግሎት አሰራር ስርዓት ነው።',
  ],
};

export const TESTIMONIAL_PLACEHOLDER = {
  name: '(Name)', role: '(Position) · (Institution)', tag: '🇪🇹 Testimonial · 2026',
  body: '[ Testimonial content will be added here ]',
};

export const MANDATE_GROUPS = [
  { icon: '📝', en: 'Online Registration', am: 'በመስመር ላይ ምዝገባ', items: ['Processing applications for trade license registration', 'Receiving construction permit applications', 'Providing residency ID and document verification services'] },
  { icon: '💳', en: 'Payments & Taxation', am: 'ክፍያዎች እና ግብር', items: ['Processing payments via telebirr and CBE Birr', 'Accepting license renewal payments', 'Providing tax payment services'] },
  { icon: '📍', en: 'Tracking & Verification', am: 'ክትትል እና ማረጋገጫ', items: ['Notifying application status via SMS or website', 'Verifying document authenticity via QR code', 'Monitoring the status of issued licenses'] },
  { icon: '💬', en: 'Complaints & Feedback', am: 'ቅሬታ እና አስተያየት', items: ['Receiving complaints through the digital system', 'Collecting feedback on service delivery', 'Responding to submitted complaints'] },
];

export const TRACK_STEPS = ['Submitted', 'Verified', 'Payment', 'Processing', 'Completed'];

export const CONTACT_SUBJECTS = [
  'Select a subject...',
  'Trade License Inquiry',
  'Construction Permit Inquiry',
  'Payment Support',
  'Document Verification',
  'Complaint / Feedback',
  'General Inquiry',
];

export const SOCIALS = [
  { icon: '📘', label: 'Facebook', value: 'Mesob One Digital Service' },
  { icon: '✈️', label: 'Telegram', value: '@Temesgenwolde' },
  { icon: '▶️', label: 'YouTube', value: 'temesgenwolde4597' },
  { icon: '💬', label: 'WhatsApp', value: '+251 90 324 6324' },
];
