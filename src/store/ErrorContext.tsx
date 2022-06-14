import React, {createContext, useContext, useState} from "react";

const ErrorContext = createContext<ErrorContextType>({
    error: null,
    addError: () => {},
    removeError: () => {},
})

export const useError = () => {
    const {error, addError, removeError} = useContext(ErrorContext);
    return {error,  addError, removeError}
}

type ErrorContextType = {
    error: string | null,
    addError: (errorMessage: string) => void,
    removeError: () => void
}


export const ErrorProvider: React.FC = (props) => {

    const [error, setError] = useState<string | null>(null)

    const addError = (error: any | unknown) => {
        // let message
        // if (error instanceof Error) {
        //     console.log(error)
        //     message = error.message
        // }
        // else message = String("Unknown error" + error)
        setError(error)
    }

    const removeError = () => {
        setError(null)
    }

    const context: ErrorContextType = {
        error: error,
        addError: addError,
        removeError: removeError,
    }

    return <ErrorContext.Provider value={context}>
        {props.children}
    </ErrorContext.Provider>
}

export default ErrorProvider;