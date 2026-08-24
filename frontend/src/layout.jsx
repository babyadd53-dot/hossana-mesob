import { useEffect, useRef, useState } from 'react';
import { BRAND, NAV, SOCIALS } from './content.js';
import { toast, useToasts } from './lib.js';

const t = (lang, en, am) => (lang === 'am' ? am : en);

/* ── Topbar ──────────────────────────────────────────────────── */
export function TopBar({ lang }) {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-info">
          <span>{BRAND.locationTopbar}</span>
          <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`}>📞 {BRAND.phone}</a>
          <a href={`mailto:${BRAND.email}`}>✉ {BRAND.email}</a>
        </div>
        <button className="lang-chip" onClick={() => window.__toggleLang()}>
          🌐 {lang === 'en' ? 'EN / አማ' : 'አማ / EN'}
        </button>
      </div>
    </div>
  );
}

/* ── Navbar ──────────────────────────────────────────────────── */
export function NavBar({ lang, page, navigate, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <div className="brand" onClick={() => navigate('home')}>
            <div className="brand-logo"><img src={BRAND.logo} alt="Mesob One logo" /></div>
            <div className="brand-text">
              <strong>{lang === 'am' ? BRAND.am : BRAND.en}</strong>
              <span>{lang === 'am' ? BRAND.en : BRAND.am}</span>
            </div>
          </div>

          <ul className="nav-links">
            {NAV.map(item => (
              <li className="nav-item" key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${page === item.id ? 'active' : ''}`}
                  onClick={e => { e.preventDefault(); navigate(item.id); }}
                >
                  {item.icon} {t(lang, item.en, item.am)}
                </a>
                {item.children && (
                  <div className="dropdown">
                    {item.children.map(child => (
                      <a key={child.anchor} href={`#${item.id}/${child.anchor}`}
                         onClick={e => { e.preventDefault(); navigate(item.id, child.anchor); }}>
                        {t(lang, child.en, child.am)}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
            <li className="nav-item">
              <a href="#contact" className="nav-link nav-cta"
                 onClick={e => { e.preventDefault(); navigate('contact'); }}>
                ✉️ {t(lang, 'Contact Us', 'ያግኙን')}
              </a>
            </li>
            <li><button className="icon-btn" title={t(lang, 'Search (Ctrl+K)', 'ፈልግ (Ctrl+K)')}
                        onClick={() => window.__openSearch()}>🔍</button></li>
            <li><button className="icon-btn" title={t(lang, 'Dark mode', 'ጨለማ ገጽ')} onClick={toggleTheme}>
              {theme === 'dark' ? '☀️' : '🌙'}</button></li>
          </ul>

          <button className={`hamburger ${menuOpen ? 'open' : ''}`} aria-label="Menu"
                  onClick={() => setMenuOpen(open => !open)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV.map(item => (
          <a key={item.id} href={`#${item.id}`}
             onClick={e => { e.preventDefault(); navigate(item.id); setMenuOpen(false); }}>
            {item.icon} {t(lang, item.en, item.am)}
          </a>
        ))}
        <a href="#search" onClick={e => { e.preventDefault(); setMenuOpen(false); window.__openSearch(); }}>
          🔍 {t(lang, 'Search', 'ፈልግ')}
        </a>
        <a href="#theme" onClick={e => { e.preventDefault(); toggleTheme(); }}>
          {theme === 'dark' ? '☀️' : '🌙'} {t(lang, 'Dark Mode', 'ጨለማ ገጽ')}
        </a>
      </div>
    </>
  );
}

/* ── Footer ──────────────────────────────────────────────────── */
export function Footer({ lang, navigate }) {
  const subscribe = event => {
    event.preventDefault();
    const email = new FormData(event.target).get('email');
    fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Newsletter Subscriber', email, message: 'Newsletter subscription request' }),
    }).then(() => {
      toast(t(lang, 'Thank you for subscribing!', 'ለመመዝገብዎ አመሰግናለሁ!'), 'success');
      event.target.reset();
    }).catch(() => toast(t(lang, 'Subscription failed.', 'ምዝገባው አልተሳካም።'), 'error'));
  };

  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <h4>{t(lang, BRAND.en.replace('HOSSANA ', ''), 'Hossana Mesob One Digital Service Center')}</h4>
          <p className="tag-am">{BRAND.am}</p>
          <p style={{ marginTop: 8 }}>
            {t(lang,
              'From paper to screen — dedicated to making government services faster, paperless, and contactless.',
              'ከወረቀት ወደ ስክሪን — የመንግስት አገልግሎቶችን ፈጣን፣ ወረቀት አልባ እና ያለንኪት ለማድረግ ቆርቆሮ።')}
          </p>
          <div className="social-row">{SOCIALS.map(s => <span className="social-dot" key={s.label} title={`${s.label}: ${s.value}`}>{s.icon}</span>)}</div>
        </div>
        <div>
          <h4>{t(lang, 'Quick Links', 'ፈጣን ማገናኛዎች')}</h4>
          <div className="footer-links">
            {[['home', 'Home'], ['about', 'About Us'], ['services', 'Services'], ['track', 'Track Application'], ['news', 'News'], ['services/library', 'Downloads']].map(([target, label]) => {
              const [p, a] = target.split('/');
              return <a key={target} href={`#${target}`} onClick={e => { e.preventDefault(); navigate(p, a); }}>{label}</a>;
            })}
          </div>
        </div>
        <div>
          <h4>{t(lang, 'Services', 'አገልግሎቶች')}</h4>
          <div className="footer-links">
            {['Online Application', 'E-Payment', 'Application Tracking', 'Document Verification', 'Complaints & Feedback'].map(label => (
              <a key={label} href="#services" onClick={e => { e.preventDefault(); navigate('services'); }}>{label}</a>
            ))}
          </div>
        </div>
        <div>
          <h4>{t(lang, 'Contact Us', 'ያግኙን')}</h4>
          <p>📍 Central Ethiopia Regional State, Hadiya Zone, Hossana</p>
          <p>📞 {BRAND.phone}</p>
          <p>✉ {BRAND.email}</p>
          <p>🌐 {BRAND.website}</p>
          <form className="sub-row" onSubmit={subscribe}>
            <input type="email" name="email" required placeholder={t(lang, 'Your email address...', 'የኢሜይል አድራሻዎ...')} />
            <button className="btn primary small" type="submit">{t(lang, 'Subscribe', 'ይመዝገቡ')}</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 Hossana Mesob One Digital Service Center. All rights reserved.<br />
        Developed by Digital Impact Team · Ref: M1DSC-WEBDEV-2026-01
      </div>
    </footer>
  );
}

/* ── Floating widgets ────────────────────────────────────────── */
export function Toasts() {
  const toasts = useToasts();
  return (
    <div className="toast-stack">
      {toasts.map(({ id, message, type }) => (
        <div key={id} className={`toast ${type}`}>
          <span>{type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
          <span>{message}</span>
        </div>
      ))}
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button className={`back-top ${show ? 'show' : ''}`} aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
  );
}

export function MobileDock({ lang, page, navigate }) {
  const items = [
    ['home', '🏠', lang === 'am' ? 'ዋና ገጽ' : 'Home'],
    ['services', '🧾', lang === 'am' ? 'አገልግሎቶች' : 'Services'],
    ['track', '📍', lang === 'am' ? 'ክትትል' : 'Track'],
    ['contact', '✉️', lang === 'am' ? 'ያግኙን' : 'Contact'],
  ];
  return (
    <div className="dock">
      {items.map(([id, icon, label]) => (
        <button key={id} className={`dock-item ${page === id ? 'on' : ''}`}
                onClick={() => { navigate(id); window.scrollTo({ top: 0 }); }}>
          <span style={{ fontSize: '1.25rem' }}>{icon}</span>{label}
        </button>
      ))}
      <button className="dock-item" onClick={() => window.__openSearch()}>
        <span style={{ fontSize: '1.25rem' }}>🔍</span>{lang === 'am' ? 'ፈልግ' : 'Search'}
      </button>
    </div>
  );
}

/* ── Search palette ──────────────────────────────────────────── */
export function SearchPalette({ lang, open, onClose, navigate }) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) { setQuery(''); setActiveIdx(0); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  if (!open) return null;

  const entries = buildSearchEntries(lang, navigate);
  const q = query.trim().toLowerCase();
  const matches = q
    ? entries.filter(e => `${e.title} ${e.desc}`.toLowerCase().includes(q))
    : entries.slice(0, 8);

  const runResult = index => {
    matches[index]?.run();
    onClose();
  };

  return (
    <div className="search-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
         onKeyDown={e => {
           if (e.key === 'Escape') onClose();
           if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, matches.length - 1)); }
           if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
           if (e.key === 'Enter') { e.preventDefault(); runResult(activeIdx); }
         }}>
      <div className="search-modal">
        <div className="search-input-row">
          <span>🔍</span>
          <input ref={inputRef} value={query} onChange={e => { setQuery(e.target.value); setActiveIdx(0); }}
                 placeholder={t(lang, 'Search services, pages, documents…', 'ፈልግ፦ አገልግሎቶች፣ ገጾች፣ ሰነዶች…')} />
          <kbd>Esc</kbd>
        </div>
        <div className="search-results">
          {matches.length === 0 && <div style={{ padding: 26, textAlign: 'center', color: 'var(--muted)' }}>
            {t(lang, 'No results found.', 'ውጤት አልተገኘም።')}
          </div>}
          {matches.map((entry, i) => (
            <button key={`${entry.title}-${i}`}
                    className={`result-row ${i === activeIdx ? 'on' : ''}`}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => runResult(i)}>
              <span className="ric">{entry.icon}</span>
              <span><strong style={{ display: 'block', fontSize: '.93rem' }}>{entry.title}</strong>
                <small style={{ color: 'var(--muted)', fontSize: '.79rem' }}>{entry.desc}</small></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function buildSearchEntries(lang, navigate) {
  const L = (en, am) => (lang === 'am' ? am : en);
  const entries = NAV.map(item => ({
    icon: item.icon, title: `${item.icon} ${L(item.en, item.am)}`, desc: L(`Go to ${item.en} page`, `ወደ ${item.am} ገጽ`),
    run: () => navigate(item.id),
  }));
  entries.push(
    { icon: '🌙', title: L('Toggle Dark Mode', 'ጨለማ ገጽ ቀይር'), desc: L('Switch theme', 'ገጽታ መቀየር'), run: () => window.__toggleTheme() },
    { icon: '🌐', title: L('Switch Language', 'ቋንቋ ቀይር'), desc: L('English / Amharic', 'እንግሊዝኛ / አማርኛ'), run: () => window.__toggleLang() },
  );
  return entries;
}

/* ── Chat widget ─────────────────────────────────────────────── */
const CHAT_RULES = [
  { keys: ['pay', 'payment', 'telebirr', 'cbe', 'ክፍያ'], page: 'services',
    en: 'We accept payments via telebirr and CBE Birr. Pay fees, license renewals, and taxes directly from the Services page.',
    am: 'ክፍያዎችን በቴሌብር እና በCBE Birr በቀጥታ ከአገልግሎቶች ገጽ መክፈል ይችላሉ።' },
  { keys: ['track', 'status', 'ክትትል'], page: 'track',
    en: 'Track your application in real-time on the Track page using your application number or phone number.',
    am: 'የማመልከቻዎን ሁኔታ በክትትል ገጽ በማመልከቻ ቁጥርዎ ወይም በስልክ ቁጥርዎ ይከታተሉ።' },
  { keys: ['apply', 'register', 'license', 'id', 'fayda', 'ፈቃድ', 'ምዝገባ'], page: 'services',
    en: 'You can apply online for Fayda Digital ID, trade licenses, banking linkage and more from our Services page.',
    am: 'ፋይዳ ዲጂታል መታወቂያ፣ የንግድ ፈቃድ፣ የባንክ አገናኝ እና ሌሎችን ከአገልግሎቶች ገጽ ማመልከት ይችላሉ።' },
  { keys: ['complaint', 'feedback', 'problem', 'ቅሬታ'], page: 'contact',
    en: 'Please submit complaints through the Contact form — our team responds within 2–3 business days.',
    am: 'ቅሬታዎን በአግኙን ቅጽ ያስገቡ — ቡድናችን በ2–3 የስራ ቀናት ውስጥ ይመልስልዎታል።' },
  { keys: ['hour', 'open', '24', 'ሰዓት'], page: null,
    en: 'The online portal is available 24/7. Office hours: Monday–Friday 8:30 AM – 5:30 PM, Saturday mornings.',
    am: 'የመስመር ላይ ፖርታሉ 24/7 ይገኛል። የቢሮ ሰዓታት፦ ሰኞ–አርብ ጠዋት 2:30 – ከሰዓት 11:30፣ ቅዳሜ ጠዋት።' },
  { keys: ['contact', 'phone', 'email', 'location', 'አድራሻ', 'ስልክ'], page: 'contact',
    en: '📍 Hossana, Hadiya Zone, Central Ethiopia\n📞 +251 90 324 6324\n✉ hossanmesob@gamil.com',
    am: '📍 ሆሳዕና፣ ሀዲያ ዞን፣ ማዕከላዊ ኢትዮጵያ\n📞 +251 90 324 6324\n✉ hossanmesob@gamil.com' },
  { keys: ['hello', 'hi', 'hey', 'ሰላም'], page: null,
    en: 'Hello! Welcome to Hossana Mesob Assistant. How can I help you today?',
    am: 'ሰላም! እንኳን ወደ ሆሳዕና መሶብ ረዳት በደህና መጡ። እንዴት ልረዳዎት?' },
];

export function ChatWidget({ lang }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);
  const greetedRef = useRef(false);

  useEffect(() => {
    if (open && !greetedRef.current) {
      greetedRef.current = true;
      pushBot(t(lang,
        'Hello! Welcome to the Hossana Mesob Assistant.\nHow can I help you today?',
        'ሰላም! እንኳን ወደ ሆሳዕና መሶብ ረዳት በደህና መጡ።\nእንዴት ልረዳዎት?'));
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [messages, typing]);

  const pushBot = text => setMessages(list => [...list, { role: 'bot', text }]);

  const send = textRaw => {
    const text = (textRaw ?? input).trim();
    if (!text || typing) return;
    setInput('');
    setMessages(list => [...list, { role: 'user', text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const rule = CHAT_RULES.find(r => r.keys.some(k => text.toLowerCase().includes(k)));
      pushBot(rule ? (lang === 'am' ? rule.am : rule.en)
                   : t(lang,
                       'Thank you for your message! Try asking about "payment", "tracking", "license", or "contact".',
                       'መልእክትዎን አመሰግናለሁ! "ክፍያ"፣ "ክትትል"፣ "ፈቃድ" ወይም "አድራሻ" ይሞክሩ።'));
    }, 900 + Math.random() * 400);
  };

  const chips = [['💳 Payment', 'payment'], ['📍 Track', 'track'], ['📝 Apply', 'license'], ['💬 Complaint', 'complaint']];

  return (
    <>
      <button className="chat-fab" onClick={() => setOpen(o => !o)} aria-label="Support chat">
        {!open && <span className="ring" />}<span>{open ? '✕' : '💬'}</span>
      </button>
      <div className={`chat-window ${open ? 'open' : ''}`}>
        <div className="chat-head">
          <div>
            <strong style={{ fontSize: '.95rem' }}>
              {t(lang, 'Hossana Mesob Assistant', 'የሆሳዕና መሶብ ረዳት')}</strong>
            <small><span className="dot-live" /> {t(lang, 'Online now', 'አሁን ኦንላይን')}</small>
          </div>
          <button onClick={() => setOpen(false)} style={{ fontSize: '1.05rem' }}>✕</button>
        </div>
        <div className="chat-body" ref={bodyRef}>
          {messages.map((msg, i) => <div key={i} className={`bubble ${msg.role}`}>{msg.text}</div>)}
          {typing && <div className="typing"><i /><i /><i /></div>}
        </div>
        {open && (
          <div style={{ display: 'flex', gap: 7, padding: '9px 12px', overflowX: 'auto', borderTop: '1px solid var(--border)' }}>
            {chips.map(([label, seed]) => (
              <button key={seed} className="filter-chip" style={{ flexShrink: 0, padding: '6px 13px', fontSize: '.78rem' }}
                      onClick={() => send(seed)}>{label}</button>
            ))}
          </div>
        )}
        <div className="chat-input">
          <input value={input} onChange={e => setInput(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && send()}
                 placeholder={t(lang, 'Ask a question...', 'ጥያቄ ይጠይቁ...')} />
          <button className="send-btn" onClick={() => send()}>➤</button>
        </div>
      </div>
    </>
  );
}
