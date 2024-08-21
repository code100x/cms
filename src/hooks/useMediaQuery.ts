import * as React from "react";

/**
 * This React hook to determine if a given media query matches the current viewport.
 *
 * @param {string} query - The CSS media query string .
 * @returns {boolean} - Returns `true` if the media query matches the current viewport, otherwise `false`.
 * Example
 * ```
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * ```
 */

export function useMediaQuery(query: string): boolean {
    const subscribe = React.useCallback(
      (callback: () => void) => {
        const matchMedia = window.matchMedia(query);
  
        matchMedia.addEventListener("change", callback);
        return () => {
          matchMedia.removeEventListener("change", callback);
        };
      },
      [query]
    );
  
    const getSnapshot = () => {
      return window.matchMedia(query).matches;
    };
  
    return React.useSyncExternalStore(subscribe, getSnapshot);
  }