export interface VaultMethod {
  id: string;
  title: string;
  content: string;
  status: 'WORKING' | 'TESTING';
  difficulty: 1 | 2 | 3;
  category: 'BIN' | 'METHOD' | 'EXPLOIT';
}

export const VAULT_DATA: VaultMethod[] = [
  {
    id: 'v1',
    title: 'Amazon Prime Video BIN',
    content: 'BIN: 451408xxxxxxxxxx | IP: USA | ZIP: 10001 | CCV: RND',
    status: 'WORKING',
    difficulty: 1,
    category: 'BIN'
  },
  {
    id: 'v2',
    title: 'Disney+ Method 2026',
    content: '1. Use Residential Proxy (UK). 2. Clear cookies. 3. Use Revolut VCC with specific BIN 4596...',
    status: 'WORKING',
    difficulty: 2,
    category: 'METHOD'
  },
  {
    id: 'v3',
    title: 'Netflix Premium Exploit',
    content: 'Access via T-Mobile billing portal bypass. Requires active session token from...',
    status: 'TESTING',
    difficulty: 3,
    category: 'EXPLOIT'
  },
  {
    id: 'v4',
    title: 'Spotify Family Owner BIN',
    content: 'BIN: 535322xxxxxxxxxx | IP: Germany | No VCC verification required on checkout.',
    status: 'WORKING',
    difficulty: 1,
    category: 'BIN'
  }
];