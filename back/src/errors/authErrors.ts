import { AppError } from "./protocols";

export function UnauthorizedError(): AppError {
    return {
        name: "UnauthorizedError",
        message: "You're not signed in."
    }
}