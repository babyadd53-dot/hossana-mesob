import { useEffect, useMemo, useState } from 'react';
import {
  CATEGORY_TABS, CONTACT_SUBJECTS, DOWNLOADS_FALLBACK, DOWNLOAD_CATS,
  IDENTITY_ROWS, LEADERSHIP_FALLBACK, MANDATE_GROUPS, NEWS_FALLBACK,
  NEWS_FILTERS, SERVICE_CATEGORIES_EXTRA, INSTITUTION_SERVICES,
  SOCIALS, TESTIMONIAL_MAIN, TESTIMONIAL_PLACEHOLDER, TRACK_STEPS,
} from './content.js';
import { toast, useApiList } from './lib.js';

const t = (lang, en, am) => (lang === 'am' ? am || en : en);

/* ── Page banner ─────────────────────────────────────────────── */
export function PageBanner({ lang, navigate, crumbs, title, desc }) {
  return (
    <div className="page-banner">
      <div className="container">
        <div className="breadcrumb">
          <button onClick={() => navigate('home')}>{t(lang, 'Home', 'ዋና ገጽ')}</button> › <span>{crumbs}</span>
        </div>
        <h1>{title}</h1>
        {desc && <p>{desc}</p>}
      </div>
    </div>
  );
}

function SectionHead({ kicker, title, desc }) {
  return (
    <div className="section-head rv rv-up">
      <span className="kicker">{kicker}</span>
      <h2 className="section-title">{title}</h2>
      {desc && <p className="section-desc">{desc}</p>}
    </div>
  );
}

function scrollToAnchor(anchor) {
  if (!anchor) return;
  setTimeout(() => {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 120);
}

/* ════════════════════════ ABOUT PAGE ════════════════════════ */
export function AboutPage({ lang, navigate }) {
  const [leaders] = useApiList('/api/leadership', LEADERSHIP_FALLBACK);

  const anchors = [
    ['identity', 'Institutional Identity'], ['mission', 'Mission & Vision'],
    ['testimonials', 'Testimonials'], ['mandate', 'Mandate'],
    ['reform', 'National Reform Strategy'], ['criteria', 'Selection Criteria'],
    ['leadership', 'Leadership Structure'],
  ];

  return (
    <>
      <PageBanner lang={lang} navigate={navigate} crumbs={t(lang, 'About Us', 'ስለ እኛ')}
        title={t(lang, 'About the Center', 'ስለ ማዕከሉ')}
        desc={t(lang,
          'Learn about the Mesob One Digital Service Center — our identity, mission, national reform strategy, and selection criteria.',
          'ስለ መሶብ አንድ ዲጂታል አገልግሎት ማዕከል — ማንነታችን፣ ተልዕኮአችን፣ ብሔራዊ የሪፎርም ስትራቴጂና የመርጫ መስፈርቶች ይወቁ።')} />

      <section style={{ padding: '26px 0 0' }}>
        <div className="container filter-row" style={{ marginBottom: 0 }}>
          {anchors.map(([id, label]) => (
            <button key={id} className="filter-chip" onClick={() => scrollToAnchor(id)}>{label}</button>
          ))}
        </div>
      </section>

      {/* Institutional identity */}
      <section className="section" id="identity">
        <div className="container about-split rv rv-up">
          <div>
            <SectionHead kicker={t(lang, 'Institutional Identity', 'የተቋም ማንነት')}
              title={t(lang, 'Who We Are', 'ማን እንደሆንን')} />
            <p style={{ color: 'var(--muted)' }}>{t(lang,
              'The Mesob One Digital Service Center transforms the one-stop service formerly delivered in person into a modern technology-based system, enabling citizens to access government services online or via mobile app, wherever they are.',
              'የመሶብ አንድ ዲጂታል አገልግሎት ማዕከል ቀደም ባለበት በግልጽ የተሰጠውን የአንድ-ማቆሚያ አገልግሎት ወደ ዘመናዊ የቴክኖሎጂ ሥርዓት ቀይሮ ዜጎች የመንግሥት አገልግሎቶችን በመስመር ላይ ወይም በሞባይል መተግበሪያ በየትም ቦታ እንዲደርሱ ያስችላል።')}</p>
          </div>
          <div className="detail-table">
            <h4 style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              {t(lang, 'Institutional Details', 'የተቋሙ ዝርዝር መረጃ')}</h4>
            {IDENTITY_ROWS.map(row => (
              <div key={row.label} className="detail-row">
                <span className="lbl">{row.label}</span><span className="val">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="section alt" id="mission">
        <div className="container">
          <SectionHead kicker={t(lang, 'Mission & Vision', 'ተልዕኮና ራዕይ')}
            title={t(lang, 'Our Core Purpose', 'ዋና ዓላማችን')}
            desc={t(lang, '🎯 Our core purpose: making services faster, fully paperless, and contactless.',
              '🎯 ዋና ዓላማችን፦ አገልግሎቶችን ፈጣን፣ ሙሉ በሙሉ ወረቀት አልባ እና ያለቀጥታ ንክኪ ማድረግ ነው።')} />
          <div className="card-grid">
            {[
              ['🕐', '24/7 Accessibility', 'Access services anytime, from anywhere, without waiting for office hours or holidays.', 'በማንኛውም ጊዜ ከማንኛውም ቦታ ያለ የቢሮ ሰዓት ገደብ አገልግሎት ማግኘት።'],
              ['📄', 'Paperless', 'Eliminates document pile-ups and loss by storing information in a digital database.', 'መረጃን በዲጂታል ዳታቤዝ በማከማቸት የሰነድ ብዛትን እና መጥፋትን ያስወግዳል።'],
              ['🤝', 'Contactless', 'Receive service without needing direct contact with staff.', 'ከሠራተኞች ጋር ቀጥታ የመነካካት ሳያስፈልግ አገልግሎት ማግኘት።'],
              ['⚡', 'Speed', 'Cases that once took weeks are now completed in just hours.', 'ቀደም ብሎ ሳምንታት የሚወስዱ ጉዳዮች አሁን በሰዓታት ውስጥ ይጠናቀቃሉ።'],
            ].map(([icon, en, den, dam]) => (
              <div key={en} className="card howto-card rv rv-up">
                <div className="howto-icon">{icon}</div>
                <h3>{en}</h3>
                <p>{t(lang, den, dam)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" id="testimonials">
        <div className="container">
          <SectionHead kicker={t(lang, 'Testimonials', 'ምስክርነቶች')}
            title={t(lang, 'About Mesob — Official Statements', 'ስለ መሶብ — ይፋዊ መግለጫዎች')}
            desc={t(lang,
              "Official testimonies on the Hossana Mesob Digital Service Center and its role in Ethiopia\u2019s reform journey.",
              'ስለ ሆሳዕና መሶብ ዲጂታል አገልግሎት ማዕከል እና በሪፎርም ጉዞው ውስጥ ያለውን ሚና ይፋዊ ምስክርነቶች።')} />
          <div style={{ display: 'grid', gap: 22 }}>
            <TestimonialCard item={TESTIMONIAL_MAIN} />
            {[1, 2].map(i => <TestimonialCard key={i} item={TESTIMONIAL_PLACEHOLDER} />)}
          </div>
        </div>
      </section>

      {/* Mandate */}
      <section className="section alt" id="mandate">
        <div className="container">
          <SectionHead kicker={t(lang, 'Mandate', 'ተልዕኮ')}
            title={t(lang, 'Our Core Mandate', 'ዋና ተልዕኮች')}
            desc={t(lang,
              "The Center\u2019s mandate spans digital service delivery, corruption prevention, and ensuring transparency.",
              'የማዕከሉ ተልዕኮ ዲጂታል አገልግሎት አቅርቦትን፣ የሙስና መከላከልን እና ግልጽነትን ማረጋገጥን ያካትታል።')} />
          <div className="card-grid">
            {MANDATE_GROUPS.map(group => (
              <div key={group.en} className="card rv rv-up">
                <div className="card-icon">{group.icon}</div>
                <h3>{group.en}</h3>
                <ul className="mandate-list">
                  {group.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* National Reform Strategy */}
      <section className="section" id="reform">
        <div className="container" style={{ maxWidth: 860 }}>
          <SectionHead kicker={t(lang, 'National Reform Strategy', 'ብሔራዊ የሪፎርም ስትራቴጂ')}
            title={t(lang, 'From Paper to Screen', 'ከወረቀት ወደ ስክሪን')} />
          <div className="rv rv-up" style={{ color: 'var(--muted)', display: 'grid', gap: 14 }}>
            <p>{t(lang,
              "As part of Ethiopia\u2019s broader effort to modernize government institutions and streamline service delivery, multiple steps are underway focused primarily on digitalization, workforce capability, and process improvement.",
              'የመንግሥት ተቋማትን ለማዘመን እና የአገልግሎት አሰጣጥን ለማመቻቸት ባለው የኢትዮጵያ ሰፊ ጥረት መካከል በዋናነት በዲጂታላይዜሽን፣ በሰው ኃይል ብቃት እና በሥራ ሂደት ማሻሻያ ላይ ያተኮሩ በርካታ እርምጃዎች እየተወሰዱ ይገኛሉ።')}</p>
            <p>{t(lang,
              'The Mesob Digital Service is a strategic step that shifts government operations "from paper to screen" — reducing public hassle while accelerating the broader Digital Ethiopia agenda.',
              'የመሶብ ዲጂታል አገልግሎት የመንግሥት አሠራርን «ከወረቀት ወደ ስክሪን» የሚቀይር ስትራቴጂካዊ እርምጃ ሲሆን — የህዝብን ተቸግሮት ቀንሶ ሰፊውን የዲጂታል ኢትዮጵያ አጀንዳ ያፋጥናል።')}</p>
            <p>{t(lang,
              'It is an institution that eliminates the "come back tomorrow" appointment culture — where service seekers get what they came for and leave satisfied — and represents the new service model accelerating Ethiopia\u2019s digital journey.',
              '"ነገ ኑ" የቀጠሮ ባህልን የሚያስወግድ — አገልግሎት ፈላጊው የፈለገውን አግኝቶ በተሟላ ስሜት የሚወጣበት — እና የኢትዮጵያን ዲጂታል ጉዞ የሚያፋጥን አዲሱ የአገልግሎት ሞዴል ተቋም ነው።')}</p>
          </div>
        </div>
      </section>

      {/* Selection criteria */}
      <section className="section alt" id="criteria">
        <div className="container">
          <SectionHead kicker={t(lang, 'Selection Criteria', 'የመርጫ መስፈርቶች')}
            title={t(lang, 'Institution Selection Criteria', 'የተቋማት የመምረጥ መስፈርት')}
            desc={t(lang,
              'Institutions with significant service-delivery challenges, high client volumes, exposure to corruption, or frequent complaints are specifically identified and brought under the Mesob One Center.',
              'ከፍተኛ የአገልግሎት አሰጣጥ ችግር ያለባቸው፣ ብዙ ደንበኞች ያሏቸው፣ ለሙስና የተጋለጡ ወይም ደጋግሞ ቅሬታ የሚያስነብቱ ተቋማት ለይተው ወደ መሶብ አንድ ማዕከል ይገባሉ።')} />
          <div className="card-grid">
            {[
              ['⚠️', 'High-Pressure Institutions', 'Government institutions facing significant service-delivery challenges and high volumes of clients are prioritized for transition.',
               'ከባድ የአገልግሎት ችግር እና ከፍተኛ የደንበኞች መጠን ያላቸው የመንግሥት ተቋማት ለሽግግር ቅድሚያ ይሰጣቸዋል።'],
              ['🔒', 'Corruption-Exposed Sectors', 'Sectors exposed to corruption and malpractice, or those that frequently receive complaints, are prioritized for digital transition.',
               'ለሙስና እና ለብልሹ አሠራር የተጋለጡ ወይም ብዙ ቅሬታ የሚያስነብቡ ዘርፎች ለዲጂታል ሽግግር ቅድሚያ ይሰጣሉ።'],
            ].map(([icon, en, den, dam]) => (
              <div key={en} className="card amber rv rv-up">
                <div className="card-icon">{icon}</div>
                <h3>{en}</h3>
                <p>{t(lang, den, dam)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section" id="leadership">
        <div className="container">
          <SectionHead kicker={t(lang, 'Leadership Structure', 'የአመራር መዋቅር')}
            title={t(lang, 'Governance & Leadership', 'አስተዳደር እና አመራር')}
            desc={t(lang, 'The Center operates with a structured leadership hierarchy.',
              'ማዕከሉ በደንብ የተደነዘነ የአመራር ተዋቅር ይሠራል።')} />
          <div className="card-grid">
            {leaders.length === 0 && <div className="skeleton-note">Loading leadership team…</div>}
            {leaders.map(member => (
              <div key={member.id ?? member.name} className="card leader-card rv rv-up"
                   style={{ borderTopColor: 'var(--accent)' }}>
                <div className="leader-photo">
                  {member.photo_url
                    ? <img src={member.photo_url} alt={member.name} loading="lazy" />
                    : <span className="initials">{initials(member.name)}</span>}
                </div>
                <h3>{t(lang, member.name, member.name_am)}</h3>
                <p className="leader-role">{t(lang, member.position, member.position_am)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function TestimonialCard({ item }) {
  return (
    <div className="testimonial-card rv rv-up">
      <div className="testimonial-head">
        <div className="testimonial-photo"><img src="/assets/logo.jpg" alt="" /></div>
        <div>
          <strong style={{ fontSize: '.98rem' }}>{item.name}</strong>
          <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '.85rem' }}>{item.role}</div>
          <small style={{ color: 'var(--muted)', fontSize: '.78rem' }}>🇪🇹 {item.tag.replace('🇪🇹 ', '')}</small>
        </div>
      </div>
      {'paragraphs' in item
        ? item.paragraphs.map((para, i) => <p key={i} className="testimonial-quote">{para}</p>)
        : <p className="testimonial-quote">{item.body}</p>}
    </div>
  );
}

function initials(name) {
  return name.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

/* ════════════════════════ SERVICES PAGE ═════════════════════ */
export function ServicesPage({ lang, navigate, anchor }) {
  const [categoryTab, setCategoryTab] = useState('all');
  const [downloadTab, setDownloadTab] = useState('all');
  const [downloads] = useApiList('/api/downloads', DOWNLOADS_FALLBACK);

  useEffect(() => scrollToAnchor(anchor), [anchor]);

  // Institution detail cards first, then coming-soon categories (template order)
  const allRows = useMemo(
    () => [...INSTITUTION_SERVICES, ...SERVICE_CATEGORIES_EXTRA],
    []
  );

  const filteredServices = allRows.filter(row =>
    categoryTab === 'all' || row.cat === categoryTab);

  const filteredDownloads = downloads.filter(doc =>
    downloadTab === 'all' || doc.category === downloadTab);

  return (
    <>
      <PageBanner lang={lang} navigate={navigate} crumbs={t(lang, 'Services', 'አገልግሎቶች')}
        title={t(lang, 'Digital Services', 'ዲጂታል አገልግሎቶች')}
        desc={t(lang,
          'Comprehensive online services enabling citizens to access government services wherever they are.',
          'ዜጎች የመንግስት አገልግሎቶችን በየትም ቦታ እንዲደርሱ የሚያስችሉ ሰፊ የመስመር ላይ አገልግሎቶች።')} />

      <section className="section" id="core">
        <div className="container">
          <SectionHead kicker={t(lang, 'Core Services', 'ዋና አገልግሎቶች')}
            title={t(lang, 'Key Digital Services', 'ቁልፍ ዲጂታል አገልግሎቶች')}
            desc={t(lang, 'The Mesob One Digital Service Center delivers a range of key digital services.',
              'መሶብ አንድ ዲጂታል አገልግሎት ማዕከል ሰፊ የዲጂታል አገልግሎቶችን ያቀርባል።')} />
          <div className="card-grid">
            {INSTITUTION_SERVICES.map(service => (
              <div key={service.key} className="card rv rv-up" style={{ borderTopColor: 'var(--accent)' }}>
                <div className="card-icon">{service.icon}</div>
                <h3>{t(lang, service.en, service.am)}</h3>
                <p>{t(lang, service.den, service.dam)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="categories">
        <div className="container">
          <SectionHead kicker={t(lang, 'Service Categories', 'የአገልግሎት ምድቦች')}
            title={t(lang, 'Browse by Category', 'በምድብ ይመልከቱ')}
            desc={t(lang, 'Categories for the most in-demand government services.',
              'በብዛት ከሚፈለጉ የመንግስት አገልግሎቶች ምድቦች።')} />
          <div className="filter-row">
            {CATEGORY_TABS.map(tabItem => (
              <button key={tabItem.id}
                      className={`filter-chip ${categoryTab === tabItem.id ? 'on' : ''}`}
                      onClick={() => setCategoryTab(tabItem.id)}>
                {t(lang, tabItem.en, tabItem.am)}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            {filteredServices.map(row => (
              <div key={row.key} className="cat-row">
                <div className="cat-icon">{row.icon}</div>
                <div style={{ minWidth: 0 }}>
                  <strong>{t(lang, row.en, row.am)}</strong>
                  <p style={{ color: 'var(--muted)', fontSize: '.87rem', margin: '4px 0 8px' }}>
                    {t(lang, row.den, row.dam)}</p>
                  <span className={`avail ${row.status}`}>{t(lang, row.statusEn, row.statusAm)}</span>
                  <span className="timing-chip" style={{ marginLeft: 12 }}>{row.timing}</span>
                </div>
                <span className="pill-badge" style={{ alignSelf: 'center' }}>
                  {t(lang, row.cat, row.catAm)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="library">
        <div className="container">
          <SectionHead kicker={t(lang, 'Resource Library', 'ሰነዶች ማውረጃ')}
            title={t(lang, 'Documents & Downloads', 'ሰነዶች እና ማውረጃዎች')}
            desc={t(lang,
              'Access official documents, forms, and resources from the Mesob One Digital Service Center.',
              'ኦፊሴላዊ ሰነዶችን፣ ቅጾችን እና ግብዓቶችን ከመሶብ አንድ ዲጂታል ማዕከል ይደርሱ።')} />
          <LibraryGrid lang={lang} items={filteredDownloads}
                       tabs={DOWNLOAD_CATS} active={downloadTab} setActive={setDownloadTab} />
        </div>
      </section>
    </>
  );
}

/* ════════════════════════ LIBRARY GRID (shared) ═════════════ */
export function LibraryGrid({ lang, items, tabs, active, setActive }) {
  return (
    <>
      <div className="filter-row">
        {tabs.map(cat => (
          <button key={cat.id} className={`filter-chip ${active === cat.id ? 'on' : ''}`}
                  onClick={() => setActive(cat.id)}>{t(lang, cat.en, cat.am)}</button>
        ))}
      </div>
      <div className="card-grid">
        {items.length === 0 && <div className="skeleton-note">Loading documents…</div>}
        {items.map(doc => (
          <div key={doc.id ?? doc.title} className="card dl-card rv rv-up"
               style={{ display: 'flex', gap: 16, alignItems: 'flex-start',
                        borderLeft: '5px solid var(--accent)' }}>
            <div className="card-icon" style={{ marginBottom: 0 }}>{doc.icon || '📄'}</div>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ fontSize: '.99rem' }}>{t(lang, doc.title, doc.title_am)}</h3>
              <p style={{ fontSize: '.85rem' }}>{doc.description}</p>
              <a className="learn-more" href={doc.file_url && doc.file_url !== '#' ? doc.file_url : '#'}
                 download
                 onClick={e => {
                   if (!doc.file_url || doc.file_url === '#') {
                     e.preventDefault();
                     toast(t(lang, 'Sample entry — file coming soon.', 'ናሙና መዝገብ ነው — ፋይሉ በቅርቡ ይገኛል።'), 'info');
                   }
                 }}>
                 ⬇ {t(lang, 'Download', 'ያውርዱ')}</a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ════════════════════════ TRACK PAGE ════════════════════════ */
export function TrackPage({ lang, navigate }) {
  const [reference, setReference] = useState('');
  const [result, setResult] = useState(null);

  const track = () => {
    const value = reference.trim();
    if (!value) {
      toast(t(lang, 'Please enter your application number or phone number.',
        'እባክዎ የማመልከቻ ቁጥርዎን ወይም ስልክ ቁጥርዎን ያስገቡ።'), 'error');
      return;
    }
    const seed = [...value].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    setResult({
      number: value,
      type: ['Trade License Registration', 'Fayda Digital ID Registration',
             'Document Verification', 'Payment Support'][seed % 4],
      stage: (seed % 4) + 1, // 1..4 completed steps out of 5
      statusEn: seed % 2 === 0
        ? 'Pending — Awaiting payment confirmation'
        : 'Processing — Under review by the institution',
      statusAm: seed % 2 === 0
        ? 'በመጠባበቅ ላይ — የክፍያ ማረጋገጫ በመጠበቅ ላይ'
        : 'በሂደት ላይ — በተቋሙ እየታየ ነው',
    });
  };

  return (
    <>
      <PageBanner lang={lang} navigate={navigate} crumbs={t(lang, 'Track Application', 'የጉዳይ ክትትል')}
        title={t(lang, 'Track Your Application', 'ማመልከቻዎን ይከታተሉ')}
        desc={t(lang, 'Easily track the status of your submitted application.',
          'ያስገቡትን ማመልከቻ ሁኔታ በቀላሉ ይከታተሉ።')} />

      <section className="section">
        <div className="container track-panel rv rv-up">
          <h3 style={{ marginBottom: 6 }}>{t(lang, 'Track Your Application', 'ማመልከቻዎን ይከታተሉ')}</h3>
          <p style={{ color: 'var(--muted)', fontSize: '.93rem' }}>
            {t(lang, 'Enter your application number or phone number.',
              'የማመልከቻ ቁጥርዎን ወይም ስልክ ቁጥርዎን ያስገቡ።')}</p>
          <div className="track-input-row">
            <input value={reference} onChange={e => setReference(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && track()}
                   placeholder="M1-2026-XXXXX / +2519..." />
            <button className="btn primary" onClick={track}>
              {t(lang, 'Track', 'አሳይ')}</button>
          </div>

          {result && (
            <div className="track-result">
              <div className="demo-strip">
                <div><strong>{t(lang, 'Application No:', 'የማመልከቻ ቁጥር፦')}</strong> {result.number}</div>
                <div><strong>{t(lang, 'Type:', 'ዓይነት፦')}</strong> {result.type}</div>
                <div><strong>{t(lang, 'Status:', 'ሁኔታ፦')}</strong> {t(lang, result.statusEn, result.statusAm)}</div>
              </div>

              <div className="track-steps">
                <div className="track-fill"
                     style={{ width: `${((result.stage - 1) / (TRACK_STEPS.length - 1)) * 84}%` }} />
                {TRACK_STEPS.map((stepLabel, i) => {
                  const stepIndex = i + 1;
                  const stateClass =
                    stepIndex < result.stage ? 'done'
                      : stepIndex === result.stage ? 'now' : '';
                  const symbol = stepIndex <= result.stage - 1 ? '✓' : String(stepIndex);
                  return (
                    <div key={stepLabel} className={`tstep ${stateClass}`}>
                      <div className="tdot">{symbol}</div>
                      <div className="tstep-label">{stepLabel}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead kicker={t(lang, 'How It Works', 'እንዴት እንደሚሰራ')}
            title={t(lang, 'About the Tracking Service', 'ስለ ክትትል አገልግሎቱ')}
            desc={t(lang, 'Easily track the status of submitted applications via SMS or directly on the website.',
              'የቀረቡ ማመልከቻዎችን ሁኔታ በSMS ወይም በቀጥታ በድረ-ገጹ በቀላሉ ይከታተሉ።')} />
          <div className="card-grid">
            {[
              ['📱', 'SMS Notifications', 'You automatically receive a text message each time your case advances a stage.',
               'ጉዳይዎ ደረጃ በየትምህት በሚሸጋገርበት ጊዜ በራስ-ሰር የጽሑፍ መልእክት ያገኛሉ።'],
              ['🖥️', 'Online Tracking', 'You can log into the website at any time to check your application\u2019s status.',
               'በማንኛውም ጊዜ ድረ-ገጹ ገብተው የማመልከቻዎን ሁኔታ ማረጋገጥ ይችላሉ።'],
              ['🔍', 'Transparency', "Since every step is digitally logged, it\u2019s easy to identify what may be causing a delay.",
               'እያንዳንዱ ደረጃ በዲጂታል ስለተመዘገበ ምን መዘግየት እንደሚፈጥር ለይቶ ማየት ቀላል ነው።'],
            ].map(([icon, en, den, dam]) => (
              <div key={en} className="card howto-card rv rv-up">
                <div className="howto-icon">{icon}</div>
                <h3>{en}</h3>
                <p>{t(lang, den, dam)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ════════════════════════ NEWS PAGE ═════════════════════════ */
export function NewsPage({ lang, navigate }) {
  const [items] = useApiList('/api/news', NEWS_FALLBACK);
  const [filter, setFilter] = useState('all');
  const [visible, setVisible] = useState(6);

  const filtered = items.filter(post => filter === 'all' || post.category === filter);
  const shown = filtered.slice(0, visible);
  const featured = shown[0];

  return (
    <>
      <PageBanner lang={lang} navigate={navigate} crumbs={t(lang, 'News & Updates', 'ዜናዎች')}
        title={t(lang, 'News & Updates', 'ዜናዎች እና ዝማኔዎች')}
        desc={t(lang,
          'Official press releases, service news, system updates, and announcements from the Mesob One Digital Service Center.',
          'ከመሶብ አንድ ዲጂታል አገልግሎት ማዕከል ይፋዊ ጋዜጣዊ መግለጫዎች፣ የአገልግሎት ዜናዎች፣ የስርዓት ዝማኔዎች እና ማስታወቂያዎች።')} />

      <section className="section">
        <div className="container">
          <SectionHead kicker={t(lang, 'Latest', 'የቅርብ ጊዜ')}
            title={t(lang, 'Featured Stories', 'ተመራጭ ታሪኮች')} />
          <div className="filter-row">
            {NEWS_FILTERS.map(f => (
              <button key={f.id} className={`filter-chip ${filter === f.id ? 'on' : ''}`}
                      onClick={() => { setFilter(f.id); setVisible(6); }}>
                {t(lang, f.en, f.am)}
              </button>
            ))}
          </div>

          {featured && (
            <article className="card news-card rv rv-up" style={{ marginBottom: 22 }}>
              <div className="news-thumb" style={{ height: 260, fontSize: '3.6rem' }}>
                <span className="news-tag">{featured.category}</span>📰</div>
              <div className="news-body">
                <span className="news-date">🗓 {(featured.created_at || '').slice(0, 10)}</span>
                <h2 style={{ fontSize: '1.35rem' }}>{t(lang, featured.title, featured.title_am)}</h2>
                <p style={{ WebkitLineClamp: 'unset' }}>{t(lang, featured.content, featured.content_am)}</p>
              </div>
            </article>
          )}

          <div className="card-grid">
            {shown.slice(1).map(post => (
              <article key={post.id} className="news-card rv rv-up">
                <div className="news-thumb"><span className="news-tag">{post.category}</span>📰</div>
                <div className="news-body">
                  <span className="news-date">🗓 {(post.created_at || '').slice(0, 10)}</span>
                  <h3>{t(lang, post.title, post.title_am)}</h3>
                  <p>{t(lang, post.content, post.content_am)}</p>
                </div>
              </article>
            ))}
          </div>

          {visible < filtered.length && (
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <button className="btn outline" onClick={() => setVisible(v => v + 6)}>
                {t(lang, 'Load More News', 'ተጨማሪ ዜና ይጫኑ')}</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ════════════════════════ DOWNLOADS PAGE ════════════════════ */
export function DownloadsPage({ lang, navigate }) {
  const [downloads] = useApiList('/api/downloads', DOWNLOADS_FALLBACK);
  const [tab, setTab] = useState('all');
  const filtered = downloads.filter(doc => tab === 'all' || doc.category === tab);

  return (
    <>
      <PageBanner lang={lang} navigate={navigate} crumbs={t(lang, 'Downloads', 'ማውረጃዎች')}
        title={t(lang, 'Downloads & Resources', 'ማውረጃዎች እና ግብዓቶች')}
        desc={t(lang, 'Official forms, guidelines, regulations, and policy documents for public access.',
          'ለህዝብ የሚሰጡ ኦፊሴላዊ ቅጾች፣ መመሪያዎች፣ ደንቦች እና ፖሊሲ ሰነዶች።')} />
      <section className="section">
        <div className="container">
          <SectionHead kicker={t(lang, 'Resource Library', 'ሰነዶች ማውረጃ')}
            title={t(lang, 'Documents & Downloads', 'ሰነዶች እና ማውረጃዎች')}
            desc={t(lang,
              'Access official documents, forms, and resources from the Mesob One Digital Service Center.',
              'ኦፊሴላዊ ሰነዶችን፣ ቅጾችን እና ግብዓቶችን ከመሶብ አንድ ዲጂታል አገልግሎት ማዕከል ይደርሱ።')} />
          <LibraryGrid lang={lang} items={filtered} tabs={DOWNLOAD_CATS} active={tab} setActive={setTab} />
        </div>
      </section>
    </>
  );
}

/* ════════════════════════ CONTACT PAGE ══════════════════════ */
export function ContactPage({ lang, navigate }) {
  const submit = async event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${data.firstname} ${data.lastname || ''}`.trim(),
          email: data.email,
          message: `[${data.subject}] ${data.message}`,
        }),
      });
      if (!response.ok) throw new Error('failed');
      toast(t(lang, 'Message sent! We respond within 2–3 business days.',
        'መልዕክትዎ ተልኳል! በ2–3 የስራ ቀናት ውስጥ እንመልስልዎታለን።'), 'success');
      event.target.reset();
    } catch {
      toast(t(lang, 'Could not send message — please retry.', 'መልዕክቱን መላክ አልተቻለም — እንደገና ይሞክሩ።'), 'error');
    }
  };

  return (
    <>
      <PageBanner lang={lang} navigate={navigate} crumbs={t(lang, 'Contact Us', 'ያግኙን')}
        title={t(lang, 'Contact Us', 'ያግኙን')}
        desc={t(lang, 'Reach out to the Mesob One Digital Service Center for inquiries, complaints, or support.',
          'ለጥያቄዎች፣ ለቅሬታ ወይም ለድጋፍ ከመሶብ አንድ ዲጂታል አገልግሎት ማዕከል ጋር ይገናኙ።')} />

      <section className="section">
        <div className="container contact-layout">
          <div className="info-block rv rv-left">
            {[
              ['📍', t(lang, 'Center Address', 'የማዕከሉ አድራሻ'),
               'Hossana, Hadiya Zone\nCentral Ethiopia Regional State, Ethiopia'],
              ['📞', t(lang, 'Phone Number', 'ስልክ ቁጥር'), '+251 90 324 6324'],
              ['✉️', t(lang, 'Email Address', 'ኢሜይል አድራሻ'), 'hossanmesob@gamil.com'],
              ['🌐', t(lang, 'Website (Proposed)', 'ድረ-ገጽ (የቀረበ)'), 'mesobone.gov.et'],
            ].map(([icon, label, value]) => (
              <div key={label} className="info-line">
                <span className="ico">{icon}</span>
                <div>
                  <strong style={{ fontSize: '.92rem' }}>{label}</strong>
                  <p style={{ color: 'var(--muted)', fontSize: '.89rem', whiteSpace: 'pre-line' }}>{value}</p>
                </div>
              </div>
            ))}

            <div className="info-line" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              <strong style={{ fontSize: '.95rem', marginBottom: 10 }}>
                {t(lang, 'Social Media', 'ማህበራዊ መስመሮች')}</strong>
              {SOCIALS.map(social => (
                <div key={social.label} style={{ display: 'flex', gap: 10, padding: '5px 0', fontSize: '.89rem' }}>
                  <span>{social.icon}</span>
                  <strong>{social.label}:</strong>
                  <span style={{ color: 'var(--muted)' }}>{social.value}</span>
                </div>
              ))}
            </div>

            <div className="map-note">
              📍 <strong>{t(lang, 'Interactive map coming soon', 'መስተጋብረኛ ካርታ በቅርቡ')}</strong><br />
              Hossana, Hadiya Zone, Ethiopia
            </div>
          </div>

          <form className="form-card rv rv-right" onSubmit={submit}>
            <h3 style={{ marginBottom: 4 }}>{t(lang, 'Send Us a Message', 'መልዕክት ይላኩልን')}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '.88rem', marginBottom: 18 }}>
              {t(lang, 'Fill in the form below and our team will respond within 2–3 business days.',
                'ከታች ያለውን ቅጽ ይሙሉ፤ ቡድናችን በ2–3 የስራ ቀናት ውስጥ ይመልስልዎታል።')}</p>
            <div className="field-row">
              <div className="field">
                <label>First Name *</label>
                <input name="firstname" required maxLength="60" />
              </div>
              <div className="field">
                <label>Last Name *</label>
                <input name="lastname" required maxLength="60" />
              </div>
            </div>
            <div className="field">
              <label>Email Address *</label>
              <input name="email" type="email" required />
            </div>
            <div className="field">
              <label>Phone Number</label>
              <input name="phone" type="tel" placeholder="+251..." />
            </div>
            <div className="field">
              <label>Subject *</label>
              <select name="subject" required defaultValue="">
                {CONTACT_SUBJECTS.map(subject => (
                  <option key={subject} value={subject} disabled={subject === 'Select a subject...'}>
                    {subject}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Your Message *</label>
              <textarea name="message" required minLength="10" />
            </div>
            <button type="submit" className="btn primary full">
              {t(lang, 'Send Message', 'መልዕክት ላክ')}</button>
          </form>
        </div>
      </section>
    </>
  );
}
