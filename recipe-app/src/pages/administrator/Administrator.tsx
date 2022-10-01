import React, { useEffect } from "react";
import { AppContext } from "../../shared/contexts/appContext";
import { AdministratorForm } from "./administrator-model";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Col, Form } from "react-bootstrap";
import { FloppyDisk } from "phosphor-react";
import { Recipe } from "../../shared/models/recipe-model";
import { SuccessMessage } from "../../components/successMessage/SuccessMessage";
import { UserType } from "../../shared/models/user-model";

export function Administrator() {
    const { addRecipe, lastRecipeId, userAuth, auth, navigate } = React.useContext(AppContext);
    const [displaySuccess, setDisplaySuccess] = React.useState(false);
    const { register, formState: {errors}, handleSubmit, reset } = useForm<AdministratorForm>();
    const onSubmit: SubmitHandler<AdministratorForm> = data => {
        setDisplaySuccess(false);
        addRecipe(new Recipe(lastRecipeId + 1, data.numberOfDishes, data.preparationTime, data.ingredients, data.preparationInstructions));
        setDisplaySuccess(true);
        reset();
    };

    useEffect(() => {
        if(!auth || userAuth.userType == UserType.Chef) {
            navigate(!auth ? '/login' : '/chef')
          }
      });

    return(
        <>
            <h2>Cadastrar receita</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group as={Col} md="4" className="mb-3" controlId="formBasicNumberOfDishes">
                    <Form.Label>Qtd. Pratos</Form.Label>
                    <Form.Control 
                    type="number" 
                    placeholder="Qtd. Pratos" 
                    {...register("numberOfDishes", 
                    { required: true})} />
                    {errors.numberOfDishes?.type === 'required' && <p className='error' role="alert">Campo é obrigatório</p>}
                </Form.Group>
                <Form.Group as={Col} md="4" className="mb-3" controlId="formBasicPreparationTime">
                    <Form.Label>Tempo de prep.</Form.Label>
                    <Form.Control 
                    type="number" 
                    placeholder="Tempo de prep." 
                    {...register("preparationTime", 
                    { required: true})} />
                    {errors.preparationTime?.type === 'required' && <p className='error' role="alert">Campo é obrigatório</p>}
                </Form.Group>
                <Form.Group as={Col} md="4" className="mb-3" controlId="formBasicIngredients">
                    <Form.Label>Ingredientes</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Ingredientes" 
                     as="textarea" 
                    rows={3} 
                    {...register("ingredients", 
                    { required: true})} />
                    {errors.ingredients?.type === 'required' && <p className='error' role="alert">Campo é obrigatório</p>}
                </Form.Group>
                <Form.Group as={Col} md="4" className="mb-3" controlId="formBasicPreparationInstructions">
                    <Form.Label>Instruções de preparação</Form.Label>
                    <Form.Control 
                    type="text"
                    as="textarea" 
                    rows={3} 
                    placeholder="Instruções de preparação" 
                    {...register("preparationInstructions", 
                    { required: true})} />
                    {errors.preparationInstructions?.type === 'required' && <p className='error' role="alert">Campo é obrigatório</p>}
                </Form.Group>
                
                <Button variant="success" type="submit">
                    <FloppyDisk size={28} />
                </Button>
            </Form>
            {displaySuccess ? <SuccessMessage /> : ''}
        </>
    );
}