import { useEffect, useRef, useState } from 'react';
import {
  ABOUT_HOME, BENEFITS, CORE_SERVICES, HERO_SLIDES, HERO_TEXT,
  NEWS_FALLBACK, ORBIT,
} from './content.js';
import { fetchJson, useApiList, useCounter } from './lib.js';

const t = (lang, en, am) => (lang === 'am' ? am || en : en);
const L = lang => obj => t(lang, obj?.en, obj?.am);

/* ── HERO — background image slides + dots/arrows (template) ── */
export function Hero({ lang, navigate }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setIndex(i => (i + 1) % HERO_SLIDES.length), 6500);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = i => { setIndex(i); clearInterval(timerRef.current); restartCaptions(); };
  const next = () => goTo((index + 1) % HERO_SLIDES.length);
  const prev = () => goTo((index - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const restartCaptions = () => {
    document.querySelectorAll('.hero-content > *').forEach(el => {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
    });
  };

  return (
    <section className="hero" id="home-hero">
      <div className="hero-slides">
        {HERO_SLIDES.map((slide, i) => (
          <div key={slide.img} className={`hero-slide ${i === index ? 'on' : ''}`}>
            <img src={slide.img} alt="" loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>
      <div className="hero-shade" />

      <div className="hero-content">
        <span className="hero-badge">{HERO_TEXT.badge}</span>
        <h1>{t(lang, HERO_TEXT.title.en, HERO_TEXT.title.am)}</h1>
        <p className="hero-sub">{t(lang, HERO_TEXT.subtitle.en, HERO_TEXT.subtitle.am)}</p>
        <div className="hero-btns">
          <button className="btn primary" onClick={() => navigate('services')}>
            {t(lang, HERO_TEXT.cta1.en, HERO_TEXT.cta1.am)}</button>
          <button className="btn ghost-white" onClick={() => navigate('track')}>
            {t(lang, HERO_TEXT.cta2.en, HERO_TEXT.cta2.am)}</button>
        </div>
      </div>

      <div className="hero-controls">
        <button className="hero-arrow" onClick={prev} aria-label="Previous">←</button>
        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} aria-label={`Slide ${i + 1}`}
                    className={`hero-dot ${i === index ? 'on' : ''}`} onClick={() => goTo(i)} />
          ))}
        </div>
        <button className="hero-arrow" onClick={next} aria-label="Next">→</button>
      </div>
    </section>
  );
}

/* ── About the Center ────────────────────────────────────────── */
export function AboutPreview({ lang, navigate }) {
  return (
    <section className="section">
      <div className="container about-split rv rv-up">
        <div>
          <span className="kicker">{L(lang)(ABOUT_HOME.kicker)}</span>
          <h2 style={{ fontSize: 'clamp(1.4rem,2.8vw,1.95rem)', marginBottom: 14 }}>
            {L(lang)(ABOUT_HOME.title)}</h2>
          <p style={{ color: 'var(--muted)' }}>{L(lang)(ABOUT_HOME.p1)}</p>
          <p style={{ color: 'var(--muted)', marginTop: 12 }}>{L(lang)(ABOUT_HOME.p2)}</p>
          <p style={{ color: 'var(--muted)', marginTop: 12 }}>{L(lang)(ABOUT_HOME.p3)}</p>
          <div className="badge-row">
            {ABOUT_HOME.badges.map(badge => <span key={badge} className="pill-badge">{badge}</span>)}
          </div>
          <button className="btn primary" style={{ marginTop: 26 }} onClick={() => navigate('about')}>
            {L(lang)(ABOUT_HOME.more)}</button>
        </div>
        <div className="about-emblem">
          <img src="/assets/logo.jpg" alt="Mesob One emblem" />
        </div>
      </div>
    </section>
  );
}

/* ── Benefits / impact stats ─────────────────────────────────── */
function StatCell({ stat, started, lang }) {
  const display = useCounter(stat.num, started);
  return (
    <div className="stat-cell rv rv-pop in-view">
      <div className="stat-num">{stat.prefixAm && lang === 'am' ? 'ከ' : ''}{display}</div>
      <div className="stat-lbl">{L(lang)(stat.label)}</div>
    </div>
  );
}

export function BenefitsStats({ lang }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setStarted(true)),
      { threshold: 0.35 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stat-band" ref={ref}>
      <div className="container stat-grid">
        {BENEFITS.stats.map(stat => (
          <StatCell key={stat.label.en} stat={stat} started={started} lang={lang} />
        ))}
      </div>
    </section>
  );
}

/* ── Latest news strip (home) ────────────────────────────────── */
export function NewsLatest({ lang, navigate }) {
  const [items] = useApiList('/api/news', NEWS_FALLBACK);
  const latest = items.slice(0, 3);

  return (
    <section className="section alt">
      <div className="container">
        <div className="section-head rv rv-up">
          <span className="kicker">{t(lang, 'News & Updates', 'ዜናዎች')}</span>
          <h2 className="section-title">{t(lang, 'Latest News', 'የቅርብ ዜና')}</h2>
          <p className="section-desc">{t(lang,
            'Stay informed about services, updates, and announcements from the center.',
            'ስለ አገልግሎቶች፣ ዝማኔዎች እና ማስታወቂያዎች ይወቁ።')}</p>
        </div>
        <div className="card-grid rv rv-up">
          {latest.map(post => (
            <article key={post.id} className="news-card">
              <div className="news-thumb"><span className="news-tag">{post.category}</span>📰</div>
              <div className="news-body">
                <span className="news-date">🗓 {(post.created_at || '').slice(0, 10)}</span>
                <h3>{t(lang, post.title, post.title_am)}</h3>
                <p>{t(lang, post.content, post.content_am)}</p>
              </div>
            </article>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 34 }}>
          <button className="btn outline" onClick={() => navigate('news')}>
            {t(lang, 'View All News', 'ሁሉንም ዜና ይመልከቱ')}</button>
        </div>
      </div>
    </section>
  );
}

/* ── Core services (What We Do) ──────────────────────────────── */
export function CoreServicesGrid({ lang, navigate }) {
  return (
    <section className="section" id="what-we-do">
      <div className="container">
        <div className="section-head rv rv-up">
          <span className="kicker">{t(lang, 'Core Services', 'ዋና አገልግሎቶች')}</span>
          <h2 className="section-title">{t(lang, 'What We Do', 'የምንሠራው')}</h2>
          <p className="section-desc">{t(lang,
            'The core online services enabling citizens to access government services wherever they are.',
            'ዜጎች የመንግስት አገልግሎቶችን በየትም ቦታ እንዲደርሱ የሚያስችሉ ዋና ዋና የመስመር ላይ አገልግሎቶች።')}</p>
        </div>
        <div className="card-grid">
          {CORE_SERVICES.map(service => (
            <div key={service.en} className="card rv rv-up">
              <div className="card-icon">{service.icon}</div>
              <h3>{t(lang, service.en, service.am)}</h3>
              <p>{t(lang, service.den, service.dam)}</p>
              <a className="learn-more" href="#services"
                 onClick={e => { e.preventDefault(); navigate('services'); }}>
                {t(lang, 'Learn More →', 'ተጨማሪ →')}</a>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 34 }}>
          <button className="btn outline" onClick={() => navigate('services')}>
            {t(lang, 'View All Services', 'ሁሉንም አገልግሎቶች ይመልከቱ')}</button>
        </div>
      </div>
    </section>
  );
}

/* ── ORBIT showcase — animated partner institution logos ────── */
export function OrbitShowcase({ lang }) {
  const inner = ORBIT.logos;
  const outer = [...ORBIT.logos].reverse();
  // Distribute logos around each ring
  const place = (list, radiusPercent) =>
    list.map((logo, i) => ({
      ...logo,
      angle: (360 / list.length) * i,
      radiusPercent,
    }));

  return (
    <section className="orbit-section">
      <div className="container">
        <div className="section-head rv rv-up" style={{ marginBottom: 10 }}>
          <span className="kicker" style={{ color: 'var(--accent-soft)' }}>{L(lang)(ORBIT.kicker)}</span>
          <h2 className="section-title" style={{ color: '#fff' }}>{L(lang)(ORBIT.title)}</h2>
          <p className="section-desc" style={{ color: 'rgba(255,255,255,.82)' }}>{L(lang)(ORBIT.desc)}</p>
        </div>

        <div className="orbit-stage rv rv-pop" role="img"
             aria-label="Animated partner institution logos orbiting the Mesob One emblem">
          {/* outer counter-rotating ring */}
          <div className="orbit-ring outer">
            {place(outer, 58).map(sat => {
              const rad = (sat.angle * Math.PI) / 180;
              return (
                <div key={`o-${sat.name}`} className="orbit-sat"
                     title={sat.name}
                     style={{
                       left: `${50 + Math.cos(rad) * sat.radiusPercent}%`,
                       top: `${50 + Math.sin(rad) * sat.radiusPercent}%`,
                       animation: 'spinCCW 52s linear infinite reverse',
                     }}>
                  <div className="sat-card"><img src={sat.src} alt={sat.name} loading="lazy" /></div>
                </div>
              );
            })}
          </div>

          {/* inner ring */}
          <div className="orbit-ring">
            {place(inner, 42).map(sat => {
              const rad = (sat.angle * Math.PI) / 180;
              return (
                <div key={`i-${sat.name}`} className="orbit-sat" title={sat.name}
                     style={{
                       left: `${50 + Math.cos(rad) * sat.radiusPercent}%`,
                       top: `${50 + Math.sin(rad) * sat.radiusPercent}%`,
                       animation: 'spinCW 36s linear infinite reverse',
                     }}>
                  <div className="sat-card"><img src={sat.src} alt={sat.name} loading="lazy" /></div>
                </div>
              );
            })}
          </div>

          <div className="orbit-core"><img src="/assets/logo.jpg" alt="Mesob One" /></div>
        </div>

        <div className="orbit-caption">{ORBIT.caption}</div>
        <div className="chip-row">
          {ORBIT.chips.map(chip => <span key={chip} className="glass-chip">{chip}</span>)}
        </div>
      </div>
    </section>
  );
}

/* ── CTA band ────────────────────────────────────────────────── */
export function CTAJoin({ lang, navigate }) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-band rv rv-pop">
          <h2>{t(lang, 'Join the Digital Ethiopia Journey', 'የዲጂታል ኢትዮጵያ ጉዞ ይቀላቀሉ')}</h2>
          <p>{t(lang,
            "Whether you\u2019re a citizen, business owner, or stakeholder — connect easily with the Mesob One Digital Service Center.",
            'ዜግነትዎ፣ ነጋዴነትዎ ወይም ተባባሪነትዎ ምንም ይሁን — ከመሶብ አንድ ዲጂታል አገልግሎት ማዕከል በቀላሉ ይገናኙ።')}</p>
          <div className="cta-actions">
            <button className="btn amber" onClick={() => navigate('contact')}>
              {t(lang, 'Request a Service', 'አገልግሎት ይጠይቁ')}</button>
            <button className="btn ghost-white" onClick={() => navigate('services/library')}>
              {t(lang, 'Read Our Guidelines', 'መመሪያዎቻችንን ያንብቡ')}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
