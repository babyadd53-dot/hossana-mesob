import { useCallback, useEffect, useRef, useState } from 'react';

/* ── persisted state ─────────────────────────────────────────── */
export function usePersisted(key, initial) {
  const [value, setValue] = useState(() => {
    try { return localStorage.getItem(key) ?? initial; } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, value); } catch { /* private mode */ }
  }, [key, value]);
  return [value, setValue];
}

/* ── scroll reveal ───────────────────────────────────────────── */
export function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.rv:not(.in-view)');
    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });
}

/* ── API helper ──────────────────────────────────────────────── */
export async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export function useApiList(url, fallback) {
  const [items, setItems] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchJson(url);
      setItems(Array.isArray(data) && data.length ? data : fallback);
    } catch {
      setItems(fallback);
    } finally {
      setLoading(false);
    }
  }, [url]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, [load]);
  return [items, loading];
}

/* ── animated counter ────────────────────────────────────────── */
export function useCounter(targetText, started) {
  const [display, setDisplay] = useState(targetText);
  const firedRef = useRef(false);

  useEffect(() => {
    if (!started || firedRef.current) return;
    firedRef.current = true;
    const numeric = parseInt(targetText.replace(/[^0-9]/g, ''), 10);
    if (!numeric) { setDisplay(targetText); return; }

    // "24/7" style values stay static; "40+" and plain numbers roll up.
    if (!/^[0-9+]+$/.test(targetText)) { setDisplay(targetText); return; }
    const suffix = targetText.includes('+') ? '+' : '';
    const duration = 1500;
    let startTime = null;
    let frame = null;

    const step = ts => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(`${Math.round(eased * numeric)}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [started, targetText]);

  return display;
}

/* ── toast bus ───────────────────────────────────────────────── */
const toastListeners = new Set();
export function toast(message, type = 'info') {
  toastListeners.forEach(fn => fn({ message, type }));
}
export function useToasts() {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    const onToast = ({ message, type }) => {
      const id = Date.now() + Math.random();
      setToasts(list => [...list, { id, message, type }]);
      setTimeout(() => setToasts(list => list.filter(t => t.id !== id)), 3400);
    };
    toastListeners.add(onToast);
    return () => { toastListeners.delete(onToast); };
  }, []);
  return toasts;
}

/* ── hash routing ────────────────────────────────────────────── */
export function useHashRoute() {
  const read = () => {
    const raw = window.location.hash.replace('#', '');
    const [page, anchor] = raw.split('/');
    return { page: page || 'home', anchor };
  };
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => setRoute(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  const navigate = useCallback((page, anchor) => {
    window.location.hash = anchor ? `${page}/${anchor}` : page;
  }, []);
  return [route, navigate];
}

/* pick localized field */
export function L(lang, obj, base, suffix = `_${lang === 'am' ? 'am' : ''}`) {
  if (lang === 'am') {
    const amValue = obj[`${base}_am`];
    if (amValue) return amValue;
  }
  return obj[base];
}
