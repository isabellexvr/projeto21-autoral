import { AddressEntity } from "../controllers";
import { db } from "../config/db";

function postNewAddress(data: AddressEntity) {
    return db.prisma.addresses.create({ data })
}

function findAddress(data: AddressEntity) {
    return db.prisma.addresses.findFirst({ where: data });
}

export const addressesRepository = {
    postNewAddress, findAddress
}