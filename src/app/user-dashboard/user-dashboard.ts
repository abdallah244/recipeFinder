import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { Recipe, RecipeCategory } from '../data/recipe.model';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  categories: RecipeCategory[] = [];
  searchQuery: string = '';
  selectedCategory: string = 'all';
  isSearchFocused: boolean = false;
  activeView: 'grid' | 'list' = 'grid';
  isLoading: boolean = true;
  
  
  showRecipeModal: boolean = false;
  selectedRecipe: Recipe | null = null;
  showFavorites: boolean = false;
  favorites: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadData();
    
    setTimeout(() => {
      this.isLoading = false;
    }, 800);
  }

  ngOnDestroy(): void {}

  private loadData(): void {
    this.recipes = this.recipeService.getRecipes();
    this.filteredRecipes = [...this.recipes];
    this.categories = this.recipeService.getCategories();
    this.favorites = this.recipeService.getFavorites();
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.filteredRecipes = this.recipeService.searchRecipes(this.searchQuery);
    } else {
      this.filteredRecipes = [...this.recipes];
    }
    
    if (this.selectedCategory !== 'all') {
      this.filteredRecipes = this.filteredRecipes.filter(
        recipe => recipe.category === this.selectedCategory
      );
    }
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    
    if (category === 'all') {
      this.filteredRecipes = this.searchQuery.trim() 
        ? this.recipeService.searchRecipes(this.searchQuery)
        : [...this.recipes];
    } else {
      this.filteredRecipes = this.recipeService.filterByCategory(category);
      
      if (this.searchQuery.trim()) {
        this.filteredRecipes = this.filteredRecipes.filter(recipe =>
          recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          recipe.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        );
      }
    }
  }

  toggleFavorite(recipeId: number, event: Event): void {
    event.stopPropagation();
    this.recipeService.toggleFavorite(recipeId);
    this.favorites = this.recipeService.getFavorites();
    
    const recipe = this.recipes.find(r => r.id === recipeId);
    if (recipe) {
      const filteredRecipe = this.filteredRecipes.find(r => r.id === recipeId);
      if (filteredRecipe) {
        filteredRecipe.isFavorite = recipe.isFavorite;
      }
    }
  }

  viewRecipe(recipeId: number): void {
    this.selectedRecipe = this.recipeService.getRecipeById(recipeId) || null;
    if (this.selectedRecipe) {
      this.showRecipeModal = true;
      this.renderer.setStyle(document.body, 'overflow', 'hidden'); 
    }
  }

  closeRecipeModal(): void {
    this.showRecipeModal = false;
    this.selectedRecipe = null;
    this.renderer.setStyle(document.body, 'overflow', 'auto'); 
  }

  toggleFavoritesView(): void {
    this.showFavorites = !this.showFavorites;
    if (this.showFavorites) {
      this.filteredRecipes = this.favorites;
    } else {
      this.onCategoryChange(this.selectedCategory);
    }
  }

  toggleView(view: 'grid' | 'list'): void {
    this.activeView = view;
  }

  getDifficultyClass(difficulty: string): string {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'difficulty-easy';
      case 'medium': return 'difficulty-medium';
      case 'hard': return 'difficulty-hard';
      default: return 'difficulty-easy';
    }
  }

  getTimeDisplay(minutes: number): string {
    if (minutes < 60) {
      return `${minutes}m`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
  }

  
  preventClose(event: Event): void {
    event.stopPropagation();
  }
}
