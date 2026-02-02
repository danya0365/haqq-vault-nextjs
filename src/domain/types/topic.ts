/**
 * Topic Domain Model
 * Represents an accusation/doubt with its answer
 * Following Clean Architecture - Domain Layer
 */

export type SeverityLevel = 'basic' | 'intermediate' | 'advanced';
export type TopicStatus = 'draft' | 'pending' | 'approved' | 'published';

export interface Topic {
  id: string;
  slug: string;
  title: string;
  titleArabic?: string;
  claim: string; // ข้อกล่าวหา/ชุบฮาต
  shortAnswer: string; // คำตอบสรุปสั้น
  detailedExplanation: string; // คำอธิบายเชิงลึก
  categoryId: string;
  severityLevel: SeverityLevel;
  tags: string[];
  status: TopicStatus;
  isVerified: boolean; // Scholar verified
  viewCount: number;
  authorId?: string;
  reviewerId?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TopicStats {
  totalTopics: number;
  publishedTopics: number;
  pendingTopics: number;
  verifiedTopics: number;
}

export interface CreateTopicData {
  title: string;
  titleArabic?: string;
  claim: string;
  shortAnswer: string;
  detailedExplanation: string;
  categoryId: string;
  severityLevel: SeverityLevel;
  tags: string[];
}

export interface UpdateTopicData {
  title?: string;
  titleArabic?: string;
  claim?: string;
  shortAnswer?: string;
  detailedExplanation?: string;
  categoryId?: string;
  severityLevel?: SeverityLevel;
  tags?: string[];
  status?: TopicStatus;
  isVerified?: boolean;
}
