import { Response, Request } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export type AddressEntity = {
    country: string,
    countryIso2: string,
    state: string,
    stateIso2: string,
    city: string
}

export async function postAddress(req: Request, res: Response) {
    const addressInfo: AddressEntity = req.body;

    try{
        
    }catch(error){
        return res.send(error).status(500)
    }
}