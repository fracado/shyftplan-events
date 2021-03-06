import React from "react";
import Alert from "react-bootstrap/Alert";
import parseErrors from "../helper/parseErrors";

type AlertProps = {
    error: number,
};

const AlertMessage = ({error}: AlertProps) => {
    return (
        <Alert variant="danger" className="text-center" dismissible>
            {parseErrors(error)}
        </Alert>
    )
};

export default AlertMessage;
