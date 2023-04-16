import { addressesRepository } from "repositories/addressesRepository"
import { AddressEntity } from "../controllers"
import { addresses } from "@prisma/client";

async function findOrCreateAddress(addressInfo: AddressEntity) {

    let address: addresses;

    address = await addressesRepository.findAddress(addressInfo);

    if (!address) {

        address = await addressesRepository.postNewAddress(addressInfo)
    }

    return address.id
}

export const addressesServices = {
    findOrCreateAddress
}