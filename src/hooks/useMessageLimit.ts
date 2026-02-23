import { useState, useCallback } from 'react';

const FREE_DAILY_LIMIT = 20;
const STORAGE_KEY = 'af-msg-count';

interface DayCount {
  date: string;
  count: number;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function load(): DayCount {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: todayKey(), count: 0 };
    const parsed: DayCount = JSON.parse(raw);
    if (parsed.date !== todayKey()) return { date: todayKey(), count: 0 };
    return parsed;
  } catch {
    return { date: todayKey(), count: 0 };
  }
}

function save(data: DayCount) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useMessageLimit() {
  const [state, setState] = useState<DayCount>(load);

  const remaining = Math.max(0, FREE_DAILY_LIMIT - state.count);
  const isLimited = remaining <= 0;

  const increment = useCallback(() => {
    setState(prev => {
      const today = todayKey();
      const next = prev.date === today
        ? { date: today, count: prev.count + 1 }
        : { date: today, count: 1 };
      save(next);
      return next;
    });
  }, []);

  return { remaining, isLimited, used: state.count, limit: FREE_DAILY_LIMIT, increment };
}
