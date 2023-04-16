import { Response, Request } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { addressesServices } from "services";

export type AddressEntity = {
    country: string,
    countryIso2: string,
    state: string,
    stateIso2: string,
    city: string
}

export async function postNewAddress(req: Request, res: Response) {
    const addressInfo: AddressEntity = req.body;

    try {
        await addressesServices.findOrCreateAddress(addressInfo);
        res.sendStatus(201);
    } catch (error) {
        return res.send(error).status(500)
    }
}

export async function findAddressByUser(req: Request, res: Response) {
    const userId = req.params.userId;
    try {
        const address = await addressesServices.findAddressesByUserId(Number(userId));
        res.status(200).send(address)
    } catch (error) {
        return res.send(error).status(500)
    }
}

export async function findAddressByCommunity(req: Request, res: Response) {
    const communityId = req.params.communityId;
    try {
        const address = await addressesServices.findAddressByCommunityId(Number(communityId));
        res.send(address).status(200)
    } catch (error) {
        return res.send(error).status(500)
    }
}