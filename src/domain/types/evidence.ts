/**
 * Evidence Domain Model
 * Represents evidence supporting a topic answer
 * Following Clean Architecture - Domain Layer
 */

export type EvidenceType = 'quran' | 'hadith' | 'scholarly' | 'historical' | 'scientific';

export interface Evidence {
  id: string;
  topicId: string;
  type: EvidenceType;
  title: string;
  titleArabic?: string;
  content: string;
  contentArabic?: string;
  source: string; // e.g., "Sahih Bukhari 1234" or "Surah Al-Baqarah 2:255"
  sourceReference?: string; // URL or book reference
  isAuthenticated: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEvidenceData {
  topicId: string;
  type: EvidenceType;
  title: string;
  titleArabic?: string;
  content: string;
  contentArabic?: string;
  source: string;
  sourceReference?: string;
}

export interface UpdateEvidenceData {
  type?: EvidenceType;
  title?: string;
  titleArabic?: string;
  content?: string;
  contentArabic?: string;
  source?: string;
  sourceReference?: string;
  isAuthenticated?: boolean;
  order?: number;
}

// Helper for displaying evidence type in Thai
export const evidenceTypeLabels: Record<EvidenceType, string> = {
  quran: 'อัลกุรอาน',
  hadith: 'หะดีษ',
  scholarly: 'ความเห็นนักวิชาการ',
  historical: 'หลักฐานทางประวัติศาสตร์',
  scientific: 'หลักฐานทางวิทยาศาสตร์',
};

// Helper for displaying evidence type icon
export const evidenceTypeIcons: Record<EvidenceType, string> = {
  quran: '📖',
  hadith: '📜',
  scholarly: '🎓',
  historical: '🏛️',
  scientific: '🔬',
};
