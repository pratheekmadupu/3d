import Lenis from "lenis";

// Singleton Lenis instance shared across the app
let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function setLenis(l: Lenis) {
  lenisInstance = l;
}

export function destroyLenis() {
  lenisInstance = null;
}
