import { Injectable } from '@angular/core';
import { Recipe, RecipeCategory } from '../data/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: 1,
      name: 'Classic Spaghetti Carbonara',
      image: 'https://www.sipandfeast.com/wp-content/uploads/2022/09/spaghetti-carbonara-recipe-snippet.jpg',
      ingredients: [
        'Spaghetti',
        'Eggs',
        'Parmesan cheese',
        'Guanciale',
        'Black pepper',
        'Salt',
      ],
      instructions: [
        'Cook spaghetti al dente',
        'Fry guanciale until crispy',
        'Mix eggs and cheese',
        'Combine everything and mix well',
      ],
      cookingTime: 20,
      difficulty: 'Medium',
      category: 'pasta',
      rating: 4.8,
      isFavorite: false,
    },
    {
      id: 2,
      name: 'Vegetable Stir Fry',
      image: 'https://bing.com/th?id=OSK.b58cde29c7d6a77370caa3c5fb22fcc6',
      ingredients: [
        'Broccoli',
        'Carrots',
        'Bell peppers',
        'Soy sauce',
        'Ginger',
        'Garlic',
        'Sesame oil',
      ],
      instructions: [
        'Chop all vegetables',
        'Heat oil in wok',
        'Stir fry vegetables',
        'Add sauce and simmer',
      ],
      cookingTime: 15,
      difficulty: 'Easy',
      category: 'vegetarian',
      rating: 4.3,
      isFavorite: false,
    },
    {
      id: 3,
      name: 'Chocolate Chip Cookies',
      image: 'https://bing.com/th?id=OSK.598c5b2b7b65082004e599cc520830a2',
      ingredients: [
        'Flour',
        'Butter',
        'Sugar',
        'Chocolate chips',
        'Eggs',
        'Vanilla',
        'Baking soda',
      ],
      instructions: [
        'Mix dry ingredients',
        'Cream butter and sugar',
        'Combine everything',
        'Bake at 350°F for 12 minutes',
      ],
      cookingTime: 30,
      difficulty: 'Easy',
      category: 'dessert',
      rating: 4.9,
      isFavorite: false,
    },
    {
      id: 4,
      name: 'Beef Bourguignon',
      image: 'https://bing.com/th?id=OSK.8317845c5c1bdcf37e332eec4793ac22',
      ingredients: [
        'Beef chuck',
        'Red wine',
        'Carrots',
        'Onions',
        'Mushrooms',
        'Herbs',
        'Bacon',
      ],
      instructions: [
        'Brown the beef',
        'Sauté vegetables',
        'Add wine and simmer',
        'Cook for 2-3 hours',
      ],
      cookingTime: 180,
      difficulty: 'Hard',
      category: 'meat',
      rating: 4.7,
      isFavorite: false,
    },
    {
      id: 5,
      name: 'Greek Salad',
      image: 'https://bing.com/th?id=OSK.951fe7a0d0737dcdf4309f9b5fcb2fa7',
      ingredients: [
        'Cucumber',
        'Tomato',
        'Red onion',
        'Feta cheese',
        'Olives',
        'Olive oil',
        'Oregano',
      ],
      instructions: [
        'Chop vegetables',
        'Add feta and olives',
        'Dress with olive oil',
        'Season to taste',
      ],
      cookingTime: 10,
      difficulty: 'Easy',
      category: 'salad',
      rating: 4.5,
      isFavorite: false,
    },
    {
      id: 6,
      name: 'Chicken Curry',
      image: 'https://bing.com/th?id=OSK.e0958635166aa1d99ba150b58e078d3b',
      ingredients: [
        'Chicken',
        'Coconut milk',
        'Curry paste',
        'Vegetables',
        'Spices',
        'Fish sauce',
        'Lime',
      ],
      instructions: [
        'Brown chicken',
        'Add curry paste',
        'Pour coconut milk',
        'Simmer until cooked',
      ],
      cookingTime: 40,
      difficulty: 'Medium',
      category: 'poultry',
      rating: 4.6,
      isFavorite: false,
    },
    {
      id: 7,
      name: 'Margherita Pizza',
      image: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/07/margherita-pizza-recipe.jpg',
      ingredients: [
        'Pizza dough',
        'Tomato sauce',
        'Fresh mozzarella',
        'Basil',
        'Olive oil',
        'Salt',
      ],
      instructions: [
        'Roll out dough',
        'Spread tomato sauce',
        'Add cheese and basil',
        'Bake at 475°F for 12 minutes',
      ],
      cookingTime: 30,
      difficulty: 'Medium',
      category: 'italian',
      rating: 4.7,
      isFavorite: false,
    },
    {
      id: 8,
      name: 'Avocado Toast',
      image: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/01/how-to-make-avocado-toast.jpg',
      ingredients: [
        'Bread',
        'Avocado',
        'Lemon juice',
        'Salt',
        'Pepper',
        'Red pepper flakes',
        'Eggs',
      ],
      instructions: [
        'Toast bread',
        'Mash avocado',
        'Add seasonings',
        'Top with eggs if desired',
      ],
      cookingTime: 10,
      difficulty: 'Easy',
      category: 'breakfast',
      rating: 4.2,
      isFavorite: false,
    },
    {
      id: 9,
      name: 'Beef Tacos',
      image: 'https://tse4.mm.bing.net/th/id/OIP.2fqwgY00_rG0J7DPi9zLBQHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      ingredients: [
        'Ground beef',
        'Taco seasoning',
        'Tortillas',
        'Lettuce',
        'Tomato',
        'Cheese',
        'Sour cream',
      ],
      instructions: [
        'Brown beef with seasoning',
        'Warm tortillas',
        'Assemble tacos',
        'Add toppings',
      ],
      cookingTime: 25,
      difficulty: 'Easy',
      category: 'mexican',
      rating: 4.4,
      isFavorite: false,
    },
    {
      id: 10,
      name: 'Chocolate Mousse',
      image: 'https://tse4.mm.bing.net/th/id/OIP.475TVBXcZX2Qc5GLqsuSSQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      ingredients: [
        'Chocolate',
        'Heavy cream',
        'Eggs',
        'Sugar',
        'Vanilla',
        'Salt',
      ],
      instructions: [
        'Melt chocolate',
        'Whip cream',
        'Fold together',
        'Chill for 4 hours',
      ],
      cookingTime: 240,
      difficulty: 'Medium',
      category: 'dessert',
      rating: 4.8,
      isFavorite: false,
    },
    // 20 وصفة إضافية
    {
      id: 11,
      name: 'Shrimp Scampi',
      image: 'https://tse2.mm.bing.net/th/id/OIP.fZd3RIhJSCDnmGMdgvZIHgHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      ingredients: [
        'Shrimp',
        'Garlic',
        'White wine',
        'Lemon',
        'Butter',
        'Parsley',
        'Pasta',
      ],
      instructions: [
        'Sauté garlic',
        'Add shrimp',
        'Deglaze with wine',
        'Toss with pasta',
      ],
      cookingTime: 20,
      difficulty: 'Medium',
      category: 'seafood',
      rating: 4.6,
      isFavorite: false,
    },
    {
      id: 12,
      name: 'Vegetable Lasagna',
      image: 'https://th.bing.com/th/id/R.bbc44ecf739756198e8407df31b5d1a7?rik=WNZeHawn%2fOavhA&pid=ImgRaw&r=0',
      ingredients: [
        'Lasagna noodles',
        'Ricotta',
        'Spinach',
        'Zucchini',
        'Tomato sauce',
        'Mozzarella',
        'Basil',
      ],
      instructions: [
        'Layer noodles',
        'Add vegetables and cheese',
        'Repeat layers',
        'Bake for 45 minutes',
      ],
      cookingTime: 60,
      difficulty: 'Medium',
      category: 'vegetarian',
      rating: 4.5,
      isFavorite: false,
    },
    {
      id: 13,
      name: 'BBQ Ribs',
      image: 'https://tse3.mm.bing.net/th/id/OIP.JK1BqkOp4siw4M8NALDIDAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      ingredients: [
        'Pork ribs',
        'BBQ sauce',
        'Brown sugar',
        'Paprika',
        'Garlic powder',
        'Onion powder',
        'Salt',
      ],
      instructions: [
        'Season ribs',
        'Slow cook for 3 hours',
        'Brush with sauce',
        'Grill for 10 minutes',
      ],
      cookingTime: 190,
      difficulty: 'Hard',
      category: 'meat',
      rating: 4.7,
      isFavorite: false,
    },
    {
      id: 14,
      name: 'French Toast',
      image: 'https://tse3.mm.bing.net/th/id/OIP.WhEi8KvoAb62Po3tUAlrQwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      ingredients: [
        'Bread',
        'Eggs',
        'Milk',
        'Cinnamon',
        'Vanilla',
        'Butter',
        'Maple syrup',
      ],
      instructions: [
        'Mix egg mixture',
        'Soak bread',
        'Cook on griddle',
        'Serve with syrup',
      ],
      cookingTime: 15,
      difficulty: 'Easy',
      category: 'breakfast',
      rating: 4.3,
      isFavorite: false,
    },
    {
      id: 15,
      name: 'Mushroom Risotto',
      image: 'https://tse3.mm.bing.net/th/id/OIP.KPwUDgg68TXXly0C_jxRRAHaJl?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      ingredients: [
        'Arborio rice',
        'Mushrooms',
        'White wine',
        'Parmesan',
        'Onion',
        'Garlic',
        'Broth',
      ],
      instructions: [
        'Sauté mushrooms',
        'Toast rice',
        'Add wine gradually',
        'Stir in cheese',
      ],
      cookingTime: 35,
      difficulty: 'Medium',
      category: 'italian',
      rating: 4.6,
      isFavorite: false,
    },
    {
      id: 16,
      name: 'Guacamole',
      image: 'https://www.thechunkychef.com/wp-content/uploads/2023/04/Classic-Guacamole-Recipe-feat.jpg',
      ingredients: [
        'Avocado',
        'Lime',
        'Onion',
        'Tomato',
        'Cilantro',
        'Jalapeño',
        'Salt',
      ],
      instructions: [
        'Mash avocados',
        'Dice vegetables',
        'Mix together',
        'Season to taste',
      ],
      cookingTime: 10,
      difficulty: 'Easy',
      category: 'mexican',
      rating: 4.4,
      isFavorite: false,
    },
    {
      id: 17,
      name: 'Chicken Parmesan',
      image: 'https://tse2.mm.bing.net/th/id/OIP.DqaOgAjnQzyLM2VQbdFbDQHaKe?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      ingredients: [
        'Chicken',
        'Tomato sauce',
        'Mozzarella',
        'Parmesan',
        'Breadcrumbs',
        'Eggs',
        'Flour',
      ],
      instructions: [
        'Bread chicken',
        'Fry until golden',
        'Top with sauce and cheese',
        'Bake for 20 minutes',
      ],
      cookingTime: 45,
      difficulty: 'Medium',
      category: 'poultry',
      rating: 4.7,
      isFavorite: false,
    },
    {
      id: 18,
      name: 'Beef Stir Fry',
      image: 'https://th.bing.com/th/id/R.70cd2fd4009b39f90e4fc02a99e6a998?rik=Uyev1hiWI0Z9rQ&pid=ImgRaw&r=0',
      ingredients: [
        'Beef strips',
        'Broccoli',
        'Bell peppers',
        'Soy sauce',
        'Ginger',
        'Garlic',
        'Sesame oil',
      ],
      instructions: [
        'Marinate beef',
        'Stir fry vegetables',
        'Add beef',
        'Toss with sauce',
      ],
      cookingTime: 25,
      difficulty: 'Medium',
      category: 'asian',
      rating: 4.5,
      isFavorite: false,
    },
    {
      id: 19,
      name: 'Caprese Salad',
      image: 'https://downshiftology.com/wp-content/uploads/2019/07/Caprese-Salad-4.jpg',
      ingredients: [
        'Tomatoes',
        'Fresh mozzarella',
        'Basil',
        'Olive oil',
        'Balsamic',
        'Salt',
        'Pepper',
      ],
      instructions: [
        'Slice tomatoes and cheese',
        'Arrange alternately',
        'Drizzle with oil',
        'Garnish with basil',
      ],
      cookingTime: 10,
      difficulty: 'Easy',
      category: 'salad',
      rating: 4.4,
      isFavorite: false,
    },
    {
      id: 20,
      name: 'Pancakes',
      image: 'https://th.bing.com/th/id/R.df66de8e41d16b7ae8873b3323f02fb7?rik=ucFTdRmzGAFtYQ&pid=ImgRaw&r=0',
      ingredients: [
        'Flour',
        'Milk',
        'Eggs',
        'Baking powder',
        'Sugar',
        'Butter',
        'Maple syrup',
      ],
      instructions: [
        'Mix dry ingredients',
        'Add wet ingredients',
        'Cook on griddle',
        'Serve with syrup',
      ],
      cookingTime: 20,
      difficulty: 'Easy',
      category: 'breakfast',
      rating: 4.3,
      isFavorite: false,
    },
    {
      id: 21,
      name: 'Fish Tacos',
      image: 'https://th.bing.com/th/id/R.606b44f9792f0851e7a84402d0234d9e?rik=nllrCM%2fISKJkmw&pid=ImgRaw&r=0',
      ingredients: [
        'White fish',
        'Tortillas',
        'Cabbage',
        'Lime',
        'Cilantro',
        'Avocado',
        'Sour cream',
      ],
      instructions: [
        'Season fish',
        'Grill or fry',
        'Warm tortillas',
        'Assemble tacos',
      ],
      cookingTime: 25,
      difficulty: 'Medium',
      category: 'seafood',
      rating: 4.5,
      isFavorite: false,
    },
    {
      id: 22,
      name: 'Vegetable Soup',
      image: 'https://th.bing.com/th/id/R.c7a91f9b92712f15e2408c70caf61e43?rik=1tHjrW7Iza4bag&pid=ImgRaw&r=0',
      ingredients: [
        'Carrots',
        'Celery',
        'Onions',
        'Potatoes',
        'Tomatoes',
        'Herbs',
        'Broth',
      ],
      instructions: [
        'Sauté vegetables',
        'Add broth',
        'Simmer for 30 minutes',
        'Season to taste',
      ],
      cookingTime: 40,
      difficulty: 'Easy',
      category: 'soup',
      rating: 4.2,
      isFavorite: false,
    },
    {
      id: 23,
      name: 'Chicken Noodle Soup',
      image: 'https://tse2.mm.bing.net/th/id/OIP.5vaomNen5biA-kvkPr04ZAHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      ingredients: [
        'Chicken',
        'Noodles',
        'Carrots',
        'Celery',
        'Onions',
        'Herbs',
        'Broth',
      ],
      instructions: [
        'Cook chicken',
        'Sauté vegetables',
        'Add broth and noodles',
        'Simmer until tender',
      ],
      cookingTime: 45,
      difficulty: 'Easy',
      category: 'soup',
      rating: 4.4,
      isFavorite: false,
    },
    {
      id: 24,
      name: 'Beef Burger',
      image: 'https://www.recipetocook.co.uk/wp-content/uploads/2024/02/beef-burger-recipe.jpg',
      ingredients: [
        'Ground beef',
        'Buns',
        'Lettuce',
        'Tomato',
        'Onion',
        'Cheese',
        'Condiments',
      ],
      instructions: [
        'Form patties',
        'Grill to preference',
        'Toast buns',
        'Assemble burger',
      ],
      cookingTime: 20,
      difficulty: 'Easy',
      category: 'american',
      rating: 4.6,
      isFavorite: false,
    },
    {
      id: 25,
      name: 'Caesar Salad',
      image: 'https://tse2.mm.bing.net/th/id/OIP.V3PBpJ34-OZB9aEeGM9cWQHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      ingredients: [
        'Romaine',
        'Croutons',
        'Parmesan',
        'Lemon',
        'Garlic',
        'Anchovies',
        'Olive oil',
      ],
      instructions: [
        'Chop lettuce',
        'Make dressing',
        'Toss with croutons',
        'Top with cheese',
      ],
      cookingTime: 15,
      difficulty: 'Easy',
      category: 'salad',
      rating: 4.5,
      isFavorite: false,
    },
    {
      id: 26,
      name: 'Chicken Alfredo',
      image: 'https://tse3.mm.bing.net/th/id/OIP.vXV9LrGO8MbGsmMlLDEH3gHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      ingredients: [
        'Chicken',
        'Fettuccine',
        'Heavy cream',
        'Parmesan',
        'Garlic',
        'Butter',
        'Parsley',
      ],
      instructions: [
        'Cook pasta',
        'Sauté chicken',
        'Make sauce',
        'Combine and serve',
      ],
      cookingTime: 30,
      difficulty: 'Medium',
      category: 'pasta',
      rating: 4.6,
      isFavorite: false,
    },
    {
      id: 27,
      name: 'Vegetable Curry',
      image: 'https://th.bing.com/th/id/R.ccc956025c072b0390f9f095c8f9c334?rik=CubJHfEVGsfSvg&pid=ImgRaw&r=0',
      ingredients: [
        'Mixed vegetables',
        'Coconut milk',
        'Curry paste',
        'Onion',
        'Garlic',
        'Ginger',
        'Rice',
      ],
      instructions: [
        'Sauté aromatics',
        'Add vegetables',
        'Pour coconut milk',
        'Simmer until tender',
      ],
      cookingTime: 35,
      difficulty: 'Medium',
      category: 'vegetarian',
      rating: 4.4,
      isFavorite: false,
    },
    {
      id: 28,
      name: 'Apple Pie',
      image: 'https://tse3.mm.bing.net/th/id/OIP.XtxsoZqK5OcwgIIujqa5JQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      ingredients: [
        'Apples',
        'Pie crust',
        'Sugar',
        'Cinnamon',
        'Butter',
        'Lemon',
        'Nutmeg',
      ],
      instructions: [
        'Prepare filling',
        'Line pie dish',
        'Add filling',
        'Bake for 45 minutes',
      ],
      cookingTime: 75,
      difficulty: 'Medium',
      category: 'dessert',
      rating: 4.7,
      isFavorite: false,
    },
    {
      id: 29,
      name: 'Grilled Cheese',
      image: 'https://tse1.mm.bing.net/th/id/OIP.vLMah9_Qze-8TRyenKo2vgHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      ingredients: ['Bread', 'Cheese', 'Butter', 'Tomato soup'],
      instructions: [
        'Butter bread',
        'Add cheese',
        'Grill until golden',
        'Serve with soup',
      ],
      cookingTime: 10,
      difficulty: 'Easy',
      category: 'american',
      rating: 4.2,
      isFavorite: false,
    },
    {
      id: 30,
      name: 'Beef Stroganoff',
      image: 'https://tse2.mm.bing.net/th/id/OIP.vx1SmJ57609WQ7rSyuf7fgHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      ingredients: [
        'Beef strips',
        'Mushrooms',
        'Onion',
        'Sour cream',
        'Beef broth',
        'Egg noodles',
        'Paprika',
      ],
      instructions: [
        'Brown beef',
        'Sauté mushrooms',
        'Make sauce',
        'Serve over noodles',
      ],
      cookingTime: 40,
      difficulty: 'Medium',
      category: 'russian',
      rating: 4.6,
      isFavorite: false,
    },
  ];

  

  private categories: RecipeCategory[] = [
    { id: 1, name: 'All Recipes', icon: '🍽️' },
    { id: 2, name: 'Vegetarian', icon: '🥦' },
    { id: 3, name: 'Pasta', icon: '🍝' },
    { id: 4, name: 'Meat', icon: '🍖' },
    { id: 5, name: 'Poultry', icon: '🍗' },
    { id: 6, name: 'Seafood', icon: '🐟' },
    { id: 7, name: 'Breakfast', icon: '🍳' },
    { id: 8, name: 'Soup', icon: '🍲' },
    { id: 9, name: 'Mexican', icon: '🌮' },
    { id: 10, name: 'Asian', icon: '🍜' }
  ];

  constructor() {
    this.loadFavorites();
  }

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipeById(id: number): Recipe | undefined {
    return this.recipes.find(recipe => recipe.id === id);
  }

  getCategories(): RecipeCategory[] {
    return this.categories;
  }

  searchRecipes(query: string): Recipe[] {
    if (!query.trim()) return this.recipes;
    
    return this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(query.toLowerCase())
      )
    );
  }

  filterByCategory(category: string): Recipe[] {
    if (category === 'all') return this.recipes;
    return this.recipes.filter(recipe => recipe.category === category);
  }

  toggleFavorite(recipeId: number): void {
    const recipe = this.recipes.find(r => r.id === recipeId);
    if (recipe) {
      recipe.isFavorite = !recipe.isFavorite;
      this.saveFavorites();
    }
  }

  getFavorites(): Recipe[] {
    return this.recipes.filter(recipe => recipe.isFavorite);
  }

  private saveFavorites(): void {
    const favorites = this.recipes
      .filter(recipe => recipe.isFavorite)
      .map(recipe => recipe.id);
    
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  }

  private loadFavorites(): void {
    const favoritesJson = localStorage.getItem('recipeFavorites');
    if (favoritesJson) {
      const favoriteIds: number[] = JSON.parse(favoritesJson);
      this.recipes.forEach(recipe => {
        recipe.isFavorite = favoriteIds.includes(recipe.id);
      });
    }
  }
}