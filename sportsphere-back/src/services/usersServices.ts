import { users } from "@prisma/client"

async function createUser(userInfo: users) {
    checkUsername(userInfo.userName)
    checkEmail()
    const encryptedPassword = encrypt()
}

const checkUsername = (username: string) => {
    
}

export const usersServices = {
    createUser
}