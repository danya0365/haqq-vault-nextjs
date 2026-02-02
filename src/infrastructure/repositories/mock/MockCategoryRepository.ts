/**
 * MockCategoryRepository
 * Mock implementation for development and testing
 * Following Clean Architecture - Infrastructure Layer
 */

import {
    ICategoryRepository,
} from '@/src/application/repositories/ICategoryRepository';
import {
    Category,
    CategoryStats,
    CreateCategoryData,
    UpdateCategoryData,
} from '@/src/domain/types/category';
import { MOCK_CATEGORIES } from './data/mockData';

export class MockCategoryRepository implements ICategoryRepository {
  private categories: Category[] = [...MOCK_CATEGORIES];

  async getById(id: string): Promise<Category | null> {
    await this.delay(100);
    return this.categories.find((cat) => cat.id === id) || null;
  }

  async getBySlug(slug: string): Promise<Category | null> {
    await this.delay(100);
    return this.categories.find((cat) => cat.slug === slug) || null;
  }

  async getAll(): Promise<Category[]> {
    await this.delay(100);
    return [...this.categories].sort((a, b) => a.order - b.order);
  }

  async getActive(): Promise<Category[]> {
    await this.delay(100);
    return this.categories
      .filter((cat) => cat.isActive)
      .sort((a, b) => a.order - b.order);
  }

  async create(data: CreateCategoryData): Promise<Category> {
    await this.delay(200);

    const maxOrder = Math.max(...this.categories.map((c) => c.order), 0);

    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      slug: this.generateSlug(data.name),
      ...data,
      topicCount: 0,
      order: maxOrder + 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.categories.push(newCategory);
    return newCategory;
  }

  async update(id: string, data: UpdateCategoryData): Promise<Category> {
    await this.delay(200);

    const index = this.categories.findIndex((cat) => cat.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }

    const updatedCategory: Category = {
      ...this.categories[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.categories[index] = updatedCategory;
    return updatedCategory;
  }

  async delete(id: string): Promise<boolean> {
    await this.delay(200);

    const index = this.categories.findIndex((cat) => cat.id === id);
    if (index === -1) {
      return false;
    }

    this.categories.splice(index, 1);
    return true;
  }

  async getStats(): Promise<CategoryStats> {
    await this.delay(100);

    const totalCategories = this.categories.length;
    const activeCategories = this.categories.filter((c) => c.isActive).length;
    const totalTopicsInCategories = this.categories.reduce(
      (sum, c) => sum + c.topicCount,
      0
    );

    return {
      totalCategories,
      activeCategories,
      totalTopicsInCategories,
    };
  }

  // Helper methods
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
  }
}

// Export singleton instance
export const mockCategoryRepository = new MockCategoryRepository();
