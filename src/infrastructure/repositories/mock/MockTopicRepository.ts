/**
 * MockTopicRepository
 * Mock implementation for development and testing
 * Following Clean Architecture - Infrastructure Layer
 */

import {
    ITopicRepository,
    PaginatedResult,
    TopicSearchParams,
} from '@/src/application/repositories/ITopicRepository';
import {
    CreateTopicData,
    Topic,
    TopicStats,
    UpdateTopicData,
} from '@/src/domain/types/topic';
import { MOCK_TOPICS } from './data/mockData';

export class MockTopicRepository implements ITopicRepository {
  private topics: Topic[] = [...MOCK_TOPICS];

  async getById(id: string): Promise<Topic | null> {
    await this.delay(100);
    return this.topics.find((topic) => topic.id === id) || null;
  }

  async getBySlug(slug: string): Promise<Topic | null> {
    await this.delay(100);
    return this.topics.find((topic) => topic.slug === slug) || null;
  }

  async getAll(): Promise<Topic[]> {
    await this.delay(100);
    return [...this.topics];
  }

  async getPaginated(page: number, perPage: number): Promise<PaginatedResult<Topic>> {
    await this.delay(100);

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedItems = this.topics.slice(start, end);

    return {
      data: paginatedItems,
      total: this.topics.length,
      page,
      perPage,
    };
  }

  async getByCategory(categoryId: string): Promise<Topic[]> {
    await this.delay(100);
    return this.topics.filter((topic) => topic.categoryId === categoryId);
  }

  async search(params: TopicSearchParams): Promise<Topic[]> {
    await this.delay(150);

    return this.topics.filter((topic) => {
      if (params.query) {
        const query = params.query.toLowerCase();
        const matchesQuery =
          topic.title.toLowerCase().includes(query) ||
          topic.claim.toLowerCase().includes(query) ||
          topic.shortAnswer.toLowerCase().includes(query) ||
          topic.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesQuery) return false;
      }

      if (params.categoryId && topic.categoryId !== params.categoryId) {
        return false;
      }

      if (params.severityLevel && topic.severityLevel !== params.severityLevel) {
        return false;
      }

      if (params.status && topic.status !== params.status) {
        return false;
      }

      if (params.isVerified !== undefined && topic.isVerified !== params.isVerified) {
        return false;
      }

      return true;
    });
  }

  async getFeatured(limit: number = 5): Promise<Topic[]> {
    await this.delay(100);
    return this.topics
      .filter((topic) => topic.isVerified && topic.status === 'published')
      .slice(0, limit);
  }

  async getPopular(limit: number = 5): Promise<Topic[]> {
    await this.delay(100);
    return [...this.topics]
      .filter((topic) => topic.status === 'published')
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, limit);
  }

  async create(data: CreateTopicData): Promise<Topic> {
    await this.delay(200);

    const newTopic: Topic = {
      id: `topic-${Date.now()}`,
      slug: this.generateSlug(data.title),
      ...data,
      status: 'draft',
      isVerified: false,
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.topics.unshift(newTopic);
    return newTopic;
  }

  async update(id: string, data: UpdateTopicData): Promise<Topic> {
    await this.delay(200);

    const index = this.topics.findIndex((topic) => topic.id === id);
    if (index === -1) {
      throw new Error('Topic not found');
    }

    const updatedTopic: Topic = {
      ...this.topics[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.topics[index] = updatedTopic;
    return updatedTopic;
  }

  async delete(id: string): Promise<boolean> {
    await this.delay(200);

    const index = this.topics.findIndex((topic) => topic.id === id);
    if (index === -1) {
      return false;
    }

    this.topics.splice(index, 1);
    return true;
  }

  async incrementViewCount(id: string): Promise<void> {
    await this.delay(50);

    const topic = this.topics.find((t) => t.id === id);
    if (topic) {
      topic.viewCount += 1;
    }
  }

  async getStats(): Promise<TopicStats> {
    await this.delay(100);

    const totalTopics = this.topics.length;
    const publishedTopics = this.topics.filter((t) => t.status === 'published').length;
    const pendingTopics = this.topics.filter((t) => t.status === 'pending').length;
    const verifiedTopics = this.topics.filter((t) => t.isVerified).length;

    return {
      totalTopics,
      publishedTopics,
      pendingTopics,
      verifiedTopics,
    };
  }

  // Helper methods
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
  }
}

// Export singleton instance
export const mockTopicRepository = new MockTopicRepository();
