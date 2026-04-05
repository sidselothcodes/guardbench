import { ScanResult, BypassResult } from './types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function scanPrompt(prompt: string): Promise<ScanResult> {
  const response = await fetch(`${API_BASE}/api/scan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export async function testBypass(prompt: string): Promise<BypassResult> {
  const response = await fetch(`${API_BASE}/api/test-bypass`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export function pingHealth(): void {
  fetch(`${API_BASE}/api/health`).catch(() => {});
}
