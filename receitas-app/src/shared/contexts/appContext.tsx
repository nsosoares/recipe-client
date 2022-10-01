import React from "react";
import { useNavigate } from "react-router-dom";
import { ILoginForm } from "../../pages/login/login-form.model";
import { RecipeData } from "../data/recipeData";
import { UserData } from "../data/userData";
import { Note } from "../models/notes-model";
import { Recipe } from "../models/recipe-model";
import { User, UserType } from "../models/user-model";

export const AppContext = React.createContext({} as any);

function AppProvider({children}:any) {
    const [auth, setAuth] = React.useState(false);
    const [userAuth, setUserAuth] = React.useState({} as User);
    const [recipes, setRecipes] = React.useState([] as Recipe[]);
    const [lastNoteId, setLastNoteId] = React.useState(1);
    const [lastRecipeId, setLastRecipeId] = React.useState(1);
    const navigate = useNavigate();
    const signIn = (userForm: ILoginForm): boolean => {
        const user = UserData.getUserForSignIn(userForm);
        if(!user) {
            navigate('/login');
            return false;
        }
        setAuth(true);
        setUserAuth(user);
        navigate(user?.userType == UserType.Admin ? '/admin' : '/chef');
        return true;
    }
    const logout = (): void => {
        setAuth(false);
        setUserAuth({} as User);
        navigate('/login');
    }
    const addRecipe = (newRecipe: Recipe): void => {
        RecipeData.addRecipe(newRecipe);
        setRecipes([...recipes, newRecipe]);
        setLastRecipeId(newRecipe.id)
    }
    const updateRecipeWithNewNote = (recipeId: number, note: Note): void => {
        RecipeData.updateRecipeWithNewNote(recipeId, note);
        console.log(RecipeData.getRecipes());
        setRecipes(RecipeData.getRecipes());
        setLastNoteId(note.id)
    }
    return (
        <AppContext.Provider value={{auth, navigate, userAuth, recipes, lastNoteId, lastRecipeId, signIn, logout, addRecipe, updateRecipeWithNewNote}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;