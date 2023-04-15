import { AppError } from "./protocols";

export function PostDoesntExistError():AppError{
    return{
        name: "PostDoesntExistError",
        message: "This post doesn't exist."
    }
}