import { useEffect } from 'react';

/**
 * Browsers block `requestFullscreen()` unless it is called from a user
 * gesture, so we cannot enter fullscreen on plain page load. The next
 * best thing is to listen for the very first interaction (pointer or
 * key) and attempt fullscreen there — Chrome and Safari both treat
 * that initial event as a valid activation. After one attempt we tear
 * the listeners down so we never interrupt a player who deliberately
 * exits fullscreen mid-session.
 */
export function useAutoFullscreen() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.fullscreenElement) return;

    let used = false;
    const tryEnter = () => {
      if (used) return;
      used = true;
      cleanup();
      const root = document.documentElement;
      const req =
        root.requestFullscreen ??
        (root as unknown as { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen;
      try {
        const result = req?.call(root);
        if (result && typeof (result as Promise<void>).catch === 'function') {
          (result as Promise<void>).catch(() => { /* user dismissed or unsupported */ });
        }
      } catch { /* ignore */ }
    };

    const cleanup = () => {
      window.removeEventListener('pointerdown', tryEnter, true);
      window.removeEventListener('keydown', tryEnter, true);
      window.removeEventListener('touchstart', tryEnter, true);
    };

    window.addEventListener('pointerdown', tryEnter, { capture: true, once: true });
    window.addEventListener('keydown', tryEnter, { capture: true, once: true });
    window.addEventListener('touchstart', tryEnter, { capture: true, once: true });
    return cleanup;
  }, []);
}
