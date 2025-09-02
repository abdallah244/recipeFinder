export interface Recipe {
  id: number;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  rating: number;
  isFavorite: boolean;
}

export interface RecipeCategory {
  id: number;
  name: string;
  icon: string;
}