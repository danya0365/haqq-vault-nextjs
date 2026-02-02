/**
 * Category Domain Model
 * Represents a category for organizing topics
 * Following Clean Architecture - Domain Layer
 */

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameArabic?: string;
  description: string;
  icon: string; // Emoji or icon name
  color: string; // Hex color for theming
  topicCount: number;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryStats {
  totalCategories: number;
  activeCategories: number;
  totalTopicsInCategories: number;
}

export interface CreateCategoryData {
  name: string;
  nameArabic?: string;
  description: string;
  icon: string;
  color: string;
}

export interface UpdateCategoryData {
  name?: string;
  nameArabic?: string;
  description?: string;
  icon?: string;
  color?: string;
  order?: number;
  isActive?: boolean;
}
