import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import { AppContext } from "../../shared/contexts/appContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChefForm } from "../../pages/chef/chef-model";
import { MagnifyingGlass, Pencil } from "phosphor-react";
import { Note } from "../../shared/models/notes-model";

export interface PropsNotes {
    id: number,
    notes: Note[]
}

export function Notes(props: PropsNotes) {
    const { userAuth, updateRecipeWithNewNote, lastNoteId } = React.useContext(AppContext);
    const [displayNotes, setDisplayNotes] = React.useState(false);
    const [displaySuccess, setDisplaySuccess] = React.useState(false);
    const [error, setError] = React.useState('');
    const { register, formState: {errors}, handleSubmit, reset } = useForm<ChefForm>();
    const onSubmit: SubmitHandler<ChefForm> = data => {
        setDisplaySuccess(false);
        const MAXIMUM_VALUE_NOTE: number = 10;
        if(data.note > MAXIMUM_VALUE_NOTE) {
            setError('Ah nota deve ser menor ou igual a 10');
            return;
        }
        updateRecipeWithNewNote(props.id, new Note(lastNoteId + 1, userAuth.id, data.note));
        setDisplaySuccess(true);
        setError('');
        reset();
    };

    const renderNotes = () => {
        return (
            props.notes.map((note: Note, index: number) => {
                return (
                    <div key={index}>
                        <br />
                        <b>Id usuário: {note.userId}</b>
                        <br />
                        <b>Nota: {note.note}</b>
                    </div>
                )
            })
        )
      }
    
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
             <Form.Group as={Col} md="4" className="mb-3" controlId="formBasicNotes">
                    <Form.Label>Nota</Form.Label>
                    <Form.Control 
                    type="number" 
                    placeholder="Notas" 
                    {...register("note", 
                    { required: true})} />
                    {errors.note?.type === 'required' && <p className='error' role="alert">Campo é obrigatório</p>}
                </Form.Group>   
            <Button type="submit" variant="warning">
                <Pencil size={28} />
            </Button> 
            {error && <p className="error">{error}</p>}
            <Button onClick={()=>setDisplayNotes(!displayNotes)} variant="info">
                <MagnifyingGlass size={28} />
            </Button>
            {displaySuccess ? <p className="success">Nota salva com sucesso</p> : ''}
            <br />
            <b>Notas: </b>
            {displayNotes ? renderNotes() : ''}
        </Form>
    )
}