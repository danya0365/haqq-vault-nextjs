/**
 * Mock Users Data
 * Contains sample user data for development and testing
 * Multiple roles: admin, scholar, user
 */

import type { User } from '@/src/domain/types/user';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@haqqvault.com',
    name: 'ผู้ดูแลระบบ',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z',
    isVerified: true,
    updatedAt: '2024-01-01T00:00:00.000Z',
    bio: 'ผู้ดูแลระบบ Haqq Vault',
  },
  {
    id: '2',
    email: 'scholar@haqqvault.com',
    name: 'ดร.อับดุลเลาะห์',
    role: 'scholar',
    createdAt: '2024-01-15T00:00:00.000Z',
    isVerified: true,
    updatedAt: '2024-01-15T00:00:00.000Z',
    bio: 'นักวิชาการอิสลามศึกษา ผู้เชี่ยวชาญด้านหะดีษ',
  },
  {
    id: '3',
    email: 'scholar2@haqqvault.com',
    name: 'อุสตาซ มูฮัมหมัด',
    role: 'scholar',
    createdAt: '2024-02-01T00:00:00.000Z',
    isVerified: true,
    updatedAt: '2024-02-01T00:00:00.000Z',
    bio: 'นักวิชาการด้านกฎหมายอิสลาม',
  },
  {
    id: '4',
    email: 'user@example.com',
    name: 'อาลี ผู้ใช้ทั่วไป',
    role: 'user',
    createdAt: '2024-03-01T00:00:00.000Z',
    isVerified: true,
    updatedAt: '2024-03-01T00:00:00.000Z',
    bio: 'สมาชิกผู้สนใจศึกษาความรู้อิสลาม',
  },
  {
    id: '5',
    email: 'fatimah@example.com',
    name: 'ฟาติมะห์',
    role: 'user',
    createdAt: '2024-03-10T00:00:00.000Z',
    isVerified: false,
    updatedAt: '2024-03-10T00:00:00.000Z',
    bio: 'นักศึกษา',
  },
  {
    id: '6',
    email: 'ahmad@example.com',
    name: 'อะฮ์หมัด',
    role: 'user',
    createdAt: '2024-03-15T00:00:00.000Z',
    isVerified: true,
    updatedAt: '2024-03-15T00:00:00.000Z',
  },
];

// Password mapping for mock users
export const MOCK_PASSWORDS: Record<string, string> = {
  'admin@haqqvault.com': 'admin123',
  'scholar@haqqvault.com': 'scholar123',
  'scholar2@haqqvault.com': 'scholar123',
  'user@example.com': 'user123',
  'fatimah@example.com': 'user123',
  'ahmad@example.com': 'user123',
};

// Demo accounts for quick login
export const DEMO_ACCOUNTS = [
  {
    user: MOCK_USERS[0], // Admin
    password: 'admin123',
    description: 'ผู้ดูแลระบบ - เข้าถึงได้ทุกฟังก์ชัน',
    color: 'bg-red-500',
    icon: '👑',
  },
  {
    user: MOCK_USERS[1], // Scholar 1
    password: 'scholar123',
    description: 'นักวิชาการ - เพิ่มและแก้ไขคำตอบ',
    color: 'bg-gold',
    icon: '📚',
  },
  {
    user: MOCK_USERS[2], // Scholar 2
    password: 'scholar123',
    description: 'นักวิชาการ - เพิ่มและแก้ไขคำตอบ',
    color: 'bg-gold',
    icon: '📖',
  },
  {
    user: MOCK_USERS[3], // User
    password: 'user123',
    description: 'สมาชิกทั่วไป - อ่านและบันทึก',
    color: 'bg-primary',
    icon: '👤',
  },
];
