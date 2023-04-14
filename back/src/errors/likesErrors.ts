import { AppError } from "./protocols";

export function AlreadyLikedError(): AppError{
    return {
        name: "AlreadyLikedError",
        message: "You already liked this post."
    }
};

export function LikeNotFoundError(): AppError{
    return {
        name: "LikeNotFoundError",
        message: "The like you are trying to delete doesn't exist."
    }
}