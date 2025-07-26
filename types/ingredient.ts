export interface Ingredient {
  ingredient_id: number;
  name: string;
  unit: string;
  cost_per_unit: number;
  stock?: number;
  created_at?: string;
  image_url?: string;
  description?: string;
  supplier?: string;
  current_stock?: number;
  min_stock?: number;
} 