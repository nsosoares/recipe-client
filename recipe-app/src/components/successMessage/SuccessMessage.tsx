import { Alert } from "react-bootstrap";
import "./SuccessMessage.css";

export function SuccessMessage() {
    return (
        <Alert className="containerSuccessMessage" variant="success">
            <h5>Salvo com sucesso</h5>
        </Alert>
    )
}