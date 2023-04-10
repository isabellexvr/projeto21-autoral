import { AppError } from './protocols';

export function ExceededLimitError(): AppError{
    return {
        name: "ExceededLimitError",
        message: "Communities quantity limit was exceeded."
    }
};

export function NameAlreadyExistsError(): AppError{
    return {
        name: "NameAlreadyExistsError",
        message: "This community name already exists"
    }
}

export function UserIsAlreadyAMember():AppError{
    return {
        name: "UserIsAlreadyAMember",
        message: "This user is already a member of this community"
    };
};