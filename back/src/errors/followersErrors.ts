import { AppError } from "./protocols";

export function YouDontFollowError(): AppError{
    return {
        name: "YouDontFollowError",
        message: "You don't follow this user."
    }
}