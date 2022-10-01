import { Note } from '../models/notes-model';
import { Recipe } from '../models/recipe-model';
export class RecipeData {
    private static recipes: Recipe[] = [];

    public static getRecipes(): Recipe[] {
        return this.recipes;
    }

    public static addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
    }

    public static getRecipeById(id: number) {
        return this.recipes.find(recipe => recipe.id == id);
    }

    public static updateRecipeWithNewNote(recipeId: number, newNote: Note) {
        const newRecipes = this.recipes.map(recipe => {
            if(recipe.id == recipeId) {
                recipe?.addNote(newNote);  
            }
            return recipe;
        });
        this.recipes = newRecipes;
    }
}