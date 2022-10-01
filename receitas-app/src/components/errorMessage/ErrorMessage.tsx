import { Alert } from "react-bootstrap";
import "./ErrorMessage.css";

interface PropsErrorMessage {
    message: string;
}

export function ErrorMessage(props: PropsErrorMessage) {
    return (
        <Alert className="containerErrorMessage" variant="danger">
            <h5>{props.message}</h5>
        </Alert>
    )
}