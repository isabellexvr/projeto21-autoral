type AppError = {
    name: string,
    message: string
}

export function usernameConflictError():AppError {
    return {
        name: "UsernameConflictError",
        message: "This username is already in use."
    }
}

export function emailConflictError(): AppError {
    return {
        name: "EmailConflictError",
        message: "This e-mail is already registered."
    }
}