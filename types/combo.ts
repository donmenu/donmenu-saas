export interface Combo {
  id: number;
  restaurant_id: number;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  active: boolean;
  valid_from?: string;
  valid_to?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  items?: ComboItem[];
  total_original_price?: number;
  total_savings?: number;
}

export interface ComboItem {
  id: number;
  restaurant_id: number;
  combo_id: number;
  menu_item_id: number;
  quantity: number;
  discount?: number;
  created_at: string;
  menu_item?: MenuItem;
  original_price?: number;
  final_price?: number;
}

export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  active: boolean;
  visible: boolean;
  menu_id: number;
  category_id?: number;
  recipe_id?: number;
  image_url?: string;
  category?: {
    id: number;
    name: string;
  };
  menu?: {
    id: number;
    name: string;
  };
}

export interface CreateComboRequest {
  name: string;
  description?: string;
  price: number;
  discount?: number;
  valid_from?: string;
  valid_to?: string;
  image_url?: string;
  items: {
    menu_item_id: number;
    quantity: number;
    discount?: number;
  }[];
}

export interface UpdateComboRequest {
  name?: string;
  description?: string;
  price?: number;
  discount?: number;
  valid_from?: string;
  valid_to?: string;
  image_url?: string;
  active?: boolean;
  items?: {
    menu_item_id: number;
    quantity: number;
    discount?: number;
  }[];
} 