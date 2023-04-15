import { Request, Response } from "express";
import { categoriesServices } from "../services/categoriesServices";

export async function findAllCategories(req: Request, res: Response){
    try{
        const categories = await categoriesServices.findAllCategories();
        res.send(categories).status(200);
    }catch(error){
        return res.send(error).status(500)
    }
}