import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { ErrorMessage } from "../../components/errorMessage/ErrorMessage";
import { Notes } from "../../components/notes/Notes";
import { AppContext } from "../../shared/contexts/appContext";
import { Recipe } from "../../shared/models/recipe-model";
import { UserType } from "../../shared/models/user-model";

export function Chef() {
  const { recipes, userAuth, auth, navigate } = React.useContext(AppContext);
 

  useEffect(() => {
    if(!auth || userAuth.userType == UserType.Admin) {
        navigate(!auth ? '/login' : '/admin')
      }
  });

  if(recipes.length == 0) {
    return (
        <>
            <h4>Receitas</h4>
            <ErrorMessage message='Nenhuma receita encontrada' />
        </>
    )
  }

  const renderRecipes = (
    <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Qtd. Prato</th>
                <th>Tempo de preparo</th>
                <th>Ingredientes</th>
                <th>Instruções de preparo</th>
            </tr>
            </thead>
            <tbody>
            {
                recipes?.map((recipe: Recipe, index: number) => {
                   return( <tr key={index}>
                        <td>{recipe.numberOfDishes}</td>
                        <td>{recipe.preparationTime}</td>
                        <td>{recipe.ingredients}</td>
                        <td>{recipe.preparationInstructions}</td>
                        <td>
                           <Notes id={recipe.id} notes={recipe.notes} /> 
                        </td>
                    </tr>)
                })
            }
            </tbody>
        </Table>
    )


   return(
        <>
            <h4>Receitas</h4>
            { renderRecipes }
        </>
   );
}