import { AppError } from "./protocols"

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

type Target = "e-mail" | "username"

export function userNotFoundError(target: Target): AppError {
    return {
        name: "UserNotFound",
        message: `This ${target} is not registered yet.`
    }
}

export function invalidPasswordError(): AppError {
    return {
        name: "InvalidPasswordError",
        message: "Invalid password."
    }
}

export function userDoesntExist(): AppError {
    return {
        name: "UserDoesNotExist",
        message: "This user doesn't exist."
    }
}