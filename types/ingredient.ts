export interface Ingredient {
  ingredient_id: number;
  name: string;
  unit: string;
  cost_per_unit: number;
  stock?: number;
  created_at?: string;
} 