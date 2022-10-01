import { Button, Form } from 'react-bootstrap'
import './login.css'
import { SignIn } from "phosphor-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ILoginForm } from './login-form.model';
import React from 'react';
import { AppContext } from '../../shared/contexts/appContext';
import { ErrorMessage } from '../../components/errorMessage/ErrorMessage';

export function Login() {
    const { signIn } = React.useContext(AppContext);
    const [error, setError] = React.useState('');
    const { register, formState: {errors}, handleSubmit } = useForm<ILoginForm>();
    const onSubmit: SubmitHandler<ILoginForm> = data => {
        const auth = signIn(data);
        if(!auth) setError('Login ou senha inválido')
    };

    return (
        <div className="login">
            <div className='login-form'>
                <div className='login-painel'>
                    <h1>Receitas</h1>
                    <h2><b>Fazer login</b></h2>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicLogin">
                            <Form.Label>Login</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Login" 
                            {...register("login", 
                            { required: true})} />
                            {errors.login?.type === 'required' && <p className='error' role="alert">Campo é obrigatório</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Senha" 
                            {...register("password", { required: true})} />
                            {errors.password?.type === 'required' && <p className='error' role="alert">Campo é obrigatório</p>}
                        </Form.Group>
                        <Button variant="success" type="submit">
                            <SignIn size={28} />
                        </Button>
                        {error && <ErrorMessage message={error} />}
                    </Form>
                </div>
            </div>
        </div>
    )
}

