import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { api } from '../api/client';

export interface BotData {
  id: string;
  name: string;
  persona: string;
  model: string;
  channel: string;
  system_prompt: string;
  status: string;
  created_at: string;
}

interface BotsState {
  bots: BotData[];
  selectedBot: BotData | null;
  loading: boolean;
  selectBot: (id: string) => void;
  refresh: () => Promise<void>;
  createBot: (data: { name: string; persona: string; model: string; channel: string; status?: string }) => Promise<BotData>;
  updateBot: (id: string, data: Partial<BotData>) => Promise<void>;
  deleteBot: (id: string) => Promise<void>;
}

const BotsContext = createContext<BotsState | null>(null);

export const BotsProvider = BotsContext.Provider;

export function useBotsProvider() {
  const [bots, setBots] = useState<BotData[]>([]);
  const [selectedBotId, setSelectedBotId] = useState<string | null>(
    () => localStorage.getItem('af-selected-bot')
  );
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!localStorage.getItem('af-token');

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setBots([]);
      setLoading(false);
      return;
    }
    try {
      const res = await api.get('/api/bots') as { bots: BotData[] };
      const serverBots = res.bots || [];
      setBots(serverBots);

      if (serverBots.length && !selectedBotId) {
        setSelectedBotId(serverBots[0].id);
        localStorage.setItem('af-selected-bot', serverBots[0].id);
      }
    } catch {
      setBots([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, selectedBotId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const selectBot = useCallback((id: string) => {
    setSelectedBotId(id);
    localStorage.setItem('af-selected-bot', id);
  }, []);

  const selectedBot = bots.find((b) => b.id === selectedBotId) || bots[0] || null;

  const createBot = useCallback(async (data: { name: string; persona: string; model: string; channel: string; status?: string }) => {
    const res = await api.post('/api/bots', data) as { bot: BotData };
    setBots((prev) => [res.bot, ...prev]);
    setSelectedBotId(res.bot.id);
    localStorage.setItem('af-selected-bot', res.bot.id);
    return res.bot;
  }, []);

  const updateBot = useCallback(async (id: string, data: Partial<BotData>) => {
    const res = await api.put(`/api/bots/${id}`, data) as { bot: BotData };
    setBots((prev) => prev.map((b) => (b.id === id ? res.bot : b)));
  }, []);

  const deleteBot = useCallback(async (id: string) => {
    await api.delete(`/api/bots/${id}`);
    setBots((prev) => {
      const remaining = prev.filter((b) => b.id !== id);
      if (selectedBotId === id && remaining.length > 0) {
        setSelectedBotId(remaining[0].id);
        localStorage.setItem('af-selected-bot', remaining[0].id);
      }
      return remaining;
    });
  }, [selectedBotId]);

  return { bots, selectedBot, loading, selectBot, refresh, createBot, updateBot, deleteBot };
}

export function useBots() {
  const ctx = useContext(BotsContext);
  if (!ctx) throw new Error('useBots must be used within BotsProvider');
  return ctx;
}
