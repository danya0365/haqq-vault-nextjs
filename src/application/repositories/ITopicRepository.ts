/**
 * ITopicRepository
 * Repository interface for Topic data access
 * Following Clean Architecture - Application Layer
 */

import {
    CreateTopicData,
    SeverityLevel,
    Topic,
    TopicStats,
    UpdateTopicData,
} from '@/src/domain/types/topic';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}

export interface TopicSearchParams {
  query?: string;
  categoryId?: string;
  severityLevel?: SeverityLevel;
  status?: string;
  isVerified?: boolean;
}

export interface ITopicRepository {
  /**
   * Get topic by ID
   */
  getById(id: string): Promise<Topic | null>;

  /**
   * Get topic by slug
   */
  getBySlug(slug: string): Promise<Topic | null>;

  /**
   * Get all topics
   */
  getAll(): Promise<Topic[]>;

  /**
   * Get paginated topics
   */
  getPaginated(page: number, perPage: number): Promise<PaginatedResult<Topic>>;

  /**
   * Get topics by category
   */
  getByCategory(categoryId: string): Promise<Topic[]>;

  /**
   * Search topics
   */
  search(params: TopicSearchParams): Promise<Topic[]>;

  /**
   * Get featured topics (verified & published)
   */
  getFeatured(limit?: number): Promise<Topic[]>;

  /**
   * Get popular topics (by view count)
   */
  getPopular(limit?: number): Promise<Topic[]>;

  /**
   * Create a new topic
   */
  create(data: CreateTopicData): Promise<Topic>;

  /**
   * Update an existing topic
   */
  update(id: string, data: UpdateTopicData): Promise<Topic>;

  /**
   * Delete a topic
   */
  delete(id: string): Promise<boolean>;

  /**
   * Increment view count
   */
  incrementViewCount(id: string): Promise<void>;

  /**
   * Get statistics
   */
  getStats(): Promise<TopicStats>;
}
