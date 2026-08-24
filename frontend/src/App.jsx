import { useCallback, useEffect, useState } from 'react';
import {
  BackToTop, ChatWidget, Footer, MobileDock, NavBar, SearchPalette,
  TopBar, Toasts,
} from './layout.jsx';
import {
  AboutPreview, BenefitsStats, CoreServicesGrid, CTAJoin, Hero,
  NewsLatest, OrbitShowcase,
} from './home.jsx';
import {
  AboutPage, ContactPage, DownloadsPage, NewsPage, ServicesPage, TrackPage,
} from './pages.jsx';
import { useHashRoute, usePersisted, useReveal } from './lib.js';

const PAGES = ['home', 'about', 'services', 'track', 'news', 'downloads', 'contact'];

export default function App() {
  const [lang, setLang] = usePersisted('mesob-lang', 'en');
  const [theme, setTheme] = usePersisted('mesob-theme', 'light');
  const [route, navigate] = useHashRoute();
  const [searchOpen, setSearchOpen] = useState(false);

  const page = PAGES.includes(route.page) ? route.page : 'home';

  /* theme + language side effects */
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  useEffect(() => { document.documentElement.lang = lang === 'am' ? 'am' : 'en'; }, [lang]);

  /* scroll to top on page change (unless deep-linked to an anchor) */
  useEffect(() => {
    if (!route.anchor) window.scrollTo({ top: 0 });
  }, [route.page]); // eslint-disable-line react-hooks/exhaustive-deps

  /* global shortcuts + imperative bridges used by layout components */
  useEffect(() => {
    window.__toggleLang = () => setLang(l => (l === 'en' ? 'am' : 'en'));
    window.__toggleTheme = () => setTheme(th => (th === 'dark' ? 'light' : 'dark'));
    window.__openSearch = () => setSearchOpen(true);

    const onKey = event => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(open => !open);
      }
      if (event.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setLang, setTheme]);

  useReveal();

  const goHome = useCallback(() => navigate('home'), [navigate]);

  return (
    <>
      <TopBar lang={lang} />
      <NavBar lang={lang} page={page} navigate={navigate}
              theme={theme} toggleTheme={() => setTheme(th => (th === 'dark' ? 'light' : 'dark'))} />

      <main>
        {page === 'home' && (
          <>
            <Hero lang={lang} navigate={navigate} />
            <AboutPreview lang={lang} navigate={navigate} />
            <BenefitsStats lang={lang} />
            <NewsLatest lang={lang} navigate={navigate} />
            <CoreServicesGrid lang={lang} navigate={navigate} />
            <OrbitShowcase lang={lang} />
            <CTAJoin lang={lang} navigate={navigate} />
          </>
        )}
        {page === 'about' && <AboutPage key="about" lang={lang} navigate={goHome} />}
        {page === 'services' && (
          <ServicesPage key={`services-${route.anchor || ''}`} lang={lang} navigate={goHome} anchor={route.anchor} />
        )}
        {page === 'track' && <TrackPage lang={lang} navigate={goHome} />}
        {page === 'news' && <NewsPage lang={lang} navigate={goHome} />}
        {page === 'downloads' && <DownloadsPage lang={lang} navigate={goHome} />}
        {page === 'contact' && <ContactPage lang={lang} navigate={goHome} />}
      </main>

      <Footer lang={lang} navigate={navigate} />

      {/* floating layers */}
      <ChatWidget lang={lang} />
      <SearchPalette lang={lang} open={searchOpen} onClose={() => setSearchOpen(false)} navigate={navigate} />
      <Toasts />
      <BackToTop />
      <MobileDock lang={lang} page={page} navigate={navigate} />
    </>
  );
}
