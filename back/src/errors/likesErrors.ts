import { AppError } from "./protocols";

export function AlreadyLikedError(): AppError{
    return {
        name: "AlreadyLikedError",
        message: "You already liked this post."
    }
};