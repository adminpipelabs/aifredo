import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';

export interface ClaimTask {
  id: string;
  label: string;
  reward: number;
  completed: boolean;
  proof: string | null;
}

export interface ClaimStats {
  total_claimed: number;
  max_claims: number;
  remaining: number;
  claim_amount: number;
  tasks: { id: string; label: string; reward: number }[];
}

export interface ClaimStatus {
  eligible: boolean;
  has_bots: boolean;
  claimed: boolean;
  claim: {
    id: number;
    user_id: string;
    wallet_address: string;
    amount: number;
    status: string;
    tx_signature: string | null;
    reserved_at: string;
    distributed_at: string | null;
  } | null;
  spots_remaining: number;
  total_claimed: number;
  max_claims: number;
  claim_amount: number;
  tasks: ClaimTask[];
  completed_count: number;
  total_tasks: number;
}

export function useClaimStats() {
  const [stats, setStats] = useState<ClaimStats | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await api.get('/api/claims/stats') as ClaimStats;
      setStats(data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { stats, loading, refresh };
}

export function useClaimStatus() {
  const [status, setStatus] = useState<ClaimStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!localStorage.getItem('af-token');

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    try {
      const data = await api.get('/api/claims/status') as ClaimStatus;
      setStatus(data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => { refresh(); }, [refresh]);

  const completeTask = useCallback(async (task: string, proof?: string) => {
    const data = await api.post('/api/claims/task', { task, proof });
    await refresh();
    return data;
  }, [refresh]);

  const reserve = useCallback(async () => {
    const data = await api.post('/api/claims/reserve', {});
    await refresh();
    return data;
  }, [refresh]);

  return { status, loading, completeTask, reserve, refresh, isAuthenticated };
}
