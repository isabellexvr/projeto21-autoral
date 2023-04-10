import { AppError } from "./protocols";

export function CommentNotFoundError(): AppError{
    return {
        name: "CommentNotFoundError",
        message: "This comment was not found."
    }
}