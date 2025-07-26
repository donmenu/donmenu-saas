export interface Cardapio {
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