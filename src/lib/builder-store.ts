import { useCallback, useEffect, useState } from "react";

export type BuilderMode = "complete" | "setting" | "diamond";
export type BuilderState = {
  mode?: BuilderMode;
  settingSlug?: string;
  metal?: string;
  diamondId?: string;
  size?: string;
  engraving?: string;
  startedAt?: number;
  lockedAt?: number;
  lockEmail?: string;
};

const KEY = "danhov.builder";
const EVT = "danhov-builder";

function read(): BuilderState {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as BuilderState;
  } catch {
    return {};
  }
}

export function useBuilder() {
  const [state, setState] = useState<BuilderState>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(read());
    setReady(true);
    const h = () => setState(read());
    window.addEventListener(EVT, h);
    return () => window.removeEventListener(EVT, h);
  }, []);

  const update = useCallback((patch: BuilderState) => {
    localStorage.setItem(KEY, JSON.stringify({ ...read(), ...patch }));
    window.dispatchEvent(new Event(EVT));
  }, []);

  const clear = useCallback((keys: (keyof BuilderState)[]) => {
    const next = read();
    keys.forEach((k) => delete next[k]);
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVT));
  }, []);

  return { state, ready, update, clear };
}

export const METAL_SURCHARGE: Record<string, number> = {
  Platinum: 450,
  "18k White Gold": 0,
  "18k Yellow Gold": 0,
  "18k Rose Gold": 50,
};
