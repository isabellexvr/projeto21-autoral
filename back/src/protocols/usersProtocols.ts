export type signIn = {
    email?: string,
    username?: string,
    password: string
}

export type NewUserPayload = {
    userInfo: {
        fullName: string;
        userName: string;
        picture: string | null;
        cover: string | null;
        email: string;
        password: string;
    },
    locationInfo: {
        country: string,
        countryIso2: string,
        state: string,
        stateIso2: string,
        city: string
    }
}