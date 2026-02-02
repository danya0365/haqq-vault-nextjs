/**
 * ICategoryRepository
 * Repository interface for Category data access
 * Following Clean Architecture - Application Layer
 */

import {
    Category,
    CategoryStats,
    CreateCategoryData,
    UpdateCategoryData,
} from '@/src/domain/types/category';

export interface ICategoryRepository {
  /**
   * Get category by ID
   */
  getById(id: string): Promise<Category | null>;

  /**
   * Get category by slug
   */
  getBySlug(slug: string): Promise<Category | null>;

  /**
   * Get all categories
   */
  getAll(): Promise<Category[]>;

  /**
   * Get active categories (ordered)
   */
  getActive(): Promise<Category[]>;

  /**
   * Create a new category
   */
  create(data: CreateCategoryData): Promise<Category>;

  /**
   * Update an existing category
   */
  update(id: string, data: UpdateCategoryData): Promise<Category>;

  /**
   * Delete a category
   */
  delete(id: string): Promise<boolean>;

  /**
   * Get statistics
   */
  getStats(): Promise<CategoryStats>;
}
