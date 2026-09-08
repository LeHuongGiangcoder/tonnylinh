"use client";

import { useCallback, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { copy, LANGUAGES, type Lang } from "@/data/copy";

const STORAGE_KEY = "tl-lang";

function isLang(v: string | null): v is Lang {
  return v !== null && (LANGUAGES as readonly string[]).includes(v);
}

/**
 * The chosen language, held outside React.
 *
 * It has to be an external store rather than state in a provider: the value
 * lives in localStorage and in the browser's own language setting, neither of
 * which exists while the page is being rendered on the server. Reading it in
 * an effect and calling setState would work, but it costs a second render pass
 * on every load and React now flags it. `useSyncExternalStore` is built for
 * exactly this shape — it renders the server's answer, then swaps in the
 * client's once hydration is done, with no cascade.
 */
const store = {
  /** getSnapshot must be referentially stable, so the answer is memoised. */
  value: null as Lang | null,
  listeners: new Set<() => void>(),

  read(): Lang {
    if (store.value) return store.value;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isLang(saved)) return (store.value = saved);
      if (navigator.language?.toLowerCase().startsWith("vi")) return (store.value = "vi");
    } catch {
      // Private browsing can throw on localStorage. English is the fallback.
    }
    return (store.value = "en");
  },

  /** What the server renders, and what the client hydrates against. */
  readServer(): Lang {
    return "en";
  },

  write(lang: Lang) {
    store.value = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // The choice still holds for this visit; it just will not be remembered.
    }
    store.listeners.forEach((fn) => fn());
  },

  subscribe(fn: () => void) {
    store.listeners.add(fn);
    return () => {
      store.listeners.delete(fn);
    };
  },
};

export function useLang() {
  const lang = useSyncExternalStore(store.subscribe, store.read, store.readServer);
  return { lang, setLang: useCallback((l: Lang) => store.write(l), []) };
}

/** The dictionary for the language now showing. */
export function useCopy() {
  return copy[useSyncExternalStore(store.subscribe, store.read, store.readServer)];
}

/**
 * Keeps `<html lang>` in step with the choice. It holds no state — the store
 * does — so all it does is push the current value at the document, which is
 * what an effect is for.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const { lang } = useLang();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return children;
}

/** The VIE / EN switch. Two halves of one pill, so the choice reads as a
 *  state rather than as two buttons that happen to sit together. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div className={`langswitch ${className}`.trim()} role="group" aria-label="Language">
      {LANGUAGES.map((l) => (
        <button
          key={l}
          type="button"
          className="langswitch__option"
          data-active={l === lang}
          aria-pressed={l === lang}
          onClick={() => setLang(l)}
        >
          {copy[l].langLabel[l]}
        </button>
      ))}
    </div>
  );
}
