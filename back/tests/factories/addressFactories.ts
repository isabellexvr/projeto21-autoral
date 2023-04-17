import { addresses } from "@prisma/client";
import { db } from "../../src/config/db";
import { faker } from '@faker-js/faker';


export async function createAddress(data: Partial<addresses> | null) {
    return db.prisma.addresses.create({
        data: {
            id: data.id || Number(faker.random.numeric(2)),
            country: data.country || faker.address.country(),
            countryIso2: data.countryIso2 || faker.address.countryCode('alpha-2'),
            state: data.state || faker.address.state(),
            stateIso2: data.stateIso2 || faker.address.countryCode('alpha-2'),
            city: data.city || faker.address.cityName()
        }
    })
}

export async function findFirstAddress(){
    return db.prisma.addresses.findFirst({})
}