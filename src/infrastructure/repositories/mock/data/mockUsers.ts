/**
 * Mock Users Data
 */

import type { User } from '@/src/domain/types/user';

export const MOCK_USERS: User[] = [
  {
    id: 'user-001',
    email: 'admin@haqqvault.com',
    name: 'ผู้ดูแลระบบ',
    nameArabic: 'المدير',
    role: 'admin',
    isVerified: true,
    bio: 'ผู้ดูแลระบบ Haqq Vault',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-002',
    email: 'scholar@haqqvault.com',
    name: 'ดร.อับดุลเลาะห์',
    nameArabic: 'د. عبد الله',
    role: 'scholar',
    isVerified: true,
    bio: 'นักวิชาการด้านอิสลามศึกษา',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'user-003',
    email: 'user@example.com',
    name: 'ผู้ใช้ทั่วไป',
    role: 'user',
    isVerified: true,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
];

// Mock passwords (for demo purposes only)
export const MOCK_PASSWORDS: Record<string, string> = {
  'admin@haqqvault.com': 'admin123',
  'scholar@haqqvault.com': 'scholar123',
  'user@example.com': 'user123',
};
